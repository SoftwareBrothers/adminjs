import { BoxProps, HeaderProps, TextProps, BadgeProps, ButtonProps, LinkProps, LabelProps, IconProps } from '@adminjs/design-system';
import { PropsWithChildren } from 'react';
import { CurrentAdmin } from '../../../current-admin.interface';
export declare type LayoutElement = string | Array<string> | Array<LayoutElement> | [string, PropsWithChildren<BoxProps>] | [PropsWithChildren<BoxProps>, Array<LayoutElement>] | ['@Header', PropsWithChildren<HeaderProps>] | ['@H1', PropsWithChildren<HeaderProps>] | ['@H2', PropsWithChildren<HeaderProps>] | ['@H3', PropsWithChildren<HeaderProps>] | ['@H4', PropsWithChildren<HeaderProps>] | ['@H5', PropsWithChildren<HeaderProps>] | ['@Text', PropsWithChildren<TextProps>] | ['@Badge', PropsWithChildren<BadgeProps>] | ['@Button', PropsWithChildren<ButtonProps>] | ['@Link', PropsWithChildren<LinkProps>] | ['@Label', PropsWithChildren<LabelProps>] | ['@Icon', PropsWithChildren<IconProps>] | [string, PropsWithChildren<any>];
/**
 * Function returning Array<LayoutElement> used by {@link Action#layout}
 *
 * @return  {Array<LayoutElement>}
 * @memberof Action
 * @alias LayoutElementFunction
 */
export declare type LayoutElementFunction = (currentAdmin?: CurrentAdmin) => Array<LayoutElement>;
/**
 * It is generated from {@link Array<LayoutElement>} passed in {@link Action#layout}
 *
 * @alias ParsedLayoutElement
 * @memberof ActionJSON
 */
export declare type ParsedLayoutElement = {
    /** List of paths to properties which should be rendered by given element */
    properties: Array<string>;
    /** props passed to React component which wraps elements */
    props: PropsWithChildren<any>;
    /** Nested layout elements */
    layoutElements: Array<ParsedLayoutElement>;
    /** Component which should be used as a wrapper */
    component: string;
};
export declare const layoutElementParser: (layoutElement: LayoutElement) => ParsedLayoutElement;
export default layoutElementParser;
/**
 * @load layout-element.doc.md
 * @name LayoutElement
 * @typedef {String | Array} LayoutElement
 * @memberof Action
 * @alias LayoutElement
 */
