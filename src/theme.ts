import { Theme as DefaultTheme, colors as defaultColors } from '@adminjs/design-system'
import { NonNullishPartialRecord } from '@adminjs/design-system/types/utils/non-nullish-partial-record.type'


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
 * @property {string} loginText=#000000      <div style="background: #FFFFFF; height: 20px;" />
 * @property {string} loginBg=#FFFFFF      <div style="background: #FFFFFF; height: 20px;" />
 */
const colors = {
  ...defaultColors,
  sidebar: '#FFFFFF',
  navbar: '#FFFFFF',
  loginText: '#000000',
  loginBg: '#FFFFFF',
  welcomeBg: '#1C1C38',
  welcomeText: '#FFFFFF',
}

const details = {
  name: 'AdminJS Theme',
}

export const AdminJSDefaultTheme = {
  colors,
  details,
}

export declare interface Theme extends Omit<DefaultTheme, 'colors'> {
  details: typeof details;
  colors: typeof colors;
}

export declare type AdminJSTheme<T = Theme> = {
  [key in keyof T]?: NonNullishPartialRecord<T[key]>;
};
