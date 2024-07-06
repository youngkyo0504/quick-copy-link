export function getOS() {
  const ua = navigator.userAgent;

  // helper functions to deal with common regex
  function getFirstMatch(regex: RegExp) {
    const match = ua.match(regex);
    return (match && match.length > 1 && match[1]) || '';
  }

  if (/windows nt/i.test(ua)) {
    return {
      name: 'Windows',
      type: 'windows',
      version: getFirstMatch(/windows nt (\d+(\.\d+)*)/i),
    };
  } else if (/mac os x/i.test(ua)) {
    return {
      name: 'Mac OS X',
      type: 'macosx',
      version: getFirstMatch(/mac os x (\d+([_\s]\d+)*)/i).replace(/[_\s]/g, '.'),
    };
  }

  return {
    name: 'etc',
    type: 'etc',
    version: undefined,
  };
}
