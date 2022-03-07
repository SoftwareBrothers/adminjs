"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.layoutElementParser = exports.default = void 0;

/* eslint-disable max-len */

/**
 * Function returning Array<LayoutElement> used by {@link Action#layout}
 *
 * @return  {Array<LayoutElement>}
 * @memberof Action
 * @alias LayoutElementFunction
 */

/**
 * It is generated from {@link Array<LayoutElement>} passed in {@link Action#layout}
 *
 * @alias ParsedLayoutElement
 * @memberof ActionJSON
 */
const isProp = element => !!element && typeof element === 'object' && !Array.isArray(element);

const isComponentTag = layoutElement => Array.isArray(layoutElement) && typeof layoutElement[0] === 'string' && layoutElement[0].startsWith('@') && isProp(layoutElement[1]);

const hasOnlyStringsProperties = function (layoutElement) {
  return Array.isArray(layoutElement) && layoutElement.length > 0 && !isComponentTag(layoutElement) && !layoutElement.find(el => typeof el !== 'string');
};

const hasArrayOfLayoutElements = function (layoutElement) {
  return Array.isArray(layoutElement) && layoutElement.length > 0 && !layoutElement.find(element => !Array.isArray(element));
};

const hasFirstStringProperty = function (layoutElement) {
  return Array.isArray(layoutElement) && typeof layoutElement[0] === 'string' && !isComponentTag(layoutElement);
};

const getPropertyNames = layoutElement => {
  if (typeof layoutElement === 'string') {
    return [layoutElement];
  }

  if (hasOnlyStringsProperties(layoutElement)) {
    return layoutElement;
  }

  if (hasFirstStringProperty(layoutElement)) {
    return [layoutElement[0]];
  }

  return [];
};

const getInnerLayoutElements = layoutElement => {
  // only cases like [{}, layoutElement] (whatever follows props)
  if (Array.isArray(layoutElement) && isProp(layoutElement[0])) {
    return layoutElement[1];
  }

  if (hasArrayOfLayoutElements(layoutElement)) {
    return layoutElement;
  }

  return [];
};

const getComponent = layoutElement => {
  if (isComponentTag(layoutElement)) {
    return layoutElement[0].slice(1);
  }

  return 'Box';
};

const getProps = layoutElement => {
  if (Array.isArray(layoutElement) && layoutElement.length) {
    const boxProps = layoutElement.find(isProp);
    return boxProps || {};
  }

  return {};
};

const layoutElementParser = layoutElement => {
  const props = getProps(layoutElement);
  const innerLayoutElements = getInnerLayoutElements(layoutElement);
  const properties = getPropertyNames(layoutElement);
  const component = getComponent(layoutElement);
  return {
    props,
    layoutElements: innerLayoutElements.map(el => layoutElementParser(el)),
    properties,
    component
  };
};

exports.layoutElementParser = layoutElementParser;
var _default = layoutElementParser;
/**
 * @load layout-element.doc.md
 * @name LayoutElement
 * @typedef {String | Array} LayoutElement
 * @memberof Action
 * @alias LayoutElement
 */

exports.default = _default;