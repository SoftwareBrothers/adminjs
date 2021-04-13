export type OverridableComponent =
  | 'LoggedIn'
  | 'NoRecords'
  | 'SidebarResourceSection'
  | 'SidebarFooter'
  | 'SidebarBranding'
  | 'Sidebar';

/**
 * Name of the components which can be overridden by AdminBro.bundle. It currently following
 * components can be override:
 *
 * - LoggedIn
 * - NoRecords
 * - Sidebar
 * - SidebarResourceSection
 * - SidebarFooter
 * - SidebarBranding
 * @new in version 3.3
 * @memberof AdminBro
 * @alias OverridableComponent
 * @typedef {Union} OverridableComponent
 */
