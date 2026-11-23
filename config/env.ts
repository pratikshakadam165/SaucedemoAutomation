import dotenv from 'dotenv';
dotenv.config();

export const env = {
  uiBaseUrl: process.env.UI_BASE_URL ?? 'https://www.saucedemo.com',
};
