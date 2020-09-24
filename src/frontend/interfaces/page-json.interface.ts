/**
 * Representing the page in the sidebar
 * @subcategory Frontend
 */
interface PageJSON {
  /**
   * Page name
   */
  name: string;
  /**
   * Page component. Bundled with {@link AdminBro.bundle}
   */
  component: string;

  /**
   * Page icon
   */
  icon?: string;
}

export {
  PageJSON as default,
  PageJSON,
}
