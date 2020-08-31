/* eslint-disable max-len */
import { BoxProps, HeaderProps, TextProps, BadgeProps, ButtonProps, LinkProps, LabelProps, IconProps } from '@admin-bro/design-system'
import { PropsWithChildren } from 'react'
import { CurrentAdmin } from '../../current-admin.interface'

export type LayoutElement =
  string |
  Array<string> |
  Array<LayoutElement> |
 [string, PropsWithChildren<BoxProps>] |
 [PropsWithChildren<BoxProps>, Array<LayoutElement>] |
 ['@Header', PropsWithChildren<HeaderProps>] |
 ['@H1', PropsWithChildren<HeaderProps>] |
 ['@H2', PropsWithChildren<HeaderProps>] |
 ['@H3', PropsWithChildren<HeaderProps>] |
 ['@H4', PropsWithChildren<HeaderProps>] |
 ['@H5', PropsWithChildren<HeaderProps>] |
 ['@Text', PropsWithChildren<TextProps>] |
 ['@Badge', PropsWithChildren<BadgeProps>] |
 ['@Button', PropsWithChildren<ButtonProps>] |
 ['@Link', PropsWithChildren<LinkProps>] |
 ['@Label', PropsWithChildren<LabelProps>] |
 ['@Icon', PropsWithChildren<IconProps>] |
 [string, PropsWithChildren<any>]

/**
 * Function returning Array<LayoutElement> used by {@link Action#layout}
 *
 * @return  {Array<LayoutElement>}
 * @memberof Action
 * @alias LayoutElementFunction
 */
export type LayoutElementFunction = (currentAdmin?: CurrentAdmin) => Array<LayoutElement>

/**
 * It is generated from {@link Array<LayoutElement>} passed in {@link Action#layout}
 *
 * @alias ParsedLayoutElement
 * @memberof ActionJSON
 */
export type ParsedLayoutElement = {
  /** List of paths to properties which should be rendered by given element */
  properties: Array<string>;
  /** props passed to React component which wraps elements */
  props: PropsWithChildren<any>;
  /** Nested layout elements */
  layoutElements: Array<ParsedLayoutElement>;
  /** Component which should be used as a wrapper */
  component: string;
}

const isProp = (element): boolean => !!element
  && typeof element === 'object'
  && !Array.isArray(element)

const isComponentTag = (layoutElement: LayoutElement): boolean => (
  Array.isArray(layoutElement)
    && typeof layoutElement[0] === 'string'
    && layoutElement[0].startsWith('@')
    && isProp(layoutElement[1])
)

const hasOnlyStringsProperties = function (
  layoutElement: LayoutElement,
): layoutElement is [string] {
  return Array.isArray(layoutElement)
    && layoutElement.length > 0
    && !isComponentTag(layoutElement)
    && !(layoutElement as Array<any>).find(el => (typeof el !== 'string'))
}

const hasArrayOfLayoutElements = function (
  layoutElement: LayoutElement,
): layoutElement is [LayoutElement] {
  return Array.isArray(layoutElement)
    && layoutElement.length > 0
    && !(layoutElement as Array<any>).find(element => !Array.isArray(element))
}

const hasFirstStringProperty = function (layoutElement: LayoutElement): boolean {
  return Array.isArray(layoutElement)
    && typeof layoutElement[0] === 'string'
    && !isComponentTag(layoutElement)
}

const getPropertyNames = (layoutElement: LayoutElement): Array<string> => {
  if (typeof layoutElement === 'string') { return [layoutElement] }

  if (hasOnlyStringsProperties(layoutElement)) {
    return layoutElement
  }
  if (hasFirstStringProperty(layoutElement)) {
    return [layoutElement[0]] as Array<string>
  }
  return []
}

const getInnerLayoutElements = (layoutElement: LayoutElement): Array<LayoutElement> => {
  // only cases like [{}, layoutElement] (whatever follows props)
  if (Array.isArray(layoutElement)
    && isProp(layoutElement[0])) {
    return layoutElement[1] as Array<LayoutElement>
  }
  if (hasArrayOfLayoutElements(layoutElement)) {
    return layoutElement
  }
  return []
}

const getComponent = (layoutElement: LayoutElement): string => {
  if (isComponentTag(layoutElement)) {
    return (layoutElement[0] as string).slice(1)
  }
  return 'Box'
}

const getProps = (layoutElement: LayoutElement): BoxProps => {
  if (Array.isArray(layoutElement) && layoutElement.length) {
    const boxProps = (layoutElement as Array<any>).find(isProp)
    return boxProps as unknown as BoxProps || {}
  }
  return {}
}

const layoutElementParser = (layoutElement: LayoutElement): ParsedLayoutElement => {
  const props = getProps(layoutElement)
  const innerLayoutElements = getInnerLayoutElements(layoutElement)
  const properties = getPropertyNames(layoutElement)
  const component = getComponent(layoutElement)

  return {
    props,
    layoutElements: innerLayoutElements.map(el => layoutElementParser(el)),
    properties,
    component,
  }
}

