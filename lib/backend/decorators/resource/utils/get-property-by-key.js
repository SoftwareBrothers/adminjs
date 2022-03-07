"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPropertyByKey = void 0;

var _findSubProperty = require("./find-sub-property");

var _pathToParts = require("../../../../utils/flat/path-to-parts");

const getPropertyByKey = (propertyPath, properties) => {
  const parts = (0, _pathToParts.pathToParts)(propertyPath, {
    skipArrayIndexes: true
  });
  const fullPath = parts[parts.length - 1];
  const property = properties[fullPath];

  if (!property) {
    // User asks for nested property (embed inside the mixed property)
    if (parts.length > 1) {
      const mixedPropertyPath = parts.find(part => properties[part] && properties[part].type() === 'mixed');

      if (mixedPropertyPath) {
        const mixedProperty = properties[mixedPropertyPath];
        const subProperty = (0, _findSubProperty.findSubProperty)(parts, mixedProperty);

        if (subProperty) {
          return subProperty;
        }
      }
    }
  }

  return property || null;
};

exports.getPropertyByKey = getPropertyByKey;