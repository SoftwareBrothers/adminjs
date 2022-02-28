import { Theme as DefaultTheme } from '@adminjs/design-system';
import { NonNullishPartialRecord } from '@adminjs/design-system/types/utils/non-nullish-partial-record.type';

/**
 * @interface Theme
 */
/**
 * Color palette.
 *
 * @memberof Theme
 * @alias colors
 * @property {string} defaultText=#FFFFFF      <div style="background: #FFFFFF; height: 20px;" />
 * @property {string} sidebar=#FFFFFF      <div style="background: #FFFFFF; height: 20px;" />
 * @property {string} navbar=#FFFFFF      <div style="background: #FFFFFF; height: 20px;" />
 * @property {string} container=#FFFFFF      <div style="background: #FFFFFF; height: 20px;" />
 * @property {string} tableHover=#FFFFFF      <div style="background: #FFFFFF; height: 20px;" />
 * @property {string} tableHeader=#FFFFFF      <div style="background: #FFFFFF; height: 20px;" />
 */
const colors = {
  defaultText: '#FFFFF',
  sidebar: '#FFFFF',
  navbar: '#FFFFF',
  container: '#FFFFF',
  tableHover: '#FFFFF',
  tableHeader: '#FFFFF',
};

const details = {
  name: 'AdminJS Theme',
};

export declare interface Theme extends Omit<DefaultTheme, 'colors'> {
  details: typeof details;
  colors: typeof colors & DefaultTheme['colors'];
}

export declare type AdminJSTheme<T = Theme> = {
  [key in keyof T]?: NonNullishPartialRecord<T[key]>;
};
