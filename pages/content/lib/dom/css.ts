// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function css(strings: TemplateStringsArray, ...values: any[]) {
  let str = '';
  strings.forEach((string, i) => {
    str += string + (values[i] || '');
  });
  return str;
}
