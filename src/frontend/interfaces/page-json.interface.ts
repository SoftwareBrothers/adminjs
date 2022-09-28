import { IsFunction } from 'src/backend'
import { ActionJSON } from './action'

/**
 * Representing the page in the sidebar
 * @subcategory Frontend
 */
export interface PageJSON {
  /**
   * Page name
   */
  name: string;
  /**
   * Page component. Bundled with {@link AdminJS.bundle}
   */
  component: string;

  /**
   * Page icon
   */
  icon?: string;

  /**
   * Page visibility
   */
  isVisible: boolean | IsFunction;
}
