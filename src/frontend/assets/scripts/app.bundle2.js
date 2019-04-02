(function (React, ReactDOM, reactRedux, reactRouterDom, axios, redux) {
  'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;
  axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

  function _typeof(obj) {
    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return _typeof2(obj);
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized = _assertThisInitialized;

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
      return call;
    }

    return assertThisInitialized(self);
  }

  var possibleConstructorReturn = _possibleConstructorReturn;

  var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
  });

  var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
  });

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }

  var inherits = _inherits;

  var SidebarHeader =
  /*#__PURE__*/
  function (_React$PureComponent) {
    inherits(SidebarHeader, _React$PureComponent);

    function SidebarHeader() {
      classCallCheck(this, SidebarHeader);

      return possibleConstructorReturn(this, getPrototypeOf(SidebarHeader).apply(this, arguments));
    }

    createClass(SidebarHeader, [{
      key: "render",
      value: function render() {
        return React.createElement("div", {
          className: "sidebar-wrapper"
        }, React.createElement("div", {
          className: "hamburger hidden"
        }, React.createElement("i", {
          className: "fas fa-bars fa-2x"
        })), React.createElement("a", {
          href: "(href=h.dashboardUrl())",
          className: "sidebar-brand"
        }, React.createElement("img", {
          src: this.props.branding.logo,
          alt: this.props.branding.companyName,
          height: "35px",
          width: "35px"
        }), React.createElement("span", null, this.props.branding.companyName)));
      }
    }]);

    return SidebarHeader;
  }(React.PureComponent);

  var SidebarResource =
  /*#__PURE__*/
  function (_React$PureComponent) {
    inherits(SidebarResource, _React$PureComponent);

    function SidebarResource() {
      classCallCheck(this, SidebarResource);

      return possibleConstructorReturn(this, getPrototypeOf(SidebarResource).apply(this, arguments));
    }

    createClass(SidebarResource, [{
      key: "render",
      value: function render() {
        return React.createElement("li", null, React.createElement(reactRouterDom.Link, {
          to: this.props.resource.href
        }, this.props.resource.name));
      }
    }]);

    return SidebarResource;
  }(React.PureComponent);

  var SidebarParent =
  /*#__PURE__*/
  function (_React$PureComponent) {
    inherits(SidebarParent, _React$PureComponent);

    function SidebarParent() {
      classCallCheck(this, SidebarParent);

      return possibleConstructorReturn(this, getPrototypeOf(SidebarParent).apply(this, arguments));
    }

    createClass(SidebarParent, [{
      key: "render",
      value: function render() {
        return React.createElement("li", null, React.createElement("span", {
          className: "menu-item-main"
        }, React.createElement("i", {
          className: this.props.parent.icon
        }), this.props.parent.name), React.createElement("ul", {
          className: "menu-list dropdown-list"
        }, this.props.parent.resources.map(function (resource) {
          return React.createElement(SidebarResource, {
            resource: resource,
            key: resource.id
          });
        })));
      }
    }]);

    return SidebarParent;
  }(React.PureComponent);

  var SidebarFooter =
  /*#__PURE__*/
  function (_React$PureComponent) {
    inherits(SidebarFooter, _React$PureComponent);

    function SidebarFooter() {
      classCallCheck(this, SidebarFooter);

      return possibleConstructorReturn(this, getPrototypeOf(SidebarFooter).apply(this, arguments));
    }

    createClass(SidebarFooter, [{
      key: "render",
      value: function render() {
        return React.createElement("div", {
          className: "sidebar-footer"
        }, React.createElement("p", {
          className: "sidebar-created-by"
        }, "With", React.createElement("i", {
          className: "fas fa-heart"
        }), "by", React.createElement("a", {
          href: "http://softwarebrothers.co",
          target: "_blank"
        }, "SoftwareBrothers")));
      }
    }]);

    return SidebarFooter;
  }(React.PureComponent);

  var groupResources = function groupResources(resources) {
    var map = resources.reduce(function (memo, resource) {
      if (memo[resource.parent.name]) {
        memo[resource.parent.name].push(resource);
      } else {
        memo[resource.parent.name] = [resource];
      }

      memo[resource.parent.name].icon = resource.parent.icon;
      return memo;
    }, {});
    return Object.keys(map).map(function (parentName) {
      return {
        name: parentName,
        icon: map[parentName].icon,
        resources: map[parentName]
      };
    });
  };

  var Sidebar =
  /*#__PURE__*/
  function (_React$Component) {
    inherits(Sidebar, _React$Component);

    function Sidebar() {
      classCallCheck(this, Sidebar);

      return possibleConstructorReturn(this, getPrototypeOf(Sidebar).apply(this, arguments));
    }

    createClass(Sidebar, [{
      key: "render",
      value: function render() {
        return React.createElement("aside", {
          className: "sidebar"
        }, React.createElement("div", {
          className: "sidebar-main"
        }, React.createElement("div", {
          className: "sidebar-content"
        }, React.createElement("div", {
          className: "sidebar-top"
        }, React.createElement(SidebarHeader, {
          branding: this.props.branding
        }), React.createElement("div", {
          className: "sidebar-navigation",
          style: {
            display: 'block'
          }
        }, React.createElement("p", {
          className: "menu-label"
        }, "Navigation"), React.createElement("ul", {
          className: "menu-list"
        }, groupResources(this.props.resources).map(function (parent) {
          return React.createElement(SidebarParent, {
            parent: parent,
            key: parent.name
          });
        })))), this.props.branding.softwareBrothers && React.createElement(SidebarFooter, null))));
      }
    }]);

    return Sidebar;
  }(React.Component);

  var mapStateToProps = function mapStateToProps(state) {
    return {
      resources: state.resources,
      branding: state.branding
    };
  };

  var Sidebar$1 = reactRedux.connect(mapStateToProps)(Sidebar);

  var Topbar =
  /*#__PURE__*/
  function (_React$Component) {
    inherits(Topbar, _React$Component);

    function Topbar() {
      classCallCheck(this, Topbar);

      return possibleConstructorReturn(this, getPrototypeOf(Topbar).apply(this, arguments));
    }

    createClass(Topbar, [{
      key: "render",
      value: function render() {
        var _this = this;

        var LoggedIn = function LoggedIn(session) {
          return React.createElement("div", {
            className: "navbar-item has-dropdown is-hoverable navbar-user"
          }, React.createElement("a", {
            className: "navbar-link"
          }, session.email, React.createElement("img", {
            src: "https://api.adorable.io/avatars/24/softwarebrothers.png"
          })), React.createElement("div", {
            className: "navbar-dropdown"
          }, React.createElement("a", {
            className: "navbar-item",
            href: _this.props.paths.logoutPath
          }, React.createElement("span", {
            className: "fas fa-sign-out-alt"
          }), "Sign out")));
        };

        return React.createElement("nav", {
          className: "navbar"
        }, React.createElement("div", {
          className: "hamburger hidden"
        }, React.createElement("i", {
          className: "hamburger-icon fas fa-bars fa-2x"
        })), React.createElement("div", {
          className: "navbar-menu"
        }, React.createElement("div", {
          className: "navbar-start"
        }), React.createElement("div", {
          className: "navbar-end"
        }, this.props.session && this.props.session.email && LoggedIn(this.props.session))));
      }
    }]);

    return Topbar;
  }(React.Component);

  var mapStateToProps$1 = function mapStateToProps(state) {
    return {
      session: state.session,
      paths: state.paths
    };
  };

  var Topbar$1 = reactRedux.connect(mapStateToProps$1)(Topbar);

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  var arrayWithoutHoles = _arrayWithoutHoles;

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  var iterableToArray = _iterableToArray;

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var nonIterableSpread = _nonIterableSpread;

  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
  }

  var toConsumableArray = _toConsumableArray;

  /**
   * Collection of helper methods available in the views
   */
  var ViewHelpers =
  /*#__PURE__*/
  function () {
    function ViewHelpers(_ref) {
      var options = _ref.options;

      classCallCheck(this, ViewHelpers);

      this.options = options;
      /**
       * Branding options passed by the user.
       * `branding` subset of {@link AdminBroOptions}
       * @type {Object}
       */

      this.branding = this.options.branding;
      /**
       * Custom assets options passed by the user.
       * `assets` subset of {@link AdminBroOptions}
       * @type {Object}
       */

      this.customAssets = this.options.assets;
    }
    /**
     * @todo handle Scripts and Styles in resources:
     *
     * ```
     * for script in resource.decorate().customHeadScripts().scripts
     *   script(defer src=script)
     * for style in resource.decorate().customHeadScripts().styles
     *   link(rel="stylesheet" href=style)
     * ```
     */


    createClass(ViewHelpers, [{
      key: "headScripts",
      value: function headScripts() {
        return ['https://use.fontawesome.com/releases/v5.3.1/js/all.js', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js'].concat(toConsumableArray(this.customAssets && this.customAssets.styles || []), [this.assetPath('app.bundle2.js')]).map(function (s) {
          return "<script src=\"".concat(s, "\"></script>");
        });
      }
    }, {
      key: "headStyles",
      value: function headStyles() {
        return ['https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.1/css/bulma.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/font-mfizz/2.4.1/font-mfizz.min.css', 'https://fonts.googleapis.com/css?family=Roboto:400,700'].concat(toConsumableArray(this.customAssets && this.customAssets.scripts || []), [this.assetPath('style.min.css')]).map(function (l) {
          return "<link rel=\"stylesheet\" type=\"text/css\" href=\"".concat(l, "\">");
        });
      }
      /**
       * Returns query param path
       * @param  {Object} query object with query params
       * @param  {String} key query param name
       */

    }, {
      key: "getQueryParamPath",
      value: function getQueryParamPath(query, key) {
        var value = query[key];
        return _typeof_1(value) === 'object' ? this.getQueryPath(value) : "".concat(key, "=").concat(value);
      }
      /**
       * Returns path including all query params
       * @param  {Object} query object used to build query string
       */

    }, {
      key: "getQueryPath",
      value: function getQueryPath(query) {
        var _this = this;

        var queryPath = [];
        Object.keys(query).forEach(function (key) {
          if (query[key]) {
            queryPath.push(_this.getQueryParamPath(query, key));
          }
        });
        return queryPath.join('&');
      }
      /**
       * To each related path adds rootPath passed by the user, as well as a query string
       * @param  {String[]} paths   list of parts of the url
       * @param  {Object}   query object used to build query string
       * @return {String}       path
       */

    }, {
      key: "urlBuilder",
      value: function urlBuilder(paths, query) {
        var rootPath = this.options.rootPath;
        var url = "".concat(rootPath, "/").concat(paths.join('/'));

        if (query) {
          url = "".concat(url, "?").concat(this.getQueryPath(query));
        }

        return url;
      }
      /**
       * Returns login URL
       * @return {String}
       */

    }, {
      key: "loginUrl",
      value: function loginUrl() {
        return this.options.loginPath;
      }
      /**
       * Returns logout URL
       * @return {String}
       */

    }, {
      key: "logoutUrl",
      value: function logoutUrl() {
        return this.options.logoutPath;
      }
      /**
       * Returns URL for the dashboard
       * @return {String}
       */

    }, {
      key: "dashboardUrl",
      value: function dashboardUrl() {
        return this.options.rootPath;
      }
      /**
       * Returns URL for the list view for a given resource
       * @param {BaseResource} resource
       * @param {Object} [query]
       * @return {String}
       */

    }, {
      key: "listUrl",
      value: function listUrl(resourceId, query) {
        return this.urlBuilder(['resources', resourceId], query);
      }
    }, {
      key: "resourceActionUrl",
      value: function resourceActionUrl(resourceId, actionName) {
        return this.urlBuilder(['resources', resourceId, actionName]);
      }
    }, {
      key: "recordActionUrl",
      value: function recordActionUrl(resourceId, actionName, recordId) {
        return this.urlBuilder(['resources', resourceId, 'record', recordId, actionName]);
      }
    }, {
      key: "apiSearch",
      value: function apiSearch(resource) {
        return this.urlBuilder(['api', 'resources', resource.id(), 'search']);
      }
      /**
       * Returns absolute path to a given asset
       * @param  {String} asset
       * @return {String}
       */

    }, {
      key: "assetPath",
      value: function assetPath(asset) {
        return this.urlBuilder(['frontend', 'assets', asset]);
      }
    }]);

    return ViewHelpers;
  }();

  var viewHelpers = ViewHelpers;

  var Dashboard =
  /*#__PURE__*/
  function (_React$Component) {
    inherits(Dashboard, _React$Component);

    function Dashboard() {
      classCallCheck(this, Dashboard);

      return possibleConstructorReturn(this, getPrototypeOf(Dashboard).apply(this, arguments));
    }

    createClass(Dashboard, [{
      key: "render",
      value: function render() {
        return React.createElement("div", null, "Dashboard");
      }
    }]);

    return Dashboard;
  }(React.Component);

  var mapStateToProps$2 = function mapStateToProps(state) {
    return {
      paths: state.paths
    };
  };

  var Dashboard$1 = reactRedux.connect(mapStateToProps$2)(Dashboard);

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  var objectSpread = _objectSpread;

  //   nav.breadcrumb(aria-label="breadcrumbs")
  //     ul
  //       if resource
  //         li(class={ 'is-active' : !record })
  //           a(href=h.listUrl(resource))=resource.decorate().getResourceName()
  //       if record && showAction
  //         li(class={ 'is-active' : !actionName })
  //           a(href=h.recordActionUrl(resource, showAction, record))= resource.decorate().titleOf(record)
  //       if actionName
  //         li.is-active
  //           a= actionName

  var Breadcrumbs =
  /*#__PURE__*/
  function (_React$PureComponent) {
    inherits(Breadcrumbs, _React$PureComponent);

    function Breadcrumbs() {
      classCallCheck(this, Breadcrumbs);

      return possibleConstructorReturn(this, getPrototypeOf(Breadcrumbs).apply(this, arguments));
    }

    createClass(Breadcrumbs, [{
      key: "renderResource",
      value: function renderResource() {
        return React.createElement("li", null, React.createElement(reactRouterDom.Link, {
          to: this.props.resource.href,
          className: this.props.record && 'is-active'
        }, this.props.resource.name));
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement("nav", {
          className: "breadcrumb",
          "aria-label": "breadcrumbs"
        }, React.createElement("ul", null, this.renderResource()));
      }
    }]);

    return Breadcrumbs;
  }(React.PureComponent);

  var ResourceActionBtn =
  /*#__PURE__*/
  function (_React$PureComponent) {
    inherits(ResourceActionBtn, _React$PureComponent);

    function ResourceActionBtn() {
      classCallCheck(this, ResourceActionBtn);

      return possibleConstructorReturn(this, getPrototypeOf(ResourceActionBtn).apply(this, arguments));
    }

    createClass(ResourceActionBtn, [{
      key: "render",
      value: function render() {
        return React.createElement("div", {
          className: "control"
        }, React.createElement(reactRouterDom.Link, {
          to: this.props.action.href,
          className: "button is-primary"
        }, React.createElement("span", {
          className: "icon"
        }, React.createElement("i", {
          className: this.props.action.icon
        })), React.createElement("div", {
          className: "btn-text"
        }, this.props.action.label)));
      }
    }]);

    return ResourceActionBtn;
  }(React.PureComponent);

  var RecordInList =
  /*#__PURE__*/
  function (_React$PureComponent) {
    inherits(RecordInList, _React$PureComponent);

    function RecordInList() {
      classCallCheck(this, RecordInList);

      return possibleConstructorReturn(this, getPrototypeOf(RecordInList).apply(this, arguments));
    }

    createClass(RecordInList, [{
      key: "render",
      value: function render() {
        var resource = this.props.resource;
        var record = this.props.record;
        var paths = this.props.paths;
        return React.createElement("tr", null, resource.listProperties.map(function (property) {
          return React.createElement("td", null, record.params[property.name]);
        }));
      }
    }]);

    return RecordInList;
  }(React.PureComponent);

  var RecordsTable =
  /*#__PURE__*/
  function (_React$Component) {
    inherits(RecordsTable, _React$Component);

    function RecordsTable() {
      classCallCheck(this, RecordsTable);

      return possibleConstructorReturn(this, getPrototypeOf(RecordsTable).apply(this, arguments));
    }

    createClass(RecordsTable, [{
      key: "renderPropertyHeader",
      value: function renderPropertyHeader(property) {
        return React.createElement("th", {
          key: property.name
        }, React.createElement("div", {
          className: "text-small"
        }, property.label));
      }
    }, {
      key: "render",
      value: function render() {
        var _this = this;

        var resource = this.props.resource;
        var paths = this.props.paths;
        var records = this.props.records;
        console.log(records);
        return React.createElement("table", {
          className: "table is-fullwidth"
        }, React.createElement("thead", null, React.createElement("tr", {
          key: "header"
        }, resource.listProperties.map(function (property) {
          return _this.renderPropertyHeader(property);
        }))), React.createElement("tbody", null, records.map(function (record) {
          return React.createElement(RecordInList, {
            record: record,
            resource: resource,
            paths: paths
          });
        })));
      }
    }]);

    return RecordsTable;
  }(React.Component);

  var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    exports.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] =
      GeneratorFunction.displayName = "GeneratorFunction";

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        prototype[method] = function(arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList)
      );

      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    Gp[toStringTagSymbol] = "Generator";

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    Gp[iteratorSymbol] = function() {
      return this;
    };

    Gp.toString = function() {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;

  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    module.exports
  ));

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
  });

  var regenerator = runtime_1;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var asyncToGenerator = _asyncToGenerator;

  var ApiClient =
  /*#__PURE__*/
  function () {
    function ApiClient(baseURL) {
      classCallCheck(this, ApiClient);

      this.client = axios.create({
        baseURL: baseURL
      });
    }

    createClass(ApiClient, [{
      key: "getRecords",
      value: function () {
        var _getRecords = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee(resourceId, query) {
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", this.client.get("/api/resources/".concat(resourceId)));

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function getRecords(_x, _x2) {
          return _getRecords.apply(this, arguments);
        }

        return getRecords;
      }()
    }]);

    return ApiClient;
  }();

  var Resource =
  /*#__PURE__*/
  function (_React$PureComponent) {
    inherits(Resource, _React$PureComponent);

    function Resource(props) {
      var _this;

      classCallCheck(this, Resource);

      _this = possibleConstructorReturn(this, getPrototypeOf(Resource).call(this, props));
      var baseUrl = [window.location.origin, _this.props.paths.rootPath].join('');
      _this.api = new ApiClient(baseUrl);
      _this.resource = _this.props.resources.find(function (r) {
        return r.id === _this.props.match.params.resourceId;
      });
      _this.state = {
        loading: true,
        records: [],
        page: 1,
        perPage: 20,
        total: 0
      };
      return _this;
    }

    createClass(Resource, [{
      key: "_fetchData",
      value: function _fetchData(resourceId) {
        var _this2 = this;

        this.resource = this.props.resources.find(function (r) {
          return r.id === resourceId;
        });
        this.api.getRecords(this.resource.id).then(function (response) {
          console.log(response);

          _this2.setState({
            loading: false,
            records: response.data.records,
            page: response.data.meta.page,
            perPage: response.data.meta.perPage,
            total: response.data.meta.total
          });
        });
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this._fetchData(this.props.match.params.resourceId);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (this.props.match.params.resourceId !== prevProps.match.params.resourceId) {
          this._fetchData(this.props.match.params.resourceId);
        }
      }
    }, {
      key: "renderActionBtn",
      value: function renderActionBtn(action) {
        var h = new viewHelpers({
          options: this.props.paths
        });

        var actionWithHref = objectSpread({
          href: h.resourceActionUrl(this.resourceId, action.name)
        }, action);

        return React.createElement(ResourceActionBtn, {
          action: actionWithHref,
          key: action.name
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        return React.createElement("section", {
          className: "table-list"
        }, React.createElement(Breadcrumbs, {
          resource: this.resource
        }), React.createElement("div", {
          className: "level"
        }, React.createElement("div", {
          className: "title"
        }, this.resource.name), React.createElement("div", {
          className: "toolbar"
        }, React.createElement("div", {
          className: "field is-grouped"
        }, this.resource.resourceActions.map(function (action) {
          return _this3.renderActionBtn(action);
        }), React.createElement("div", {
          className: "control"
        }, React.createElement("div", {
          className: "button is-primary is-transparent filters-open"
        }, React.createElement("span", {
          className: "icon"
        }, React.createElement("i", {
          className: "fas fa-sliders-h"
        })), React.createElement("div", {
          className: "btn-text"
        }, "Filter")))))), React.createElement("div", {
          className: "border-box"
        }, React.createElement(RecordsTable, {
          resource: this.resource,
          records: this.state.records,
          paths: this.props.paths
        })));
      }
    }]);

    return Resource;
  }(React.PureComponent);

  var mapStateToProps$3 = function mapStateToProps(state) {
    return {
      paths: state.paths,
      resources: state.resources
    };
  };

  var Resource$1 = reactRedux.connect(mapStateToProps$3)(Resource);

  var ResourceAction =
  /*#__PURE__*/
  function (_React$Component) {
    inherits(ResourceAction, _React$Component);

    function ResourceAction() {
      classCallCheck(this, ResourceAction);

      return possibleConstructorReturn(this, getPrototypeOf(ResourceAction).apply(this, arguments));
    }

    createClass(ResourceAction, [{
      key: "render",
      value: function render() {
        return React.createElement("div", null, "ResourceAction");
      }
    }]);

    return ResourceAction;
  }(React.Component);

  var mapStateToProps$4 = function mapStateToProps(state) {
    return {
      paths: state.paths
    };
  };

  var RecordAction = reactRedux.connect(mapStateToProps$4)(ResourceAction);

  var App =
  /*#__PURE__*/
  function (_React$Component) {
    inherits(App, _React$Component);

    function App() {
      classCallCheck(this, App);

      return possibleConstructorReturn(this, getPrototypeOf(App).apply(this, arguments));
    }

    createClass(App, [{
      key: "render",
      value: function render() {
        var h = new viewHelpers({
          options: this.props.paths
        });
        return React.createElement("div", {
          className: "columns container-main"
        }, React.createElement(Sidebar$1, null), React.createElement("div", {
          className: "column content-wrapper"
        }, React.createElement(Topbar$1, null), React.createElement(reactRouterDom.Switch, null, React.createElement(reactRouterDom.Route, {
          path: h.dashboardUrl(),
          exact: true,
          component: Dashboard$1
        }), React.createElement(reactRouterDom.Route, {
          path: h.listUrl(':resourceId'),
          exact: true,
          component: Resource$1
        }), React.createElement(reactRouterDom.Route, {
          path: h.resourceActionUrl(':resourceId', ':actionName'),
          exact: true,
          component: RecordAction
        }), React.createElement(reactRouterDom.Route, {
          path: h.recordActionUrl(':resourceId', ':recordId', ':actionName'),
          exact: true,
          component: RecordAction
        }))));
      }
    }]);

    return App;
  }(React.Component);

  var mapStateToProps$5 = function mapStateToProps(state) {
    return {
      paths: state.paths
    };
  };

  var App$1 = reactRedux.connect(mapStateToProps$5)(App);

  var resourcesReducer = function resourcesReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'RESOURCES_INITIALIZE':
        return action.data;

      default:
        return state;
    }
  };

  var brandingReducer = function brandingReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'BRANDING_INITIALIZE':
        return action.data;

      default:
        return state;
    }
  };

  var pathsReducer = function pathsReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'PATHS_INITIALIZE':
        return action.data;

      default:
        return state;
    }
  };

  var sessionReducer = function sessionReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'SESSION_INITIALIZE':
        return action.data;

      default:
        return state;
    }
  };

  var reducer = redux.combineReducers({
    resources: resourcesReducer,
    branding: brandingReducer,
    paths: pathsReducer,
    session: sessionReducer
  });
  var createStore = (function () {
    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    console.log(initialState);
    return redux.createStore(reducer, initialState);
  });

  // import '@babel/polyfill'
  var store = createStore(window.REDUX_STATE);
  var jsx = React.createElement(reactRedux.Provider, {
    store: store
  }, React.createElement(reactRouterDom.BrowserRouter, null, React.createElement(App$1, null)));
  var app = document.getElementById('app');
  ReactDOM.hydrate(jsx, app);

}(React, ReactDOM, ReactRedux, ReactRouterDOM, axios, Redux));
