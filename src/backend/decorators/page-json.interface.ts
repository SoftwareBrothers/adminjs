import { AdminPage } from '../../admin-bro-options.interface'

/**
 * Representing the page in the sidebar
 */
export default interface PageJSON {
  /**
   * Page name
   */
  name: string;
  /**
   * Page label
   */
  label: string;
  /**
   * Page component. Bundled with {@link AdminBro.bundle}
   */
  component: AdminPage['component'];
}
