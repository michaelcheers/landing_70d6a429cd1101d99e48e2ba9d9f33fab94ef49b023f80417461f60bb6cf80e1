// next/headers — client has no real headers; return empty stubs.
export function headers() { return new Headers(); }
export function cookies() {
  return {
    get: () => null,
    getAll: () => [],
    set: () => {},
    delete: () => {},
    has: () => false,
  };
}
export function draftMode() { return { isEnabled: false, enable: () => {}, disable: () => {} }; }
