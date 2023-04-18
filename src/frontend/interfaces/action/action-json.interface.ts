import type { ButtonProps, IconProps, VariantType } from '@adminjs/design-system'

import { ParsedLayoutElement } from '../../../backend/utils/layout-element-parser/index.js'

/**
 * JSON representation of an {@link Action}
 * @see Action
 * @subcategory Frontend
 */
export interface ActionJSON {
  /**
   * Unique action name
   */
  name: string;
  /**
   * Type of an action
   */
  actionType: 'record' | 'resource' | 'bulk';
  /**
   * Action icon
   */
  icon?: IconProps['icon'];
  /**
   * Action label - visible on the frontend
   */
  label: string;
  /**
   * Guarding message which should be presented in `alert()` after clicking the action button
   */
  guard?: string;
  /**
   * If action should have a filter (for resource actions)
   */
  showFilter: boolean;
  /**
   * If action should have resource actions buttons displayed above action header.
   *
   * Defaults to `true`
   */
  showResourceActions: boolean;
  /**
   * Action component. When set to false action will be invoked immediately after clicking it,
   * to put in another words: there wont be an action view
   */
  component?: string | false | null;
  /**
   * Whether given action should be seen in a drawer
   */
  showInDrawer: boolean;
  /**
   * Whether given action have an action header
   */
  hideActionHeader: boolean;
  /**
   * containerWidth passed from the action setup.
   */
  containerWidth: string | number | Array<string | number>;
  /**
   * Id of a resource to which given action belongs.
   */
  resourceId: string;

  /**
   * Parsed layout passed in {@link Action#layout}
   */
  layout: Array<ParsedLayoutElement> | null;

  /**
   * Action variant
   */
  variant: VariantType;

  /**
   * Action color
   */
  color?: ButtonProps['color'];

  /**
   * If action is nested
   */
  parent: string | null;

  /**
   * Indicates if action has action handler defined
   */
  hasHandler: boolean;

  /**
   * Any custom options passed from the {@link Action} configuration.
   */
  custom: Record<string, any>;
}
