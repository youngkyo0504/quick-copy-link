export function glob(pattern: string, input: string): boolean {
  // eslint-disable-next-line no-useless-escape
  const re = new RegExp(pattern.replace(/([.?+^$[\]\\(){}|\/-])/g, '\\$1').replace(/\*/g, '.*'));
  return re.test(input);
}
