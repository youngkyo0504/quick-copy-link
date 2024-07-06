export const DEFAULTS = {
  namespace: '--physics',
  mass: 1,
  tension: 100,
  friction: 10,
  start_velocity: 0,
};

export interface SpringPhysicsOptions {
  namespace: string;
  mass: number;
  tension: number;
  friction: number;
  start_velocity: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UpdateCallback = (args: { namespace: SpringPhysicsOptions['namespace']; value: number }) => void;

export class SpringPhysics {
  private start: number;
  private options: SpringPhysicsOptions;
  private cb: UpdateCallback;
  private onUpdateEnd?: () => void;
  private tickValue?: number;
  private target?: number;
  private solver: () => (t: number) => number;
  private in_motion: boolean = false;
  private startTime?: number;
  private m_w0?: number;
  private m_zeta?: number;
  private m_wd?: number;
  private m_A?: number;
  private m_B?: number;

  constructor({
    startAt,
    options,
    update,
  }: {
    startAt: number;
    options: Partial<SpringPhysicsOptions>;
    update: UpdateCallback;
  }) {
    this.start = startAt;
    this.options = { ...DEFAULTS, ...options };
    this.cb = update;
    this.solver = this.createSolver();
  }

  to(targetValue: number, onUpdateEnd?: () => void): void {
    if (this.tickValue !== undefined) this.start = this.tickValue;
    this.target = targetValue;
    this.solver = this.createSolver();

    this.in_motion = true;
    this.startTime = Date.now() / 1000;
    this.onUpdateEnd = onUpdateEnd;
    window.requestAnimationFrame(this.tick.bind(this));
  }

  private tick(): void {
    if (!this.in_motion || this.startTime === undefined) return;

    const elapsed = Date.now() / 1000 - this.startTime;
    const change = this.solver()(elapsed);

    if (this.target !== undefined) {
      this.tickValue = this.start + (this.target - this.start) * change;
      this.cb({
        namespace: this.options.namespace,
        value: this.tickValue,
      });
    }

    if (elapsed < 1 || change - 1 > Number.EPSILON) {
      window.requestAnimationFrame(this.tick.bind(this));
    } else {
      this.in_motion = false;
      this.onUpdateEnd?.();
      this.onUpdateEnd = undefined;
    }
  }

  private createSolver(): () => (t: number) => number {
    const { mass, tension, friction, start_velocity } = this.options;

    this.m_w0 = Math.sqrt(tension / mass);
    this.m_zeta = friction / (2 * Math.sqrt(tension * mass));

    if (this.m_zeta < 1) {
      this.m_wd = this.m_w0 * Math.sqrt(1 - this.m_zeta ** 2);
      this.m_A = 1;
      this.m_B = (this.m_zeta * this.m_w0 + -start_velocity) / this.m_wd;
    } else {
      this.m_wd = 0;
      this.m_A = 1;
      this.m_B = -start_velocity + this.m_w0;
    }

    return () =>
      (t: number): number => {
        if (this.m_zeta && this.m_zeta < 1) {
          return (
            1 -
            Math.exp(-t * this.m_zeta * this.m_w0!) *
              (this.m_A! * Math.cos(this.m_wd! * t) + this.m_B! * Math.sin(this.m_wd! * t))
          );
        } else {
          return 1 - (this.m_A! + this.m_B! * t) * Math.exp(-t * this.m_w0!);
        }
      };
  }
}
