// eslint-disable-next-line @typescript-eslint/no-explicit-any
/**
 * NOTE: css함수 안에 주석을 넣지 마시오. 템플릿 리터럴은 주석을 문자열로 취급함
 */
export function css(strings: TemplateStringsArray, ...values: any[]) {
  let str = '';
  strings.forEach((string, i) => {
    str += string + (values[i] || '');
  });
  return str;
}
