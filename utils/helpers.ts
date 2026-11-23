export const randomString = (len = 8) =>
  Math.random().toString(36).substring(2, 2 + len);
