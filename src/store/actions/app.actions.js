export const CHANGE_APP_NAME = '[MAIN APP] CHANGE APP NAME';

export function changeAppName(value) {
  return {
    type: CHANGE_APP_NAME,
    value,
  };
}
