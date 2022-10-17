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
   * Page component. Bundled with {@link ComponentLoader}
   */
  component: string;

  /**
   * Page icon
   */
  icon?: string;
}
