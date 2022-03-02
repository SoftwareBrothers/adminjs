import { Theme as DefaultTheme } from '@adminjs/design-system';
import { NonNullishPartialRecord } from '@adminjs/design-system/types/utils/non-nullish-partial-record.type';
import { colors as defaultColors } from '@adminjs/design-system';

/**
 * @interface Theme
 */
/**
 * Color palette.
 *
 * @memberof Theme
 * @alias colors
 * @property {string} sidebar=#FFFFFF      <div style="background: #FFFFFF; height: 20px;" />
 * @property {string} navbar=#FFFFFF      <div style="background: #FFFFFF; height: 20px;" />
 * @property {string} loginWelcomeText=#FFFFFF      <div style="background: #FFFFFF; height: 20px;" />
 * @property {string} loginText=#000000      <div style="background: #FFFFFF; height: 20px;" />
 * @property {string} loginBg=#FFFFFF      <div style="background: #FFFFFF; height: 20px;" />
 */
const colors = {
  ...defaultColors,
  sidebar: '#FFFFFF',
  navbar: '#FFFFFF',
  loginWelcomeText: '#FFFFFF',
  loginText: '#000000',
  loginBg: '#FFFFFF',
};

const details = {
  name: 'AdminJS Theme',
};

export const AdminJSDefaultTheme = {
  colors,
  details,
};

export declare interface Theme extends Omit<DefaultTheme, 'colors'> {
  details: typeof details;
  colors: typeof colors & DefaultTheme['colors'];
}

export declare type AdminJSTheme<T = Theme> = {
  [key in keyof T]?: NonNullishPartialRecord<T[key]>;
};
