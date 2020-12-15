export { };

declare global {
  interface Window {
    firebase: typeof import('firebase').default;
    Mustache: typeof import('mustache');
  }
}