export default layoutElementParser


/**
 * {@link LayoutElement} is used to change the default layout of edit, show and new {@link Action actions}.
 * You define the layout as an {@link Array<LayoutElement>} and AdminBro renders it with React components.
 *
 * You don't have to know React to create usable Layout for you actions but be sure
 * to take a look at the possible **Props** which can be used to style the components.
 * The most often used props are {@link BoxProps}, because {@link Box} is the default wrapper.
 *
 * ### Available values for a {@link LayoutElement} type
 *
 * To {@link Action#layout } you have to pass an {@link Array<LayoutElement>}. Where each
 * {@link LayoutElement} could have a different type defining its position and purpose.
 *
 * ### Type definition
 *
 * Those are available types for {@link LayoutElement}
 *
 * | Type    | Purpose | Example |
 * |---------------|--------------------------------------------------------------|------------------|
 * | string        | It will be changed to the property in vertical layout        | `layout: ['name']` |
 * | {@link Array<string>} |  It will be changed to the properties in vertical layout     | `layout: [['name', 'surname']]` |
 * | [string, {@link BoxProps}] | property wrapped by {@link Box} component with {@link BoxProps} | `layout: [['name', {width: 1/2}]]` |
 * | [{@link BoxProps}, {@link Array<LayoutElement>}] | Creates a Box and nest all the child LayoutElements inside. | `layout: [[{width: 1/2}, ['name', 'surname']]]` |
 * | {@link Array<LayoutElement>} | For grouping LayoutElements inside a wrapper          | `layout: [['name', {mt: 'xl'}], ['surname', , {ml: 'xl'}]]` |
 * | [@ComponentName, PropsWithChildren<ComponentProps>] | if you precede first item with "@" it will create component of this name | `layout: [['@Header', {children: 'User Data'}]]` |
 *
 * ### Examples
 *
 * Let say you have following properties in your database: `companyName`, `email`, `address` and `companySize`
 *
 * #### 1. The simplest horizontal layout:
 *
 * ```
 * const layout = [
 *  'companyName',
 *  'email',
 *  'address',
 *  'companySize',
 * ]
 * ```
 *
 * generates:
 *
 * <img src='./images/layout1.png' style="margin-bottom: 20px">
 *
 * #### 2. Now Wrap everything with a {@link Box} of `2/3` max width and horizontal margin (mx) set to auto. This will center all inputs
 *
 * ```
 * const layout = [
 *   [{ width: 2 / 3, mx: 'auto' }, [
 *     'companyName',
 *     'email',
 *     'address',
 *     'companySize',
 *   ]],
 * ]
 * ```
 *
 * generates:
 *
 * <img src='./images/layout2.png'>
 *
 * > Hint: you can also pass an array to `width` to define how it will behave in a different responsive breakpoints.
 *
 * #### 3. Add headers between sections
 *
 * ```
 * const layout = [
 *   [{ width: 2 / 3, mx: 'auto' }, [
 *     ['@H3', { children: 'Company data' }],
 *     'companyName',
 *     'companySize',
 *     ['@H3', { children: 'Contact Info' }],
 *     'email',
 *     'address',
 *   ]],
 * ]
 * ```
 *
 * generates:
 *
 * <img src='./images/layout3.png' style="margin-bottom: 20px" >
 *
 * > To inject content inside the given Component pass children props to it.
 *
 * #### 4. Make email and address 50% width
 *
 * We will wrap them with a {@link Box} (default component) which is a flex.
 * Then we will have to wrap also each of them with extra box to define paddings.
 *
 * I will also align to left top section that by removing `{ mx: auto }` and changing width to `1 / 2`.
 *
 * ```
 * const layout = [{ width: 1 / 2 }, [
 *     ['@H3', { children: 'Company data' }],
 *     'companyName',
 *     'companySize',
 *   ]],
 *   [
 *     ['@H3', { children: 'Contact Info' }],
 *     [{ flexDirection: 'row', flex: true }, [
 *       ['email', { pr: 'default', flexGrow: 1 }],
 *       ['address', { flexGrow: 1 }],
 *     ]],
 *   ],
 * ]
 * ```
 *
 * generates:
 *
 * <img src='./images/layout4.png' style="margin-bottom: 20px">
 *
 * #### 5. Lastly, take a look at the example with a function instead of {@link LayoutElement}.
 *
 * ```
 * const layout = currentAdmin => ([
 *  ['@MessageBox', {
 *    message: `Welcome ${currentAdmin && currentAdmin.email}`,
 *    children: 'On this page yo can do whatever you like',
 *    variant: 'info',
 *    mb: 'xxl',
 *  }],
 *  [
 *    'companyName',
 *    'companySize',
 *    'email',
 *    'address',
 *  ],
 * ])
 * ```
 *
 * Generates following **Show** page:
 *
 * <img src='./images/layout5.png'>
 *
 * @name LayoutElement
 * @typedef {String | Array} LayoutElement
 * @memberof Action
 * @alias LayoutElement
 */
