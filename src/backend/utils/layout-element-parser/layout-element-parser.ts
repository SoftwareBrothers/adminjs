/* eslint-disable max-len */
import {
  BoxProps,
  HeaderProps,
  TextProps,
  BadgeProps,
  ButtonProps,
  LinkProps,
  LabelProps,
  IconProps,
} from '@admin-bro/design-system'
import { PropsWithChildren } from 'react'
import { CurrentAdmin } from '../../../current-admin.interface'

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

export const layoutElementParser = (layoutElement: LayoutElement): ParsedLayoutElement => {
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
 * @load layout-element.doc.md
 * @name LayoutElement
 * @typedef {String | Array} LayoutElement
 * @memberof Action
 * @alias LayoutElement
 */
