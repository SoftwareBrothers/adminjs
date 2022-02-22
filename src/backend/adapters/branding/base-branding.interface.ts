import { ThemeOverride } from '@adminjs/design-system';

interface BaseBranding {
  /**
   * URL to a logo, or `false` if you want to hide the default one.
   */
  logo?: string | false;
  /**
   * Name of your company, which will replace "AdminJS".
   */
  companyName?: string;
  /**
   * CSS theme.
   */
  theme?: Partial<ThemeOverride>;
  /**
   * Flag indicates if `SoftwareBrothers` tiny hart icon should be visible on the bottom sidebar.
   */
  softwareBrothers?: boolean;

  /**
   * URL to a favicon
   */
  favicon?: string;
}
