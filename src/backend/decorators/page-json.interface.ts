/**
 * Representing the page in the sidebar
 * @subcategory Frontend
 */
export default interface PageJSON {
  /**
   * Page name
   */
  name: string;
  /**
   * Page component. Bundled with {@link AdminBro.bundle}
   */
  component: string;
}
