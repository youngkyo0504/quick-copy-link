export function runAtDocumentEnd(func: () => void) {
  if (typeof document === 'undefined') {
    return;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      func();
    });
  } else {
    func();
  }
}
