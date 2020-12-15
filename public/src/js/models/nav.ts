/** Enum for buttons which map you to different pages. */
export enum NavigationButtons {
  HOME = 'home',
  MATCH = 'match',
};

/** Templates for which pages exist. */
export enum PageTypes {
  HOME = 'home',
  MATCH = 'match',
};

export const ButtonToPage = new Map([
  [NavigationButtons.HOME, PageTypes.HOME],
  [NavigationButtons.MATCH, PageTypes.MATCH],
])
