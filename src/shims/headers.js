function headers() {
  return new Headers();
}
function cookies() {
  return {
    get: () => null,
    getAll: () => [],
    set: () => {
    },
    delete: () => {
    },
    has: () => false
  };
}
function draftMode() {
  return { isEnabled: false, enable: () => {
  }, disable: () => {
  } };
}
export {
  cookies,
  draftMode,
  headers
};
