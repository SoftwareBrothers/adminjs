var AdminBro = (function (React, reactRedux, reactRouterDom, styled, PropTypes$1, axios, redux, reactDom) {
	'use strict';

	var React__default = 'default' in React ? React['default'] : React;
	var styled__default = 'default' in styled ? styled['default'] : styled;
	PropTypes$1 = PropTypes$1 && PropTypes$1.hasOwnProperty('default') ? PropTypes$1['default'] : PropTypes$1;
	axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;
	var reactDom__default = 'default' in reactDom ? reactDom['default'] : reactDom;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

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

	let globalAny = {};

	try {
	  globalAny = window;
	} catch (error) {
	  if (error.message !== 'window is not defined') {
	    throw error;
	  }
	}
	/**
	 * Params for a record action
	 */


	/**
	 * Collection of helper methods available in the views
	 */
	class ViewHelpers {
	  constructor({
	    options
	  } = {}) {
	    let opts = options || globalAny.REDUX_STATE && globalAny.REDUX_STATE.paths;
	    opts = opts || {
	      rootPath: '/admin'
	    }; // when ViewHelpers are used on the frontend, paths are taken from global Redux State

	    this.options = opts;
	  }
	  /**
	   * To each related path adds rootPath passed by the user, as well as a query string
	   * @param  {Array<string>} paths   list of parts of the url
	   * @return {string}       path
	   */


	  urlBuilder(paths) {
	    const {
	      rootPath
	    } = this.options;
	    return `${rootPath}/${paths.join('/')}`;
	  }
	  /**
	   * Returns login URL
	   * @return {string}
	   */


	  loginUrl() {
	    return this.options.loginPath;
	  }
	  /**
	   * Returns logout URL
	   * @return {string}
	   */


	  logoutUrl() {
	    return this.options.logoutPath;
	  }

	  listUrl({
	    resourceId
	  }) {
	    console.warn(`
      Deprecation: this "ViewHelpers#listUrl" will be removed in the next versions.
      Please use "resourceActionUrl({ resourceId, actionName: 'list'})"
      instead`);
	    return this.resourceActionUrl({
	      resourceId,
	      actionName: 'list'
	    });
	  }
	  /**
	   * Returns URL for the dashboard
	   * @return {string}
	   */


	  dashboardUrl() {
	    return this.options.rootPath;
	  }
	  /**
	   * Returns resourceAction url
	   *
	   * @param   {object}  options
	   * @param   {string}  options.resourceId
	   * @param   {string}  options.actionName
	   *
	   * @return  {string}
	   */


	  resourceActionUrl({
	    resourceId,
	    actionName
	  }) {
	    return this.urlBuilder(['resources', resourceId, 'actions', actionName]);
	  }
	  /**
	   * Returns recordAction url
	   *
	   * @param   {object}  options
	   * @param   {string}  options.resourceId
	   * @param   {string}  options.recordId
	   * @param   {string}  options.actionName
	   *
	   * @return  {string}
	   */


	  recordActionUrl({
	    resourceId,
	    recordId,
	    actionName
	  }) {
	    return this.urlBuilder(['resources', resourceId, 'records', recordId, actionName]);
	  }
	  /**
	   * Returns absolute path to a given asset.
	   * @private
	   *
	   * @param  {string} asset
	   * @return {string}
	   */


	  assetPath(asset) {
	    return this.urlBuilder(['frontend', 'assets', asset]);
	  }

	}

	const pathsType = PropTypes$1.shape({
	  loginPath: PropTypes$1.string.isRequired,
	  rootPath: PropTypes$1.string.isRequired,
	  logoutPath: PropTypes$1.string.isRequired
	});
	const sessionType = PropTypes$1.shape({
	  email: PropTypes$1.string
	});
	const brandingType = PropTypes$1.shape({
	  logo: PropTypes$1.string.isRequired,
	  companyName: PropTypes$1.string.isRequired,
	  softwareBrothers: PropTypes$1.bool.isRequired
	});
	const propertyTypeShape = {
	  isId: PropTypes$1.bool.isRequired,
	  isSortable: PropTypes$1.bool.isRequired,
	  isTitle: PropTypes$1.bool.isRequired,
	  label: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.number]).isRequired,
	  name: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.number]).isRequired,
	  position: PropTypes$1.number.isRequired,
	  type: PropTypes$1.string.isRequired,
	  availableValues: PropTypes$1.arrayOf(PropTypes$1.shape({
	    title: PropTypes$1.string,
	    value: PropTypes$1.string
	  })),
	  reference: PropTypes$1.oneOfType([PropTypes$1.string]),
	  isArray: PropTypes$1.boolean
	};
	const propertyType = PropTypes$1.shape(propertyTypeShape);
	propertyTypeShape.subProperties = PropTypes$1.arrayOf(propertyType);
	const versionsType = PropTypes$1.shape({
	  admin: PropTypes$1.string,
	  app: PropTypes$1.string
	});
	const simplifiedPropertyType = PropTypes$1.shape({
	  isId: PropTypes$1.bool,
	  isSortable: PropTypes$1.bool,
	  isTitle: PropTypes$1.bool,
	  isVisible: PropTypes$1.bool,
	  label: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.number]).isRequired,
	  name: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.number]).isRequired,
	  position: PropTypes$1.number,
	  type: PropTypes$1.string,
	  availableValues: PropTypes$1.arrayOf(PropTypes$1.shape({
	    title: PropTypes$1.string,
	    value: PropTypes$1.string
	  })),
	  reference: PropTypes$1.oneOfType([PropTypes$1.string])
	});
	const actionType = PropTypes$1.shape({
	  actionType: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.arrayOf(PropTypes$1.string)]).isRequired,
	  icon: PropTypes$1.string,
	  label: PropTypes$1.string.isRequired,
	  name: PropTypes$1.string.isRequired,
	  showFilter: PropTypes$1.bool
	});
	const resourceParentType = PropTypes$1.shape({
	  name: PropTypes$1.string.isRequired,
	  icon: PropTypes$1.string.isRequired
	});
	const resourceType = PropTypes$1.shape({
	  editProperties: PropTypes$1.arrayOf(propertyType).isRequired,
	  filterProperties: PropTypes$1.arrayOf(propertyType).isRequired,
	  href: PropTypes$1.string.isRequired,
	  id: PropTypes$1.string.isRequired,
	  listProperties: PropTypes$1.arrayOf(propertyType).isRequired,
	  name: PropTypes$1.string.isRequired,
	  parent: resourceParentType.isRequired,
	  resourceActions: PropTypes$1.arrayOf(actionType).isRequired,
	  showProperties: PropTypes$1.arrayOf(propertyType).isRequired,
	  titleProperty: propertyType.isRequired
	});
	const resourceParentWithResourcesType = PropTypes$1.shape({
	  name: PropTypes$1.string.isRequired,
	  icon: PropTypes$1.string.isRequired,
	  resources: PropTypes$1.arrayOf(resourceType).isRequired
	});
	const recordType = PropTypes$1.shape({
	  params: PropTypes$1.object.isRequired,
	  populated: PropTypes$1.object,
	  errors: PropTypes$1.object,
	  id: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.number]),
	  title: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.number]),
	  recordActions: PropTypes$1.arrayOf(actionType).isRequired
	});
	const locationType = PropTypes$1.shape({
	  pathname: PropTypes$1.string.isRequired
	});
	const historyType = PropTypes$1.shape({
	  push: PropTypes$1.func.isRequired
	});
	const matchType = PropTypes$1.shape({
	  params: PropTypes$1.shape({
	    resourceId: PropTypes$1.string,
	    recordId: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.number]),
	    actionName: PropTypes$1.string
	  })
	});
	const childrenType = PropTypes$1.oneOfType([PropTypes$1.element, PropTypes$1.arrayOf(PropTypes$1.oneOfType([PropTypes$1.element, PropTypes$1.arrayOf(PropTypes$1.element), PropTypes$1.string, PropTypes$1.number])), PropTypes$1.string, PropTypes$1.number]);
	const noticeType = PropTypes$1.shape({
	  message: PropTypes$1.string,
	  progress: PropTypes$1.number,
	  type: PropTypes$1.oneOf(['success', 'error'])
	});

	var types = /*#__PURE__*/Object.freeze({
		pathsType: pathsType,
		sessionType: sessionType,
		brandingType: brandingType,
		propertyType: propertyType,
		versionsType: versionsType,
		simplifiedPropertyType: simplifiedPropertyType,
		actionType: actionType,
		resourceParentType: resourceParentType,
		resourceType: resourceType,
		resourceParentWithResourcesType: resourceParentWithResourcesType,
		recordType: recordType,
		locationType: locationType,
		historyType: historyType,
		matchType: matchType,
		childrenType: childrenType,
		noticeType: noticeType
	});

	const BrandingBox = styled__default.div.withConfig({
	  displayName: "sidebar-branding__BrandingBox",
	  componentId: "sc-7ibo5q-0"
	})(["margin-bottom:40px;"]);
	const LogoLink = styled__default(reactRouterDom.Link).withConfig({
	  displayName: "sidebar-branding__LogoLink",
	  componentId: "sc-7ibo5q-1"
	})(["display:flex;align-items:center;color:", ";font-weight:bold;span{font-size:20px;}"], ({
	  theme
	}) => theme.colors.defaultText);
	const LogoImage = styled__default.img.withConfig({
	  displayName: "sidebar-branding__LogoImage",
	  componentId: "sc-7ibo5q-2"
	})(["margin-right:", ";height:35px;"], ({
	  theme
	}) => theme.sizes.padding);

	const SidebarBranding = props => {
	  const {
	    paths,
	    branding
	  } = props;
	  const {
	    logo,
	    companyName
	  } = branding;
	  const h = new ViewHelpers({
	    options: paths
	  });
	  return React__default.createElement(BrandingBox, null, React__default.createElement(LogoLink, {
	    to: h.dashboardUrl()
	  }, React__default.createElement(LogoImage, {
	    src: logo,
	    alt: companyName,
	    height: "35px",
	    width: "35px"
	  }), React__default.createElement("span", null, companyName)));
	};

	SidebarBranding.propTypes = {
	  paths: pathsType.isRequired,
	  branding: brandingType.isRequired
	};

	const ResourceLink = styled__default(reactRouterDom.NavLink).withConfig({
	  displayName: "sidebar-resource__ResourceLink",
	  componentId: "x0pta8-0"
	})(["color:", ";padding:", ";display:block;&:hover{color:", ";}&.active{color:", ";}"], ({
	  theme
	}) => theme.colors.defaultText, ({
	  theme
	}) => theme.sizes.paddingMin, ({
	  theme
	}) => theme.colors.primary, ({
	  theme
	}) => theme.colors.primary);

	class SidebarResource extends React__default.PureComponent {
	  render() {
	    const {
	      resource
	    } = this.props;
	    return React__default.createElement("li", null, React__default.createElement(ResourceLink, {
	      to: resource.href
	    }, resource.name));
	  }

	}

	SidebarResource.propTypes = {
	  resource: resourceType.isRequired
	};
	var SidebarResource$1 = reactRouterDom.withRouter(SidebarResource);

	const Title = styled__default.span.withConfig({
	  displayName: "sidebar-parent__Title",
	  componentId: "sc-3z92jk-0"
	})(["background:", ";padding-left:", ";padding-right:", ";line-height:40px;border-radius:", ";display:flex;align-items:baseline;color:", ";position:relative;& > i,& > svg{margin-right:", ";color:", ";margin-right:", ";}"], ({
	  theme
	}) => theme.colors.lightBck, ({
	  theme
	}) => theme.sizes.padding, ({
	  theme
	}) => theme.sizes.padding, ({
	  theme
	}) => theme.sizes.paddingLayout, ({
	  theme
	}) => theme.colors.defaultText, ({
	  theme
	}) => theme.sizes.paddingMin, ({
	  theme
	}) => theme.colors.lightText, ({
	  theme
	}) => theme.sizes.padding);
	const ResourcesList = styled__default.ul.withConfig({
	  displayName: "sidebar-parent__ResourcesList",
	  componentId: "sc-3z92jk-1"
	})(["margin:", " 0;padding-left:40px;"], ({
	  theme
	}) => theme.sizes.padding);

	class SidebarParent extends React__default.PureComponent {
	  render() {
	    const {
	      parent
	    } = this.props;
	    const {
	      icon,
	      name,
	      resources
	    } = parent;
	    return React__default.createElement("li", null, React__default.createElement(Title, null, React__default.createElement("i", {
	      className: icon
	    }), name), React__default.createElement(ResourcesList, null, resources.map(resource => React__default.createElement(SidebarResource$1, {
	      resource: resource,
	      key: resource.id
	    }))));
	  }

	}

	SidebarParent.propTypes = {
	  parent: resourceParentWithResourcesType.isRequired
	};

	const StyledFooter = styled__default.p.withConfig({
	  displayName: "sidebar-footer__StyledFooter",
	  componentId: "x1c2ud-0"
	})(["font-size:", ";text-align:center;color:", ";& svg,& a{color:", ";margin:0  ", ";}"], ({
	  theme
	}) => theme.fonts.min, ({
	  theme
	}) => theme.colors.lightText, ({
	  theme
	}) => theme.colors.love, ({
	  theme
	}) => theme.sizes.paddingMin);

	const SidebarFooter = props => {
	  const {
	    hidden
	  } = props;

	  if (hidden) {
	    return React__default.createElement(StyledFooter, null, React__default.createElement("a", {
	      href: "http://softwarebrothers.co",
	      target: "_blank",
	      rel: "noopener noreferrer"
	    }, React__default.createElement("i", {
	      className: "fas fa-heart fa-2x"
	    })));
	  }

	  return React__default.createElement(StyledFooter, null, React__default.createElement("span", null, "With", React__default.createElement("i", {
	    className: "fas fa-heart"
	  }), "by", React__default.createElement("a", {
	    href: "http://softwarebrothers.co",
	    target: "_blank",
	    rel: "noopener noreferrer"
	  }, "SoftwareBrothers")));
	};

	SidebarFooter.propTypes = {
	  hidden: PropTypes$1.bool
	};
	SidebarFooter.defaultProps = {
	  hidden: false
	};

	/* eslint-disable no-param-reassign */
	var groupResources = (resources => {
	  const visibleResources = resources.filter(res => res.resourceActions.find(a => a.name === 'list'));
	  const map = visibleResources.reduce((memo, resource) => {
	    if (memo[resource.parent.name]) {
	      memo[resource.parent.name].push(resource);
	    } else {
	      memo[resource.parent.name] = [resource];
	    }

	    memo[resource.parent.name].icon = resource.parent.icon;
	    return memo;
	  }, {});
	  return Object.keys(map).map(parentName => ({
	    name: parentName,
	    icon: map[parentName].icon,
	    resources: map[parentName]
	  }));
	});

	const StyledHamburger = styled__default.a.withConfig({
	  displayName: "hamburger__StyledHamburger",
	  componentId: "kdg33d-0"
	})(["cursor:pointer;display:block;float:left;width:48px;height:32px;padding:10px ", ";position:relative;z-index:10;& > div{width:100%;height:2px;background-color:", ";margin-bottom:3px;}"], ({
	  theme
	}) => theme.sizes.padding, ({
	  theme
	}) => theme.colors.defaultText);
	var Hamburger = (props => React__default.createElement(StyledHamburger, props, React__default.createElement("div", null), React__default.createElement("div", null), React__default.createElement("div", null)));

	const SidebarWrapper = styled__default.aside.withConfig({
	  displayName: "sidebar__SidebarWrapper",
	  componentId: "ah0hhb-0"
	})(["display:flex;flex-shrink:0;flex-direction:column;justify-content:space-between;height:100%;overflow-y:auto;overflow-x:hidden;border-right:1px solid ", ";width:", ";transition:width 0.5s;& > section{padding:", ";width:", ";transition:padding 0.5s;& > section{opacity:1;transition:opacity 0.5s;}}&.hidden{width:50px;transition:width 0.5s;overflow:hidden;& > section{padding:", " 4px;transition:padding 0.5s;& > section{opacity:0;transition:opacity 0.5s;}}}"], ({
	  theme
	}) => theme.colors.border, ({
	  theme
	}) => theme.sizes.sidebarWidth, ({
	  theme
	}) => `${theme.sizes.padding} ${theme.sizes.paddingLayout} ${theme.sizes.paddingLayout}`, ({
	  theme
	}) => theme.sizes.sidebarWidth, ({
	  theme
	}) => theme.sizes.padding);
	const SidebarLabel = styled__default.h2.withConfig({
	  displayName: "sidebar__SidebarLabel",
	  componentId: "ah0hhb-1"
	})(["margin-top:", ";margin-left:", ";margin-bottom:", ";color:", ";font-size:", ";text-transform:uppercase;letter-spacing:.1em;"], ({
	  theme
	}) => theme.sizes.padding, ({
	  theme
	}) => theme.sizes.padding, ({
	  theme
	}) => theme.sizes.padding, ({
	  theme
	}) => theme.colors.lightText, ({
	  theme
	}) => theme.fonts.min);

	const Sidebar = props => {
	  const {
	    branding,
	    paths,
	    resources
	  } = props;
	  const [hidden, setHidden] = React.useState(false);
	  return React__default.createElement(SidebarWrapper, {
	    className: hidden ? 'hidden' : 'active'
	  }, React__default.createElement("section", null, React__default.createElement(Hamburger, {
	    onClick: () => setHidden(!hidden)
	  }), React__default.createElement("section", null, React__default.createElement(SidebarBranding, {
	    branding: branding,
	    paths: paths
	  }), React__default.createElement(SidebarLabel, null, "Navigation"), React__default.createElement("ul", null, groupResources(resources).map(parent => React__default.createElement(SidebarParent, {
	    parent: parent,
	    key: parent.name
	  }))))), branding.softwareBrothers && React__default.createElement(SidebarFooter, {
	    hidden: hidden
	  }));
	};

	Sidebar.propTypes = {
	  paths: pathsType.isRequired,
	  branding: brandingType.isRequired,
	  resources: PropTypes$1.arrayOf(resourceType).isRequired
	};

	const mapStateToProps = state => ({
	  resources: state.resources,
	  branding: state.branding,
	  paths: state.paths,
	  versionsType: state.versionsType
	});

	var Sidebar$1 = reactRedux.connect(mapStateToProps)(Sidebar);

	const UserBox = styled__default.div.attrs({
	  className: 'navbar-link'
	}).withConfig({
	  displayName: "logged-in__UserBox",
	  componentId: "dr9q5j-0"
	})(["padding-right:", ";border-radius:50px;margin:10px 0;img{border-radius:50%;margin-left:", ";&:after{display:none;}}"], ({
	  theme
	}) => theme.sizes.padding, ({
	  theme
	}) => theme.sizes.padding);
	const Dropdown = styled__default.div.attrs({
	  className: 'navbar-dropdown'
	}).withConfig({
	  displayName: "logged-in__Dropdown",
	  componentId: "dr9q5j-1"
	})(["border-radius:0px;border:none;padding:0;top:95%;"]);
	const DropdownLink = styled__default.a.attrs({
	  className: 'navbar-item'
	}).withConfig({
	  displayName: "logged-in__DropdownLink",
	  componentId: "dr9q5j-2"
	})(["&&&{padding:", ";color:", ";&:hover{color:", ";}i,svg{margin-right:", ";}}"], ({
	  theme
	}) => `${theme.sizes.padding} ${theme.sizes.paddingLayout}`, ({
	  theme
	}) => theme.colors.defaultText, ({
	  theme
	}) => theme.colors.primary, ({
	  theme
	}) => theme.sizes.padding);

	const LoggedIn = props => {
	  const {
	    session,
	    paths
	  } = props;
	  return React__default.createElement("div", {
	    className: "navbar-item has-dropdown is-hoverable navbar-user"
	  }, React__default.createElement(UserBox, null, session.email, React__default.createElement("img", {
	    src: "https://api.adorable.io/avatars/24/softwarebrothers.png",
	    alt: "user"
	  })), React__default.createElement(Dropdown, null, React__default.createElement(DropdownLink, {
	    href: paths.logoutPath
	  }, React__default.createElement("i", {
	    className: "fas fa-sign-out-alt"
	  }), "Sign out")));
	};

	LoggedIn.propTypes = {
	  session: sessionType.isRequired,
	  paths: pathsType.isRequired
	};

	const StyledLabel = styled__default.label.attrs({
	  className: 'label'
	}).withConfig({
	  displayName: "label__StyledLabel",
	  componentId: "odgp9z-0"
	})(["&&&{display:block;text-transform:uppercase;font-size:", ";color:", ";font-weight:normal;margin:0 0 8px 0;letter-spacing:0.1em;}"], ({
	  theme
	}) => theme.fonts.min, ({
	  theme
	}) => theme.colors.lightText);
	/**
	 * @class
	 * Represents labels inside the application.
	 *
	 * @component
	 * @example
	 * return (
	 * <WrapperBox border>
	 *   <Label>Some Label:</Label>
	 *   <p>Text below the label</p>
	 * </WrapperBox>
	 * )
	 */

	const Label = props => React__default.createElement(StyledLabel, props);

	const VersionWrapper = styled__default.div.withConfig({
	  displayName: "version__VersionWrapper",
	  componentId: "ui8whc-0"
	})(["padding:10px 0;"]);
	const VersionBlock = styled__default.p.withConfig({
	  displayName: "version__VersionBlock",
	  componentId: "ui8whc-1"
	})(["&&&{& > label{display:inline;}}"]);

	const Version = props => {
	  const {
	    versions
	  } = props;
	  const {
	    admin,
	    app
	  } = versions;
	  return React__default.createElement(VersionWrapper, null, admin && React__default.createElement(VersionBlock, null, React__default.createElement(Label, null, "admin:"), admin), app && React__default.createElement(VersionBlock, null, React__default.createElement(Label, null, "app:"), app));
	};

	Version.propTypes = {
	  versions: versionsType.isRequired
	};

	const Navbar = styled__default.nav.attrs({
	  className: 'navbar'
	}).withConfig({
	  displayName: "topbar__Navbar",
	  componentId: "yqna2l-0"
	})(["height:", ";border-bottom:1px solid ", ";padding:0 ", ";flex-shrink:0;"], ({
	  theme
	}) => theme.sizes.navbarHeight, ({
	  theme
	}) => theme.colors.border, ({
	  theme
	}) => theme.sizes.paddingLayout);

	const Topbar = props => {
	  const {
	    session,
	    paths,
	    versions
	  } = props;
	  return React__default.createElement(Navbar, null, React__default.createElement("div", {
	    className: "navbar-menu"
	  }, React__default.createElement("div", {
	    className: "navbar-start"
	  }, React__default.createElement(Version, {
	    versions: versions
	  })), React__default.createElement("div", {
	    className: "navbar-end"
	  }, session && session.email ? React__default.createElement(LoggedIn, {
	    session: session,
	    paths: paths
	  }) : '')));
	};

	const mapStateToProps$1 = state => ({
	  session: state.session,
	  paths: state.paths,
	  versions: state.versions
	});

	Topbar.propTypes = {
	  paths: pathsType.isRequired,
	  session: sessionType,
	  versions: versionsType
	};
	Topbar.defaultProps = {
	  session: null,
	  versions: {
	    admin: false,
	    app: false
	  }
	};
	var Topbar$1 = reactRedux.connect(mapStateToProps$1)(Topbar);

	const StyledColumn = styled__default.section.attrs(({
	  width = 4,
	  offset = 0
	}) => ({
	  className: `column is-${width}-desktop is-offset-${offset}`
	})).withConfig({
	  displayName: "column__StyledColumn",
	  componentId: "d07l2a-0"
	})([""]);
	/**
	 * Colum representation in AdminBro grid. It uses [bulma](https://bulma.io/documentation/) grid.
	 *
	 * Example usage with {@link Column}
	 * ```JavaScript
	 * import { Column, Columns } from 'admin-bro/components'
	 * //...
	 * return (
	 *   <columns>
	 *      <column width={8}>
	 *        Some content on the left
	 *      </column>
	 *      <column width={4}>
	 *        Some content on the right
	 *      </column>
	 *   </columns>
	 *  )
	 * ```
	 *
	 * @see https://bulma.io/documentation/
	 * @see {@link Columns}
	 * @component
	 *
	 * @example <caption>Layout with text blocks by using column</caption>
	 * return (
	 *   <Columns>
	 *     <Column width={2} offset={2}>
	 *       <WrapperBox>Some wrapped text</WrapperBox>
	 *     </Column>
	 *     <Column width={3}>
	 *     <WrapperBox border>Inside Border</WrapperBox>
	 *     </Column>
	 *     <Column width={5} style={{background: '#ccc'}}>normal text</Column>
	 *   </Columns>
	 * )
	 */

	const Column = props => React__default.createElement(StyledColumn, props);

	const StyledColumns = styled__default.section.attrs({
	  className: 'columns is-multiline'
	}).withConfig({
	  displayName: "columns__StyledColumns",
	  componentId: "sc-1g5enwk-0"
	})([""]);
	/**
	 * Columns wrapper for the grid in AdminBro. It uses [bulma](https://bulma.io/documentation/) grid.
	 *
	 * Example usage with {@link Column}
	 * ```JavaScript
	 * import { Column, Columns } from 'admin-bro/components'
	 * //...
	 * return (
	 *   <columns>
	 *      <column width={8}>
	 *        Some content on the left
	 *      </column>
	 *      <column width={4}>
	 *        Some content on the right
	 *      </column>
	 *   </columns>
	 *  )
	 * ```
	 *
	 * @see https://bulma.io/documentation/
	 * @see Column
	 *
	 * @component
	 * @example
	 * return (
	 *   <Columns>
	 *      <Column width={8}>
	 *        Some content on the left
	 *      </Column>
	 *      <Column width={4}>
	 *        Some content on the right
	 *      </Column>
	 *   </Columns>
	 * )
	 */

	const Columns = props => React__default.createElement(StyledColumns, props);

	const Wrapper = styled__default.section.attrs({
	  className: 'content'
	}).withConfig({
	  displayName: "dashboard-header__Wrapper",
	  componentId: "sc-1rc8e45-0"
	})(["&&{padding:90px ", ";background:", ";color:#fff;margin-bottom:0;& > *{color:#fff;}p{color:#fff;}h1{color:#fff;font-size:53px;margin-bottom:4px;}}"], ({
	  theme
	}) => theme.sizes.paddingLayout, ({
	  theme
	}) => theme.colors.superDarkBck);
	/**
	 * Component which can be used as the outstanding header of the dashboard page.
	 *
	 * @component
	 * @example <caption>Empty Header with simple text</caption>
	 * return (
	 *  <DashboardHeader>
	 *    <h1>Some text inside a header</h1>
	 *    <p>Subtitle</p>
	 *  </DashboardHeader>
	 * )
	 *
	 * @example <caption>Header with overlay blocks</caption>
	 * return (
	 *   <div>
	 *     <DashboardHeader>
	 *       <h1>Overlaying text</h1>
	 *     </DashboardHeader>
	 *     <WrapperBox>
	 *       <Columns style={{marginTop: '-80px'}}>
	 *         <Column><ValueBlock  icon="fa fa-bomb" value="5">
	 *           Utils
	 *         </ValueBlock></Column>
	 *         <Column><ValueBlock  icon="fa fa-star" value="12">
	 *           Are
	 *         </ValueBlock></Column>
	 *         <Column><ValueBlock  icon="fa fa-cog" value="5" color="red">
	 *           Awesome
	 *         </ValueBlock></Column>
	 *       </Columns>
	 *     </WrapperBox>
	 *   </div>
	 * )
	 */

	const DashboardHeader = props => {
	  const {
	    children
	  } = props;
	  return React__default.createElement(Wrapper, null, children);
	};

	var _extends_1 = createCommonjsModule(function (module) {
	function _extends() {
	  module.exports = _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  return _extends.apply(this, arguments);
	}

	module.exports = _extends;
	});

	const DropdownTrigger = styled__default.div.attrs({
	  className: 'dropdown-trigger'
	}).withConfig({
	  displayName: "dropdown__DropdownTrigger",
	  componentId: "sc-17060js-0"
	})(["padding:0px ", ";font-size:20px;line-height:20px;&:hover{background:#fff;}"], ({
	  theme
	}) => theme.sizes.padding);
	const DropdownMenu = styled__default.div.attrs({
	  className: 'dropdown-menu'
	}).withConfig({
	  displayName: "dropdown__DropdownMenu",
	  componentId: "sc-17060js-1"
	})(["& > .dropdown-content{border:0px none;border-radius:0px;box-shadow:0 6px 13px 0 rgba(69,70,85,0.13);}"]);
	/**
	 * Representation of a dropdown with buttons.
	 *
	 * @component
	 * @example
	 * return (
	 * <WrapperBox border style={{height: 200, marginLeft: 200}}>
	 *   <Dropdown className="is-right is-hoverable">
	 *     <StyledButton className="is-white in-dropdown">Button 1</StyledButton>
	 *     <StyledButton className="is-white in-dropdown">Button 2</StyledButton>
	 *   </Dropdown>
	 * </WrapperBox>
	 * )
	 */

	const Dropdown$1 = props => {
	  const {
	    children
	  } = props;
	  let {
	    className = ''
	  } = props;
	  className += ' dropdown';
	  return React__default.createElement("div", _extends_1({}, props, {
	    className: className
	  }), React__default.createElement(DropdownTrigger, null, React__default.createElement("i", {
	    className: "icomoon-options"
	  })), React__default.createElement(DropdownMenu, null, React__default.createElement("div", {
	    className: "dropdown-content"
	  }, children)));
	};

	const StyledWrapperBox = styled__default.section.withConfig({
	  displayName: "wrapper-box__StyledWrapperBox",
	  componentId: "sc-9mf060-0"
	})(["padding:", ";flex-grow:1;border:", ";background:", ";& > h1{font-size:22px;margin-top:", ";margin-bottom:", ";}"], ({
	  theme
	}) => theme.sizes.paddingLayout, props => props.border ? `1px solid ${props.theme.colors.border}` : 'none', props => props.border ? '#ffffff' : 'transparent', ({
	  theme
	}) => theme.sizes.padding, ({
	  theme
	}) => theme.sizes.padding);
	/**
	 * Basic layout element which controls padding.
	 *
	 * @component
	 * @example
	 * return (
	 *   <WrapperBox border>
	 *     <h1>Header</h1>
	 *     <p>Some inside content</p>
	 *   </WrapperBox>
	 * )
	 */

	const WrapperBox = props => React__default.createElement(StyledWrapperBox, props);

	const Spinner = styled__default.div.attrs({
	  className: 'lds-facebook'
	}).withConfig({
	  displayName: "loader__Spinner",
	  componentId: "sc-103tj8g-0"
	})(["&{display:inline-block;position:relative;width:64px;height:64px;}& div{display:inline-block;position:absolute;left:6px;width:13px;background:", ";animation:lds-facebook 1.2s cubic-bezier(0,0.5,0.5,1) infinite;}& div:nth-child(1){left:6px;animation-delay:-0.24s;}& div:nth-child(2){left:26px;animation-delay:-0.12s;}& div:nth-child(3){left:45px;animation-delay:0;}@keyframes lds-facebook{0%{top:6px;height:51px;}50%,100%{top:19px;height:26px;}}"], ({
	  theme
	}) => theme.colors.primary);
	/**
	 * Simple loader
	 *
	 * @component
	 * @example
	 * return (
	 *   <WrapperBox border><Loader/></WrapperBox>
	 * )
	 */

	const Loader = () => React__default.createElement(WrapperBox, {
	  style: {
	    textAlign: 'center'
	  }
	}, React__default.createElement(Spinner, null, React__default.createElement("div", null), React__default.createElement("div", null), React__default.createElement("div", null)));

	function paginate(totalItems, currentPage, pageSize, maxPages) {
	    if (currentPage === void 0) { currentPage = 1; }
	    if (pageSize === void 0) { pageSize = 10; }
	    if (maxPages === void 0) { maxPages = 10; }
	    // calculate total pages
	    var totalPages = Math.ceil(totalItems / pageSize);
	    // ensure current page isn't out of range
	    if (currentPage < 1) {
	        currentPage = 1;
	    }
	    else if (currentPage > totalPages) {
	        currentPage = totalPages;
	    }
	    var startPage, endPage;
	    if (totalPages <= maxPages) {
	        // total pages less than max so show all pages
	        startPage = 1;
	        endPage = totalPages;
	    }
	    else {
	        // total pages more than max so calculate start and end pages
	        var maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
	        var maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
	        if (currentPage <= maxPagesBeforeCurrentPage) {
	            // current page near the start
	            startPage = 1;
	            endPage = maxPages;
	        }
	        else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
	            // current page near the end
	            startPage = totalPages - maxPages + 1;
	            endPage = totalPages;
	        }
	        else {
	            // current page somewhere in the middle
	            startPage = currentPage - maxPagesBeforeCurrentPage;
	            endPage = currentPage + maxPagesAfterCurrentPage;
	        }
	    }
	    // calculate start and end item indexes
	    var startIndex = (currentPage - 1) * pageSize;
	    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
	    // create an array of pages to ng-repeat in the pager control
	    var pages = Array.from(Array((endPage + 1) - startPage).keys()).map(function (i) { return startPage + i; });
	    // return object with all pager properties required by the view
	    return {
	        totalItems: totalItems,
	        currentPage: currentPage,
	        pageSize: pageSize,
	        totalPages: totalPages,
	        startPage: startPage,
	        endPage: endPage,
	        startIndex: startIndex,
	        endIndex: endIndex,
	        pages: pages
	    };
	}
	var jwPaginate = paginate;

	/**
	 * Base button component
	 *
	 * @component
	 * @example <caption>Regular button</caption>
	 * return (
	  *   <WrapperBox border>
	  *     <StyledButton>I am button</StyledButton>
	  *   </WrapperBox>
	  * )
	  *
	  * @example <caption>Primary button</caption>
	  * return (
	  *   <WrapperBox border>
	  *     <StyledButton primary>I am primary button</StyledButton>
	  *   </WrapperBox>
	  * )
	  *
	  * @example <caption>With icon</caption>
	  * return (
	  *   <WrapperBox border>
	  *     <StyledButton><i class="fa fa-bomb" />I am button with icon</StyledButton>
	  *   </WrapperBox>
	  * )
	  */

	const StyledButton = styled__default(reactRouterDom.Link).attrs(({
	  primary
	}) => ({
	  className: `button${primary ? ' is-primary' : ''}`
	})).withConfig({
	  displayName: "styled-button__StyledButton",
	  componentId: "sc-27o4jb-0"
	})(["&&&{font-size:", ";border-radius:0;border-color:", ";background:#fff;height:34px;padding:", ";color:", ";& i,& svg{margin-right:5px;}&:hover{border-color:", ";}&.is-white{background-color:#fff;border-color:transparent;color:", ";}&.is-primary{background-color:", ";color:#ffffff;&:hover{background-color:", ";}}&.is-text{background-color:transparent;color:", ";border:transparent;}&.in-dropdown{color:", ";font-size:", ";width:100%;text-align:start;justify-content:flex-start;height:40px;padding-left:40px;border:none;&:hover{border:4px ", ";padding-left:36px;border-style:none solid;}}}"], ({
	  theme
	}) => theme.fonts.medium, ({
	  theme
	}) => theme.colors.primary, ({
	  theme
	}) => `${theme.sizes.paddingMin} ${theme.sizes.padding}`, ({
	  theme
	}) => theme.colors.primary, ({
	  theme
	}) => theme.colors.primaryHover, ({
	  theme
	}) => theme.colors.defaultText, ({
	  theme
	}) => theme.colors.primary, ({
	  theme
	}) => theme.colors.primaryHover, ({
	  theme
	}) => theme.colors.primary, ({
	  theme
	}) => theme.colors.defaultText, ({
	  theme
	}) => theme.fonts.base, ({
	  theme
	}) => theme.colors.primary);

	const PaginationWrapper = styled__default.div.attrs({
	  className: 'level-item pagination-content'
	}).withConfig({
	  displayName: "paginate__PaginationWrapper",
	  componentId: "sc-9u8hbi-0"
	})(["& > .pagination{border:1px solid ", ";padding:4px;}"], ({
	  theme
	}) => theme.colors.border);
	/**
	 * Component which renders pagination
	 *
	 * @component
	 * @example
	 * const location = { search: ''}
	 * return (
	 *   <WrapperBox>
	 *     <Paginate total={100} page={4} perPage={10} location={location} />
	 *   </WrapperBox>
	 * )
	 */

	class Paginate extends React__default.PureComponent {
	  linkToPage(page) {
	    const {
	      location
	    } = this.props;
	    const search = new URLSearchParams(location.search);
	    search.set('page', page);
	    return search.toString();
	  }

	  render() {
	    const {
	      total,
	      page,
	      perPage
	    } = this.props;
	    const currentPage = parseInt(page || '1', 10);
	    const paginate = jwPaginate(total, currentPage, parseInt(perPage, 10));
	    const isFirstPage = currentPage === paginate.startPage;
	    const isLastPage = currentPage === paginate.endPage;
	    const prevPage = isFirstPage ? currentPage : currentPage - 1;
	    const nextPage = isLastPage ? currentPage : currentPage + 1;

	    if (paginate.totalPages === 1 || total === 0) {
	      return null;
	    }

	    return React__default.createElement(PaginationWrapper, null, React__default.createElement("div", {
	      className: "pagination"
	    }, React__default.createElement(StyledButton, {
	      to: {
	        search: this.linkToPage(prevPage)
	      },
	      className: `button is-white${isFirstPage ? ' disabled' : ''}`
	    }, React__default.createElement("i", {
	      className: "icomoon-pagination-left"
	    })), paginate.pages.map(p => React__default.createElement(StyledButton, {
	      key: p,
	      to: {
	        search: this.linkToPage(p)
	      },
	      className: `pages button is-white${p === currentPage ? ' is-primary' : ''}`
	    }, p)), React__default.createElement(StyledButton, {
	      to: {
	        search: this.linkToPage(nextPage)
	      },
	      className: `button is-white${isLastPage ? ' disabled' : ''}`
	    }, React__default.createElement("i", {
	      className: "icomoon-pagination-right"
	    }))));
	  }

	}
	/**
	 * @memberof Paginate
	 */


	var Paginate$1 = reactRouterDom.withRouter(Paginate);

	const StyledPlaceholder = styled__default.div.withConfig({
	  displayName: "placeholder__StyledPlaceholder",
	  componentId: "sc-1cbjegf-0"
	})(["@keyframes placeHolderShimmer{0%{background-position:-468px 0}100%{background-position:468px 0}}animation-duration:1s;animation-fill-mode:forwards;animation-iteration-count:infinite;animation-name:placeHolderShimmer;animation-timing-function:linear;background:#f6f7f8;background:linear-gradient(to right,#eeeeee 8%,#dddddd 18%,#eeeeee 33%);background-size:1000px 104px;height:338px;position:relative;overflow:hidden;"]);
	/**
	 * Renders placeholder
	 * @component
	 *
	 * @example <caption>Image placeholder</caption>
	 * return (
	 *   <WrapperBox border>
	 *     <Placeholder style={{ width: 100, height: 200 }} />
	 *   </WrapperBox>
	 * )
	 *
	 * @example <caption>Text placeholder</caption>
	 * return (
	 *   <WrapperBox border>
	 *     <Label>Some name</Label>
	 *     <Placeholder style={{ width: 400, height: 14 }} />
	 *   </WrapperBox>
	 * )
	 */

	const Placeholder = props => React__default.createElement(StyledPlaceholder, props);

	const Property = styled__default.div.withConfig({
	  displayName: "property-in-edit__Property",
	  componentId: "sc-1yqxq8u-0"
	})(["margin-bottom:", ";& input{border-radius:0;border-color:", ";box-shadow:none;&:focus{border-color:", ";}}& .control > input[type=text]{height:40px;}"], ({
	  theme
	}) => theme.sizes.paddingLayout, ({
	  theme
	}) => theme.colors.border, ({
	  theme
	}) => theme.colors.primary);
	/**
	 * Wrapps input with label and optional error
	 *
	 * @component
	 * @example <caption>Standard property</caption>
	 * const property = {
	 *   label: 'My amazing property',
	 *   name: 'myAmazingProperty',
	 * }
	 * const error = { message: 'and there is an error' }
	 * return (
	 *   <WrapperBox>
	 *     <PropertyInEdit property={property} error={error}>
	 *       <input className="input" />
	 *     </PropertyInEdit>
	 *   </WrapperBox>
	 * )
	 *
	 * @example <caption>With an icon</caption>
	 * const property = {
	 *   label: 'My amazing property',
	 *   name: 'myAmazingProperty',
	 * }
	 * // It is based on the bulma classes
	 * return (
	 *   <WrapperBox>
	 *     <PropertyInEdit property={property}>
	 *       <div className="control has-icons-right">
	 *         <input className="input" />
	 *         <span className="icon is-small is-right">
	 *           <i className="fa fa-bomb" />
	 *         </span>
	 *       </div>
	 *     </PropertyInEdit>
	 *   </WrapperBox>
	 * )
	 */

	const PropertyInEdit = props => {
	  const {
	    children,
	    property,
	    error
	  } = props;
	  return React__default.createElement(Property, null, React__default.createElement(Label, {
	    htmlFor: property.name
	  }, property.label), React__default.createElement("div", {
	    className: "control"
	  }, children), error && React__default.createElement("div", {
	    className: "help is-danger"
	  }, error.message));
	};
	/**
	 * @memberof PropertyInEdit
	 */


	PropertyInEdit.defaultProps = {
	  error: null,
	  children: null
	};

	const Property$1 = styled__default.div.withConfig({
	  displayName: "property-in-filter__Property",
	  componentId: "sc-14pn5s1-0"
	})(["margin:", " 0;& input{border-radius:0;border-color:", ";box-shadow:none;background:transparent;color:", ";&:focus{border-color:", ";}}& .icon{opacity:0.25;}"], ({
	  theme
	}) => theme.sizes.paddingLayout, ({
	  theme
	}) => theme.colors.borderOnDark, ({
	  theme
	}) => theme.colors.lightText, ({
	  theme
	}) => theme.colors.primary);
	/**
	 * Wrapps input with label in Filter
	 *
	 * @component
	 * @example
	 * const property = {
	 *   label: 'My amazing property',
	 *   name: 'myAmazingProperty',
	 * }
	 * return (
	 *   <WrapperBox style={{ background: '#303b62' }}>
	 *     <PropertyInFilter property={property}>
	 *       <input className="input" />
	 *     </PropertyInFilter>
	 *   </WrapperBox>
	 * )
	 */

	const PropertyInFilter = props => {
	  const {
	    property,
	    children
	  } = props;
	  return React__default.createElement(Property$1, null, React__default.createElement(Label, null, property.label), children);
	};

	PropertyInFilter.propTypes = {
	  /**
	   * Wrapped input element
	   */
	  children: childrenType,

	  /**
	   * Property object based on {@link PropertyJSON}
	   */
	  property: PropTypes$1.shape({
	    /**
	     * Property label
	     */
	    label: PropTypes$1.string.isRequired,

	    /**
	     * Unique property name - its patch.
	     */
	    name: PropTypes$1.string.isRequired
	  }).isRequired
	};
	PropertyInFilter.defaultProps = {
	  children: null
	};

	const Property$2 = styled__default.div.withConfig({
	  displayName: "property-in-show__Property",
	  componentId: "sc-1qcpppe-0"
	})(["margin-bottom:", ";"], ({
	  theme
	}) => theme.sizes.paddingLayout);
	/**
	 * Wrapps input with label in Show
	 *
	 * @component
	 * @example
	 * const property = {
	  *   label: 'My amazing property',
	  *   name: 'myAmazingProperty',
	  * }
	  * return (
	  *   <WrapperBox border>
	  *     <PropertyInShow property={property}>
	  *       And here goes a property value.
	  *     </PropertyInShow>
	  *   </WrapperBox>
	  * )
	 */

	const PropertyInShow = props => {
	  const {
	    property,
	    children
	  } = props;
	  return React__default.createElement(Property$2, null, React__default.createElement(Label, null, property.label), children);
	};

	PropertyInShow.propTypes = {
	  /**
	   * Wrapped property value
	   */
	  children: childrenType,

	  /**
	   * Property object based on {@link PropertyJSON}
	   */
	  property: PropTypes$1.shape({
	    /**
	     * Property label
	     */
	    label: PropTypes$1.string.isRequired,

	    /**
	     * Unique property name - its patch.
	     */
	    name: PropTypes$1.string.isRequired
	  }).isRequired
	};
	PropertyInShow.defaultProps = {
	  children: null
	};

	const Section = styled__default.section.withConfig({
	  displayName: "styled-section__Section",
	  componentId: "w4teil-0"
	})(["border-left:", " solid ", ";padding-left:", ";"], ({
	  theme
	}) => theme.sizes.paddingMin, ({
	  theme
	}) => theme.colors.lightBck, ({
	  theme
	}) => theme.sizes.padding);
	/**
	 * Marks group of fields as a section
	 *
	 * @component
	 *
	 * @example
	 * const property = {
	 *   label: 'My amazing property',
	 *   name: 'myAmazingProperty',
	 * }
	 * return (
	 * <StyledSection>
	 *  <PropertyInEdit property={property}>
	 *    <input className="input" />
	 *  </PropertyInEdit>
	 *  <p>
	 *    <StyledButton>
	 *      Add new item in section
	 *    </StyledButton>
	 *  </p>
	 * </StyledSection>
	 * )
	 */

	const StyledSection = props => React__default.createElement(Section, props);

	const StyledTable = styled__default.table.attrs({
	  className: 'table is-fullwidth'
	}).withConfig({
	  displayName: "table__StyledTable",
	  componentId: "sc-19n8ktm-0"
	})(["& > thead > tr > th{border:none;}& tr.is-selected{background:", ";}td{color:", ";padding:", ";border-color:", ";}"], ({
	  theme
	}) => theme.colors.primary, ({
	  theme
	}) => theme.colors.defaultText, ({
	  theme
	}) => theme.sizes.padding, ({
	  theme
	}) => theme.colors.border);
	/**
	 * Simple compnent for styling tables
	 *
	 * @component
	 * @example
	 * return (
	 * <WrapperBox border>
	 *   <h1>Table Information</h1>
	 *   <Table>
	 *     <thead>
	 *       <tr>
	 *         <th><Label>Label1</Label></th>
	 *         <th><Label>Label2</Label></th>
	 *       </tr>
	 *     </thead>
	 *     <tbody>
	 *       <tr>
	 *         <td>Value1</td>
	 *         <td>Value12</td>
	 *       </tr>
	 *       <tr>
	 *         <td>Value1</td>
	 *         <td>Value12</td>
	 *       </tr>
	 *     </tbody>
	 *   </Table>
	 * </WrapperBox>
	 * )
	 */

	const Table = props => React__default.createElement(StyledTable, props);

	const OverlayLink = styled__default(reactRouterDom.Link).withConfig({
	  displayName: "value-block__OverlayLink",
	  componentId: "v4br11-0"
	})(["position:absolute;top:0;left:0;width:100%;height:100%;display:block;transition:border-width 0.2s;&:hover{transition:border-width 0.2s;border-bottom:5px solid ", ";}"], ({
	  theme
	}) => theme.colors.primary);
	const Level = styled__default.div.attrs({
	  className: 'level'
	}).withConfig({
	  displayName: "value-block__Level",
	  componentId: "v4br11-1"
	})(["color:", ";margin-top:8px;& .value{font-size:34px;}& .icon{font-size:34px;}"], props => props.color || props.theme.colors.primary);
	/**
	 * Simple Widget, which can be used in the dashboard
	 *
	 * @name ValueBlock
	 * @component
	 * @example
	 * return (
	 *   <WrapperBox><Columns>
	 *     <Column><ValueBlock  icon="fa fa-bomb" value="5">
	 *       Utils
	 *     </ValueBlock></Column>
	 *     <Column><ValueBlock  icon="fa fa-star" value="12" href="/api/resourceName">
	 *       Are
	 *     </ValueBlock></Column>
	 *     <Column><ValueBlock  icon="fa fa-cog" value="5" color="red">
	 *       Awesome
	 *     </ValueBlock></Column>
	 *   </Columns></WrapperBox>
	 * )
	 */

	class ValueBlock extends React__default.PureComponent {
	  render() {
	    const {
	      icon,
	      value,
	      children,
	      color,
	      href,
	      label
	    } = this.props;
	    return React__default.createElement(WrapperBox, {
	      border: true,
	      style: {
	        position: 'relative'
	      }
	    }, href ? React__default.createElement(OverlayLink, {
	      to: href
	    }) : '', label ? React__default.createElement(Label, null, label) : '', React__default.createElement(Level, {
	      color: color
	    }, React__default.createElement("div", {
	      className: "value"
	    }, value), React__default.createElement("div", {
	      className: "icon"
	    }, React__default.createElement("i", {
	      className: icon
	    }))), children);
	  }

	}
	ValueBlock.propTypes = {
	  /**
	   * Icon class: i.e "fa fa-bomb"
	   */
	  icon: PropTypes$1.string,

	  /**
	   * Value string which
	   */
	  value: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.number]),

	  /**
	   * Content inside a block
	   */
	  children: childrenType,

	  /**
	   * Optional color
	   */
	  color: PropTypes$1.string,

	  /**
	   * Link url if the block should be clickable
	   */
	  href: PropTypes$1.string,

	  /**
	   * Label of the block
	   */
	  label: PropTypes$1.string
	};
	ValueBlock.defaultProps = {
	  color: null,
	  children: null,
	  value: null,
	  label: null,
	  href: null,
	  icon: null
	};



	var Components = /*#__PURE__*/Object.freeze({
		Column: Column,
		Columns: Columns,
		DashboardHeader: DashboardHeader,
		Dropdown: Dropdown$1,
		Label: Label,
		Loader: Loader,
		Paginate: Paginate$1,
		Placehoder: Placeholder,
		PropertyInEdit: PropertyInEdit,
		PropertyInFilter: PropertyInFilter,
		PropertyInShow: PropertyInShow,
		StyledButton: StyledButton,
		StyledSection: StyledSection,
		Table: Table,
		ValueBlock: ValueBlock,
		WrapperBox: WrapperBox
	});

	const DashboardWrapper = styled__default.section.withConfig({
	  displayName: "default-dashboard__DashboardWrapper",
	  componentId: "sc-189o4go-0"
	})(["display:flex;flex-grow:1;align-items:center;justify-content:center;padding:", ";"], ({
	  theme
	}) => theme.sizes.padding);
	const InfoBox = styled__default.section.attrs({
	  className: 'content'
	}).withConfig({
	  displayName: "default-dashboard__InfoBox",
	  componentId: "sc-189o4go-1"
	})(["width:540px;"]);
	const SoftwareBrothers = styled__default.div.withConfig({
	  displayName: "default-dashboard__SoftwareBrothers",
	  componentId: "sc-189o4go-2"
	})(["padding:10px 0;border-top:1px solid ", ";img{float:left;padding:10px 15px 10px 0;width:140px;}a{color:", ";}"], ({
	  theme
	}) => theme.colors.love, ({
	  theme
	}) => theme.colors.love);

	const Dashboard = () => React__default.createElement(DashboardWrapper, null, React__default.createElement(InfoBox, null, React__default.createElement("h1", null, "Welcome on board!"), React__default.createElement("p", null, "Thank you for trying out", React__default.createElement("b", null, " AdminBro.")), React__default.createElement("p", null, "Next, you might want to check out the following tutorials:"), React__default.createElement(Columns, null, React__default.createElement(Column, {
	  width: 6
	}, React__default.createElement("ul", null, React__default.createElement("li", null, React__default.createElement("a", {
	  href: "https://softwarebrothers.github.io/admin-bro-dev/tutorial-03-passing-resources.html"
	}, "Adding Resources")), React__default.createElement("li", null, React__default.createElement("a", {
	  href: "https://softwarebrothers.github.io/admin-bro-dev/tutorial-04-customizing-resources.html"
	}, "Customising resources")), React__default.createElement("li", null, React__default.createElement("a", {
	  href: "https://softwarebrothers.github.io/admin-bro-dev/tutorial-05-actions.html"
	}, "Customising Actions")))), React__default.createElement(Column, {
	  width: 6
	}, React__default.createElement("ul", null, React__default.createElement("li", null, React__default.createElement("a", {
	  href: "https://softwarebrothers.github.io/admin-bro-dev/tutorial-06-writing-react-components.html"
	}, "Writing your own components")), React__default.createElement("li", null, React__default.createElement("a", {
	  href: "https://softwarebrothers.github.io/admin-bro-dev/tutorial-07-custom-dashboard.html"
	}, "Customising Dashboard"))))), React__default.createElement("p", null, "In case you found any errors,", React__default.createElement("a", {
	  href: "https://github.com/SoftwareBrothers/admin-bro/issues"
	}, " raise an issue "), "on our GitHub account."), React__default.createElement("p", null, "For the latest information about AdminBro and more -", React__default.createElement("a", {
	  href: "https://softwarebrothers.co/blog/"
	}, " check out our blog.")), React__default.createElement(SoftwareBrothers, null, React__default.createElement("img", {
	  src: "https://softwarebrothers.co/assets/images/software-brothers-logo-full.svg",
	  alt: "SoftwareBrothers"
	}), React__default.createElement("p", null, "Want to add advanced fields like Google Maps, enrich interface with custom graphs or simply look for professional help? You can always", React__default.createElement("a", {
	  href: "https://softwarebrothers.co/services"
	}, " work with us!")))));

	class ErrorBoundary extends React__default.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      error: null
	    };
	  }

	  componentDidCatch(error) {
	    this.setState({
	      error
	    });
	  }

	  render() {
	    const {
	      children
	    } = this.props;
	    const {
	      error
	    } = this.state;

	    if (error !== null) {
	      return React__default.createElement("div", {
	        className: "notification is-danger"
	      }, React__default.createElement("p", null, error.toString()), React__default.createElement("p", null, "See development console for more details..."));
	    }

	    return children || null;
	  }

	}

	ErrorBoundary.propTypes = {
	  children: childrenType.isRequired
	};

	class Dashboard$1 extends React__default.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      isClient: false
	    };
	  }

	  componentDidMount() {
	    this.setState({
	      isClient: true
	    });
	  }

	  render() {
	    const {
	      dashboard
	    } = this.props;
	    const {
	      isClient
	    } = this.state;
	    let Component;

	    if (dashboard && dashboard.component && isClient && AdminBro.UserComponents[dashboard.component]) {
	      Component = AdminBro.UserComponents[dashboard.component];
	    } else {
	      Component = Dashboard;
	    }

	    return React__default.createElement(ErrorBoundary, null, React__default.createElement(Component, null));
	  }

	}

	const mapStateToProps$2 = state => ({
	  dashboard: state.dashboard
	});

	Dashboard$1.propTypes = {
	  dashboard: PropTypes$1.shape({
	    component: PropTypes$1.string
	  }).isRequired
	};
	var Dashboard$2 = reactRedux.connect(mapStateToProps$2)(Dashboard$1);

	const BreadcrumbsContainer = styled__default.nav.attrs({
	  className: 'breadcrumb'
	}).withConfig({
	  displayName: "breadcrumbs__BreadcrumbsContainer",
	  componentId: "yjyesi-0"
	})(["&&&{margin:", ";font-size:", ";}"], ({
	  theme
	}) => `-${theme.sizes.padding} 0 ${theme.sizes.padding} -10px`, ({
	  theme
	}) => theme.fonts.base);
	const BreadcrumbLink = styled__default(reactRouterDom.Link).withConfig({
	  displayName: "breadcrumbs__BreadcrumbLink",
	  componentId: "yjyesi-1"
	})(["&&&{color:", ";&:hover{color:", ";}}"], ({
	  theme
	}) => theme.colors.lightText, ({
	  theme
	}) => theme.colors.primary);
	/**
	 * @memberof Breadcrumbs
	 */

	/**
	 * @component
	 * @private
	 */
	class Breadcrumbs extends React__default.PureComponent {
	  renderResource() {
	    const {
	      resource,
	      record
	    } = this.props;
	    return React__default.createElement("li", null, React__default.createElement(BreadcrumbLink, {
	      to: resource.href,
	      className: record && 'is-active'
	    }, resource.name));
	  }

	  renderAction() {
	    const {
	      actionName,
	      resource,
	      record
	    } = this.props;
	    const action = resource.resourceActions.find(a => a.name === actionName) || record && record.recordActions.find(a => a.name === actionName);

	    if (action) {
	      return React__default.createElement("li", {
	        className: "is-active"
	      }, React__default.createElement(BreadcrumbLink, {
	        href: "#"
	      }, action.label));
	    }

	    return null;
	  }

	  render() {
	    return React__default.createElement(BreadcrumbsContainer, null, React__default.createElement("ul", null, this.renderResource(), this.renderAction()));
	  }

	}

	let globalAny$1 = {};

	try {
	  globalAny$1 = window;
	} catch (error) {
	  if (error.message !== 'window is not defined') {
	    throw error;
	  }
	}

	const checkLogin = response => {
	  const loginUrl = [window.location.origin, globalAny$1.REDUX_STATE.paths.loginPath].join('');

	  if (response.request.responseURL && response.request.responseURL.match(loginUrl)) {
	    // eslint-disable-next-line no-undef
	    alert('Your session expired. You will be redirected to login screen');
	    window.location.assign(loginUrl);
	  }
	};
	/**
	 * Client which access the admin API.
	 * Use it to fetch data from auto generated AdminBro API.
	 *
	 * In the backend it uses [axios](https://github.com/axios/axios) client
	 * library.
	 *
	 * Usage:
	 * ```javascript
	 * import { ApiClient } from 'admin-bro'
	 *
	 * const api = new ApiClient()
	 * api.getRecords({ resourceId: 'Comments' }).then(results => {...})
	 * ```
	 * @see https://github.com/axios/axios
	 */


	class ApiClient {
	  constructor() {
	    this.baseURL = [window.location.origin, globalAny$1.REDUX_STATE.paths.rootPath].join('');
	    this.client = axios.create({
	      baseURL: this.baseURL
	    });
	  }
	  /**
	   * Search by query string for records in a given resource.
	   *
	   * @param   {Object}  options
	   * @param   {String}  options.resourceId  Id of a {@link ResourceJSON}
	   * @param   {String}  options.query       query string
	   *
	   * @return  {Promise<SearchResponse>}
	   */


	  async searchRecords({
	    resourceId,
	    query
	  }) {
	    const q = encodeURIComponent(query);
	    const response = await this.client.get(`/api/resources/${resourceId}/search/${q}`);
	    checkLogin(response);
	    return response.data.records;
	  }
	  /**
	   * Invokes given resource {@link Action} on the backend.
	   *
	   * @param   {Object} options
	   * @param   {String} options.resourceId  id of a {@link BaseResource}
	   * @param   {String} options.actionName  name of an {@link Action}
	   * @param   {Object} [options.payload]   optional action payload
	   * @param   {Object} [options.params]    optional query params
	   * @param   {String} [options.method]    if there is a Payload it sends
	   *                                       POST request, otherwise GET.
	   * @return  {Promise<Object>}            response from an {@link Action}
	   */


	  async resourceAction({
	    resourceId,
	    actionName,
	    payload,
	    method,
	    params
	  }) {
	    const response = await this.client.request({
	      url: `/api/resources/${resourceId}/actions/${actionName}`,
	      method: method || payload ? 'POST' : 'GET',
	      data: payload,
	      params
	    });
	    checkLogin(response);
	    return response;
	  }
	  /**
	   * Invokes given record {@link Action} on the backend.
	   *
	   * @param   {Object} options
	   * @param   {String} options.resourceId  id of a {@link BaseResource}
	   * @param   {String} options.recordId    id of a {@link BaseRecord}
	   * @param   {String} options.actionName  name of an {@link Action}
	   * @param   {Object} [options.payload]   optional action payload
	   * @param   {Object} [options.params]    optional query params
	   * @param   {String} [options.method]    if there is a Payload it sends
	   *                                       POST request, otherwise GET.
	   * @return  {Promise<Object>}            response from an {@link Action}
	   */


	  async recordAction({
	    resourceId,
	    recordId,
	    actionName,
	    payload,
	    method,
	    params
	  }) {
	    const response = await this.client.request({
	      url: `/api/resources/${resourceId}/records/${recordId}/${actionName}`,
	      method: method || payload ? 'POST' : 'GET',
	      data: payload,
	      params
	    });
	    checkLogin(response);
	    return response;
	  }

	  async getDashboard({
	    params = {}
	  } = {}) {
	    const response = await this.client.get('/api/dashboard', {
	      params
	    });
	    checkLogin(response);
	    return response;
	  }

	}

	/* eslint-disable @typescript-eslint/explicit-function-return-type */
	const addNotice = (data = {}) => ({
	  type: 'ADD_NOTICE',
	  data: {
	    message: data.message,
	    id: data.id || Math.random().toString(36).substr(2, 9),
	    type: data.type || 'success',
	    progress: 0
	  }
	});
	const setNoticeProgress = ({
	  noticeId,
	  progress
	}) => ({
	  type: 'SET_NOTICE_PROGRESS',
	  data: {
	    noticeId,
	    progress
	  }
	});
	const dropNotice = noticeId => ({
	  type: 'DROP_NOTICE',
	  data: {
	    noticeId
	  }
	});

	const resourcesReducer = (state = [], action) => {
	  switch (action.type) {
	    case 'RESOURCES_INITIALIZE':
	      return action.data;

	    default:
	      return state;
	  }
	};

	const brandingReducer = (state = {}, action) => {
	  switch (action.type) {
	    case 'BRANDING_INITIALIZE':
	      return action.data;

	    default:
	      return state;
	  }
	};

	const pathsReducer = (state = {}, action) => {
	  switch (action.type) {
	    case 'PATHS_INITIALIZE':
	      return action.data;

	    default:
	      return state;
	  }
	};

	const dashboardReducer = (state = {}, action) => {
	  switch (action.type) {
	    case 'DASHBOARD_INITIALIZE':
	      return action.data;

	    default:
	      return state;
	  }
	};

	const sessionReducer = (state = null, action) => {
	  switch (action.type) {
	    case 'SESSION_INITIALIZE':
	      return action.data;

	    default:
	      return state;
	  }
	};

	const versionsReducer = (state = {}, action) => {
	  switch (action.type) {
	    case 'VERSIONS_INITIALIZE':
	      return {
	        admin: action.data.admin,
	        app: action.data.app
	      };

	    default:
	      return state;
	  }
	};

	const noticesReducer = (state = [], action) => {
	  switch (action.type) {
	    case 'ADD_NOTICE':
	      {
	        const notices = [action.data];
	        return notices;
	      }

	    case 'DROP_NOTICE':
	      {
	        return state.filter(notice => notice.id !== action.data.noticeId);
	      }

	    case 'SET_NOTICE_PROGRESS':
	      {
	        return state.map(notice => ({ ...notice,
	          progress: notice.id === action.data.noticeId ? action.data.progress : notice.progress
	        }));
	      }

	    default:
	      return state;
	  }
	};

	const reducer = redux.combineReducers({
	  resources: resourcesReducer,
	  branding: brandingReducer,
	  paths: pathsReducer,
	  session: sessionReducer,
	  dashboard: dashboardReducer,
	  notices: noticesReducer,
	  versions: versionsReducer
	});
	var createStore = ((initialState = {}) => redux.createStore(reducer, initialState));

	const mapDispatchToProps = dispatch => ({
	  addNotice: notice => dispatch(addNotice(notice))
	});

	var withNotice = reactRedux.connect(null, mapDispatchToProps);

	/* eslint-disable no-undef */
	/**
	 * Renders Button for an action
	 *
	 * @private
	 * @component
	 */

	class ActionButton extends React__default.PureComponent {
	  constructor(props) {
	    super(props);
	    this.handleClick = this.handleClick.bind(this);
	  }

	  handleClick(event) {
	    const {
	      action,
	      resourceId,
	      recordId,
	      location,
	      history,
	      actionPerformed,
	      addNotice
	    } = this.props;

	    if (action.guard && !confirm(action.guard)) {
	      event.preventDefault();
	      return;
	    }

	    if (typeof action.component !== 'undefined' && action.component === false) {
	      event.preventDefault();
	      const api = new ApiClient();
	      const apiAction = recordId ? api.recordAction : api.resourceAction;
	      apiAction.bind(api)({
	        resourceId,
	        actionName: action.name,
	        recordId
	      }).then(response => {
	        addNotice({
	          message: `action ${action.name} has been successfully performed`
	        });

	        if (location.pathname !== response.data.redirectUrl) {
	          history.push(response.data.redirectUrl);
	        }

	        if (actionPerformed) {
	          actionPerformed(action.name);
	        }
	      });
	    }
	  }

	  render() {
	    const h = new ViewHelpers();
	    const {
	      resourceId,
	      recordId,
	      action,
	      className
	    } = this.props;
	    const actionName = action.name;
	    const href = recordId ? h.recordActionUrl({
	      resourceId,
	      recordId,
	      actionName
	    }) : h.resourceActionUrl({
	      resourceId,
	      actionName
	    });
	    return React__default.createElement(StyledButton, {
	      to: href,
	      className: `button ${className}`,
	      onClick: this.handleClick
	    }, React__default.createElement("span", {
	      className: "icon"
	    }, React__default.createElement("i", {
	      className: action.icon
	    })), React__default.createElement("div", {
	      className: "btn-text"
	    }, action.label));
	  }

	}

	ActionButton.propTypes = {
	  action: actionType.isRequired,
	  className: PropTypes$1.string.isRequired,
	  resourceId: PropTypes$1.string.isRequired,
	  recordId: PropTypes$1.string,
	  location: locationType.isRequired,
	  history: historyType.isRequired,
	  actionPerformed: PropTypes$1.func,
	  addNotice: PropTypes$1.func.isRequired
	};
	ActionButton.defaultProps = {
	  recordId: null,
	  actionPerformed: null
	};
	var ActionButton$1 = withNotice(reactRouterDom.withRouter(ActionButton));

	const HeaderWrapper = styled__default.section.attrs({
	  className: 'level'
	}).withConfig({
	  displayName: "action-header__HeaderWrapper",
	  componentId: "sc-17u6jqx-0"
	})(["&&&{margin-bottom:", ";}"], ({
	  theme
	}) => theme.sizes.padding);
	const Tag = styled__default.span.attrs({
	  className: 'tag'
	}).withConfig({
	  displayName: "action-header__Tag",
	  componentId: "sc-17u6jqx-1"
	})(["&&&{background:", ";color:#fff;margin-left:", ";}"], ({
	  theme
	}) => theme.colors.primary, ({
	  theme
	}) => theme.sizes.padding);
	const BackBtn = styled__default(reactRouterDom.Link).withConfig({
	  displayName: "action-header__BackBtn",
	  componentId: "sc-17u6jqx-2"
	})(["&&&{border-radius:50%;width:", ";height:", ";color:", ";font-size:", ";padding:", ";background-color:", ";text-align:center;margin-right:", ";&:hover{background-color:", ";color:#fff;}}"], ({
	  theme
	}) => theme.sizes.paddingLayout, ({
	  theme
	}) => theme.sizes.paddingLayout, ({
	  theme
	}) => theme.colors.lightText, ({
	  theme
	}) => theme.fonts.base, ({
	  theme
	}) => theme.sizes.paddingMin, ({
	  theme
	}) => theme.colors.superLightBack, ({
	  theme
	}) => theme.sizes.padding, ({
	  theme
	}) => theme.colors.lightText);
	const HeaderTitle = styled__default.h1.attrs({
	  className: 'level-left'
	}).withConfig({
	  displayName: "action-header__HeaderTitle",
	  componentId: "sc-17u6jqx-3"
	})(["&&&{font-size:", ";font-weight:normal;}"], ({
	  theme
	}) => theme.fonts.header);
	const HeaderButtons = styled__default.div.attrs({
	  className: 'level-right'
	}).withConfig({
	  displayName: "action-header__HeaderButtons",
	  componentId: "sc-17u6jqx-4"
	})(["&&& a{margin-left:", ";}"], ({
	  theme
	}) => theme.sizes.padding);
	/**
	 * @memberof ActionHeader
	 * @private
	 */

	/**
	 * Header of an action
	 *
	 * @private
	 * @component
	 */
	const ActionHeader = props => {
	  const h = new ViewHelpers();
	  const {
	    resource,
	    toggleFilter,
	    actionPerformed,
	    record,
	    action,
	    tag,
	    recordId
	  } = props;
	  const resourceId = resource.id;
	  let actions = record ? record.recordActions : resource.resourceActions; // list action is not accessible via the ActionHeader buttons

	  actions = actions && actions.filter(ra => ![action && action.name, 'list'].includes(ra.name));
	  const title = action ? action.label : resource.name;
	  const isList = action && action.name === 'list';
	  return React__default.createElement(HeaderWrapper, null, React__default.createElement(HeaderTitle, null, !isList && React__default.createElement(BackBtn, {
	    to: h.resourceActionUrl({
	      resourceId,
	      actionName: 'list'
	    })
	  }, React__default.createElement("i", {
	    className: "icomoon-pagination-left"
	  })), title, tag ? React__default.createElement(Tag, null, tag) : ''), React__default.createElement(HeaderButtons, null, actions.map(headerAction => React__default.createElement(ActionButton$1, {
	    action: headerAction,
	    key: headerAction.name,
	    actionPerformed: actionPerformed,
	    className: "is-primary",
	    resourceId: resource.id,
	    recordId: recordId
	  })), toggleFilter && React__default.createElement(StyledButton, {
	    onClick: toggleFilter,
	    as: "a"
	  }, React__default.createElement("span", {
	    className: "icon"
	  }, React__default.createElement("i", {
	    className: "fas fa-sliders-h"
	  })), React__default.createElement("span", {
	    className: "btn-text"
	  }, "Filter"))));
	};

	const TIME_TO_DISAPPEAR = 3;
	const NoticeWrapper = styled__default.div.attrs({
	  className: 'notification'
	}).withConfig({
	  displayName: "notice__NoticeWrapper",
	  componentId: "sc-5gkpj-0"
	})(["max-width:100%;position:absolute;top:0;left:0;right:0;border-radius:0;border-style:none none solid none;border-width:1px;padding:13px ", ";&:not(:last-child){margin-bottom:0;}&.success{background-color:", ";border-color:", ";& .progressBar{background-color:", ";}}&.error{background-color:", ";border-color:", ";& .delete:before,& .delete:after{background-color:", ";}& .progressBar{background-color:", ";}}& .delete{background:transparent;right:", ";top:", ";&:before,&:after{background-color:", ";}&:after{height:80%;width:1px;}&:before{width:80%;height:1px;}}& .progressBar{position:absolute;bottom:0;left:0;height:4px;background:#fff;transition:width 1s linear;}"], ({
	  theme
	}) => theme.sizes.paddingLayout, ({
	  theme
	}) => theme.colors.lightSuccess, ({
	  theme
	}) => theme.colors.success, ({
	  theme
	}) => theme.colors.success, ({
	  theme
	}) => theme.colors.lightError, ({
	  theme
	}) => theme.colors.error, ({
	  theme
	}) => theme.colors.error, ({
	  theme
	}) => theme.colors.error, ({
	  theme
	}) => theme.sizes.paddingLayout, ({
	  theme
	}) => theme.sizes.padding, ({
	  theme
	}) => theme.colors.success);

	class NoticeElement extends React__default.Component {
	  constructor(props) {
	    super(props);
	    const {
	      notice
	    } = props;
	    this.state = {
	      progress: notice.progress || 0
	    };
	  }

	  componentDidMount() {
	    const {
	      drop,
	      notice,
	      notifyProgress
	    } = this.props;
	    this.timer = setInterval(() => {
	      this.setState(state => {
	        const progress = state.progress + 100 / TIME_TO_DISAPPEAR;
	        notifyProgress({
	          noticeId: notice.id,
	          progress
	        });
	        return {
	          progress
	        };
	      });
	    }, 1000);
	    setTimeout(() => {
	      clearInterval(this.timer);
	      drop();
	    }, 1000 * (TIME_TO_DISAPPEAR + 1));
	  }

	  componentWillUnmount() {
	    clearInterval(this.timer);
	  }

	  render() {
	    const {
	      notice,
	      drop
	    } = this.props;
	    const {
	      progress
	    } = this.state;
	    return React__default.createElement(NoticeWrapper, {
	      className: notice.type
	    }, React__default.createElement("button", {
	      className: "delete",
	      onClick: drop,
	      type: "button"
	    }), notice.message, React__default.createElement("div", {
	      className: "progressBar",
	      style: {
	        width: `${progress}%`
	      }
	    }));
	  }

	}

	NoticeElement.propTypes = {
	  notice: noticeType.isRequired,
	  drop: PropTypes$1.func.isRequired,
	  notifyProgress: PropTypes$1.func.isRequired
	};

	const NoticeBox = props => {
	  const {
	    drop,
	    notices,
	    notifyProgress
	  } = props;
	  const notice = notices.length ? notices[notices.length - 1] : null;

	  if (notice) {
	    return React__default.createElement(NoticeElement, {
	      key: notice.id,
	      notice: notice,
	      drop: () => drop(notice.id),
	      notifyProgress: notifyProgress
	    });
	  }

	  return React__default.createElement("div", null);
	};

	NoticeBox.propTypes = {
	  notices: PropTypes$1.arrayOf(noticeType).isRequired,
	  drop: PropTypes$1.func.isRequired,
	  notifyProgress: PropTypes$1.func.isRequired
	};

	const mapStateToProps$3 = state => ({
	  notices: state.notices
	});

	const mapDispatchToProps$1 = dispatch => ({
	  drop: noticeId => dispatch(dropNotice(noticeId)),
	  notifyProgress: ({
	    noticeId,
	    progress
	  }) => dispatch(setNoticeProgress({
	    noticeId,
	    progress
	  }))
	});

	var Notice = reactRedux.connect(mapStateToProps$3, mapDispatchToProps$1)(NoticeBox);

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */

	var isBuffer = function isBuffer (obj) {
	  return obj != null && obj.constructor != null &&
	    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	};

	var flat = flatten;
	flatten.flatten = flatten;
	flatten.unflatten = unflatten;

	function flatten (target, opts) {
	  opts = opts || {};

	  var delimiter = opts.delimiter || '.';
	  var maxDepth = opts.maxDepth;
	  var output = {};

	  function step (object, prev, currentDepth) {
	    currentDepth = currentDepth || 1;
	    Object.keys(object).forEach(function (key) {
	      var value = object[key];
	      var isarray = opts.safe && Array.isArray(value);
	      var type = Object.prototype.toString.call(value);
	      var isbuffer = isBuffer(value);
	      var isobject = (
	        type === '[object Object]' ||
	        type === '[object Array]'
	      );

	      var newKey = prev
	        ? prev + delimiter + key
	        : key;

	      if (!isarray && !isbuffer && isobject && Object.keys(value).length &&
	        (!opts.maxDepth || currentDepth < maxDepth)) {
	        return step(value, newKey, currentDepth + 1)
	      }

	      output[newKey] = value;
	    });
	  }

	  step(target);

	  return output
	}

	function unflatten (target, opts) {
	  opts = opts || {};

	  var delimiter = opts.delimiter || '.';
	  var overwrite = opts.overwrite || false;
	  var result = {};

	  var isbuffer = isBuffer(target);
	  if (isbuffer || Object.prototype.toString.call(target) !== '[object Object]') {
	    return target
	  }

	  // safely ensure that the key is
	  // an integer.
	  function getkey (key) {
	    var parsedKey = Number(key);

	    return (
	      isNaN(parsedKey) ||
	      key.indexOf('.') !== -1 ||
	      opts.object
	    ) ? key
	      : parsedKey
	  }

	  var sortedKeys = Object.keys(target).sort(function (keyA, keyB) {
	    return keyA.length - keyB.length
	  });

	  sortedKeys.forEach(function (key) {
	    var split = key.split(delimiter);
	    var key1 = getkey(split.shift());
	    var key2 = getkey(split[0]);
	    var recipient = result;

	    while (key2 !== undefined) {
	      var type = Object.prototype.toString.call(recipient[key1]);
	      var isobject = (
	        type === '[object Object]' ||
	        type === '[object Array]'
	      );

	      // do not write over falsey, non-undefined values if overwrite is false
	      if (!overwrite && !isobject && typeof recipient[key1] !== 'undefined') {
	        return
	      }

	      if ((overwrite && !isobject) || (!overwrite && recipient[key1] == null)) {
	        recipient[key1] = (
	          typeof key2 === 'number' &&
	          !opts.object ? [] : {}
	        );
	      }

	      recipient = recipient[key1];
	      if (split.length > 0) {
	        key1 = getkey(split.shift());
	        key2 = getkey(split[0]);
	      }
	    }

	    // unflatten again for 'messy objects'
	    recipient[key1] = unflatten(target[key], opts);
	  });

	  return result
	}
	var flat_1 = flat.flatten;
	var flat_2 = flat.unflatten;

	/**
	 * Converts flatten params to array items when given property is an array.
	 *
	 * What problem it solves:
	 * so let say user has a record with record.property:
	 * ```
	 * Item.0.imageVariants.0.dateCreated: "2019-09-19T10:00:00.000Z"
	 * Item.0.imageVariants.0.imageURL: "url to help"
	 * Item.0.imageVariants.0.isApproved: true
	 * Item.0.imageVariants.0.isDeleted: false
	 * Item.0.imageVariants.1.dateCreated: "2019-09-19T19:10:34.919Z"
	 * Item.0.imageVariants.1.imageURL: "url 2"
	 * ```
	 *
	 * this function for property: `Item.0.imageVariants` should return array with 2 items. Where for
	 * property `Item` array with one element
	 *
	 * @param {PropertyJSON} property
	 * @param {RecordJSON} record
	 *
	 * @private
	 */

	const convertParamsToArrayItems = (property, record) => {
	  const tempName = 'arrayField';
	  const regex = new RegExp(`^${property.name}`);
	  /**
	   * in this step we filter keys which starts with regex the same as name. So let say
	   * property name is: Item.0.imageVariants and the record.params is:
	   * {
	   *  'anyOtherKey': 'value'
	   *  'Item.0.imageVariants.0.dateCreated': '2019-09-19T10:00:00.000Z',
	   *  'Item.0.imageVariants.0.imageURL': 'url to help'
	   * }
	   *
	   * so keys will be `Item.0.imageVariants.0.dateCreated` and `Item.0.imageVariants.0.imageURL`
	   */

	  const keys = Object.keys(record.params).filter(key => key.match(regex));
	  /**
	   * Next, we create new object with only those keys. But we have to rename the regex part
	   * because it could has dots (take a look at const tempName = 'arrayField' on the top).
	   * If we didn't do this - then unflatten function wouldn't work.
	   *
	   * so in our example obj is not: {
	   *  'Item.0.imageVariants.0.dateCreated': '2019-09-19T10:00:00.000Z',
	   *  'Item.0.imageVariants.0.imageURL': 'url to help'
	   * }
	   *
	   * but: {
	   *  'arrayField.0.dateCreated': '2019-09-19T10:00:00.000Z',
	   *  'arrayField.0.imageURL': 'url to help'
	   * }
	   */

	  const obj = keys.reduce((memo, key) => ({ ...memo,
	    [key.replace(regex, tempName)]: record.params[key]
	  }), {});
	  /**
	   * In the last step we unflatten the object and return 'tempName' property:
	   * {
	   *  'arrayField: [{
	   *     dateCreated': '2019-09-19T10:00:00.000Z',
	   *     'arrayField.0.imageURL': 'url to help',
	   *   }],
	   * }['arrayField']
	   */

	  return flat_2(obj)[tempName] || [];
	};

	class Edit extends React__default.Component {
	  constructor(props) {
	    super(props);
	    const {
	      property,
	      record
	    } = this.props;
	    const items = convertParamsToArrayItems(property, record);
	    this.state = {
	      items
	    };
	  }

	  addNew() {
	    this.setState(state => ({ ...state,
	      items: [...state.items, '']
	    }));
	  }

	  removeItem(i) {
	    const {
	      property,
	      record,
	      onChange
	    } = this.props;
	    const {
	      items
	    } = this.state;
	    const newItems = [...items];
	    newItems.splice(i, 1);
	    const newRecord = { ...record
	    };
	    newRecord.params = flat_1({ ...flat_2(newRecord.params),
	      [property.name]: newItems
	    });
	    this.setState(state => ({ ...state,
	      items: newItems
	    }));
	    onChange(newRecord);
	  }

	  renderItem(item, i) {
	    const {
	      ItemComponent,
	      property
	    } = this.props;
	    return React__default.createElement(Columns, {
	      key: i
	    }, React__default.createElement(Column, {
	      width: 10
	    }, React__default.createElement(ItemComponent, _extends_1({}, this.props, {
	      property: { ...property,
	        name: `${property.name}.${i}`,
	        label: `[${i + 1}]`,
	        isArray: false
	      }
	    }))), React__default.createElement(Column, {
	      width: 2
	    }, React__default.createElement(StyledButton, {
	      style: {
	        marginTop: 25
	      },
	      onClick: () => this.removeItem(i)
	    }, "Remove")));
	  }

	  renderInput() {
	    const {
	      items
	    } = this.state;
	    return React__default.createElement(StyledSection, {
	      style: {
	        marginTop: 20
	      }
	    }, items.map((item, i) => this.renderItem(item, i)), React__default.createElement("p", null, React__default.createElement(StyledButton, {
	      onClick: () => this.addNew()
	    }, "Add new item")));
	  }

	  render() {
	    const {
	      property,
	      record
	    } = this.props;
	    const error = record.errors && record.errors[property.name];
	    return React__default.createElement(PropertyInEdit, {
	      property: property,
	      error: error
	    }, this.renderInput());
	  }

	}
	Edit.propTypes = {
	  property: simplifiedPropertyType.isRequired,
	  record: recordType.isRequired,
	  onChange: PropTypes$1.func.isRequired,
	  ItemComponent: PropTypes$1.elementType.isRequired
	};

	class List extends React__default.PureComponent {
	  render() {
	    const {
	      property,
	      record,
	      resource
	    } = this.props;
	    const showAction = record.recordActions.find(a => a.name === 'show');
	    const values = flat_2(record.params)[property.name] || [];

	    if (resource.titleProperty.name === property.name && showAction) {
	      const h = new ViewHelpers();
	      const href = h.recordActionUrl({
	        resourceId: resource.id,
	        recordId: record.id,
	        actionName: 'show'
	      });
	      return React__default.createElement(reactRouterDom.Link, {
	        to: href
	      }, `length: ${values.length}`);
	    }

	    return React__default.createElement("span", null, `length: ${values.length}`);
	  }

	}

	class Show extends React__default.PureComponent {
	  render() {
	    const {
	      property,
	      record,
	      ItemComponent
	    } = this.props;
	    const items = convertParamsToArrayItems(property, record);
	    return React__default.createElement(PropertyInShow, {
	      property: property
	    }, React__default.createElement(StyledSection, null, items.map((item, i) => React__default.createElement(ItemComponent, _extends_1({}, this.props, {
	      // eslint-disable-next-line react/no-array-index-key
	      key: i,
	      property: { ...property,
	        name: `${property.name}.${i}`,
	        label: `[${i + 1}]`,
	        isArray: false
	      }
	    })))));
	  }

	}
	Show.propTypes = {
	  property: propertyType.isRequired,
	  record: recordType.isRequired,
	  ItemComponent: PropTypes$1.elementType.isRequired
	};

	// import Show from './show'
	var ArrayType = {
	  show: Show,
	  edit: Edit,
	  list: List,
	  filter: () => ''
	};

	const Edit$1 = props => {
	  const {
	    property,
	    record,
	    ItemComponent
	  } = props;
	  const error = record.errors && record.errors[property.name];
	  return React__default.createElement(PropertyInEdit, {
	    property: property,
	    error: error
	  }, React__default.createElement(StyledSection, null, property.subProperties.map(subProperty => React__default.createElement(ItemComponent, _extends_1({}, props, {
	    key: subProperty.name,
	    property: { ...subProperty,
	      name: `${property.name}.${subProperty.name}`
	    }
	  })))));
	};

	Edit$1.propTypes = {
	  property: simplifiedPropertyType.isRequired,
	  record: recordType.isRequired,
	  ItemComponent: PropTypes$1.elementType.isRequired
	};

	const Show$1 = props => {
	  const {
	    property,
	    ItemComponent
	  } = props;
	  return React__default.createElement(PropertyInShow, {
	    property: property
	  }, React__default.createElement(StyledSection, null, property.subProperties.map(subProperty => React__default.createElement(ItemComponent, _extends_1({}, props, {
	    key: subProperty.name,
	    property: { ...subProperty,
	      name: `${property.name}.${subProperty.name}`
	    }
	  })))));
	};

	Show$1.propTypes = {
	  property: simplifiedPropertyType.isRequired,
	  ItemComponent: PropTypes$1.elementType.isRequired
	};

	// TODO define ItemComponent interface
	class List$1 extends React__default.PureComponent {
	  renderItems() {
	    const {
	      property,
	      ItemComponent
	    } = this.props;
	    return React__default.createElement(React__default.Fragment, null, property.subProperties.map(subProperty => React__default.createElement("div", null, React__default.createElement(Label, {
	      style: {
	        display: 'inline'
	      }
	    }, `${subProperty.label}: `), React__default.createElement(ItemComponent, _extends_1({}, this.props, {
	      key: subProperty.name,
	      property: { ...subProperty,
	        name: `${property.name}.${subProperty.name}`
	      }
	    })))));
	  }

	  render() {
	    const {
	      property,
	      record,
	      resource
	    } = this.props;
	    const showAction = record.recordActions.find(a => a.name === 'show');

	    if (resource.titleProperty.name === property.name && showAction) {
	      const h = new ViewHelpers();
	      const href = h.recordActionUrl({
	        resourceId: resource.id,
	        recordId: record.id,
	        actionName: 'show'
	      });
	      return React__default.createElement(reactRouterDom.Link, {
	        to: href
	      }, this.renderItems());
	    }

	    return this.renderItems();
	  }

	}

	// import Show from './show'
	var MixedType = {
	  show: Show$1,
	  edit: Edit$1,
	  list: List$1,
	  filter: () => ''
	};

	class Show$2 extends React__default.PureComponent {
	  render() {
	    const {
	      property,
	      record
	    } = this.props;
	    const value = record.params[property.name];
	    const className = property.availableValues ? 'tag' : '';
	    return React__default.createElement(PropertyInShow, {
	      property: property
	    }, React__default.createElement("span", {
	      className: className
	    }, value));
	  }

	}
	Show$2.propTypes = {
	  property: propertyType.isRequired,
	  record: recordType.isRequired
	};

	function areInputsEqual(newInputs, lastInputs) {
	    if (newInputs.length !== lastInputs.length) {
	        return false;
	    }
	    for (var i = 0; i < newInputs.length; i++) {
	        if (newInputs[i] !== lastInputs[i]) {
	            return false;
	        }
	    }
	    return true;
	}

	function memoizeOne(resultFn, isEqual) {
	    if (isEqual === void 0) { isEqual = areInputsEqual; }
	    var lastThis;
	    var lastArgs = [];
	    var lastResult;
	    var calledOnce = false;
	    function memoized() {
	        var newArgs = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            newArgs[_i] = arguments[_i];
	        }
	        if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
	            return lastResult;
	        }
	        lastResult = resultFn.apply(this, newArgs);
	        calledOnce = true;
	        lastThis = this;
	        lastArgs = newArgs;
	        return lastResult;
	    }
	    return memoized;
	}

	function memoize(fn) {
	  var cache = {};
	  return function (arg) {
	    if (cache[arg] === undefined) cache[arg] = fn(arg);
	    return cache[arg];
	  };
	}

	var unitlessKeys = {
	  animationIterationCount: 1,
	  borderImageOutset: 1,
	  borderImageSlice: 1,
	  borderImageWidth: 1,
	  boxFlex: 1,
	  boxFlexGroup: 1,
	  boxOrdinalGroup: 1,
	  columnCount: 1,
	  columns: 1,
	  flex: 1,
	  flexGrow: 1,
	  flexPositive: 1,
	  flexShrink: 1,
	  flexNegative: 1,
	  flexOrder: 1,
	  gridRow: 1,
	  gridRowEnd: 1,
	  gridRowSpan: 1,
	  gridRowStart: 1,
	  gridColumn: 1,
	  gridColumnEnd: 1,
	  gridColumnSpan: 1,
	  gridColumnStart: 1,
	  fontWeight: 1,
	  lineHeight: 1,
	  opacity: 1,
	  order: 1,
	  orphans: 1,
	  tabSize: 1,
	  widows: 1,
	  zIndex: 1,
	  zoom: 1,
	  WebkitLineClamp: 1,
	  // SVG-related properties
	  fillOpacity: 1,
	  floodOpacity: 1,
	  stopOpacity: 1,
	  strokeDasharray: 1,
	  strokeDashoffset: 1,
	  strokeMiterlimit: 1,
	  strokeOpacity: 1,
	  strokeWidth: 1
	};

	/* eslint-disable */
	// murmurhash2 via https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js
	function murmurhash2_32_gc(str) {
	  var l = str.length,
	      h = l ^ l,
	      i = 0,
	      k;

	  while (l >= 4) {
	    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
	    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	    k ^= k >>> 24;
	    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	    h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;
	    l -= 4;
	    ++i;
	  }

	  switch (l) {
	    case 3:
	      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

	    case 2:
	      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

	    case 1:
	      h ^= str.charCodeAt(i) & 0xff;
	      h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	  }

	  h ^= h >>> 13;
	  h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	  h ^= h >>> 15;
	  return (h >>> 0).toString(36);
	}

	function stylis_min (W) {
	  function M(d, c, e, h, a) {
	    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
	      g = e.charCodeAt(l);
	      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

	      if (0 === b + n + v + m) {
	        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
	          switch (g) {
	            case 32:
	            case 9:
	            case 59:
	            case 13:
	            case 10:
	              break;

	            default:
	              f += e.charAt(l);
	          }

	          g = 59;
	        }

	        switch (g) {
	          case 123:
	            f = f.trim();
	            q = f.charCodeAt(0);
	            k = 1;

	            for (t = ++l; l < B;) {
	              switch (g = e.charCodeAt(l)) {
	                case 123:
	                  k++;
	                  break;

	                case 125:
	                  k--;
	                  break;

	                case 47:
	                  switch (g = e.charCodeAt(l + 1)) {
	                    case 42:
	                    case 47:
	                      a: {
	                        for (u = l + 1; u < J; ++u) {
	                          switch (e.charCodeAt(u)) {
	                            case 47:
	                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
	                                l = u + 1;
	                                break a;
	                              }

	                              break;

	                            case 10:
	                              if (47 === g) {
	                                l = u + 1;
	                                break a;
	                              }

	                          }
	                        }

	                        l = u;
	                      }

	                  }

	                  break;

	                case 91:
	                  g++;

	                case 40:
	                  g++;

	                case 34:
	                case 39:
	                  for (; l++ < J && e.charCodeAt(l) !== g;) {
	                  }

	              }

	              if (0 === k) break;
	              l++;
	            }

	            k = e.substring(t, l);
	            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

	            switch (q) {
	              case 64:
	                0 < r && (f = f.replace(N, ''));
	                g = f.charCodeAt(1);

	                switch (g) {
	                  case 100:
	                  case 109:
	                  case 115:
	                  case 45:
	                    r = c;
	                    break;

	                  default:
	                    r = O;
	                }

	                k = M(c, r, k, g, a + 1);
	                t = k.length;
	                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
	                if (0 < t) switch (g) {
	                  case 115:
	                    f = f.replace(da, ea);

	                  case 100:
	                  case 109:
	                  case 45:
	                    k = f + '{' + k + '}';
	                    break;

	                  case 107:
	                    f = f.replace(fa, '$1 $2');
	                    k = f + '{' + k + '}';
	                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
	                    break;

	                  default:
	                    k = f + k, 112 === h && (k = (p += k, ''));
	                } else k = '';
	                break;

	              default:
	                k = M(c, X(c, f, I), k, h, a + 1);
	            }

	            F += k;
	            k = I = r = u = q = 0;
	            f = '';
	            g = e.charCodeAt(++l);
	            break;

	          case 125:
	          case 59:
	            f = (0 < r ? f.replace(N, '') : f).trim();
	            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
	              case 0:
	                break;

	              case 64:
	                if (105 === g || 99 === g) {
	                  G += f + e.charAt(l);
	                  break;
	                }

	              default:
	                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
	            }
	            I = r = u = q = 0;
	            f = '';
	            g = e.charCodeAt(++l);
	        }
	      }

	      switch (g) {
	        case 13:
	        case 10:
	          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
	          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
	          z = 1;
	          D++;
	          break;

	        case 59:
	        case 125:
	          if (0 === b + n + v + m) {
	            z++;
	            break;
	          }

	        default:
	          z++;
	          y = e.charAt(l);

	          switch (g) {
	            case 9:
	            case 32:
	              if (0 === n + m + b) switch (x) {
	                case 44:
	                case 58:
	                case 9:
	                case 32:
	                  y = '';
	                  break;

	                default:
	                  32 !== g && (y = ' ');
	              }
	              break;

	            case 0:
	              y = '\\0';
	              break;

	            case 12:
	              y = '\\f';
	              break;

	            case 11:
	              y = '\\v';
	              break;

	            case 38:
	              0 === n + b + m && (r = I = 1, y = '\f' + y);
	              break;

	            case 108:
	              if (0 === n + b + m + E && 0 < u) switch (l - u) {
	                case 2:
	                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

	                case 8:
	                  111 === K && (E = K);
	              }
	              break;

	            case 58:
	              0 === n + b + m && (u = l);
	              break;

	            case 44:
	              0 === b + v + n + m && (r = 1, y += '\r');
	              break;

	            case 34:
	            case 39:
	              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
	              break;

	            case 91:
	              0 === n + b + v && m++;
	              break;

	            case 93:
	              0 === n + b + v && m--;
	              break;

	            case 41:
	              0 === n + b + m && v--;
	              break;

	            case 40:
	              if (0 === n + b + m) {
	                if (0 === q) switch (2 * x + 3 * K) {
	                  case 533:
	                    break;

	                  default:
	                    q = 1;
	                }
	                v++;
	              }

	              break;

	            case 64:
	              0 === b + v + n + m + u + k && (k = 1);
	              break;

	            case 42:
	            case 47:
	              if (!(0 < n + m + v)) switch (b) {
	                case 0:
	                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
	                    case 235:
	                      b = 47;
	                      break;

	                    case 220:
	                      t = l, b = 42;
	                  }

	                  break;

	                case 42:
	                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
	              }
	          }

	          0 === b && (f += y);
	      }

	      K = x;
	      x = g;
	      l++;
	    }

	    t = p.length;

	    if (0 < t) {
	      r = c;
	      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
	      p = r.join(',') + '{' + p + '}';

	      if (0 !== w * E) {
	        2 !== w || L(p, 2) || (E = 0);

	        switch (E) {
	          case 111:
	            p = p.replace(ha, ':-moz-$1') + p;
	            break;

	          case 112:
	            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
	        }

	        E = 0;
	      }
	    }

	    return G + p + F;
	  }

	  function X(d, c, e) {
	    var h = c.trim().split(ia);
	    c = h;
	    var a = h.length,
	        m = d.length;

	    switch (m) {
	      case 0:
	      case 1:
	        var b = 0;

	        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
	          c[b] = Z(d, c[b], e).trim();
	        }

	        break;

	      default:
	        var v = b = 0;

	        for (c = []; b < a; ++b) {
	          for (var n = 0; n < m; ++n) {
	            c[v++] = Z(d[n] + ' ', h[b], e).trim();
	          }
	        }

	    }

	    return c;
	  }

	  function Z(d, c, e) {
	    var h = c.charCodeAt(0);
	    33 > h && (h = (c = c.trim()).charCodeAt(0));

	    switch (h) {
	      case 38:
	        return c.replace(F, '$1' + d.trim());

	      case 58:
	        return d.trim() + c.replace(F, '$1' + d.trim());

	      default:
	        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
	    }

	    return d + c;
	  }

	  function P(d, c, e, h) {
	    var a = d + ';',
	        m = 2 * c + 3 * e + 4 * h;

	    if (944 === m) {
	      d = a.indexOf(':', 9) + 1;
	      var b = a.substring(d, a.length - 1).trim();
	      b = a.substring(0, d).trim() + b + ';';
	      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
	    }

	    if (0 === w || 2 === w && !L(a, 1)) return a;

	    switch (m) {
	      case 1015:
	        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

	      case 951:
	        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

	      case 963:
	        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

	      case 1009:
	        if (100 !== a.charCodeAt(4)) break;

	      case 969:
	      case 942:
	        return '-webkit-' + a + a;

	      case 978:
	        return '-webkit-' + a + '-moz-' + a + a;

	      case 1019:
	      case 983:
	        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

	      case 883:
	        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
	        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
	        break;

	      case 932:
	        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
	          case 103:
	            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

	          case 115:
	            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

	          case 98:
	            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
	        }
	        return '-webkit-' + a + '-ms-' + a + a;

	      case 964:
	        return '-webkit-' + a + '-ms-flex-' + a + a;

	      case 1023:
	        if (99 !== a.charCodeAt(8)) break;
	        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
	        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

	      case 1005:
	        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

	      case 1e3:
	        b = a.substring(13).trim();
	        c = b.indexOf('-') + 1;

	        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
	          case 226:
	            b = a.replace(G, 'tb');
	            break;

	          case 232:
	            b = a.replace(G, 'tb-rl');
	            break;

	          case 220:
	            b = a.replace(G, 'lr');
	            break;

	          default:
	            return a;
	        }

	        return '-webkit-' + a + '-ms-' + b + a;

	      case 1017:
	        if (-1 === a.indexOf('sticky', 9)) break;

	      case 975:
	        c = (a = d).length - 10;
	        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

	        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
	          case 203:
	            if (111 > b.charCodeAt(8)) break;

	          case 115:
	            a = a.replace(b, '-webkit-' + b) + ';' + a;
	            break;

	          case 207:
	          case 102:
	            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
	        }

	        return a + ';';

	      case 938:
	        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
	          case 105:
	            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

	          case 115:
	            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

	          default:
	            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
	        }
	        break;

	      case 973:
	      case 989:
	        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

	      case 931:
	      case 953:
	        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
	        break;

	      case 962:
	        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
	    }

	    return a;
	  }

	  function L(d, c) {
	    var e = d.indexOf(1 === c ? ':' : '{'),
	        h = d.substring(0, 3 !== c ? e : 10);
	    e = d.substring(e + 1, d.length - 1);
	    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
	  }

	  function ea(d, c) {
	    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
	    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
	  }

	  function H(d, c, e, h, a, m, b, v, n, q) {
	    for (var g = 0, x = c, w; g < A; ++g) {
	      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
	        case void 0:
	        case !1:
	        case !0:
	        case null:
	          break;

	        default:
	          x = w;
	      }
	    }

	    if (x !== c) return x;
	  }

	  function T(d) {
	    switch (d) {
	      case void 0:
	      case null:
	        A = S.length = 0;
	        break;

	      default:
	        switch (d.constructor) {
	          case Array:
	            for (var c = 0, e = d.length; c < e; ++c) {
	              T(d[c]);
	            }

	            break;

	          case Function:
	            S[A++] = d;
	            break;

	          case Boolean:
	            Y = !!d | 0;
	        }

	    }

	    return T;
	  }

	  function U(d) {
	    d = d.prefix;
	    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
	    return U;
	  }

	  function B(d, c) {
	    var e = d;
	    33 > e.charCodeAt(0) && (e = e.trim());
	    V = e;
	    e = [V];

	    if (0 < A) {
	      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
	      void 0 !== h && 'string' === typeof h && (c = h);
	    }

	    var a = M(O, e, c, 0, 0);
	    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
	    V = '';
	    E = 0;
	    z = D = 1;
	    return a;
	  }

	  var ca = /^\0+/g,
	      N = /[\0\r\f]/g,
	      aa = /: */g,
	      ka = /zoo|gra/,
	      ma = /([,: ])(transform)/g,
	      ia = /,\r+?/g,
	      F = /([\t\r\n ])*\f?&/g,
	      fa = /@(k\w+)\s*(\S*)\s*/,
	      Q = /::(place)/g,
	      ha = /:(read-only)/g,
	      G = /[svh]\w+-[tblr]{2}/,
	      da = /\(\s*(.*)\s*\)/g,
	      oa = /([\s\S]*?);/g,
	      ba = /-self|flex-/g,
	      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
	      la = /stretch|:\s*\w+\-(?:conte|avail)/,
	      ja = /([^-])(image-set\()/,
	      z = 1,
	      D = 1,
	      E = 0,
	      w = 1,
	      O = [],
	      S = [],
	      A = 0,
	      R = null,
	      Y = 0,
	      V = '';
	  B.use = T;
	  B.set = U;
	  void 0 !== W && U(W);
	  return B;
	}

	var stylisRuleSheet = createCommonjsModule(function (module, exports) {
	(function (factory) {
		 (module['exports'] = factory()) ;
	}(function () {

		return function (insertRule) {
			var delimiter = '/*|*/';
			var needle = delimiter+'}';

			function toSheet (block) {
				if (block)
					try {
						insertRule(block + '}');
					} catch (e) {}
			}

			return function ruleSheet (context, content, selectors, parents, line, column, length, ns, depth, at) {
				switch (context) {
					// property
					case 1:
						// @import
						if (depth === 0 && content.charCodeAt(0) === 64)
							return insertRule(content+';'), ''
						break
					// selector
					case 2:
						if (ns === 0)
							return content + delimiter
						break
					// at-rule
					case 3:
						switch (ns) {
							// @font-face, @page
							case 102:
							case 112:
								return insertRule(selectors[0]+content), ''
							default:
								return content + (at === 0 ? delimiter : '')
						}
					case -2:
						content.split(needle).forEach(toSheet);
				}
			}
		}
	}));
	});

	var hyphenateRegex = /[A-Z]|^ms/g;
	var processStyleName = memoize(function (styleName) {
	  return styleName.replace(hyphenateRegex, '-$&').toLowerCase();
	});
	var processStyleValue = function processStyleValue(key, value) {
	  if (value == null || typeof value === 'boolean') {
	    return '';
	  }

	  if (unitlessKeys[key] !== 1 && key.charCodeAt(1) !== 45 && // custom properties
	  !isNaN(value) && value !== 0) {
	    return value + 'px';
	  }

	  return value;
	};

	{
	  var contentValuePattern = /(attr|calc|counters?|url)\(/;
	  var contentValues = ['normal', 'none', 'counter', 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote', 'initial', 'inherit', 'unset'];
	  var oldProcessStyleValue = processStyleValue;

	  processStyleValue = function processStyleValue(key, value) {
	    if (key === 'content') {
	      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
	        console.error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
	      }
	    }

	    return oldProcessStyleValue(key, value);
	  };
	}

	var classnames = function classnames(args) {
	  var len = args.length;
	  var i = 0;
	  var cls = '';

	  for (; i < len; i++) {
	    var arg = args[i];
	    if (arg == null) continue;
	    var toAdd = void 0;

	    switch (typeof arg) {
	      case 'boolean':
	        break;

	      case 'function':
	        {
	          console.error('Passing functions to cx is deprecated and will be removed in the next major version of Emotion.\n' + 'Please call the function before passing it to cx.');
	        }

	        toAdd = classnames([arg()]);
	        break;

	      case 'object':
	        {
	          if (Array.isArray(arg)) {
	            toAdd = classnames(arg);
	          } else {
	            toAdd = '';

	            for (var k in arg) {
	              if (arg[k] && k) {
	                toAdd && (toAdd += ' ');
	                toAdd += k;
	              }
	            }
	          }

	          break;
	        }

	      default:
	        {
	          toAdd = arg;
	        }
	    }

	    if (toAdd) {
	      cls && (cls += ' ');
	      cls += toAdd;
	    }
	  }

	  return cls;
	};
	var isBrowser = typeof document !== 'undefined';

	/*

	high performance StyleSheet for css-in-js systems

	- uses multiple style tags behind the scenes for millions of rules
	- uses `insertRule` for appending in production for *much* faster performance
	- 'polyfills' on server side

	// usage

	import StyleSheet from 'glamor/lib/sheet'
	let styleSheet = new StyleSheet()

	styleSheet.inject()
	- 'injects' the stylesheet into the page (or into memory if on server)

	styleSheet.insert('#box { border: 1px solid red; }')
	- appends a css rule into the stylesheet

	styleSheet.flush()
	- empties the stylesheet of all its contents

	*/
	// $FlowFixMe
	function sheetForTag(tag) {
	  if (tag.sheet) {
	    // $FlowFixMe
	    return tag.sheet;
	  } // this weirdness brought to you by firefox


	  for (var i = 0; i < document.styleSheets.length; i++) {
	    if (document.styleSheets[i].ownerNode === tag) {
	      // $FlowFixMe
	      return document.styleSheets[i];
	    }
	  }
	}

	function makeStyleTag(opts) {
	  var tag = document.createElement('style');
	  tag.setAttribute('data-emotion', opts.key || '');

	  if (opts.nonce !== undefined) {
	    tag.setAttribute('nonce', opts.nonce);
	  }

	  tag.appendChild(document.createTextNode('')) // $FlowFixMe
	  ;
	  (opts.container !== undefined ? opts.container : document.head).appendChild(tag);
	  return tag;
	}

	var StyleSheet =
	/*#__PURE__*/
	function () {
	  function StyleSheet(options) {
	    this.isSpeedy = "development" === 'production'; // the big drawback here is that the css won't be editable in devtools

	    this.tags = [];
	    this.ctr = 0;
	    this.opts = options;
	  }

	  var _proto = StyleSheet.prototype;

	  _proto.inject = function inject() {
	    if (this.injected) {
	      throw new Error('already injected!');
	    }

	    this.tags[0] = makeStyleTag(this.opts);
	    this.injected = true;
	  };

	  _proto.speedy = function speedy(bool) {
	    if (this.ctr !== 0) {
	      // cannot change speedy mode after inserting any rule to sheet. Either call speedy(${bool}) earlier in your app, or call flush() before speedy(${bool})
	      throw new Error("cannot change speedy now");
	    }

	    this.isSpeedy = !!bool;
	  };

	  _proto.insert = function insert(rule, sourceMap) {
	    // this is the ultrafast version, works across browsers
	    if (this.isSpeedy) {
	      var tag = this.tags[this.tags.length - 1];
	      var sheet = sheetForTag(tag);

	      try {
	        sheet.insertRule(rule, sheet.cssRules.length);
	      } catch (e) {
	        {
	          console.warn('illegal rule', rule); // eslint-disable-line no-console
	        }
	      }
	    } else {
	      var _tag = makeStyleTag(this.opts);

	      this.tags.push(_tag);

	      _tag.appendChild(document.createTextNode(rule + (sourceMap || '')));
	    }

	    this.ctr++;

	    if (this.ctr % 65000 === 0) {
	      this.tags.push(makeStyleTag(this.opts));
	    }
	  };

	  _proto.flush = function flush() {
	    // $FlowFixMe
	    this.tags.forEach(function (tag) {
	      return tag.parentNode.removeChild(tag);
	    });
	    this.tags = [];
	    this.ctr = 0; // todo - look for remnants in document.styleSheets

	    this.injected = false;
	  };

	  return StyleSheet;
	}();

	function createEmotion(context, options) {
	  if (context.__SECRET_EMOTION__ !== undefined) {
	    return context.__SECRET_EMOTION__;
	  }

	  if (options === undefined) options = {};
	  var key = options.key || 'css';

	  {
	    if (/[^a-z-]/.test(key)) {
	      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
	    }
	  }

	  var current;

	  function insertRule(rule) {
	    current += rule;

	    if (isBrowser) {
	      sheet.insert(rule, currentSourceMap);
	    }
	  }

	  var insertionPlugin = stylisRuleSheet(insertRule);
	  var stylisOptions;

	  if (options.prefix !== undefined) {
	    stylisOptions = {
	      prefix: options.prefix
	    };
	  }

	  var caches = {
	    registered: {},
	    inserted: {},
	    nonce: options.nonce,
	    key: key
	  };
	  var sheet = new StyleSheet(options);

	  if (isBrowser) {
	    // 🚀
	    sheet.inject();
	  }

	  var stylis = new stylis_min(stylisOptions);
	  stylis.use(options.stylisPlugins)(insertionPlugin);
	  var currentSourceMap = '';

	  function handleInterpolation(interpolation, couldBeSelectorInterpolation) {
	    if (interpolation == null) {
	      return '';
	    }

	    switch (typeof interpolation) {
	      case 'boolean':
	        return '';

	      case 'function':
	        if (interpolation.__emotion_styles !== undefined) {
	          var selector = interpolation.toString();

	          if (selector === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
	            throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
	          }

	          return selector;
	        }

	        if (this === undefined && "development" !== 'production') {
	          console.error('Interpolating functions in css calls is deprecated and will be removed in the next major version of Emotion.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
	        }

	        return handleInterpolation.call(this, this === undefined ? interpolation() : // $FlowFixMe
	        interpolation(this.mergedProps, this.context), couldBeSelectorInterpolation);

	      case 'object':
	        return createStringFromObject.call(this, interpolation);

	      default:
	        var cached = caches.registered[interpolation];
	        return couldBeSelectorInterpolation === false && cached !== undefined ? cached : interpolation;
	    }
	  }

	  var objectToStringCache = new WeakMap();

	  function createStringFromObject(obj) {
	    if (objectToStringCache.has(obj)) {
	      // $FlowFixMe
	      return objectToStringCache.get(obj);
	    }

	    var string = '';

	    if (Array.isArray(obj)) {
	      obj.forEach(function (interpolation) {
	        string += handleInterpolation.call(this, interpolation, false);
	      }, this);
	    } else {
	      Object.keys(obj).forEach(function (key) {
	        if (typeof obj[key] !== 'object') {
	          if (caches.registered[obj[key]] !== undefined) {
	            string += key + "{" + caches.registered[obj[key]] + "}";
	          } else {
	            string += processStyleName(key) + ":" + processStyleValue(key, obj[key]) + ";";
	          }
	        } else {
	          if (key === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
	            throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
	          }

	          if (Array.isArray(obj[key]) && typeof obj[key][0] === 'string' && caches.registered[obj[key][0]] === undefined) {
	            obj[key].forEach(function (value) {
	              string += processStyleName(key) + ":" + processStyleValue(key, value) + ";";
	            });
	          } else {
	            string += key + "{" + handleInterpolation.call(this, obj[key], false) + "}";
	          }
	        }
	      }, this);
	    }

	    objectToStringCache.set(obj, string);
	    return string;
	  }

	  var name;
	  var stylesWithLabel;
	  var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;

	  var createClassName = function createClassName(styles, identifierName) {
	    return murmurhash2_32_gc(styles + identifierName) + identifierName;
	  };

	  {
	    var oldCreateClassName = createClassName;
	    var sourceMappingUrlPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;

	    createClassName = function createClassName(styles, identifierName) {
	      return oldCreateClassName(styles.replace(sourceMappingUrlPattern, function (sourceMap) {
	        currentSourceMap = sourceMap;
	        return '';
	      }), identifierName);
	    };
	  }

	  var createStyles = function createStyles(strings) {
	    var stringMode = true;
	    var styles = '';
	    var identifierName = '';

	    if (strings == null || strings.raw === undefined) {
	      stringMode = false;
	      styles += handleInterpolation.call(this, strings, false);
	    } else {
	      styles += strings[0];
	    }

	    for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      interpolations[_key - 1] = arguments[_key];
	    }

	    interpolations.forEach(function (interpolation, i) {
	      styles += handleInterpolation.call(this, interpolation, styles.charCodeAt(styles.length - 1) === 46 // .
	      );

	      if (stringMode === true && strings[i + 1] !== undefined) {
	        styles += strings[i + 1];
	      }
	    }, this);
	    stylesWithLabel = styles;
	    styles = styles.replace(labelPattern, function (match, p1) {
	      identifierName += "-" + p1;
	      return '';
	    });
	    name = createClassName(styles, identifierName);
	    return styles;
	  };

	  {
	    var oldStylis = stylis;

	    stylis = function stylis(selector, styles) {
	      oldStylis(selector, styles);
	      currentSourceMap = '';
	    };
	  }

	  function insert(scope, styles) {
	    if (caches.inserted[name] === undefined) {
	      current = '';
	      stylis(scope, styles);
	      caches.inserted[name] = current;
	    }
	  }

	  var css = function css() {
	    var styles = createStyles.apply(this, arguments);
	    var selector = key + "-" + name;

	    if (caches.registered[selector] === undefined) {
	      caches.registered[selector] = stylesWithLabel;
	    }

	    insert("." + selector, styles);
	    return selector;
	  };

	  var keyframes = function keyframes() {
	    var styles = createStyles.apply(this, arguments);
	    var animation = "animation-" + name;
	    insert('', "@keyframes " + animation + "{" + styles + "}");
	    return animation;
	  };

	  var injectGlobal = function injectGlobal() {
	    var styles = createStyles.apply(this, arguments);
	    insert('', styles);
	  };

	  function getRegisteredStyles(registeredStyles, classNames) {
	    var rawClassName = '';
	    classNames.split(' ').forEach(function (className) {
	      if (caches.registered[className] !== undefined) {
	        registeredStyles.push(className);
	      } else {
	        rawClassName += className + " ";
	      }
	    });
	    return rawClassName;
	  }

	  function merge(className, sourceMap) {
	    var registeredStyles = [];
	    var rawClassName = getRegisteredStyles(registeredStyles, className);

	    if (registeredStyles.length < 2) {
	      return className;
	    }

	    return rawClassName + css(registeredStyles, sourceMap);
	  }

	  function cx() {
	    for (var _len2 = arguments.length, classNames = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      classNames[_key2] = arguments[_key2];
	    }

	    return merge(classnames(classNames));
	  }

	  function hydrateSingleId(id) {
	    caches.inserted[id] = true;
	  }

	  function hydrate(ids) {
	    ids.forEach(hydrateSingleId);
	  }

	  function flush() {
	    if (isBrowser) {
	      sheet.flush();
	      sheet.inject();
	    }

	    caches.inserted = {};
	    caches.registered = {};
	  }

	  if (isBrowser) {
	    var chunks = document.querySelectorAll("[data-emotion-" + key + "]");
	    Array.prototype.forEach.call(chunks, function (node) {
	      // $FlowFixMe
	      sheet.tags[0].parentNode.insertBefore(node, sheet.tags[0]); // $FlowFixMe

	      node.getAttribute("data-emotion-" + key).split(' ').forEach(hydrateSingleId);
	    });
	  }

	  var emotion = {
	    flush: flush,
	    hydrate: hydrate,
	    cx: cx,
	    merge: merge,
	    getRegisteredStyles: getRegisteredStyles,
	    injectGlobal: injectGlobal,
	    keyframes: keyframes,
	    css: css,
	    sheet: sheet,
	    caches: caches
	  };
	  context.__SECRET_EMOTION__ = emotion;
	  return emotion;
	}

	var context = typeof global !== 'undefined' ? global : {};

	var _createEmotion = createEmotion(context),
	    flush = _createEmotion.flush,
	    hydrate = _createEmotion.hydrate,
	    cx = _createEmotion.cx,
	    merge = _createEmotion.merge,
	    getRegisteredStyles = _createEmotion.getRegisteredStyles,
	    injectGlobal = _createEmotion.injectGlobal,
	    keyframes = _createEmotion.keyframes,
	    css = _createEmotion.css,
	    sheet = _createEmotion.sheet,
	    caches = _createEmotion.caches;

	var index_esm = /*#__PURE__*/Object.freeze({
		flush: flush,
		hydrate: hydrate,
		cx: cx,
		merge: merge,
		getRegisteredStyles: getRegisteredStyles,
		injectGlobal: injectGlobal,
		keyframes: keyframes,
		css: css,
		sheet: sheet,
		caches: caches
	});

	var performanceNow = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.2
	(function() {
	  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - nodeLoadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    moduleLoadTime = getNanoSeconds();
	    upTime = process.uptime() * 1e9;
	    nodeLoadTime = moduleLoadTime - upTime;
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }

	}).call(commonjsGlobal);


	});

	var root = typeof window === 'undefined' ? commonjsGlobal : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = root['request' + suffix]
	  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix];

	for(var i = 0; !raf && i < vendors.length; i++) {
	  raf = root[vendors[i] + 'Request' + suffix];
	  caf = root[vendors[i] + 'Cancel' + suffix]
	      || root[vendors[i] + 'CancelRequest' + suffix];
	}

	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  var last = 0
	    , id = 0
	    , queue = []
	    , frameDuration = 1000 / 60;

	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = performanceNow()
	        , next = Math.max(0, frameDuration - (_now - last));
	      last = next + _now;
	      setTimeout(function() {
	        var cp = queue.slice(0);
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0;
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last);
	            } catch(e) {
	              setTimeout(function() { throw e }, 0);
	            }
	          }
	        }
	      }, Math.round(next));
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    });
	    return id
	  };

	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true;
	      }
	    }
	  };
	}

	var raf_1 = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  return raf.call(root, fn)
	};
	var cancel = function() {
	  caf.apply(root, arguments);
	};
	var polyfill = function(object) {
	  if (!object) {
	    object = root;
	  }
	  object.requestAnimationFrame = raf;
	  object.cancelAnimationFrame = caf;
	};
	raf_1.cancel = cancel;
	raf_1.polyfill = polyfill;

	var AutosizeInput_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _react2 = _interopRequireDefault(React__default);



	var _propTypes2 = _interopRequireDefault(PropTypes$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var sizerStyle = {
		position: 'absolute',
		top: 0,
		left: 0,
		visibility: 'hidden',
		height: 0,
		overflow: 'scroll',
		whiteSpace: 'pre'
	};

	var INPUT_PROPS_BLACKLIST = ['extraWidth', 'injectStyles', 'inputClassName', 'inputRef', 'inputStyle', 'minWidth', 'onAutosize', 'placeholderIsMinWidth'];

	var cleanInputProps = function cleanInputProps(inputProps) {
		INPUT_PROPS_BLACKLIST.forEach(function (field) {
			return delete inputProps[field];
		});
		return inputProps;
	};

	var copyStyles = function copyStyles(styles, node) {
		node.style.fontSize = styles.fontSize;
		node.style.fontFamily = styles.fontFamily;
		node.style.fontWeight = styles.fontWeight;
		node.style.fontStyle = styles.fontStyle;
		node.style.letterSpacing = styles.letterSpacing;
		node.style.textTransform = styles.textTransform;
	};

	var isIE = typeof window !== 'undefined' && window.navigator ? /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent) : false;

	var generateId = function generateId() {
		// we only need an auto-generated ID for stylesheet injection, which is only
		// used for IE. so if the browser is not IE, this should return undefined.
		return isIE ? '_' + Math.random().toString(36).substr(2, 12) : undefined;
	};

	var AutosizeInput = function (_Component) {
		_inherits(AutosizeInput, _Component);

		function AutosizeInput(props) {
			_classCallCheck(this, AutosizeInput);

			var _this = _possibleConstructorReturn(this, (AutosizeInput.__proto__ || Object.getPrototypeOf(AutosizeInput)).call(this, props));

			_this.inputRef = function (el) {
				_this.input = el;
				if (typeof _this.props.inputRef === 'function') {
					_this.props.inputRef(el);
				}
			};

			_this.placeHolderSizerRef = function (el) {
				_this.placeHolderSizer = el;
			};

			_this.sizerRef = function (el) {
				_this.sizer = el;
			};

			_this.state = {
				inputWidth: props.minWidth,
				inputId: props.id || generateId()
			};
			return _this;
		}

		_createClass(AutosizeInput, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.mounted = true;
				this.copyInputStyles();
				this.updateInputWidth();
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				var id = nextProps.id;

				if (id !== this.props.id) {
					this.setState({ inputId: id || generateId() });
				}
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate(prevProps, prevState) {
				if (prevState.inputWidth !== this.state.inputWidth) {
					if (typeof this.props.onAutosize === 'function') {
						this.props.onAutosize(this.state.inputWidth);
					}
				}
				this.updateInputWidth();
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this.mounted = false;
			}
		}, {
			key: 'copyInputStyles',
			value: function copyInputStyles() {
				if (!this.mounted || !window.getComputedStyle) {
					return;
				}
				var inputStyles = this.input && window.getComputedStyle(this.input);
				if (!inputStyles) {
					return;
				}
				copyStyles(inputStyles, this.sizer);
				if (this.placeHolderSizer) {
					copyStyles(inputStyles, this.placeHolderSizer);
				}
			}
		}, {
			key: 'updateInputWidth',
			value: function updateInputWidth() {
				if (!this.mounted || !this.sizer || typeof this.sizer.scrollWidth === 'undefined') {
					return;
				}
				var newInputWidth = void 0;
				if (this.props.placeholder && (!this.props.value || this.props.value && this.props.placeholderIsMinWidth)) {
					newInputWidth = Math.max(this.sizer.scrollWidth, this.placeHolderSizer.scrollWidth) + 2;
				} else {
					newInputWidth = this.sizer.scrollWidth + 2;
				}
				// add extraWidth to the detected width. for number types, this defaults to 16 to allow for the stepper UI
				var extraWidth = this.props.type === 'number' && this.props.extraWidth === undefined ? 16 : parseInt(this.props.extraWidth) || 0;
				newInputWidth += extraWidth;
				if (newInputWidth < this.props.minWidth) {
					newInputWidth = this.props.minWidth;
				}
				if (newInputWidth !== this.state.inputWidth) {
					this.setState({
						inputWidth: newInputWidth
					});
				}
			}
		}, {
			key: 'getInput',
			value: function getInput() {
				return this.input;
			}
		}, {
			key: 'focus',
			value: function focus() {
				this.input.focus();
			}
		}, {
			key: 'blur',
			value: function blur() {
				this.input.blur();
			}
		}, {
			key: 'select',
			value: function select() {
				this.input.select();
			}
		}, {
			key: 'renderStyles',
			value: function renderStyles() {
				// this method injects styles to hide IE's clear indicator, which messes
				// with input size detection. the stylesheet is only injected when the
				// browser is IE, and can also be disabled by the `injectStyles` prop.
				var injectStyles = this.props.injectStyles;

				return isIE && injectStyles ? _react2.default.createElement('style', { dangerouslySetInnerHTML: {
						__html: 'input#' + this.state.inputId + '::-ms-clear {display: none;}'
					} }) : null;
			}
		}, {
			key: 'render',
			value: function render() {
				var sizerValue = [this.props.defaultValue, this.props.value, ''].reduce(function (previousValue, currentValue) {
					if (previousValue !== null && previousValue !== undefined) {
						return previousValue;
					}
					return currentValue;
				});

				var wrapperStyle = _extends({}, this.props.style);
				if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';

				var inputStyle = _extends({
					boxSizing: 'content-box',
					width: this.state.inputWidth + 'px'
				}, this.props.inputStyle);

				var inputProps = _objectWithoutProperties(this.props, []);

				cleanInputProps(inputProps);
				inputProps.className = this.props.inputClassName;
				inputProps.id = this.state.inputId;
				inputProps.style = inputStyle;

				return _react2.default.createElement(
					'div',
					{ className: this.props.className, style: wrapperStyle },
					this.renderStyles(),
					_react2.default.createElement('input', _extends({}, inputProps, { ref: this.inputRef })),
					_react2.default.createElement(
						'div',
						{ ref: this.sizerRef, style: sizerStyle },
						sizerValue
					),
					this.props.placeholder ? _react2.default.createElement(
						'div',
						{ ref: this.placeHolderSizerRef, style: sizerStyle },
						this.props.placeholder
					) : null
				);
			}
		}]);

		return AutosizeInput;
	}(React__default.Component);

	AutosizeInput.propTypes = {
		className: _propTypes2.default.string, // className for the outer element
		defaultValue: _propTypes2.default.any, // default field value
		extraWidth: _propTypes2.default.oneOfType([// additional width for input element
		_propTypes2.default.number, _propTypes2.default.string]),
		id: _propTypes2.default.string, // id to use for the input, can be set for consistent snapshots
		injectStyles: _propTypes2.default.bool, // inject the custom stylesheet to hide clear UI, defaults to true
		inputClassName: _propTypes2.default.string, // className for the input element
		inputRef: _propTypes2.default.func, // ref callback for the input element
		inputStyle: _propTypes2.default.object, // css styles for the input element
		minWidth: _propTypes2.default.oneOfType([// minimum width for input element
		_propTypes2.default.number, _propTypes2.default.string]),
		onAutosize: _propTypes2.default.func, // onAutosize handler: function(newWidth) {}
		onChange: _propTypes2.default.func, // onChange handler: function(event) {}
		placeholder: _propTypes2.default.string, // placeholder text
		placeholderIsMinWidth: _propTypes2.default.bool, // don't collapse size to less than the placeholder
		style: _propTypes2.default.object, // css styles for the outer element
		value: _propTypes2.default.any // field value
	};
	AutosizeInput.defaultProps = {
		minWidth: 1,
		injectStyles: true
	};

	exports.default = AutosizeInput;
	});

	var AutosizeInput = unwrapExports(AutosizeInput_1);

	var interopRequireDefault = createCommonjsModule(function (module) {
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	}

	module.exports = _interopRequireDefault;
	});

	unwrapExports(interopRequireDefault);

	var hasClass_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.default = hasClass;

	function hasClass(element, className) {
	  if (element.classList) return !!className && element.classList.contains(className);else return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
	}

	module.exports = exports["default"];
	});

	unwrapExports(hasClass_1);

	var addClass_1 = createCommonjsModule(function (module, exports) {



	exports.__esModule = true;
	exports.default = addClass;

	var _hasClass = interopRequireDefault(hasClass_1);

	function addClass(element, className) {
	  if (element.classList) element.classList.add(className);else if (!(0, _hasClass.default)(element, className)) if (typeof element.className === 'string') element.className = element.className + ' ' + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + ' ' + className);
	}

	module.exports = exports["default"];
	});

	unwrapExports(addClass_1);

	function replaceClassName(origClass, classToRemove) {
	  return origClass.replace(new RegExp('(^|\\s)' + classToRemove + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
	}

	var removeClass = function removeClass(element, className) {
	  if (element.classList) element.classList.remove(className);else if (typeof element.className === 'string') element.className = replaceClassName(element.className, className);else element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
	};

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	function componentWillMount() {
	  // Call this.constructor.gDSFP to support sub-classes.
	  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
	  if (state !== null && state !== undefined) {
	    this.setState(state);
	  }
	}

	function componentWillReceiveProps(nextProps) {
	  // Call this.constructor.gDSFP to support sub-classes.
	  // Use the setState() updater to ensure state isn't stale in certain edge cases.
	  function updater(prevState) {
	    var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
	    return state !== null && state !== undefined ? state : null;
	  }
	  // Binding "this" is important for shallow renderer support.
	  this.setState(updater.bind(this));
	}

	function componentWillUpdate(nextProps, nextState) {
	  try {
	    var prevProps = this.props;
	    var prevState = this.state;
	    this.props = nextProps;
	    this.state = nextState;
	    this.__reactInternalSnapshotFlag = true;
	    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
	      prevProps,
	      prevState
	    );
	  } finally {
	    this.props = prevProps;
	    this.state = prevState;
	  }
	}

	// React may warn about cWM/cWRP/cWU methods being deprecated.
	// Add a flag to suppress these warnings for this special case.
	componentWillMount.__suppressDeprecationWarning = true;
	componentWillReceiveProps.__suppressDeprecationWarning = true;
	componentWillUpdate.__suppressDeprecationWarning = true;

	function polyfill$1(Component) {
	  var prototype = Component.prototype;

	  if (!prototype || !prototype.isReactComponent) {
	    throw new Error('Can only polyfill class components');
	  }

	  if (
	    typeof Component.getDerivedStateFromProps !== 'function' &&
	    typeof prototype.getSnapshotBeforeUpdate !== 'function'
	  ) {
	    return Component;
	  }

	  // If new component APIs are defined, "unsafe" lifecycles won't be called.
	  // Error if any of these lifecycles are present,
	  // Because they would work differently between older and newer (16.3+) versions of React.
	  var foundWillMountName = null;
	  var foundWillReceivePropsName = null;
	  var foundWillUpdateName = null;
	  if (typeof prototype.componentWillMount === 'function') {
	    foundWillMountName = 'componentWillMount';
	  } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {
	    foundWillMountName = 'UNSAFE_componentWillMount';
	  }
	  if (typeof prototype.componentWillReceiveProps === 'function') {
	    foundWillReceivePropsName = 'componentWillReceiveProps';
	  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {
	    foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
	  }
	  if (typeof prototype.componentWillUpdate === 'function') {
	    foundWillUpdateName = 'componentWillUpdate';
	  } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
	    foundWillUpdateName = 'UNSAFE_componentWillUpdate';
	  }
	  if (
	    foundWillMountName !== null ||
	    foundWillReceivePropsName !== null ||
	    foundWillUpdateName !== null
	  ) {
	    var componentName = Component.displayName || Component.name;
	    var newApiName =
	      typeof Component.getDerivedStateFromProps === 'function'
	        ? 'getDerivedStateFromProps()'
	        : 'getSnapshotBeforeUpdate()';

	    throw Error(
	      'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' +
	        componentName +
	        ' uses ' +
	        newApiName +
	        ' but also contains the following legacy lifecycles:' +
	        (foundWillMountName !== null ? '\n  ' + foundWillMountName : '') +
	        (foundWillReceivePropsName !== null
	          ? '\n  ' + foundWillReceivePropsName
	          : '') +
	        (foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '') +
	        '\n\nThe above lifecycles should be removed. Learn more about this warning here:\n' +
	        'https://fb.me/react-async-component-lifecycle-hooks'
	    );
	  }

	  // React <= 16.2 does not support static getDerivedStateFromProps.
	  // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
	  // Newer versions of React will ignore these lifecycles if gDSFP exists.
	  if (typeof Component.getDerivedStateFromProps === 'function') {
	    prototype.componentWillMount = componentWillMount;
	    prototype.componentWillReceiveProps = componentWillReceiveProps;
	  }

	  // React <= 16.2 does not support getSnapshotBeforeUpdate.
	  // As a workaround, use cWU to invoke the new lifecycle.
	  // Newer versions of React will ignore that lifecycle if gSBU exists.
	  if (typeof prototype.getSnapshotBeforeUpdate === 'function') {
	    if (typeof prototype.componentDidUpdate !== 'function') {
	      throw new Error(
	        'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype'
	      );
	    }

	    prototype.componentWillUpdate = componentWillUpdate;

	    var componentDidUpdate = prototype.componentDidUpdate;

	    prototype.componentDidUpdate = function componentDidUpdatePolyfill(
	      prevProps,
	      prevState,
	      maybeSnapshot
	    ) {
	      // 16.3+ will not execute our will-update method;
	      // It will pass a snapshot value to did-update though.
	      // Older versions will require our polyfilled will-update value.
	      // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
	      // Because for <= 15.x versions this might be a "prevContext" object.
	      // We also can't just check "__reactInternalSnapshot",
	      // Because get-snapshot might return a falsy value.
	      // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
	      var snapshot = this.__reactInternalSnapshotFlag
	        ? this.__reactInternalSnapshot
	        : maybeSnapshot;

	      componentDidUpdate.call(this, prevProps, prevState, snapshot);
	    };
	  }

	  return Component;
	}

	var reactLifecyclesCompat_es = /*#__PURE__*/Object.freeze({
		polyfill: polyfill$1
	});

	var PropTypes = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.classNamesShape = exports.timeoutsShape = void 0;

	var _propTypes = _interopRequireDefault(PropTypes$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var timeoutsShape =  _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
	  enter: _propTypes.default.number,
	  exit: _propTypes.default.number,
	  appear: _propTypes.default.number
	}).isRequired]) ;
	exports.timeoutsShape = timeoutsShape;
	var classNamesShape =  _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.shape({
	  enter: _propTypes.default.string,
	  exit: _propTypes.default.string,
	  active: _propTypes.default.string
	}), _propTypes.default.shape({
	  enter: _propTypes.default.string,
	  enterDone: _propTypes.default.string,
	  enterActive: _propTypes.default.string,
	  exit: _propTypes.default.string,
	  exitDone: _propTypes.default.string,
	  exitActive: _propTypes.default.string
	})]) ;
	exports.classNamesShape = classNamesShape;
	});

	unwrapExports(PropTypes);
	var PropTypes_1 = PropTypes.classNamesShape;
	var PropTypes_2 = PropTypes.timeoutsShape;

	var Transition_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.default = exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = void 0;

	var PropTypes$2 = _interopRequireWildcard(PropTypes$1);

	var _react = _interopRequireDefault(React__default);

	var _reactDom = _interopRequireDefault(reactDom__default);





	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

	function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

	function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

	var UNMOUNTED = 'unmounted';
	exports.UNMOUNTED = UNMOUNTED;
	var EXITED = 'exited';
	exports.EXITED = EXITED;
	var ENTERING = 'entering';
	exports.ENTERING = ENTERING;
	var ENTERED = 'entered';
	exports.ENTERED = ENTERED;
	var EXITING = 'exiting';
	/**
	 * The Transition component lets you describe a transition from one component
	 * state to another _over time_ with a simple declarative API. Most commonly
	 * it's used to animate the mounting and unmounting of a component, but can also
	 * be used to describe in-place transition states as well.
	 *
	 * ---
	 *
	 * **Note**: `Transition` is a platform-agnostic base component. If you're using
	 * transitions in CSS, you'll probably want to use
	 * [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
	 * instead. It inherits all the features of `Transition`, but contains
	 * additional features necessary to play nice with CSS transitions (hence the
	 * name of the component).
	 *
	 * ---
	 *
	 * By default the `Transition` component does not alter the behavior of the
	 * component it renders, it only tracks "enter" and "exit" states for the
	 * components. It's up to you to give meaning and effect to those states. For
	 * example we can add styles to a component when it enters or exits:
	 *
	 * ```jsx
	 * import { Transition } from 'react-transition-group';
	 *
	 * const duration = 300;
	 *
	 * const defaultStyle = {
	 *   transition: `opacity ${duration}ms ease-in-out`,
	 *   opacity: 0,
	 * }
	 *
	 * const transitionStyles = {
	 *   entering: { opacity: 0 },
	 *   entered:  { opacity: 1 },
	 * };
	 *
	 * const Fade = ({ in: inProp }) => (
	 *   <Transition in={inProp} timeout={duration}>
	 *     {state => (
	 *       <div style={{
	 *         ...defaultStyle,
	 *         ...transitionStyles[state]
	 *       }}>
	 *         I'm a fade Transition!
	 *       </div>
	 *     )}
	 *   </Transition>
	 * );
	 * ```
	 *
	 * There are 4 main states a Transition can be in:
	 *  - `'entering'`
	 *  - `'entered'`
	 *  - `'exiting'`
	 *  - `'exited'`
	 *
	 * Transition state is toggled via the `in` prop. When `true` the component
	 * begins the "Enter" stage. During this stage, the component will shift from
	 * its current transition state, to `'entering'` for the duration of the
	 * transition and then to the `'entered'` stage once it's complete. Let's take
	 * the following example (we'll use the
	 * [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
	 *
	 * ```jsx
	 * function App() {
	 *   const [inProp, setInProp] = useState(false);
	 *   return (
	 *     <div>
	 *       <Transition in={inProp} timeout={500}>
	 *         {state => (
	 *           // ...
	 *         )}
	 *       </Transition>
	 *       <button onClick={() => setInProp(true)}>
	 *         Click to Enter
	 *       </button>
	 *     </div>
	 *   );
	 * }
	 * ```
	 *
	 * When the button is clicked the component will shift to the `'entering'` state
	 * and stay there for 500ms (the value of `timeout`) before it finally switches
	 * to `'entered'`.
	 *
	 * When `in` is `false` the same thing happens except the state moves from
	 * `'exiting'` to `'exited'`.
	 */

	exports.EXITING = EXITING;

	var Transition =
	/*#__PURE__*/
	function (_React$Component) {
	  _inheritsLoose(Transition, _React$Component);

	  function Transition(props, context) {
	    var _this;

	    _this = _React$Component.call(this, props, context) || this;
	    var parentGroup = context.transitionGroup; // In the context of a TransitionGroup all enters are really appears

	    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
	    var initialStatus;
	    _this.appearStatus = null;

	    if (props.in) {
	      if (appear) {
	        initialStatus = EXITED;
	        _this.appearStatus = ENTERING;
	      } else {
	        initialStatus = ENTERED;
	      }
	    } else {
	      if (props.unmountOnExit || props.mountOnEnter) {
	        initialStatus = UNMOUNTED;
	      } else {
	        initialStatus = EXITED;
	      }
	    }

	    _this.state = {
	      status: initialStatus
	    };
	    _this.nextCallback = null;
	    return _this;
	  }

	  var _proto = Transition.prototype;

	  _proto.getChildContext = function getChildContext() {
	    return {
	      transitionGroup: null // allows for nested Transitions

	    };
	  };

	  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
	    var nextIn = _ref.in;

	    if (nextIn && prevState.status === UNMOUNTED) {
	      return {
	        status: EXITED
	      };
	    }

	    return null;
	  }; // getSnapshotBeforeUpdate(prevProps) {
	  //   let nextStatus = null
	  //   if (prevProps !== this.props) {
	  //     const { status } = this.state
	  //     if (this.props.in) {
	  //       if (status !== ENTERING && status !== ENTERED) {
	  //         nextStatus = ENTERING
	  //       }
	  //     } else {
	  //       if (status === ENTERING || status === ENTERED) {
	  //         nextStatus = EXITING
	  //       }
	  //     }
	  //   }
	  //   return { nextStatus }
	  // }


	  _proto.componentDidMount = function componentDidMount() {
	    this.updateStatus(true, this.appearStatus);
	  };

	  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
	    var nextStatus = null;

	    if (prevProps !== this.props) {
	      var status = this.state.status;

	      if (this.props.in) {
	        if (status !== ENTERING && status !== ENTERED) {
	          nextStatus = ENTERING;
	        }
	      } else {
	        if (status === ENTERING || status === ENTERED) {
	          nextStatus = EXITING;
	        }
	      }
	    }

	    this.updateStatus(false, nextStatus);
	  };

	  _proto.componentWillUnmount = function componentWillUnmount() {
	    this.cancelNextCallback();
	  };

	  _proto.getTimeouts = function getTimeouts() {
	    var timeout = this.props.timeout;
	    var exit, enter, appear;
	    exit = enter = appear = timeout;

	    if (timeout != null && typeof timeout !== 'number') {
	      exit = timeout.exit;
	      enter = timeout.enter; // TODO: remove fallback for next major

	      appear = timeout.appear !== undefined ? timeout.appear : enter;
	    }

	    return {
	      exit: exit,
	      enter: enter,
	      appear: appear
	    };
	  };

	  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
	    if (mounting === void 0) {
	      mounting = false;
	    }

	    if (nextStatus !== null) {
	      // nextStatus will always be ENTERING or EXITING.
	      this.cancelNextCallback();

	      var node = _reactDom.default.findDOMNode(this);

	      if (nextStatus === ENTERING) {
	        this.performEnter(node, mounting);
	      } else {
	        this.performExit(node);
	      }
	    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
	      this.setState({
	        status: UNMOUNTED
	      });
	    }
	  };

	  _proto.performEnter = function performEnter(node, mounting) {
	    var _this2 = this;

	    var enter = this.props.enter;
	    var appearing = this.context.transitionGroup ? this.context.transitionGroup.isMounting : mounting;
	    var timeouts = this.getTimeouts();
	    var enterTimeout = appearing ? timeouts.appear : timeouts.enter; // no enter animation skip right to ENTERED
	    // if we are mounting and running this it means appear _must_ be set

	    if (!mounting && !enter) {
	      this.safeSetState({
	        status: ENTERED
	      }, function () {
	        _this2.props.onEntered(node);
	      });
	      return;
	    }

	    this.props.onEnter(node, appearing);
	    this.safeSetState({
	      status: ENTERING
	    }, function () {
	      _this2.props.onEntering(node, appearing);

	      _this2.onTransitionEnd(node, enterTimeout, function () {
	        _this2.safeSetState({
	          status: ENTERED
	        }, function () {
	          _this2.props.onEntered(node, appearing);
	        });
	      });
	    });
	  };

	  _proto.performExit = function performExit(node) {
	    var _this3 = this;

	    var exit = this.props.exit;
	    var timeouts = this.getTimeouts(); // no exit animation skip right to EXITED

	    if (!exit) {
	      this.safeSetState({
	        status: EXITED
	      }, function () {
	        _this3.props.onExited(node);
	      });
	      return;
	    }

	    this.props.onExit(node);
	    this.safeSetState({
	      status: EXITING
	    }, function () {
	      _this3.props.onExiting(node);

	      _this3.onTransitionEnd(node, timeouts.exit, function () {
	        _this3.safeSetState({
	          status: EXITED
	        }, function () {
	          _this3.props.onExited(node);
	        });
	      });
	    });
	  };

	  _proto.cancelNextCallback = function cancelNextCallback() {
	    if (this.nextCallback !== null) {
	      this.nextCallback.cancel();
	      this.nextCallback = null;
	    }
	  };

	  _proto.safeSetState = function safeSetState(nextState, callback) {
	    // This shouldn't be necessary, but there are weird race conditions with
	    // setState callbacks and unmounting in testing, so always make sure that
	    // we can cancel any pending setState callbacks after we unmount.
	    callback = this.setNextCallback(callback);
	    this.setState(nextState, callback);
	  };

	  _proto.setNextCallback = function setNextCallback(callback) {
	    var _this4 = this;

	    var active = true;

	    this.nextCallback = function (event) {
	      if (active) {
	        active = false;
	        _this4.nextCallback = null;
	        callback(event);
	      }
	    };

	    this.nextCallback.cancel = function () {
	      active = false;
	    };

	    return this.nextCallback;
	  };

	  _proto.onTransitionEnd = function onTransitionEnd(node, timeout, handler) {
	    this.setNextCallback(handler);
	    var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;

	    if (!node || doesNotHaveTimeoutOrListener) {
	      setTimeout(this.nextCallback, 0);
	      return;
	    }

	    if (this.props.addEndListener) {
	      this.props.addEndListener(node, this.nextCallback);
	    }

	    if (timeout != null) {
	      setTimeout(this.nextCallback, timeout);
	    }
	  };

	  _proto.render = function render() {
	    var status = this.state.status;

	    if (status === UNMOUNTED) {
	      return null;
	    }

	    var _this$props = this.props,
	        children = _this$props.children,
	        childProps = _objectWithoutPropertiesLoose(_this$props, ["children"]); // filter props for Transtition


	    delete childProps.in;
	    delete childProps.mountOnEnter;
	    delete childProps.unmountOnExit;
	    delete childProps.appear;
	    delete childProps.enter;
	    delete childProps.exit;
	    delete childProps.timeout;
	    delete childProps.addEndListener;
	    delete childProps.onEnter;
	    delete childProps.onEntering;
	    delete childProps.onEntered;
	    delete childProps.onExit;
	    delete childProps.onExiting;
	    delete childProps.onExited;

	    if (typeof children === 'function') {
	      return children(status, childProps);
	    }

	    var child = _react.default.Children.only(children);

	    return _react.default.cloneElement(child, childProps);
	  };

	  return Transition;
	}(_react.default.Component);

	Transition.contextTypes = {
	  transitionGroup: PropTypes$2.object
	};
	Transition.childContextTypes = {
	  transitionGroup: function transitionGroup() {}
	};
	Transition.propTypes =  {
	  /**
	   * A `function` child can be used instead of a React element. This function is
	   * called with the current transition status (`'entering'`, `'entered'`,
	   * `'exiting'`, `'exited'`, `'unmounted'`), which can be used to apply context
	   * specific props to a component.
	   *
	   * ```jsx
	   * <Transition in={this.state.in} timeout={150}>
	   *   {state => (
	   *     <MyComponent className={`fade fade-${state}`} />
	   *   )}
	   * </Transition>
	   * ```
	   */
	  children: PropTypes$2.oneOfType([PropTypes$2.func.isRequired, PropTypes$2.element.isRequired]).isRequired,

	  /**
	   * Show the component; triggers the enter or exit states
	   */
	  in: PropTypes$2.bool,

	  /**
	   * By default the child component is mounted immediately along with
	   * the parent `Transition` component. If you want to "lazy mount" the component on the
	   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
	   * mounted, even on "exited", unless you also specify `unmountOnExit`.
	   */
	  mountOnEnter: PropTypes$2.bool,

	  /**
	   * By default the child component stays mounted after it reaches the `'exited'` state.
	   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
	   */
	  unmountOnExit: PropTypes$2.bool,

	  /**
	   * Normally a component is not transitioned if it is shown when the `<Transition>` component mounts.
	   * If you want to transition on the first mount set `appear` to `true`, and the
	   * component will transition in as soon as the `<Transition>` mounts.
	   *
	   * > Note: there are no specific "appear" states. `appear` only adds an additional `enter` transition.
	   */
	  appear: PropTypes$2.bool,

	  /**
	   * Enable or disable enter transitions.
	   */
	  enter: PropTypes$2.bool,

	  /**
	   * Enable or disable exit transitions.
	   */
	  exit: PropTypes$2.bool,

	  /**
	   * The duration of the transition, in milliseconds.
	   * Required unless `addEndListener` is provided.
	   *
	   * You may specify a single timeout for all transitions:
	   *
	   * ```jsx
	   * timeout={500}
	   * ```
	   *
	   * or individually:
	   *
	   * ```jsx
	   * timeout={{
	   *  appear: 500,
	   *  enter: 300,
	   *  exit: 500,
	   * }}
	   * ```
	   *
	   * - `appear` defaults to the value of `enter`
	   * - `enter` defaults to `0`
	   * - `exit` defaults to `0`
	   *
	   * @type {number | { enter?: number, exit?: number, appear?: number }}
	   */
	  timeout: function timeout(props) {
	    var pt = PropTypes.timeoutsShape;
	    if (!props.addEndListener) pt = pt.isRequired;

	    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    return pt.apply(void 0, [props].concat(args));
	  },

	  /**
	   * Add a custom transition end trigger. Called with the transitioning
	   * DOM node and a `done` callback. Allows for more fine grained transition end
	   * logic. **Note:** Timeouts are still used as a fallback if provided.
	   *
	   * ```jsx
	   * addEndListener={(node, done) => {
	   *   // use the css transitionend event to mark the finish of a transition
	   *   node.addEventListener('transitionend', done, false);
	   * }}
	   * ```
	   */
	  addEndListener: PropTypes$2.func,

	  /**
	   * Callback fired before the "entering" status is applied. An extra parameter
	   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
	   *
	   * @type Function(node: HtmlElement, isAppearing: bool) -> void
	   */
	  onEnter: PropTypes$2.func,

	  /**
	   * Callback fired after the "entering" status is applied. An extra parameter
	   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
	   *
	   * @type Function(node: HtmlElement, isAppearing: bool)
	   */
	  onEntering: PropTypes$2.func,

	  /**
	   * Callback fired after the "entered" status is applied. An extra parameter
	   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
	   *
	   * @type Function(node: HtmlElement, isAppearing: bool) -> void
	   */
	  onEntered: PropTypes$2.func,

	  /**
	   * Callback fired before the "exiting" status is applied.
	   *
	   * @type Function(node: HtmlElement) -> void
	   */
	  onExit: PropTypes$2.func,

	  /**
	   * Callback fired after the "exiting" status is applied.
	   *
	   * @type Function(node: HtmlElement) -> void
	   */
	  onExiting: PropTypes$2.func,

	  /**
	   * Callback fired after the "exited" status is applied.
	   *
	   * @type Function(node: HtmlElement) -> void
	   */
	  onExited: PropTypes$2.func // Name the function so it is clearer in the documentation

	} ;

	function noop() {}

	Transition.defaultProps = {
	  in: false,
	  mountOnEnter: false,
	  unmountOnExit: false,
	  appear: false,
	  enter: true,
	  exit: true,
	  onEnter: noop,
	  onEntering: noop,
	  onEntered: noop,
	  onExit: noop,
	  onExiting: noop,
	  onExited: noop
	};
	Transition.UNMOUNTED = 0;
	Transition.EXITED = 1;
	Transition.ENTERING = 2;
	Transition.ENTERED = 3;
	Transition.EXITING = 4;

	var _default = (0, reactLifecyclesCompat_es.polyfill)(Transition);

	exports.default = _default;
	});

	unwrapExports(Transition_1);
	var Transition_2 = Transition_1.EXITING;
	var Transition_3 = Transition_1.ENTERED;
	var Transition_4 = Transition_1.ENTERING;
	var Transition_5 = Transition_1.EXITED;
	var Transition_6 = Transition_1.UNMOUNTED;

	var CSSTransition_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.default = void 0;

	var PropTypes$2 = _interopRequireWildcard(PropTypes$1);

	var _addClass = _interopRequireDefault(addClass_1);

	var _removeClass = _interopRequireDefault(removeClass);

	var _react = _interopRequireDefault(React__default);

	var _Transition = _interopRequireDefault(Transition_1);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

	var addClass = function addClass(node, classes) {
	  return node && classes && classes.split(' ').forEach(function (c) {
	    return (0, _addClass.default)(node, c);
	  });
	};

	var removeClass$1 = function removeClass(node, classes) {
	  return node && classes && classes.split(' ').forEach(function (c) {
	    return (0, _removeClass.default)(node, c);
	  });
	};
	/**
	 * A transition component inspired by the excellent
	 * [ng-animate](http://www.nganimate.org/) library, you should use it if you're
	 * using CSS transitions or animations. It's built upon the
	 * [`Transition`](https://reactcommunity.org/react-transition-group/transition)
	 * component, so it inherits all of its props.
	 *
	 * `CSSTransition` applies a pair of class names during the `appear`, `enter`,
	 * and `exit` states of the transition. The first class is applied and then a
	 * second `*-active` class in order to activate the CSSS transition. After the
	 * transition, matching `*-done` class names are applied to persist the
	 * transition state.
	 *
	 * ```jsx
	 * function App() {
	 *   const [inProp, setInProp] = useState(false);
	 *   return (
	 *     <div>
	 *       <CSSTransition in={inProp} timeout={200} classNames="my-node">
	 *         <div>
	 *           {"I'll receive my-node-* classes"}
	 *         </div>
	 *       </CSSTransition>
	 *       <button type="button" onClick={() => setInProp(true)}>
	 *         Click to Enter
	 *       </button>
	 *     </div>
	 *   );
	 * }
	 * ```
	 *
	 * When the `in` prop is set to `true`, the child component will first receive
	 * the class `example-enter`, then the `example-enter-active` will be added in
	 * the next tick. `CSSTransition` [forces a
	 * reflow](https://github.com/reactjs/react-transition-group/blob/5007303e729a74be66a21c3e2205e4916821524b/src/CSSTransition.js#L208-L215)
	 * between before adding the `example-enter-active`. This is an important trick
	 * because it allows us to transition between `example-enter` and
	 * `example-enter-active` even though they were added immediately one after
	 * another. Most notably, this is what makes it possible for us to animate
	 * _appearance_.
	 *
	 * ```css
	 * .my-node-enter {
	 *   opacity: 0;
	 * }
	 * .my-node-enter-active {
	 *   opacity: 1;
	 *   transition: opacity 200ms;
	 * }
	 * .my-node-exit {
	 *   opacity: 1;
	 * }
	 * .my-node-exit-active {
	 *   opacity: 0;
	 *   transition: opacity: 200ms;
	 * }
	 * ```
	 *
	 * `*-active` classes represent which styles you want to animate **to**.
	 */


	var CSSTransition =
	/*#__PURE__*/
	function (_React$Component) {
	  _inheritsLoose(CSSTransition, _React$Component);

	  function CSSTransition() {
	    var _this;

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

	    _this.onEnter = function (node, appearing) {
	      var _this$getClassNames = _this.getClassNames(appearing ? 'appear' : 'enter'),
	          className = _this$getClassNames.className;

	      _this.removeClasses(node, 'exit');

	      addClass(node, className);

	      if (_this.props.onEnter) {
	        _this.props.onEnter(node, appearing);
	      }
	    };

	    _this.onEntering = function (node, appearing) {
	      var _this$getClassNames2 = _this.getClassNames(appearing ? 'appear' : 'enter'),
	          activeClassName = _this$getClassNames2.activeClassName;

	      _this.reflowAndAddClass(node, activeClassName);

	      if (_this.props.onEntering) {
	        _this.props.onEntering(node, appearing);
	      }
	    };

	    _this.onEntered = function (node, appearing) {
	      var appearClassName = _this.getClassNames('appear').doneClassName;

	      var enterClassName = _this.getClassNames('enter').doneClassName;

	      var doneClassName = appearing ? appearClassName + " " + enterClassName : enterClassName;

	      _this.removeClasses(node, appearing ? 'appear' : 'enter');

	      addClass(node, doneClassName);

	      if (_this.props.onEntered) {
	        _this.props.onEntered(node, appearing);
	      }
	    };

	    _this.onExit = function (node) {
	      var _this$getClassNames3 = _this.getClassNames('exit'),
	          className = _this$getClassNames3.className;

	      _this.removeClasses(node, 'appear');

	      _this.removeClasses(node, 'enter');

	      addClass(node, className);

	      if (_this.props.onExit) {
	        _this.props.onExit(node);
	      }
	    };

	    _this.onExiting = function (node) {
	      var _this$getClassNames4 = _this.getClassNames('exit'),
	          activeClassName = _this$getClassNames4.activeClassName;

	      _this.reflowAndAddClass(node, activeClassName);

	      if (_this.props.onExiting) {
	        _this.props.onExiting(node);
	      }
	    };

	    _this.onExited = function (node) {
	      var _this$getClassNames5 = _this.getClassNames('exit'),
	          doneClassName = _this$getClassNames5.doneClassName;

	      _this.removeClasses(node, 'exit');

	      addClass(node, doneClassName);

	      if (_this.props.onExited) {
	        _this.props.onExited(node);
	      }
	    };

	    _this.getClassNames = function (type) {
	      var classNames = _this.props.classNames;
	      var isStringClassNames = typeof classNames === 'string';
	      var prefix = isStringClassNames && classNames ? classNames + '-' : '';
	      var className = isStringClassNames ? prefix + type : classNames[type];
	      var activeClassName = isStringClassNames ? className + '-active' : classNames[type + 'Active'];
	      var doneClassName = isStringClassNames ? className + '-done' : classNames[type + 'Done'];
	      return {
	        className: className,
	        activeClassName: activeClassName,
	        doneClassName: doneClassName
	      };
	    };

	    return _this;
	  }

	  var _proto = CSSTransition.prototype;

	  _proto.removeClasses = function removeClasses(node, type) {
	    var _this$getClassNames6 = this.getClassNames(type),
	        className = _this$getClassNames6.className,
	        activeClassName = _this$getClassNames6.activeClassName,
	        doneClassName = _this$getClassNames6.doneClassName;

	    className && removeClass$1(node, className);
	    activeClassName && removeClass$1(node, activeClassName);
	    doneClassName && removeClass$1(node, doneClassName);
	  };

	  _proto.reflowAndAddClass = function reflowAndAddClass(node, className) {
	    // This is for to force a repaint,
	    // which is necessary in order to transition styles when adding a class name.
	    if (className) {
	      /* eslint-disable no-unused-expressions */
	      node && node.scrollTop;
	      /* eslint-enable no-unused-expressions */

	      addClass(node, className);
	    }
	  };

	  _proto.render = function render() {
	    var props = _extends({}, this.props);

	    delete props.classNames;
	    return _react.default.createElement(_Transition.default, _extends({}, props, {
	      onEnter: this.onEnter,
	      onEntered: this.onEntered,
	      onEntering: this.onEntering,
	      onExit: this.onExit,
	      onExiting: this.onExiting,
	      onExited: this.onExited
	    }));
	  };

	  return CSSTransition;
	}(_react.default.Component);

	CSSTransition.defaultProps = {
	  classNames: ''
	};
	CSSTransition.propTypes =  _extends({}, _Transition.default.propTypes, {
	  /**
	   * The animation classNames applied to the component as it enters, exits or
	   * has finished the transition. A single name can be provided and it will be
	   * suffixed for each stage: e.g.
	   *
	   * `classNames="fade"` applies `fade-enter`, `fade-enter-active`,
	   * `fade-enter-done`, `fade-exit`, `fade-exit-active`, `fade-exit-done`,
	   * `fade-appear`, `fade-appear-active`, and `fade-appear-done`.
	   *
	   * **Note**: `fade-appear-done` and `fade-enter-done` will _both_ be applied.
	   * This allows you to define different behavior for when appearing is done and
	   * when regular entering is done, using selectors like
	   * `.fade-enter-done:not(.fade-appear-done)`. For example, you could apply an
	   * epic entrance animation when element first appears in the DOM using
	   * [Animate.css](https://daneden.github.io/animate.css/). Otherwise you can
	   * simply use `fade-enter-done` for defining both cases.
	   *
	   * Each individual classNames can also be specified independently like:
	   *
	   * ```js
	   * classNames={{
	   *  appear: 'my-appear',
	   *  appearActive: 'my-active-appear',
	   *  appearDone: 'my-done-appear',
	   *  enter: 'my-enter',
	   *  enterActive: 'my-active-enter',
	   *  enterDone: 'my-done-enter',
	   *  exit: 'my-exit',
	   *  exitActive: 'my-active-exit',
	   *  exitDone: 'my-done-exit',
	   * }}
	   * ```
	   *
	   * If you want to set these classes using CSS Modules:
	   *
	   * ```js
	   * import styles from './styles.css';
	   * ```
	   *
	   * you might want to use camelCase in your CSS file, that way could simply
	   * spread them instead of listing them one by one:
	   *
	   * ```js
	   * classNames={{ ...styles }}
	   * ```
	   *
	   * @type {string | {
	   *  appear?: string,
	   *  appearActive?: string,
	   *  appearDone?: string,
	   *  enter?: string,
	   *  enterActive?: string,
	   *  enterDone?: string,
	   *  exit?: string,
	   *  exitActive?: string,
	   *  exitDone?: string,
	   * }}
	   */
	  classNames: PropTypes.classNamesShape,

	  /**
	   * A `<Transition>` callback fired immediately after the 'enter' or 'appear' class is
	   * applied.
	   *
	   * @type Function(node: HtmlElement, isAppearing: bool)
	   */
	  onEnter: PropTypes$2.func,

	  /**
	   * A `<Transition>` callback fired immediately after the 'enter-active' or
	   * 'appear-active' class is applied.
	   *
	   * @type Function(node: HtmlElement, isAppearing: bool)
	   */
	  onEntering: PropTypes$2.func,

	  /**
	   * A `<Transition>` callback fired immediately after the 'enter' or
	   * 'appear' classes are **removed** and the `done` class is added to the DOM node.
	   *
	   * @type Function(node: HtmlElement, isAppearing: bool)
	   */
	  onEntered: PropTypes$2.func,

	  /**
	   * A `<Transition>` callback fired immediately after the 'exit' class is
	   * applied.
	   *
	   * @type Function(node: HtmlElement)
	   */
	  onExit: PropTypes$2.func,

	  /**
	   * A `<Transition>` callback fired immediately after the 'exit-active' is applied.
	   *
	   * @type Function(node: HtmlElement)
	   */
	  onExiting: PropTypes$2.func,

	  /**
	   * A `<Transition>` callback fired immediately after the 'exit' classes
	   * are **removed** and the `exit-done` class is added to the DOM node.
	   *
	   * @type Function(node: HtmlElement)
	   */
	  onExited: PropTypes$2.func
	}) ;
	var _default = CSSTransition;
	exports.default = _default;
	module.exports = exports["default"];
	});

	unwrapExports(CSSTransition_1);

	var ChildMapping = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.getChildMapping = getChildMapping;
	exports.mergeChildMappings = mergeChildMappings;
	exports.getInitialChildMapping = getInitialChildMapping;
	exports.getNextChildMapping = getNextChildMapping;



	/**
	 * Given `this.props.children`, return an object mapping key to child.
	 *
	 * @param {*} children `this.props.children`
	 * @return {object} Mapping of key to child
	 */
	function getChildMapping(children, mapFn) {
	  var mapper = function mapper(child) {
	    return mapFn && (0, React__default.isValidElement)(child) ? mapFn(child) : child;
	  };

	  var result = Object.create(null);
	  if (children) React__default.Children.map(children, function (c) {
	    return c;
	  }).forEach(function (child) {
	    // run the map function here instead so that the key is the computed one
	    result[child.key] = mapper(child);
	  });
	  return result;
	}
	/**
	 * When you're adding or removing children some may be added or removed in the
	 * same render pass. We want to show *both* since we want to simultaneously
	 * animate elements in and out. This function takes a previous set of keys
	 * and a new set of keys and merges them with its best guess of the correct
	 * ordering. In the future we may expose some of the utilities in
	 * ReactMultiChild to make this easy, but for now React itself does not
	 * directly have this concept of the union of prevChildren and nextChildren
	 * so we implement it here.
	 *
	 * @param {object} prev prev children as returned from
	 * `ReactTransitionChildMapping.getChildMapping()`.
	 * @param {object} next next children as returned from
	 * `ReactTransitionChildMapping.getChildMapping()`.
	 * @return {object} a key set that contains all keys in `prev` and all keys
	 * in `next` in a reasonable order.
	 */


	function mergeChildMappings(prev, next) {
	  prev = prev || {};
	  next = next || {};

	  function getValueForKey(key) {
	    return key in next ? next[key] : prev[key];
	  } // For each key of `next`, the list of keys to insert before that key in
	  // the combined list


	  var nextKeysPending = Object.create(null);
	  var pendingKeys = [];

	  for (var prevKey in prev) {
	    if (prevKey in next) {
	      if (pendingKeys.length) {
	        nextKeysPending[prevKey] = pendingKeys;
	        pendingKeys = [];
	      }
	    } else {
	      pendingKeys.push(prevKey);
	    }
	  }

	  var i;
	  var childMapping = {};

	  for (var nextKey in next) {
	    if (nextKeysPending[nextKey]) {
	      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
	        var pendingNextKey = nextKeysPending[nextKey][i];
	        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
	      }
	    }

	    childMapping[nextKey] = getValueForKey(nextKey);
	  } // Finally, add the keys which didn't appear before any key in `next`


	  for (i = 0; i < pendingKeys.length; i++) {
	    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
	  }

	  return childMapping;
	}

	function getProp(child, prop, props) {
	  return props[prop] != null ? props[prop] : child.props[prop];
	}

	function getInitialChildMapping(props, onExited) {
	  return getChildMapping(props.children, function (child) {
	    return (0, React__default.cloneElement)(child, {
	      onExited: onExited.bind(null, child),
	      in: true,
	      appear: getProp(child, 'appear', props),
	      enter: getProp(child, 'enter', props),
	      exit: getProp(child, 'exit', props)
	    });
	  });
	}

	function getNextChildMapping(nextProps, prevChildMapping, onExited) {
	  var nextChildMapping = getChildMapping(nextProps.children);
	  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
	  Object.keys(children).forEach(function (key) {
	    var child = children[key];
	    if (!(0, React__default.isValidElement)(child)) return;
	    var hasPrev = key in prevChildMapping;
	    var hasNext = key in nextChildMapping;
	    var prevChild = prevChildMapping[key];
	    var isLeaving = (0, React__default.isValidElement)(prevChild) && !prevChild.props.in; // item is new (entering)

	    if (hasNext && (!hasPrev || isLeaving)) {
	      // console.log('entering', key)
	      children[key] = (0, React__default.cloneElement)(child, {
	        onExited: onExited.bind(null, child),
	        in: true,
	        exit: getProp(child, 'exit', nextProps),
	        enter: getProp(child, 'enter', nextProps)
	      });
	    } else if (!hasNext && hasPrev && !isLeaving) {
	      // item is old (exiting)
	      // console.log('leaving', key)
	      children[key] = (0, React__default.cloneElement)(child, {
	        in: false
	      });
	    } else if (hasNext && hasPrev && (0, React__default.isValidElement)(prevChild)) {
	      // item hasn't changed transition states
	      // copy over the last transition props;
	      // console.log('unchanged', key)
	      children[key] = (0, React__default.cloneElement)(child, {
	        onExited: onExited.bind(null, child),
	        in: prevChild.props.in,
	        exit: getProp(child, 'exit', nextProps),
	        enter: getProp(child, 'enter', nextProps)
	      });
	    }
	  });
	  return children;
	}
	});

	unwrapExports(ChildMapping);
	var ChildMapping_1 = ChildMapping.getChildMapping;
	var ChildMapping_2 = ChildMapping.mergeChildMappings;
	var ChildMapping_3 = ChildMapping.getInitialChildMapping;
	var ChildMapping_4 = ChildMapping.getNextChildMapping;

	var TransitionGroup_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.default = void 0;

	var _propTypes = _interopRequireDefault(PropTypes$1);

	var _react = _interopRequireDefault(React__default);





	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	var values = Object.values || function (obj) {
	  return Object.keys(obj).map(function (k) {
	    return obj[k];
	  });
	};

	var defaultProps = {
	  component: 'div',
	  childFactory: function childFactory(child) {
	    return child;
	  }
	  /**
	   * The `<TransitionGroup>` component manages a set of transition components
	   * (`<Transition>` and `<CSSTransition>`) in a list. Like with the transition
	   * components, `<TransitionGroup>` is a state machine for managing the mounting
	   * and unmounting of components over time.
	   *
	   * Consider the example below. As items are removed or added to the TodoList the
	   * `in` prop is toggled automatically by the `<TransitionGroup>`.
	   *
	   * Note that `<TransitionGroup>`  does not define any animation behavior!
	   * Exactly _how_ a list item animates is up to the individual transition
	   * component. This means you can mix and match animations across different list
	   * items.
	   */

	};

	var TransitionGroup =
	/*#__PURE__*/
	function (_React$Component) {
	  _inheritsLoose(TransitionGroup, _React$Component);

	  function TransitionGroup(props, context) {
	    var _this;

	    _this = _React$Component.call(this, props, context) || this;

	    var handleExited = _this.handleExited.bind(_assertThisInitialized(_assertThisInitialized(_this))); // Initial children should all be entering, dependent on appear


	    _this.state = {
	      handleExited: handleExited,
	      firstRender: true
	    };
	    return _this;
	  }

	  var _proto = TransitionGroup.prototype;

	  _proto.getChildContext = function getChildContext() {
	    return {
	      transitionGroup: {
	        isMounting: !this.appeared
	      }
	    };
	  };

	  _proto.componentDidMount = function componentDidMount() {
	    this.appeared = true;
	    this.mounted = true;
	  };

	  _proto.componentWillUnmount = function componentWillUnmount() {
	    this.mounted = false;
	  };

	  TransitionGroup.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
	    var prevChildMapping = _ref.children,
	        handleExited = _ref.handleExited,
	        firstRender = _ref.firstRender;
	    return {
	      children: firstRender ? (0, ChildMapping.getInitialChildMapping)(nextProps, handleExited) : (0, ChildMapping.getNextChildMapping)(nextProps, prevChildMapping, handleExited),
	      firstRender: false
	    };
	  };

	  _proto.handleExited = function handleExited(child, node) {
	    var currentChildMapping = (0, ChildMapping.getChildMapping)(this.props.children);
	    if (child.key in currentChildMapping) return;

	    if (child.props.onExited) {
	      child.props.onExited(node);
	    }

	    if (this.mounted) {
	      this.setState(function (state) {
	        var children = _extends({}, state.children);

	        delete children[child.key];
	        return {
	          children: children
	        };
	      });
	    }
	  };

	  _proto.render = function render() {
	    var _this$props = this.props,
	        Component = _this$props.component,
	        childFactory = _this$props.childFactory,
	        props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);

	    var children = values(this.state.children).map(childFactory);
	    delete props.appear;
	    delete props.enter;
	    delete props.exit;

	    if (Component === null) {
	      return children;
	    }

	    return _react.default.createElement(Component, props, children);
	  };

	  return TransitionGroup;
	}(_react.default.Component);

	TransitionGroup.childContextTypes = {
	  transitionGroup: _propTypes.default.object.isRequired
	};
	TransitionGroup.propTypes =  {
	  /**
	   * `<TransitionGroup>` renders a `<div>` by default. You can change this
	   * behavior by providing a `component` prop.
	   * If you use React v16+ and would like to avoid a wrapping `<div>` element
	   * you can pass in `component={null}`. This is useful if the wrapping div
	   * borks your css styles.
	   */
	  component: _propTypes.default.any,

	  /**
	   * A set of `<Transition>` components, that are toggled `in` and out as they
	   * leave. the `<TransitionGroup>` will inject specific transition props, so
	   * remember to spread them through if you are wrapping the `<Transition>` as
	   * with our `<Fade>` example.
	   *
	   * While this component is meant for multiple `Transition` or `CSSTransition`
	   * children, sometimes you may want to have a single transition child with
	   * content that you want to be transitioned out and in when you change it
	   * (e.g. routes, images etc.) In that case you can change the `key` prop of
	   * the transition child as you change its content, this will cause
	   * `TransitionGroup` to transition the child out and back in.
	   */
	  children: _propTypes.default.node,

	  /**
	   * A convenience prop that enables or disables appear animations
	   * for all children. Note that specifying this will override any defaults set
	   * on individual children Transitions.
	   */
	  appear: _propTypes.default.bool,

	  /**
	   * A convenience prop that enables or disables enter animations
	   * for all children. Note that specifying this will override any defaults set
	   * on individual children Transitions.
	   */
	  enter: _propTypes.default.bool,

	  /**
	   * A convenience prop that enables or disables exit animations
	   * for all children. Note that specifying this will override any defaults set
	   * on individual children Transitions.
	   */
	  exit: _propTypes.default.bool,

	  /**
	   * You may need to apply reactive updates to a child as it is exiting.
	   * This is generally done by using `cloneElement` however in the case of an exiting
	   * child the element has already been removed and not accessible to the consumer.
	   *
	   * If you do need to update a child as it leaves you can provide a `childFactory`
	   * to wrap every child, even the ones that are leaving.
	   *
	   * @type Function(child: ReactElement) -> ReactElement
	   */
	  childFactory: _propTypes.default.func
	} ;
	TransitionGroup.defaultProps = defaultProps;

	var _default = (0, reactLifecyclesCompat_es.polyfill)(TransitionGroup);

	exports.default = _default;
	module.exports = exports["default"];
	});

	unwrapExports(TransitionGroup_1);

	var ReplaceTransition_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.default = void 0;

	var _propTypes = _interopRequireDefault(PropTypes$1);

	var _react = _interopRequireDefault(React__default);



	var _TransitionGroup = _interopRequireDefault(TransitionGroup_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

	function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

	/**
	 * The `<ReplaceTransition>` component is a specialized `Transition` component
	 * that animates between two children.
	 *
	 * ```jsx
	 * <ReplaceTransition in>
	 *   <Fade><div>I appear first</div></Fade>
	 *   <Fade><div>I replace the above</div></Fade>
	 * </ReplaceTransition>
	 * ```
	 */
	var ReplaceTransition =
	/*#__PURE__*/
	function (_React$Component) {
	  _inheritsLoose(ReplaceTransition, _React$Component);

	  function ReplaceTransition() {
	    var _this;

	    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
	      _args[_key] = arguments[_key];
	    }

	    _this = _React$Component.call.apply(_React$Component, [this].concat(_args)) || this;

	    _this.handleEnter = function () {
	      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      return _this.handleLifecycle('onEnter', 0, args);
	    };

	    _this.handleEntering = function () {
	      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      return _this.handleLifecycle('onEntering', 0, args);
	    };

	    _this.handleEntered = function () {
	      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        args[_key4] = arguments[_key4];
	      }

	      return _this.handleLifecycle('onEntered', 0, args);
	    };

	    _this.handleExit = function () {
	      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	        args[_key5] = arguments[_key5];
	      }

	      return _this.handleLifecycle('onExit', 1, args);
	    };

	    _this.handleExiting = function () {
	      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	        args[_key6] = arguments[_key6];
	      }

	      return _this.handleLifecycle('onExiting', 1, args);
	    };

	    _this.handleExited = function () {
	      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	        args[_key7] = arguments[_key7];
	      }

	      return _this.handleLifecycle('onExited', 1, args);
	    };

	    return _this;
	  }

	  var _proto = ReplaceTransition.prototype;

	  _proto.handleLifecycle = function handleLifecycle(handler, idx, originalArgs) {
	    var _child$props;

	    var children = this.props.children;

	    var child = _react.default.Children.toArray(children)[idx];

	    if (child.props[handler]) (_child$props = child.props)[handler].apply(_child$props, originalArgs);
	    if (this.props[handler]) this.props[handler]((0, reactDom__default.findDOMNode)(this));
	  };

	  _proto.render = function render() {
	    var _this$props = this.props,
	        children = _this$props.children,
	        inProp = _this$props.in,
	        props = _objectWithoutPropertiesLoose(_this$props, ["children", "in"]);

	    var _React$Children$toArr = _react.default.Children.toArray(children),
	        first = _React$Children$toArr[0],
	        second = _React$Children$toArr[1];

	    delete props.onEnter;
	    delete props.onEntering;
	    delete props.onEntered;
	    delete props.onExit;
	    delete props.onExiting;
	    delete props.onExited;
	    return _react.default.createElement(_TransitionGroup.default, props, inProp ? _react.default.cloneElement(first, {
	      key: 'first',
	      onEnter: this.handleEnter,
	      onEntering: this.handleEntering,
	      onEntered: this.handleEntered
	    }) : _react.default.cloneElement(second, {
	      key: 'second',
	      onEnter: this.handleExit,
	      onEntering: this.handleExiting,
	      onEntered: this.handleExited
	    }));
	  };

	  return ReplaceTransition;
	}(_react.default.Component);

	ReplaceTransition.propTypes =  {
	  in: _propTypes.default.bool.isRequired,
	  children: function children(props, propName) {
	    if (_react.default.Children.count(props[propName]) !== 2) return new Error("\"" + propName + "\" must be exactly two transition components.");
	    return null;
	  }
	} ;
	var _default = ReplaceTransition;
	exports.default = _default;
	module.exports = exports["default"];
	});

	unwrapExports(ReplaceTransition_1);

	var reactTransitionGroup = createCommonjsModule(function (module) {

	var _CSSTransition = _interopRequireDefault(CSSTransition_1);

	var _ReplaceTransition = _interopRequireDefault(ReplaceTransition_1);

	var _TransitionGroup = _interopRequireDefault(TransitionGroup_1);

	var _Transition = _interopRequireDefault(Transition_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	  Transition: _Transition.default,
	  TransitionGroup: _TransitionGroup.default,
	  ReplaceTransition: _ReplaceTransition.default,
	  CSSTransition: _CSSTransition.default
	};
	});

	unwrapExports(reactTransitionGroup);
	var reactTransitionGroup_1 = reactTransitionGroup.Transition;
	var reactTransitionGroup_2 = reactTransitionGroup.TransitionGroup;
	var reactTransitionGroup_3 = reactTransitionGroup.ReplaceTransition;
	var reactTransitionGroup_4 = reactTransitionGroup.CSSTransition;

	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

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

	function _extends() {
	  _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  return _extends.apply(this, arguments);
	}

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
	      _defineProperty(target, key, source[key]);
	    });
	  }

	  return target;
	}

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
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}

	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};

	  var target = _objectWithoutPropertiesLoose(source, excluded);

	  var key, i;

	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }

	  return target;
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  }
	}

	function _iterableToArray(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	// ==============================
	// NO OP
	// ==============================
	var noop = function noop() {};
	// Class Name Prefixer
	// ==============================

	/**
	 String representation of component state for styling with class names.

	 Expects an array of strings OR a string/object pair:
	 - className(['comp', 'comp-arg', 'comp-arg-2'])
	   @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
	 - className('comp', { some: true, state: false })
	   @returns 'react-select__comp react-select__comp--some'
	*/

	function applyPrefixToName(prefix, name) {
	  if (!name) {
	    return prefix;
	  } else if (name[0] === '-') {
	    return prefix + name;
	  } else {
	    return prefix + '__' + name;
	  }
	}

	function classNames(prefix, cssKey, state, className) {
	  var arr = [cssKey, className];

	  if (state && prefix) {
	    for (var key in state) {
	      if (state.hasOwnProperty(key) && state[key]) {
	        arr.push("".concat(applyPrefixToName(prefix, key)));
	      }
	    }
	  }

	  return arr.filter(function (i) {
	    return i;
	  }).map(function (i) {
	    return String(i).trim();
	  }).join(' ');
	} // ==============================
	// Clean Value
	// ==============================

	var cleanValue = function cleanValue(value) {
	  if (Array.isArray(value)) return value.filter(Boolean);
	  if (_typeof(value) === 'object' && value !== null) return [value];
	  return [];
	}; // ==============================
	// Handle Input Change
	// ==============================

	function handleInputChange(inputValue, actionMeta, onInputChange) {
	  if (onInputChange) {
	    var newValue = onInputChange(inputValue, actionMeta);
	    if (typeof newValue === 'string') return newValue;
	  }

	  return inputValue;
	} // ==============================
	// Scroll Helpers
	// ==============================

	function isDocumentElement(el) {
	  return [document.documentElement, document.body, window].indexOf(el) > -1;
	} // Normalized Scroll Top
	// ------------------------------

	function getScrollTop(el) {
	  if (isDocumentElement(el)) {
	    return window.pageYOffset;
	  }

	  return el.scrollTop;
	}
	function scrollTo(el, top) {
	  // with a scroll distance, we perform scroll on the element
	  if (isDocumentElement(el)) {
	    window.scrollTo(0, top);
	    return;
	  }

	  el.scrollTop = top;
	} // Get Scroll Parent
	// ------------------------------

	function getScrollParent(element) {
	  var style = getComputedStyle(element);
	  var excludeStaticParent = style.position === 'absolute';
	  var overflowRx = /(auto|scroll)/;
	  var docEl = document.documentElement; // suck it, flow...

	  if (style.position === 'fixed') return docEl;

	  for (var parent = element; parent = parent.parentElement;) {
	    style = getComputedStyle(parent);

	    if (excludeStaticParent && style.position === 'static') {
	      continue;
	    }

	    if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) {
	      return parent;
	    }
	  }

	  return docEl;
	} // Animated Scroll To
	// ------------------------------

	/**
	  @param t: time (elapsed)
	  @param b: initial value
	  @param c: amount of change
	  @param d: duration
	*/

	function easeOutCubic(t, b, c, d) {
	  return c * ((t = t / d - 1) * t * t + 1) + b;
	}

	function animatedScrollTo(element, to) {
	  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
	  var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
	  var start = getScrollTop(element);
	  var change = to - start;
	  var increment = 10;
	  var currentTime = 0;

	  function animateScroll() {
	    currentTime += increment;
	    var val = easeOutCubic(currentTime, start, change, duration);
	    scrollTo(element, val);

	    if (currentTime < duration) {
	      raf_1(animateScroll);
	    } else {
	      callback(element);
	    }
	  }

	  animateScroll();
	} // Scroll Into View
	// ------------------------------

	function scrollIntoView(menuEl, focusedEl) {
	  var menuRect = menuEl.getBoundingClientRect();
	  var focusedRect = focusedEl.getBoundingClientRect();
	  var overScroll = focusedEl.offsetHeight / 3;

	  if (focusedRect.bottom + overScroll > menuRect.bottom) {
	    scrollTo(menuEl, Math.min(focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll, menuEl.scrollHeight));
	  } else if (focusedRect.top - overScroll < menuRect.top) {
	    scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
	  }
	} // ==============================
	// Get bounding client object
	// ==============================
	// cannot get keys using array notation with DOMRect

	function getBoundingClientObj(element) {
	  var rect = element.getBoundingClientRect();
	  return {
	    bottom: rect.bottom,
	    height: rect.height,
	    left: rect.left,
	    right: rect.right,
	    top: rect.top,
	    width: rect.width
	  };
	}
	// Touch Capability Detector
	// ==============================

	function isTouchCapable() {
	  try {
	    document.createEvent('TouchEvent');
	    return true;
	  } catch (e) {
	    return false;
	  }
	} // ==============================
	// Mobile Device Detector
	// ==============================

	function isMobileDevice() {
	  try {
	    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	  } catch (e) {
	    return false;
	  }
	}

	function getMenuPlacement(_ref) {
	  var maxHeight = _ref.maxHeight,
	      menuEl = _ref.menuEl,
	      minHeight = _ref.minHeight,
	      placement = _ref.placement,
	      shouldScroll = _ref.shouldScroll,
	      isFixedPosition = _ref.isFixedPosition,
	      theme = _ref.theme;
	  var spacing = theme.spacing;
	  var scrollParent = getScrollParent(menuEl);
	  var defaultState = {
	    placement: 'bottom',
	    maxHeight: maxHeight
	  }; // something went wrong, return default state

	  if (!menuEl || !menuEl.offsetParent) return defaultState; // we can't trust `scrollParent.scrollHeight` --> it may increase when
	  // the menu is rendered

	  var _scrollParent$getBoun = scrollParent.getBoundingClientRect(),
	      scrollHeight = _scrollParent$getBoun.height;

	  var _menuEl$getBoundingCl = menuEl.getBoundingClientRect(),
	      menuBottom = _menuEl$getBoundingCl.bottom,
	      menuHeight = _menuEl$getBoundingCl.height,
	      menuTop = _menuEl$getBoundingCl.top;

	  var _menuEl$offsetParent$ = menuEl.offsetParent.getBoundingClientRect(),
	      containerTop = _menuEl$offsetParent$.top;

	  var viewHeight = window.innerHeight;
	  var scrollTop = getScrollTop(scrollParent);
	  var marginBottom = parseInt(getComputedStyle(menuEl).marginBottom, 10);
	  var marginTop = parseInt(getComputedStyle(menuEl).marginTop, 10);
	  var viewSpaceAbove = containerTop - marginTop;
	  var viewSpaceBelow = viewHeight - menuTop;
	  var scrollSpaceAbove = viewSpaceAbove + scrollTop;
	  var scrollSpaceBelow = scrollHeight - scrollTop - menuTop;
	  var scrollDown = menuBottom - viewHeight + scrollTop + marginBottom;
	  var scrollUp = scrollTop + menuTop - marginTop;
	  var scrollDuration = 160;

	  switch (placement) {
	    case 'auto':
	    case 'bottom':
	      // 1: the menu will fit, do nothing
	      if (viewSpaceBelow >= menuHeight) {
	        return {
	          placement: 'bottom',
	          maxHeight: maxHeight
	        };
	      } // 2: the menu will fit, if scrolled


	      if (scrollSpaceBelow >= menuHeight && !isFixedPosition) {
	        if (shouldScroll) {
	          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
	        }

	        return {
	          placement: 'bottom',
	          maxHeight: maxHeight
	        };
	      } // 3: the menu will fit, if constrained


	      if (!isFixedPosition && scrollSpaceBelow >= minHeight || isFixedPosition && viewSpaceBelow >= minHeight) {
	        if (shouldScroll) {
	          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
	        } // we want to provide as much of the menu as possible to the user,
	        // so give them whatever is available below rather than the minHeight.


	        var constrainedHeight = isFixedPosition ? viewSpaceBelow - marginBottom : scrollSpaceBelow - marginBottom;
	        return {
	          placement: 'bottom',
	          maxHeight: constrainedHeight
	        };
	      } // 4. Forked beviour when there isn't enough space below
	      // AUTO: flip the menu, render above


	      if (placement === 'auto' || isFixedPosition) {
	        // may need to be constrained after flipping
	        var _constrainedHeight = maxHeight;
	        var spaceAbove = isFixedPosition ? viewSpaceAbove : scrollSpaceAbove;

	        if (spaceAbove >= minHeight) {
	          _constrainedHeight = Math.min(spaceAbove - marginBottom - spacing.controlHeight, maxHeight);
	        }

	        return {
	          placement: 'top',
	          maxHeight: _constrainedHeight
	        };
	      } // BOTTOM: allow browser to increase scrollable area and immediately set scroll


	      if (placement === 'bottom') {
	        scrollTo(scrollParent, scrollDown);
	        return {
	          placement: 'bottom',
	          maxHeight: maxHeight
	        };
	      }

	      break;

	    case 'top':
	      // 1: the menu will fit, do nothing
	      if (viewSpaceAbove >= menuHeight) {
	        return {
	          placement: 'top',
	          maxHeight: maxHeight
	        };
	      } // 2: the menu will fit, if scrolled


	      if (scrollSpaceAbove >= menuHeight && !isFixedPosition) {
	        if (shouldScroll) {
	          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
	        }

	        return {
	          placement: 'top',
	          maxHeight: maxHeight
	        };
	      } // 3: the menu will fit, if constrained


	      if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
	        var _constrainedHeight2 = maxHeight; // we want to provide as much of the menu as possible to the user,
	        // so give them whatever is available below rather than the minHeight.

	        if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
	          _constrainedHeight2 = isFixedPosition ? viewSpaceAbove - marginTop : scrollSpaceAbove - marginTop;
	        }

	        if (shouldScroll) {
	          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
	        }

	        return {
	          placement: 'top',
	          maxHeight: _constrainedHeight2
	        };
	      } // 4. not enough space, the browser WILL NOT increase scrollable area when
	      // absolutely positioned element rendered above the viewport (only below).
	      // Flip the menu, render below


	      return {
	        placement: 'bottom',
	        maxHeight: maxHeight
	      };

	    default:
	      throw new Error("Invalid placement provided \"".concat(placement, "\"."));
	  } // fulfil contract with flow: implicit return value of undefined


	  return defaultState;
	} // Menu Component
	// ------------------------------

	function alignToControl(placement) {
	  var placementToCSSProp = {
	    bottom: 'top',
	    top: 'bottom'
	  };
	  return placement ? placementToCSSProp[placement] : 'bottom';
	}

	var coercePlacement = function coercePlacement(p) {
	  return p === 'auto' ? 'bottom' : p;
	};

	var menuCSS = function menuCSS(_ref2) {
	  var _ref3;

	  var placement = _ref2.placement,
	      _ref2$theme = _ref2.theme,
	      borderRadius = _ref2$theme.borderRadius,
	      spacing = _ref2$theme.spacing,
	      colors = _ref2$theme.colors;
	  return _ref3 = {
	    label: 'menu'
	  }, _defineProperty(_ref3, alignToControl(placement), '100%'), _defineProperty(_ref3, "backgroundColor", colors.neutral0), _defineProperty(_ref3, "borderRadius", borderRadius), _defineProperty(_ref3, "boxShadow", '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)'), _defineProperty(_ref3, "marginBottom", spacing.menuGutter), _defineProperty(_ref3, "marginTop", spacing.menuGutter), _defineProperty(_ref3, "position", 'absolute'), _defineProperty(_ref3, "width", '100%'), _defineProperty(_ref3, "zIndex", 1), _ref3;
	}; // NOTE: internal only

	var MenuPlacer =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(MenuPlacer, _Component);

	  function MenuPlacer() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, MenuPlacer);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MenuPlacer)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
	      maxHeight: _this.props.maxMenuHeight,
	      placement: null
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPlacement", function (ref) {
	      var _this$props = _this.props,
	          minMenuHeight = _this$props.minMenuHeight,
	          maxMenuHeight = _this$props.maxMenuHeight,
	          menuPlacement = _this$props.menuPlacement,
	          menuPosition = _this$props.menuPosition,
	          menuShouldScrollIntoView = _this$props.menuShouldScrollIntoView,
	          theme = _this$props.theme;
	      var getPortalPlacement = _this.context.getPortalPlacement;
	      if (!ref) return; // DO NOT scroll if position is fixed

	      var isFixedPosition = menuPosition === 'fixed';
	      var shouldScroll = menuShouldScrollIntoView && !isFixedPosition;
	      var state = getMenuPlacement({
	        maxHeight: maxMenuHeight,
	        menuEl: ref,
	        minHeight: minMenuHeight,
	        placement: menuPlacement,
	        shouldScroll: shouldScroll,
	        isFixedPosition: isFixedPosition,
	        theme: theme
	      });
	      if (getPortalPlacement) getPortalPlacement(state);

	      _this.setState(state);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getUpdatedProps", function () {
	      var menuPlacement = _this.props.menuPlacement;
	      var placement = _this.state.placement || coercePlacement(menuPlacement);
	      return _objectSpread({}, _this.props, {
	        placement: placement,
	        maxHeight: _this.state.maxHeight
	      });
	    });

	    return _this;
	  }

	  _createClass(MenuPlacer, [{
	    key: "render",
	    value: function render() {
	      var children = this.props.children;
	      return children({
	        ref: this.getPlacement,
	        placerProps: this.getUpdatedProps()
	      });
	    }
	  }]);

	  return MenuPlacer;
	}(React.Component);

	_defineProperty(MenuPlacer, "contextTypes", {
	  getPortalPlacement: PropTypes$1.func
	});

	var Menu = function Menu(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerRef = props.innerRef,
	      innerProps = props.innerProps;
	  var cn = cx(
	  /*#__PURE__*/
	  css(getStyles('menu', props)), {
	    menu: true
	  }, className);
	  return React__default.createElement("div", _extends({
	    className: cn
	  }, innerProps, {
	    ref: innerRef
	  }), children);
	};
	// Menu List
	// ==============================

	var menuListCSS = function menuListCSS(_ref4) {
	  var maxHeight = _ref4.maxHeight,
	      baseUnit = _ref4.theme.spacing.baseUnit;
	  return {
	    maxHeight: maxHeight,
	    overflowY: 'auto',
	    paddingBottom: baseUnit,
	    paddingTop: baseUnit,
	    position: 'relative',
	    // required for offset[Height, Top] > keyboard scroll
	    WebkitOverflowScrolling: 'touch'
	  };
	};
	var MenuList = function MenuList(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      isMulti = props.isMulti,
	      innerRef = props.innerRef;
	  return React__default.createElement("div", {
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('menuList', props)), {
	      'menu-list': true,
	      'menu-list--is-multi': isMulti
	    }, className),
	    ref: innerRef
	  }, children);
	}; // ==============================
	// Menu Notices
	// ==============================

	var noticeCSS = function noticeCSS(_ref5) {
	  var _ref5$theme = _ref5.theme,
	      baseUnit = _ref5$theme.spacing.baseUnit,
	      colors = _ref5$theme.colors;
	  return {
	    color: colors.neutral40,
	    padding: "".concat(baseUnit * 2, "px ").concat(baseUnit * 3, "px"),
	    textAlign: 'center'
	  };
	};

	var noOptionsMessageCSS = noticeCSS;
	var loadingMessageCSS = noticeCSS;
	var NoOptionsMessage = function NoOptionsMessage(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;
	  return React__default.createElement("div", _extends({
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('noOptionsMessage', props)), {
	      'menu-notice': true,
	      'menu-notice--no-options': true
	    }, className)
	  }, innerProps), children);
	};
	NoOptionsMessage.defaultProps = {
	  children: 'No options'
	};
	var LoadingMessage = function LoadingMessage(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;
	  return React__default.createElement("div", _extends({
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('loadingMessage', props)), {
	      'menu-notice': true,
	      'menu-notice--loading': true
	    }, className)
	  }, innerProps), children);
	};
	LoadingMessage.defaultProps = {
	  children: 'Loading...'
	}; // ==============================
	// Menu Portal
	// ==============================

	var menuPortalCSS = function menuPortalCSS(_ref6) {
	  var rect = _ref6.rect,
	      offset = _ref6.offset,
	      position = _ref6.position;
	  return {
	    left: rect.left,
	    position: position,
	    top: offset,
	    width: rect.width,
	    zIndex: 1
	  };
	};
	var MenuPortal =
	/*#__PURE__*/
	function (_Component2) {
	  _inherits(MenuPortal, _Component2);

	  function MenuPortal() {
	    var _getPrototypeOf3;

	    var _this2;

	    _classCallCheck(this, MenuPortal);

	    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(MenuPortal)).call.apply(_getPrototypeOf3, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "state", {
	      placement: null
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "getPortalPlacement", function (_ref7) {
	      var placement = _ref7.placement;
	      var initialPlacement = coercePlacement(_this2.props.menuPlacement); // avoid re-renders if the placement has not changed

	      if (placement !== initialPlacement) {
	        _this2.setState({
	          placement: placement
	        });
	      }
	    });

	    return _this2;
	  }

	  _createClass(MenuPortal, [{
	    key: "getChildContext",
	    value: function getChildContext() {
	      return {
	        getPortalPlacement: this.getPortalPlacement
	      };
	    } // callback for occassions where the menu must "flip"

	  }, {
	    key: "render",
	    value: function render() {
	      var _this$props2 = this.props,
	          appendTo = _this$props2.appendTo,
	          children = _this$props2.children,
	          controlElement = _this$props2.controlElement,
	          menuPlacement = _this$props2.menuPlacement,
	          position = _this$props2.menuPosition,
	          getStyles = _this$props2.getStyles;
	      var isFixed = position === 'fixed'; // bail early if required elements aren't present

	      if (!appendTo && !isFixed || !controlElement) {
	        return null;
	      }

	      var placement = this.state.placement || coercePlacement(menuPlacement);
	      var rect = getBoundingClientObj(controlElement);
	      var scrollDistance = isFixed ? 0 : window.pageYOffset;
	      var offset = rect[placement] + scrollDistance;
	      var state = {
	        offset: offset,
	        position: position,
	        rect: rect
	      }; // same wrapper element whether fixed or portalled

	      var menuWrapper = React__default.createElement("div", {
	        className:
	        /*#__PURE__*/

	        /*#__PURE__*/
	        css(getStyles('menuPortal', state))
	      }, children);
	      return appendTo ? reactDom.createPortal(menuWrapper, appendTo) : menuWrapper;
	    }
	  }]);

	  return MenuPortal;
	}(React.Component);

	_defineProperty(MenuPortal, "childContextTypes", {
	  getPortalPlacement: PropTypes$1.func
	});

	var isArray = Array.isArray;
	var keyList = Object.keys;
	var hasProp = Object.prototype.hasOwnProperty;

	function equal(a, b) {
	  // fast-deep-equal index.js 2.0.1
	  if (a === b) return true;

	  if (a && b && _typeof(a) == 'object' && _typeof(b) == 'object') {
	    var arrA = isArray(a),
	        arrB = isArray(b),
	        i,
	        length,
	        key;

	    if (arrA && arrB) {
	      length = a.length;
	      if (length != b.length) return false;

	      for (i = length; i-- !== 0;) {
	        if (!equal(a[i], b[i])) return false;
	      }

	      return true;
	    }

	    if (arrA != arrB) return false;
	    var dateA = a instanceof Date,
	        dateB = b instanceof Date;
	    if (dateA != dateB) return false;
	    if (dateA && dateB) return a.getTime() == b.getTime();
	    var regexpA = a instanceof RegExp,
	        regexpB = b instanceof RegExp;
	    if (regexpA != regexpB) return false;
	    if (regexpA && regexpB) return a.toString() == b.toString();
	    var keys = keyList(a);
	    length = keys.length;

	    if (length !== keyList(b).length) {
	      return false;
	    }

	    for (i = length; i-- !== 0;) {
	      if (!hasProp.call(b, keys[i])) return false;
	    } // end fast-deep-equal
	    // Custom handling for React


	    for (i = length; i-- !== 0;) {
	      key = keys[i];

	      if (key === '_owner' && a.$$typeof) {
	        // React-specific: avoid traversing React elements' _owner.
	        //  _owner contains circular references
	        // and is not needed when comparing the actual elements (and not their owners)
	        // .$$typeof and ._store on just reasonable markers of a react element
	        continue;
	      } else {
	        // all other properties should be traversed as usual
	        if (!equal(a[key], b[key])) return false;
	      }
	    } // fast-deep-equal index.js 2.0.1


	    return true;
	  }

	  return a !== a && b !== b;
	} // end fast-deep-equal


	function exportedEqual(a, b) {
	  try {
	    return equal(a, b);
	  } catch (error) {
	    if (error.message && error.message.match(/stack|recursion/i)) {
	      // warn on circular references, don't crash
	      // browsers give this different errors name and messages:
	      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
	      // firefox: "InternalError", too much recursion"
	      // edge: "Error", "Out of stack space"
	      console.warn('Warning: react-fast-compare does not handle circular references.', error.name, error.message);
	      return false;
	    } // some other error. we should definitely know about these


	    throw error;
	  }
	}

	var diacritics = [{
	  base: 'A',
	  letters: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g
	}, {
	  base: 'AA',
	  letters: /[\uA732]/g
	}, {
	  base: 'AE',
	  letters: /[\u00C6\u01FC\u01E2]/g
	}, {
	  base: 'AO',
	  letters: /[\uA734]/g
	}, {
	  base: 'AU',
	  letters: /[\uA736]/g
	}, {
	  base: 'AV',
	  letters: /[\uA738\uA73A]/g
	}, {
	  base: 'AY',
	  letters: /[\uA73C]/g
	}, {
	  base: 'B',
	  letters: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g
	}, {
	  base: 'C',
	  letters: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g
	}, {
	  base: 'D',
	  letters: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g
	}, {
	  base: 'DZ',
	  letters: /[\u01F1\u01C4]/g
	}, {
	  base: 'Dz',
	  letters: /[\u01F2\u01C5]/g
	}, {
	  base: 'E',
	  letters: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g
	}, {
	  base: 'F',
	  letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g
	}, {
	  base: 'G',
	  letters: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g
	}, {
	  base: 'H',
	  letters: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g
	}, {
	  base: 'I',
	  letters: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g
	}, {
	  base: 'J',
	  letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g
	}, {
	  base: 'K',
	  letters: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g
	}, {
	  base: 'L',
	  letters: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g
	}, {
	  base: 'LJ',
	  letters: /[\u01C7]/g
	}, {
	  base: 'Lj',
	  letters: /[\u01C8]/g
	}, {
	  base: 'M',
	  letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g
	}, {
	  base: 'N',
	  letters: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g
	}, {
	  base: 'NJ',
	  letters: /[\u01CA]/g
	}, {
	  base: 'Nj',
	  letters: /[\u01CB]/g
	}, {
	  base: 'O',
	  letters: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g
	}, {
	  base: 'OI',
	  letters: /[\u01A2]/g
	}, {
	  base: 'OO',
	  letters: /[\uA74E]/g
	}, {
	  base: 'OU',
	  letters: /[\u0222]/g
	}, {
	  base: 'P',
	  letters: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g
	}, {
	  base: 'Q',
	  letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g
	}, {
	  base: 'R',
	  letters: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g
	}, {
	  base: 'S',
	  letters: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g
	}, {
	  base: 'T',
	  letters: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g
	}, {
	  base: 'TZ',
	  letters: /[\uA728]/g
	}, {
	  base: 'U',
	  letters: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g
	}, {
	  base: 'V',
	  letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g
	}, {
	  base: 'VY',
	  letters: /[\uA760]/g
	}, {
	  base: 'W',
	  letters: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g
	}, {
	  base: 'X',
	  letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g
	}, {
	  base: 'Y',
	  letters: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g
	}, {
	  base: 'Z',
	  letters: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g
	}, {
	  base: 'a',
	  letters: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g
	}, {
	  base: 'aa',
	  letters: /[\uA733]/g
	}, {
	  base: 'ae',
	  letters: /[\u00E6\u01FD\u01E3]/g
	}, {
	  base: 'ao',
	  letters: /[\uA735]/g
	}, {
	  base: 'au',
	  letters: /[\uA737]/g
	}, {
	  base: 'av',
	  letters: /[\uA739\uA73B]/g
	}, {
	  base: 'ay',
	  letters: /[\uA73D]/g
	}, {
	  base: 'b',
	  letters: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g
	}, {
	  base: 'c',
	  letters: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g
	}, {
	  base: 'd',
	  letters: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g
	}, {
	  base: 'dz',
	  letters: /[\u01F3\u01C6]/g
	}, {
	  base: 'e',
	  letters: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g
	}, {
	  base: 'f',
	  letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g
	}, {
	  base: 'g',
	  letters: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g
	}, {
	  base: 'h',
	  letters: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g
	}, {
	  base: 'hv',
	  letters: /[\u0195]/g
	}, {
	  base: 'i',
	  letters: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g
	}, {
	  base: 'j',
	  letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g
	}, {
	  base: 'k',
	  letters: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g
	}, {
	  base: 'l',
	  letters: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g
	}, {
	  base: 'lj',
	  letters: /[\u01C9]/g
	}, {
	  base: 'm',
	  letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g
	}, {
	  base: 'n',
	  letters: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g
	}, {
	  base: 'nj',
	  letters: /[\u01CC]/g
	}, {
	  base: 'o',
	  letters: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g
	}, {
	  base: 'oi',
	  letters: /[\u01A3]/g
	}, {
	  base: 'ou',
	  letters: /[\u0223]/g
	}, {
	  base: 'oo',
	  letters: /[\uA74F]/g
	}, {
	  base: 'p',
	  letters: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g
	}, {
	  base: 'q',
	  letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g
	}, {
	  base: 'r',
	  letters: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g
	}, {
	  base: 's',
	  letters: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g
	}, {
	  base: 't',
	  letters: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g
	}, {
	  base: 'tz',
	  letters: /[\uA729]/g
	}, {
	  base: 'u',
	  letters: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g
	}, {
	  base: 'v',
	  letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g
	}, {
	  base: 'vy',
	  letters: /[\uA761]/g
	}, {
	  base: 'w',
	  letters: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g
	}, {
	  base: 'x',
	  letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g
	}, {
	  base: 'y',
	  letters: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g
	}, {
	  base: 'z',
	  letters: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g
	}];
	var stripDiacritics = function stripDiacritics(str) {
	  for (var i = 0; i < diacritics.length; i++) {
	    str = str.replace(diacritics[i].letters, diacritics[i].base);
	  }

	  return str;
	};

	var trimString = function trimString(str) {
	  return str.replace(/^\s+|\s+$/g, '');
	};

	var defaultStringify = function defaultStringify(option) {
	  return "".concat(option.label, " ").concat(option.value);
	};

	var createFilter = function createFilter(config) {
	  return function (option, rawInput) {
	    var _ignoreCase$ignoreAcc = _objectSpread({
	      ignoreCase: true,
	      ignoreAccents: true,
	      stringify: defaultStringify,
	      trim: true,
	      matchFrom: 'any'
	    }, config),
	        ignoreCase = _ignoreCase$ignoreAcc.ignoreCase,
	        ignoreAccents = _ignoreCase$ignoreAcc.ignoreAccents,
	        stringify = _ignoreCase$ignoreAcc.stringify,
	        trim = _ignoreCase$ignoreAcc.trim,
	        matchFrom = _ignoreCase$ignoreAcc.matchFrom;

	    var input = trim ? trimString(rawInput) : rawInput;
	    var candidate = trim ? trimString(stringify(option)) : stringify(option);

	    if (ignoreCase) {
	      input = input.toLowerCase();
	      candidate = candidate.toLowerCase();
	    }

	    if (ignoreAccents) {
	      input = stripDiacritics(input);
	      candidate = stripDiacritics(candidate);
	    }

	    return matchFrom === 'start' ? candidate.substr(0, input.length) === input : candidate.indexOf(input) > -1;
	  };
	};

	var A11yText = function A11yText(props) {
	  return React__default.createElement("span", _extends({
	    className:
	    /*#__PURE__*/

	    /*#__PURE__*/
	    css({
	      label: 'a11yText',
	      zIndex: 9999,
	      border: 0,
	      clip: 'rect(1px, 1px, 1px, 1px)',
	      height: 1,
	      width: 1,
	      position: 'absolute',
	      overflow: 'hidden',
	      padding: 0,
	      whiteSpace: 'nowrap',
	      backgroundColor: 'red',
	      color: 'blue'
	    })
	  }, props));
	};

	var DummyInput =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(DummyInput, _Component);

	  function DummyInput() {
	    _classCallCheck(this, DummyInput);

	    return _possibleConstructorReturn(this, _getPrototypeOf(DummyInput).apply(this, arguments));
	  }

	  _createClass(DummyInput, [{
	    key: "render",
	    value: function render() {
	      var _this$props = this.props,
	          inProp = _this$props.in,
	          out = _this$props.out,
	          onExited = _this$props.onExited,
	          appear = _this$props.appear,
	          enter = _this$props.enter,
	          exit = _this$props.exit,
	          innerRef = _this$props.innerRef,
	          emotion = _this$props.emotion,
	          props = _objectWithoutProperties(_this$props, ["in", "out", "onExited", "appear", "enter", "exit", "innerRef", "emotion"]);

	      return React__default.createElement("input", _extends({
	        ref: innerRef
	      }, props, {
	        className:
	        /*#__PURE__*/

	        /*#__PURE__*/
	        css({
	          label: 'dummyInput',
	          // get rid of any default styles
	          background: 0,
	          border: 0,
	          fontSize: 'inherit',
	          outline: 0,
	          padding: 0,
	          // important! without `width` browsers won't allow focus
	          width: 1,
	          // remove cursor on desktop
	          color: 'transparent',
	          // remove cursor on mobile whilst maintaining "scroll into view" behaviour
	          left: -100,
	          opacity: 0,
	          position: 'relative',
	          transform: 'scale(0)'
	        })
	      }));
	    }
	  }]);

	  return DummyInput;
	}(React.Component);

	var NodeResolver =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(NodeResolver, _Component);

	  function NodeResolver() {
	    _classCallCheck(this, NodeResolver);

	    return _possibleConstructorReturn(this, _getPrototypeOf(NodeResolver).apply(this, arguments));
	  }

	  _createClass(NodeResolver, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.props.innerRef(reactDom.findDOMNode(this));
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this.props.innerRef(null);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return this.props.children;
	    }
	  }]);

	  return NodeResolver;
	}(React.Component);

	var STYLE_KEYS = ['boxSizing', 'height', 'overflow', 'paddingRight', 'position'];
	var LOCK_STYLES = {
	  boxSizing: 'border-box',
	  // account for possible declaration `width: 100%;` on body
	  overflow: 'hidden',
	  position: 'relative',
	  height: '100%'
	};

	function preventTouchMove(e) {
	  e.preventDefault();
	}
	function allowTouchMove(e) {
	  e.stopPropagation();
	}
	function preventInertiaScroll() {
	  var top = this.scrollTop;
	  var totalScroll = this.scrollHeight;
	  var currentScroll = top + this.offsetHeight;

	  if (top === 0) {
	    this.scrollTop = 1;
	  } else if (currentScroll === totalScroll) {
	    this.scrollTop = top - 1;
	  }
	} // `ontouchstart` check works on most browsers
	// `maxTouchPoints` works on IE10/11 and Surface

	function isTouchDevice() {
	  return 'ontouchstart' in window || navigator.maxTouchPoints;
	}

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	var activeScrollLocks = 0;

	var ScrollLock =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(ScrollLock, _Component);

	  function ScrollLock() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, ScrollLock);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ScrollLock)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "originalStyles", {});

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "listenerOptions", {
	      capture: false,
	      passive: false
	    });

	    return _this;
	  }

	  _createClass(ScrollLock, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      var _this2 = this;

	      if (!canUseDOM) return;
	      var _this$props = this.props,
	          accountForScrollbars = _this$props.accountForScrollbars,
	          touchScrollTarget = _this$props.touchScrollTarget;
	      var target = document.body;
	      var targetStyle = target && target.style;

	      if (accountForScrollbars) {
	        // store any styles already applied to the body
	        STYLE_KEYS.forEach(function (key) {
	          var val = targetStyle && targetStyle[key];
	          _this2.originalStyles[key] = val;
	        });
	      } // apply the lock styles and padding if this is the first scroll lock


	      if (accountForScrollbars && activeScrollLocks < 1) {
	        var currentPadding = parseInt(this.originalStyles.paddingRight, 10) || 0;
	        var clientWidth = document.body ? document.body.clientWidth : 0;
	        var adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;
	        Object.keys(LOCK_STYLES).forEach(function (key) {
	          var val = LOCK_STYLES[key];

	          if (targetStyle) {
	            targetStyle[key] = val;
	          }
	        });

	        if (targetStyle) {
	          targetStyle.paddingRight = "".concat(adjustedPadding, "px");
	        }
	      } // account for touch devices


	      if (target && isTouchDevice()) {
	        // Mobile Safari ignores { overflow: hidden } declaration on the body.
	        target.addEventListener('touchmove', preventTouchMove, this.listenerOptions); // Allow scroll on provided target

	        if (touchScrollTarget) {
	          touchScrollTarget.addEventListener('touchstart', preventInertiaScroll, this.listenerOptions);
	          touchScrollTarget.addEventListener('touchmove', allowTouchMove, this.listenerOptions);
	        }
	      } // increment active scroll locks


	      activeScrollLocks += 1;
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      var _this3 = this;

	      if (!canUseDOM) return;
	      var _this$props2 = this.props,
	          accountForScrollbars = _this$props2.accountForScrollbars,
	          touchScrollTarget = _this$props2.touchScrollTarget;
	      var target = document.body;
	      var targetStyle = target && target.style; // safely decrement active scroll locks

	      activeScrollLocks = Math.max(activeScrollLocks - 1, 0); // reapply original body styles, if any

	      if (accountForScrollbars && activeScrollLocks < 1) {
	        STYLE_KEYS.forEach(function (key) {
	          var val = _this3.originalStyles[key];

	          if (targetStyle) {
	            targetStyle[key] = val;
	          }
	        });
	      } // remove touch listeners


	      if (target && isTouchDevice()) {
	        target.removeEventListener('touchmove', preventTouchMove, this.listenerOptions);

	        if (touchScrollTarget) {
	          touchScrollTarget.removeEventListener('touchstart', preventInertiaScroll, this.listenerOptions);
	          touchScrollTarget.removeEventListener('touchmove', allowTouchMove, this.listenerOptions);
	        }
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return null;
	    }
	  }]);

	  return ScrollLock;
	}(React.Component);

	_defineProperty(ScrollLock, "defaultProps", {
	  accountForScrollbars: true
	});

	// NOTE:
	// We shouldn't need this after updating to React v16.3.0, which introduces:
	// - createRef() https://reactjs.org/docs/react-api.html#reactcreateref
	// - forwardRef() https://reactjs.org/docs/react-api.html#reactforwardref
	var ScrollBlock =
	/*#__PURE__*/
	function (_PureComponent) {
	  _inherits(ScrollBlock, _PureComponent);

	  function ScrollBlock() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, ScrollBlock);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ScrollBlock)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
	      touchScrollTarget: null
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getScrollTarget", function (ref) {
	      if (ref === _this.state.touchScrollTarget) return;

	      _this.setState({
	        touchScrollTarget: ref
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "blurSelectInput", function () {
	      if (document.activeElement) {
	        document.activeElement.blur();
	      }
	    });

	    return _this;
	  }

	  _createClass(ScrollBlock, [{
	    key: "render",
	    value: function render() {
	      var _this$props = this.props,
	          children = _this$props.children,
	          isEnabled = _this$props.isEnabled;
	      var touchScrollTarget = this.state.touchScrollTarget; // bail early if not enabled

	      if (!isEnabled) return children;
	      /*
	       * Div
	       * ------------------------------
	       * blocks scrolling on non-body elements behind the menu
	        * NodeResolver
	       * ------------------------------
	       * we need a reference to the scrollable element to "unlock" scroll on
	       * mobile devices
	        * ScrollLock
	       * ------------------------------
	       * actually does the scroll locking
	       */

	      return React__default.createElement("div", null, React__default.createElement("div", {
	        onClick: this.blurSelectInput,
	        className:
	        /*#__PURE__*/

	        /*#__PURE__*/
	        css({
	          position: 'fixed',
	          left: 0,
	          bottom: 0,
	          right: 0,
	          top: 0
	        })
	      }), React__default.createElement(NodeResolver, {
	        innerRef: this.getScrollTarget
	      }, children), touchScrollTarget ? React__default.createElement(ScrollLock, {
	        touchScrollTarget: touchScrollTarget
	      }) : null);
	    }
	  }]);

	  return ScrollBlock;
	}(React.PureComponent);

	var ScrollCaptor =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(ScrollCaptor, _Component);

	  function ScrollCaptor() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, ScrollCaptor);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ScrollCaptor)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isBottom", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isTop", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollTarget", void 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "touchStart", void 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "cancelScroll", function (event) {
	      event.preventDefault();
	      event.stopPropagation();
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleEventDelta", function (event, delta) {
	      var _this$props = _this.props,
	          onBottomArrive = _this$props.onBottomArrive,
	          onBottomLeave = _this$props.onBottomLeave,
	          onTopArrive = _this$props.onTopArrive,
	          onTopLeave = _this$props.onTopLeave;
	      var _this$scrollTarget = _this.scrollTarget,
	          scrollTop = _this$scrollTarget.scrollTop,
	          scrollHeight = _this$scrollTarget.scrollHeight,
	          clientHeight = _this$scrollTarget.clientHeight;
	      var target = _this.scrollTarget;
	      var isDeltaPositive = delta > 0;
	      var availableScroll = scrollHeight - clientHeight - scrollTop;
	      var shouldCancelScroll = false; // reset bottom/top flags

	      if (availableScroll > delta && _this.isBottom) {
	        if (onBottomLeave) onBottomLeave(event);
	        _this.isBottom = false;
	      }

	      if (isDeltaPositive && _this.isTop) {
	        if (onTopLeave) onTopLeave(event);
	        _this.isTop = false;
	      } // bottom limit


	      if (isDeltaPositive && delta > availableScroll) {
	        if (onBottomArrive && !_this.isBottom) {
	          onBottomArrive(event);
	        }

	        target.scrollTop = scrollHeight;
	        shouldCancelScroll = true;
	        _this.isBottom = true; // top limit
	      } else if (!isDeltaPositive && -delta > scrollTop) {
	        if (onTopArrive && !_this.isTop) {
	          onTopArrive(event);
	        }

	        target.scrollTop = 0;
	        shouldCancelScroll = true;
	        _this.isTop = true;
	      } // cancel scroll


	      if (shouldCancelScroll) {
	        _this.cancelScroll(event);
	      }
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onWheel", function (event) {
	      _this.handleEventDelta(event, event.deltaY);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchStart", function (event) {
	      // set touch start so we can calculate touchmove delta
	      _this.touchStart = event.changedTouches[0].clientY;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchMove", function (event) {
	      var deltaY = _this.touchStart - event.changedTouches[0].clientY;

	      _this.handleEventDelta(event, deltaY);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getScrollTarget", function (ref) {
	      _this.scrollTarget = ref;
	    });

	    return _this;
	  }

	  _createClass(ScrollCaptor, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.startListening(this.scrollTarget);
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this.stopListening(this.scrollTarget);
	    }
	  }, {
	    key: "startListening",
	    value: function startListening(el) {
	      // bail early if no scroll available
	      if (!el) return;
	      if (el.scrollHeight <= el.clientHeight) return; // all the if statements are to appease Flow 😢

	      if (typeof el.addEventListener === 'function') {
	        el.addEventListener('wheel', this.onWheel, false);
	      }

	      if (typeof el.addEventListener === 'function') {
	        el.addEventListener('touchstart', this.onTouchStart, false);
	      }

	      if (typeof el.addEventListener === 'function') {
	        el.addEventListener('touchmove', this.onTouchMove, false);
	      }
	    }
	  }, {
	    key: "stopListening",
	    value: function stopListening(el) {
	      // bail early if no scroll available
	      if (el.scrollHeight <= el.clientHeight) return; // all the if statements are to appease Flow 😢

	      if (typeof el.removeEventListener === 'function') {
	        el.removeEventListener('wheel', this.onWheel, false);
	      }

	      if (typeof el.removeEventListener === 'function') {
	        el.removeEventListener('touchstart', this.onTouchStart, false);
	      }

	      if (typeof el.removeEventListener === 'function') {
	        el.removeEventListener('touchmove', this.onTouchMove, false);
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return React__default.createElement(NodeResolver, {
	        innerRef: this.getScrollTarget
	      }, this.props.children);
	    }
	  }]);

	  return ScrollCaptor;
	}(React.Component);

	var ScrollCaptorSwitch =
	/*#__PURE__*/
	function (_Component2) {
	  _inherits(ScrollCaptorSwitch, _Component2);

	  function ScrollCaptorSwitch() {
	    _classCallCheck(this, ScrollCaptorSwitch);

	    return _possibleConstructorReturn(this, _getPrototypeOf(ScrollCaptorSwitch).apply(this, arguments));
	  }

	  _createClass(ScrollCaptorSwitch, [{
	    key: "render",
	    value: function render() {
	      var _this$props2 = this.props,
	          isEnabled = _this$props2.isEnabled,
	          props = _objectWithoutProperties(_this$props2, ["isEnabled"]);

	      return isEnabled ? React__default.createElement(ScrollCaptor, props) : this.props.children;
	    }
	  }]);

	  return ScrollCaptorSwitch;
	}(React.Component);

	_defineProperty(ScrollCaptorSwitch, "defaultProps", {
	  isEnabled: true
	});

	var instructionsAriaMessage = function instructionsAriaMessage(event) {
	  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var isSearchable = context.isSearchable,
	      isMulti = context.isMulti,
	      label = context.label,
	      isDisabled = context.isDisabled;

	  switch (event) {
	    case 'menu':
	      return "Use Up and Down to choose options".concat(isDisabled ? '' : ', press Enter to select the currently focused option', ", press Escape to exit the menu, press Tab to select the option and exit the menu.");

	    case 'input':
	      return "".concat(label ? label : 'Select', " is focused ").concat(isSearchable ? ',type to refine list' : '', ", press Down to open the menu, ").concat(isMulti ? ' press left to focus selected values' : '');

	    case 'value':
	      return 'Use left and right to toggle between focused values, press Backspace to remove the currently focused value';
	  }
	};
	var valueEventAriaMessage = function valueEventAriaMessage(event, context) {
	  var value = context.value,
	      isDisabled = context.isDisabled;
	  if (!value) return;

	  switch (event) {
	    case 'deselect-option':
	    case 'pop-value':
	    case 'remove-value':
	      return "option ".concat(value, ", deselected.");

	    case 'select-option':
	      return isDisabled ? "option ".concat(value, " is disabled. Select another option.") : "option ".concat(value, ", selected.");
	  }
	};
	var valueFocusAriaMessage = function valueFocusAriaMessage(_ref) {
	  var focusedValue = _ref.focusedValue,
	      getOptionLabel = _ref.getOptionLabel,
	      selectValue = _ref.selectValue;
	  return "value ".concat(getOptionLabel(focusedValue), " focused, ").concat(selectValue.indexOf(focusedValue) + 1, " of ").concat(selectValue.length, ".");
	};
	var optionFocusAriaMessage = function optionFocusAriaMessage(_ref2) {
	  var focusedOption = _ref2.focusedOption,
	      getOptionLabel = _ref2.getOptionLabel,
	      options = _ref2.options;
	  return "option ".concat(getOptionLabel(focusedOption), " focused").concat(focusedOption.isDisabled ? ' disabled' : '', ", ").concat(options.indexOf(focusedOption) + 1, " of ").concat(options.length, ".");
	};
	var resultsAriaMessage = function resultsAriaMessage(_ref3) {
	  var inputValue = _ref3.inputValue,
	      screenReaderMessage = _ref3.screenReaderMessage;
	  return "".concat(screenReaderMessage).concat(inputValue ? ' for search term ' + inputValue : '', ".");
	};

	var formatGroupLabel = function formatGroupLabel(group) {
	  return group.label;
	};
	var getOptionLabel = function getOptionLabel(option) {
	  return option.label;
	};
	var getOptionValue = function getOptionValue(option) {
	  return option.value;
	};
	var isOptionDisabled = function isOptionDisabled(option) {
	  return !!option.isDisabled;
	};

	var containerCSS = function containerCSS(_ref) {
	  var isDisabled = _ref.isDisabled,
	      isRtl = _ref.isRtl;
	  return {
	    label: 'container',
	    direction: isRtl ? 'rtl' : null,
	    pointerEvents: isDisabled ? 'none' : null,
	    // cancel mouse events when disabled
	    position: 'relative'
	  };
	};
	var SelectContainer = function SelectContainer(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps,
	      isDisabled = props.isDisabled,
	      isRtl = props.isRtl;
	  return React__default.createElement("div", _extends({
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('container', props)), {
	      '--is-disabled': isDisabled,
	      '--is-rtl': isRtl
	    }, className)
	  }, innerProps), children);
	}; // ==============================
	// Value Container
	// ==============================

	var valueContainerCSS = function valueContainerCSS(_ref2) {
	  var spacing = _ref2.theme.spacing;
	  return {
	    alignItems: 'center',
	    display: 'flex',
	    flex: 1,
	    flexWrap: 'wrap',
	    padding: "".concat(spacing.baseUnit / 2, "px ").concat(spacing.baseUnit * 2, "px"),
	    WebkitOverflowScrolling: 'touch',
	    position: 'relative',
	    overflow: 'hidden'
	  };
	};
	var ValueContainer =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(ValueContainer, _Component);

	  function ValueContainer() {
	    _classCallCheck(this, ValueContainer);

	    return _possibleConstructorReturn(this, _getPrototypeOf(ValueContainer).apply(this, arguments));
	  }

	  _createClass(ValueContainer, [{
	    key: "render",
	    value: function render() {
	      var _this$props = this.props,
	          children = _this$props.children,
	          className = _this$props.className,
	          cx = _this$props.cx,
	          isMulti = _this$props.isMulti,
	          getStyles = _this$props.getStyles,
	          hasValue = _this$props.hasValue;
	      return React__default.createElement("div", {
	        className: cx(
	        /*#__PURE__*/
	        css(getStyles('valueContainer', this.props)), {
	          'value-container': true,
	          'value-container--is-multi': isMulti,
	          'value-container--has-value': hasValue
	        }, className)
	      }, children);
	    }
	  }]);

	  return ValueContainer;
	}(React.Component); // ==============================
	// Indicator Container
	// ==============================

	var indicatorsContainerCSS = function indicatorsContainerCSS() {
	  return {
	    alignItems: 'center',
	    alignSelf: 'stretch',
	    display: 'flex',
	    flexShrink: 0
	  };
	};
	var IndicatorsContainer = function IndicatorsContainer(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles;
	  return React__default.createElement("div", {
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('indicatorsContainer', props)), {
	      'indicators': true
	    }, className)
	  }, children);
	};

	// ==============================
	// Dropdown & Clear Icons
	// ==============================
	var Svg = function Svg(_ref) {
	  var size = _ref.size,
	      props = _objectWithoutProperties(_ref, ["size"]);

	  return React__default.createElement("svg", _extends({
	    height: size,
	    width: size,
	    viewBox: "0 0 20 20",
	    "aria-hidden": "true",
	    focusable: "false",
	    className:
	    /*#__PURE__*/

	    /*#__PURE__*/
	    css({
	      display: 'inline-block',
	      fill: 'currentColor',
	      lineHeight: 1,
	      stroke: 'currentColor',
	      strokeWidth: 0
	    })
	  }, props));
	};

	var CrossIcon = function CrossIcon(props) {
	  return React__default.createElement(Svg, _extends({
	    size: 20
	  }, props), React__default.createElement("path", {
	    d: "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
	  }));
	};
	var DownChevron = function DownChevron(props) {
	  return React__default.createElement(Svg, _extends({
	    size: 20
	  }, props), React__default.createElement("path", {
	    d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
	  }));
	}; // ==============================
	// Dropdown & Clear Buttons
	// ==============================

	var baseCSS = function baseCSS(_ref2) {
	  var isFocused = _ref2.isFocused,
	      _ref2$theme = _ref2.theme,
	      baseUnit = _ref2$theme.spacing.baseUnit,
	      colors = _ref2$theme.colors;
	  return {
	    label: 'indicatorContainer',
	    color: isFocused ? colors.neutral60 : colors.neutral20,
	    display: 'flex',
	    padding: baseUnit * 2,
	    transition: 'color 150ms',
	    ':hover': {
	      color: isFocused ? colors.neutral80 : colors.neutral40
	    }
	  };
	};

	var dropdownIndicatorCSS = baseCSS;
	var DropdownIndicator = function DropdownIndicator(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;
	  return React__default.createElement("div", _extends({}, innerProps, {
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('dropdownIndicator', props)), {
	      'indicator': true,
	      'dropdown-indicator': true
	    }, className)
	  }), children || React__default.createElement(DownChevron, null));
	};
	var clearIndicatorCSS = baseCSS;
	var ClearIndicator = function ClearIndicator(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;
	  return React__default.createElement("div", _extends({}, innerProps, {
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('clearIndicator', props)), {
	      'indicator': true,
	      'clear-indicator': true
	    }, className)
	  }), children || React__default.createElement(CrossIcon, null));
	}; // ==============================
	// Separator
	// ==============================

	var indicatorSeparatorCSS = function indicatorSeparatorCSS(_ref3) {
	  var isDisabled = _ref3.isDisabled,
	      _ref3$theme = _ref3.theme,
	      baseUnit = _ref3$theme.spacing.baseUnit,
	      colors = _ref3$theme.colors;
	  return {
	    label: 'indicatorSeparator',
	    alignSelf: 'stretch',
	    backgroundColor: isDisabled ? colors.neutral10 : colors.neutral20,
	    marginBottom: baseUnit * 2,
	    marginTop: baseUnit * 2,
	    width: 1
	  };
	};
	var IndicatorSeparator = function IndicatorSeparator(props) {
	  var className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;
	  return React__default.createElement("span", _extends({}, innerProps, {
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('indicatorSeparator', props)), {
	      'indicator-separator': true
	    }, className)
	  }));
	}; // ==============================
	// Loading
	// ==============================

	var keyframesName = 'react-select-loading-indicator';
	var keyframesInjected = false;
	var loadingIndicatorCSS = function loadingIndicatorCSS(_ref4) {
	  var isFocused = _ref4.isFocused,
	      size = _ref4.size,
	      _ref4$theme = _ref4.theme,
	      colors = _ref4$theme.colors,
	      baseUnit = _ref4$theme.spacing.baseUnit;
	  return {
	    label: 'loadingIndicator',
	    color: isFocused ? colors.neutral60 : colors.neutral20,
	    display: 'flex',
	    padding: baseUnit * 2,
	    transition: 'color 150ms',
	    alignSelf: 'center',
	    fontSize: size,
	    lineHeight: 1,
	    marginRight: size,
	    textAlign: 'center',
	    verticalAlign: 'middle'
	  };
	};

	var LoadingDot = function LoadingDot(_ref5) {
	  var color = _ref5.color,
	      delay = _ref5.delay,
	      offset = _ref5.offset;
	  return React__default.createElement("span", {
	    className:
	    /*#__PURE__*/

	    /*#__PURE__*/
	    css({
	      animationDuration: '1s',
	      animationDelay: "".concat(delay, "ms"),
	      animationIterationCount: 'infinite',
	      animationName: keyframesName,
	      animationTimingFunction: 'ease-in-out',
	      backgroundColor: color,
	      borderRadius: '1em',
	      display: 'inline-block',
	      marginLeft: offset ? '1em' : null,
	      height: '1em',
	      verticalAlign: 'top',
	      width: '1em'
	    })
	  });
	};

	var LoadingIndicator = function LoadingIndicator(props) {
	  var className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps,
	      isFocused = props.isFocused,
	      isRtl = props.isRtl,
	      colors = props.theme.colors;
	  var color = isFocused ? colors.neutral80 : colors.neutral20;

	  if (!keyframesInjected) {
	    // eslint-disable-next-line no-unused-expressions
	    injectGlobal("@keyframes ", keyframesName, "{0%,80%,100%{opacity:0;}40%{opacity:1;}};");
	    keyframesInjected = true;
	  }

	  return React__default.createElement("div", _extends({}, innerProps, {
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('loadingIndicator', props)), {
	      'indicator': true,
	      'loading-indicator': true
	    }, className)
	  }), React__default.createElement(LoadingDot, {
	    color: color,
	    delay: 0,
	    offset: isRtl
	  }), React__default.createElement(LoadingDot, {
	    color: color,
	    delay: 160,
	    offset: true
	  }), React__default.createElement(LoadingDot, {
	    color: color,
	    delay: 320,
	    offset: !isRtl
	  }));
	};
	LoadingIndicator.defaultProps = {
	  size: 4
	};

	var css$1 = function css$$1(_ref) {
	  var isDisabled = _ref.isDisabled,
	      isFocused = _ref.isFocused,
	      _ref$theme = _ref.theme,
	      colors = _ref$theme.colors,
	      borderRadius = _ref$theme.borderRadius,
	      spacing = _ref$theme.spacing;
	  return {
	    label: 'control',
	    alignItems: 'center',
	    backgroundColor: isDisabled ? colors.neutral5 : colors.neutral0,
	    borderColor: isDisabled ? colors.neutral10 : isFocused ? colors.primary : colors.neutral20,
	    borderRadius: borderRadius,
	    borderStyle: 'solid',
	    borderWidth: 1,
	    boxShadow: isFocused ? "0 0 0 1px ".concat(colors.primary) : null,
	    cursor: 'default',
	    display: 'flex',
	    flexWrap: 'wrap',
	    justifyContent: 'space-between',
	    minHeight: spacing.controlHeight,
	    outline: '0 !important',
	    position: 'relative',
	    transition: 'all 100ms',
	    '&:hover': {
	      borderColor: isFocused ? colors.primary : colors.neutral30
	    }
	  };
	};

	var Control = function Control(props) {
	  var children = props.children,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      className = props.className,
	      isDisabled = props.isDisabled,
	      isFocused = props.isFocused,
	      innerRef = props.innerRef,
	      innerProps = props.innerProps,
	      menuIsOpen = props.menuIsOpen;
	  return React__default.createElement("div", _extends({
	    ref: innerRef,
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('control', props)), {
	      'control': true,
	      'control--is-disabled': isDisabled,
	      'control--is-focused': isFocused,
	      'control--menu-is-open': menuIsOpen
	    }, className)
	  }, innerProps), children);
	};

	var groupCSS = function groupCSS(_ref) {
	  var spacing = _ref.theme.spacing;
	  return {
	    paddingBottom: spacing.baseUnit * 2,
	    paddingTop: spacing.baseUnit * 2
	  };
	};

	var Group = function Group(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      Heading = props.Heading,
	      headingProps = props.headingProps,
	      label = props.label,
	      theme = props.theme,
	      selectProps = props.selectProps;
	  return React__default.createElement("div", {
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('group', props)), {
	      'group': true
	    }, className)
	  }, React__default.createElement(Heading, _extends({}, headingProps, {
	    selectProps: selectProps,
	    theme: theme,
	    getStyles: getStyles,
	    cx: cx
	  }), label), React__default.createElement("div", null, children));
	};

	var groupHeadingCSS = function groupHeadingCSS(_ref2) {
	  var spacing = _ref2.theme.spacing;
	  return {
	    label: 'group',
	    color: '#999',
	    cursor: 'default',
	    display: 'block',
	    fontSize: '75%',
	    fontWeight: '500',
	    marginBottom: '0.25em',
	    paddingLeft: spacing.baseUnit * 3,
	    paddingRight: spacing.baseUnit * 3,
	    textTransform: 'uppercase'
	  };
	};
	var GroupHeading = function GroupHeading(props) {
	  var className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      theme = props.theme,
	      selectProps = props.selectProps,
	      cleanProps = _objectWithoutProperties(props, ["className", "cx", "getStyles", "theme", "selectProps"]);

	  return React__default.createElement("div", _extends({
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('groupHeading', _objectSpread({
	      theme: theme
	    }, cleanProps))), {
	      'group-heading': true
	    }, className)
	  }, cleanProps));
	};

	var inputCSS = function inputCSS(_ref) {
	  var isDisabled = _ref.isDisabled,
	      _ref$theme = _ref.theme,
	      spacing = _ref$theme.spacing,
	      colors = _ref$theme.colors;
	  return {
	    margin: spacing.baseUnit / 2,
	    paddingBottom: spacing.baseUnit / 2,
	    paddingTop: spacing.baseUnit / 2,
	    visibility: isDisabled ? 'hidden' : 'visible',
	    color: colors.neutral80
	  };
	};

	var inputStyle = function inputStyle(isHidden) {
	  return {
	    label: 'input',
	    background: 0,
	    border: 0,
	    fontSize: 'inherit',
	    opacity: isHidden ? 0 : 1,
	    outline: 0,
	    padding: 0,
	    color: 'inherit'
	  };
	};

	var Input = function Input(_ref2) {
	  var className = _ref2.className,
	      cx = _ref2.cx,
	      getStyles = _ref2.getStyles,
	      innerRef = _ref2.innerRef,
	      isHidden = _ref2.isHidden,
	      isDisabled = _ref2.isDisabled,
	      theme = _ref2.theme,
	      selectProps = _ref2.selectProps,
	      props = _objectWithoutProperties(_ref2, ["className", "cx", "getStyles", "innerRef", "isHidden", "isDisabled", "theme", "selectProps"]);

	  return React__default.createElement("div", {
	    className:
	    /*#__PURE__*/

	    /*#__PURE__*/
	    css(getStyles('input', _objectSpread({
	      theme: theme
	    }, props)))
	  }, React__default.createElement(AutosizeInput, _extends({
	    className: cx(null, {
	      'input': true
	    }, className),
	    inputRef: innerRef,
	    inputStyle: inputStyle(isHidden),
	    disabled: isDisabled
	  }, props)));
	};

	var multiValueCSS = function multiValueCSS(_ref) {
	  var _ref$theme = _ref.theme,
	      spacing = _ref$theme.spacing,
	      borderRadius = _ref$theme.borderRadius,
	      colors = _ref$theme.colors;
	  return {
	    label: 'multiValue',
	    backgroundColor: colors.neutral10,
	    borderRadius: borderRadius / 2,
	    display: 'flex',
	    margin: spacing.baseUnit / 2,
	    minWidth: 0 // resolves flex/text-overflow bug

	  };
	};
	var multiValueLabelCSS = function multiValueLabelCSS(_ref2) {
	  var _ref2$theme = _ref2.theme,
	      borderRadius = _ref2$theme.borderRadius,
	      colors = _ref2$theme.colors,
	      cropWithEllipsis = _ref2.cropWithEllipsis;
	  return {
	    borderRadius: borderRadius / 2,
	    color: colors.neutral80,
	    fontSize: '85%',
	    overflow: 'hidden',
	    padding: 3,
	    paddingLeft: 6,
	    textOverflow: cropWithEllipsis ? 'ellipsis' : null,
	    whiteSpace: 'nowrap'
	  };
	};
	var multiValueRemoveCSS = function multiValueRemoveCSS(_ref3) {
	  var _ref3$theme = _ref3.theme,
	      spacing = _ref3$theme.spacing,
	      borderRadius = _ref3$theme.borderRadius,
	      colors = _ref3$theme.colors,
	      isFocused = _ref3.isFocused;
	  return {
	    alignItems: 'center',
	    borderRadius: borderRadius / 2,
	    backgroundColor: isFocused && colors.dangerLight,
	    display: 'flex',
	    paddingLeft: spacing.baseUnit,
	    paddingRight: spacing.baseUnit,
	    ':hover': {
	      backgroundColor: colors.dangerLight,
	      color: colors.danger
	    }
	  };
	};
	var MultiValueGeneric = function MultiValueGeneric(_ref4) {
	  var children = _ref4.children,
	      innerProps = _ref4.innerProps;
	  return React__default.createElement("div", innerProps, children);
	};
	var MultiValueContainer = MultiValueGeneric;
	var MultiValueLabel = MultiValueGeneric;
	var MultiValueRemove =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(MultiValueRemove, _Component);

	  function MultiValueRemove() {
	    _classCallCheck(this, MultiValueRemove);

	    return _possibleConstructorReturn(this, _getPrototypeOf(MultiValueRemove).apply(this, arguments));
	  }

	  _createClass(MultiValueRemove, [{
	    key: "render",
	    value: function render() {
	      var _this$props = this.props,
	          children = _this$props.children,
	          innerProps = _this$props.innerProps;
	      return React__default.createElement("div", innerProps, children || React__default.createElement(CrossIcon, {
	        size: 14
	      }));
	    }
	  }]);

	  return MultiValueRemove;
	}(React.Component);

	var MultiValue =
	/*#__PURE__*/
	function (_Component2) {
	  _inherits(MultiValue, _Component2);

	  function MultiValue() {
	    _classCallCheck(this, MultiValue);

	    return _possibleConstructorReturn(this, _getPrototypeOf(MultiValue).apply(this, arguments));
	  }

	  _createClass(MultiValue, [{
	    key: "render",
	    value: function render() {
	      var _this$props2 = this.props,
	          children = _this$props2.children,
	          className = _this$props2.className,
	          components = _this$props2.components,
	          cx = _this$props2.cx,
	          data = _this$props2.data,
	          getStyles = _this$props2.getStyles,
	          innerProps = _this$props2.innerProps,
	          isDisabled = _this$props2.isDisabled,
	          removeProps = _this$props2.removeProps,
	          selectProps = _this$props2.selectProps;
	      var Container = components.Container,
	          Label = components.Label,
	          Remove = components.Remove;

	      var containerInnerProps = _objectSpread({
	        className: cx(
	        /*#__PURE__*/
	        css(getStyles('multiValue', this.props)), {
	          'multi-value': true,
	          'multi-value--is-disabled': isDisabled
	        }, className)
	      }, innerProps);

	      var labelInnerProps = {
	        className: cx(
	        /*#__PURE__*/
	        css(getStyles('multiValueLabel', this.props)), {
	          'multi-value__label': true
	        }, className)
	      };

	      var removeInnerProps = _objectSpread({
	        className: cx(
	        /*#__PURE__*/
	        css(getStyles('multiValueRemove', this.props)), {
	          'multi-value__remove': true
	        }, className)
	      }, removeProps);

	      return React__default.createElement(Container, {
	        data: data,
	        innerProps: containerInnerProps,
	        selectProps: selectProps
	      }, React__default.createElement(Label, {
	        data: data,
	        innerProps: labelInnerProps,
	        selectProps: selectProps
	      }, children), React__default.createElement(Remove, {
	        data: data,
	        innerProps: removeInnerProps,
	        selectProps: selectProps
	      }));
	    }
	  }]);

	  return MultiValue;
	}(React.Component);

	_defineProperty(MultiValue, "defaultProps", {
	  cropWithEllipsis: true
	});

	var optionCSS = function optionCSS(_ref) {
	  var isDisabled = _ref.isDisabled,
	      isFocused = _ref.isFocused,
	      isSelected = _ref.isSelected,
	      _ref$theme = _ref.theme,
	      spacing = _ref$theme.spacing,
	      colors = _ref$theme.colors;
	  return {
	    label: 'option',
	    backgroundColor: isSelected ? colors.primary : isFocused ? colors.primary25 : 'transparent',
	    color: isDisabled ? colors.neutral20 : isSelected ? colors.neutral0 : 'inherit',
	    cursor: 'default',
	    display: 'block',
	    fontSize: 'inherit',
	    padding: "".concat(spacing.baseUnit * 2, "px ").concat(spacing.baseUnit * 3, "px"),
	    width: '100%',
	    userSelect: 'none',
	    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
	    // provide some affordance on touch devices
	    ':active': {
	      backgroundColor: !isDisabled && (isSelected ? colors.primary : colors.primary50)
	    }
	  };
	};

	var Option = function Option(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      isDisabled = props.isDisabled,
	      isFocused = props.isFocused,
	      isSelected = props.isSelected,
	      innerRef = props.innerRef,
	      innerProps = props.innerProps;
	  return React__default.createElement("div", _extends({
	    ref: innerRef,
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('option', props)), {
	      'option': true,
	      'option--is-disabled': isDisabled,
	      'option--is-focused': isFocused,
	      'option--is-selected': isSelected
	    }, className)
	  }, innerProps), children);
	};

	var placeholderCSS = function placeholderCSS(_ref) {
	  var _ref$theme = _ref.theme,
	      spacing = _ref$theme.spacing,
	      colors = _ref$theme.colors;
	  return {
	    label: 'placeholder',
	    color: colors.neutral50,
	    marginLeft: spacing.baseUnit / 2,
	    marginRight: spacing.baseUnit / 2,
	    position: 'absolute',
	    top: '50%',
	    transform: 'translateY(-50%)'
	  };
	};

	var Placeholder$1 = function Placeholder(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;
	  return React__default.createElement("div", _extends({
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('placeholder', props)), {
	      'placeholder': true
	    }, className)
	  }, innerProps), children);
	};

	var css$2 = function css$$1(_ref) {
	  var isDisabled = _ref.isDisabled,
	      _ref$theme = _ref.theme,
	      spacing = _ref$theme.spacing,
	      colors = _ref$theme.colors;
	  return {
	    label: 'singleValue',
	    color: isDisabled ? colors.neutral40 : colors.neutral80,
	    marginLeft: spacing.baseUnit / 2,
	    marginRight: spacing.baseUnit / 2,
	    maxWidth: "calc(100% - ".concat(spacing.baseUnit * 2, "px)"),
	    overflow: 'hidden',
	    position: 'absolute',
	    textOverflow: 'ellipsis',
	    whiteSpace: 'nowrap',
	    top: '50%',
	    transform: 'translateY(-50%)'
	  };
	};

	var SingleValue = function SingleValue(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      isDisabled = props.isDisabled,
	      innerProps = props.innerProps;
	  return React__default.createElement("div", _extends({
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('singleValue', props)), {
	      'single-value': true,
	      'single-value--is-disabled': isDisabled
	    }, className)
	  }, innerProps), children);
	};

	var components = {
	  ClearIndicator: ClearIndicator,
	  Control: Control,
	  DropdownIndicator: DropdownIndicator,
	  DownChevron: DownChevron,
	  CrossIcon: CrossIcon,
	  Group: Group,
	  GroupHeading: GroupHeading,
	  IndicatorsContainer: IndicatorsContainer,
	  IndicatorSeparator: IndicatorSeparator,
	  Input: Input,
	  LoadingIndicator: LoadingIndicator,
	  Menu: Menu,
	  MenuList: MenuList,
	  MenuPortal: MenuPortal,
	  LoadingMessage: LoadingMessage,
	  NoOptionsMessage: NoOptionsMessage,
	  MultiValue: MultiValue,
	  MultiValueContainer: MultiValueContainer,
	  MultiValueLabel: MultiValueLabel,
	  MultiValueRemove: MultiValueRemove,
	  Option: Option,
	  Placeholder: Placeholder$1,
	  SelectContainer: SelectContainer,
	  SingleValue: SingleValue,
	  ValueContainer: ValueContainer
	};
	var defaultComponents = function defaultComponents(props) {
	  return _objectSpread({}, components, props.components);
	};

	var defaultStyles = {
	  clearIndicator: clearIndicatorCSS,
	  container: containerCSS,
	  control: css$1,
	  dropdownIndicator: dropdownIndicatorCSS,
	  group: groupCSS,
	  groupHeading: groupHeadingCSS,
	  indicatorsContainer: indicatorsContainerCSS,
	  indicatorSeparator: indicatorSeparatorCSS,
	  input: inputCSS,
	  loadingIndicator: loadingIndicatorCSS,
	  loadingMessage: loadingMessageCSS,
	  menu: menuCSS,
	  menuList: menuListCSS,
	  menuPortal: menuPortalCSS,
	  multiValue: multiValueCSS,
	  multiValueLabel: multiValueLabelCSS,
	  multiValueRemove: multiValueRemoveCSS,
	  noOptionsMessage: noOptionsMessageCSS,
	  option: optionCSS,
	  placeholder: placeholderCSS,
	  singleValue: css$2,
	  valueContainer: valueContainerCSS
	}; // Merge Utility

	var colors = {
	  primary: '#2684FF',
	  primary75: '#4C9AFF',
	  primary50: '#B2D4FF',
	  primary25: '#DEEBFF',
	  danger: '#DE350B',
	  dangerLight: '#FFBDAD',
	  neutral0: 'hsl(0, 0%, 100%)',
	  neutral5: 'hsl(0, 0%, 95%)',
	  neutral10: 'hsl(0, 0%, 90%)',
	  neutral20: 'hsl(0, 0%, 80%)',
	  neutral30: 'hsl(0, 0%, 70%)',
	  neutral40: 'hsl(0, 0%, 60%)',
	  neutral50: 'hsl(0, 0%, 50%)',
	  neutral60: 'hsl(0, 0%, 40%)',
	  neutral70: 'hsl(0, 0%, 30%)',
	  neutral80: 'hsl(0, 0%, 20%)',
	  neutral90: 'hsl(0, 0%, 10%)'
	};
	var borderRadius = 4;
	var baseUnit = 4;
	/* Used to calculate consistent margin/padding on elements */

	var controlHeight = 38;
	/* The minimum height of the control */

	var menuGutter = baseUnit * 2;
	/* The amount of space between the control and menu */

	var spacing = {
	  baseUnit: baseUnit,
	  controlHeight: controlHeight,
	  menuGutter: menuGutter
	};
	var defaultTheme = {
	  borderRadius: borderRadius,
	  colors: colors,
	  spacing: spacing
	};

	var defaultProps = {
	  backspaceRemovesValue: true,
	  blurInputOnSelect: isTouchCapable(),
	  captureMenuScroll: !isTouchCapable(),
	  closeMenuOnSelect: true,
	  closeMenuOnScroll: false,
	  components: {},
	  controlShouldRenderValue: true,
	  escapeClearsValue: false,
	  filterOption: createFilter(),
	  formatGroupLabel: formatGroupLabel,
	  getOptionLabel: getOptionLabel,
	  getOptionValue: getOptionValue,
	  isDisabled: false,
	  isLoading: false,
	  isMulti: false,
	  isRtl: false,
	  isSearchable: true,
	  isOptionDisabled: isOptionDisabled,
	  loadingMessage: function loadingMessage() {
	    return 'Loading...';
	  },
	  maxMenuHeight: 300,
	  minMenuHeight: 140,
	  menuIsOpen: false,
	  menuPlacement: 'bottom',
	  menuPosition: 'absolute',
	  menuShouldBlockScroll: false,
	  menuShouldScrollIntoView: !isMobileDevice(),
	  noOptionsMessage: function noOptionsMessage() {
	    return 'No options';
	  },
	  openMenuOnFocus: false,
	  openMenuOnClick: true,
	  options: [],
	  pageSize: 5,
	  placeholder: 'Select...',
	  screenReaderStatus: function screenReaderStatus(_ref) {
	    var count = _ref.count;
	    return "".concat(count, " result").concat(count !== 1 ? 's' : '', " available");
	  },
	  styles: {},
	  tabIndex: '0',
	  tabSelectsValue: true
	};
	var instanceId = 1;

	var Select =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(Select, _Component);

	  // Misc. Instance Properties
	  // ------------------------------
	  // TODO
	  // Refs
	  // ------------------------------
	  // Lifecycle
	  // ------------------------------
	  function Select(_props) {
	    var _this;

	    _classCallCheck(this, Select);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Select).call(this, _props));

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
	      ariaLiveSelection: '',
	      ariaLiveContext: '',
	      focusedOption: null,
	      focusedValue: null,
	      inputIsHidden: false,
	      isFocused: false,
	      menuOptions: {
	        render: [],
	        focusable: []
	      },
	      selectValue: []
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "blockOptionHover", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isComposing", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clearFocusValueOnUpdate", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "commonProps", void 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "components", void 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hasGroups", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initialTouchX", 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initialTouchY", 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "inputIsHiddenAfterUpdate", void 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "instancePrefix", '');

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "openAfterFocus", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollToFocusedOptionOnUpdate", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "userIsDragging", void 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "controlRef", null);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getControlRef", function (ref) {
	      _this.controlRef = ref;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "focusedOptionRef", null);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getFocusedOptionRef", function (ref) {
	      _this.focusedOptionRef = ref;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "menuListRef", null);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getMenuListRef", function (ref) {
	      _this.menuListRef = ref;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "inputRef", null);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getInputRef", function (ref) {
	      _this.inputRef = ref;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "cacheComponents", function (components$$1) {
	      _this.components = defaultComponents({
	        components: components$$1
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "focus", _this.focusInput);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "blur", _this.blurInput);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (newValue, actionMeta) {
	      var _this$props = _this.props,
	          onChange = _this$props.onChange,
	          name = _this$props.name;
	      onChange(newValue, _objectSpread({}, actionMeta, {
	        name: name
	      }));
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setValue", function (newValue) {
	      var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'set-value';
	      var option = arguments.length > 2 ? arguments[2] : undefined;
	      var _this$props2 = _this.props,
	          closeMenuOnSelect = _this$props2.closeMenuOnSelect,
	          isMulti = _this$props2.isMulti;

	      _this.onInputChange('', {
	        action: 'set-value'
	      });

	      if (closeMenuOnSelect) {
	        _this.inputIsHiddenAfterUpdate = !isMulti;

	        _this.onMenuClose();
	      } // when the select value should change, we should reset focusedValue


	      _this.clearFocusValueOnUpdate = true;

	      _this.onChange(newValue, {
	        action: action,
	        option: option
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "selectOption", function (newValue) {
	      var _this$props3 = _this.props,
	          blurInputOnSelect = _this$props3.blurInputOnSelect,
	          isMulti = _this$props3.isMulti;
	      var selectValue = _this.state.selectValue;

	      if (isMulti) {
	        if (_this.isOptionSelected(newValue, selectValue)) {
	          var candidate = _this.getOptionValue(newValue);

	          _this.setValue(selectValue.filter(function (i) {
	            return _this.getOptionValue(i) !== candidate;
	          }), 'deselect-option', newValue);

	          _this.announceAriaLiveSelection({
	            event: 'deselect-option',
	            context: {
	              value: _this.getOptionLabel(newValue)
	            }
	          });
	        } else {
	          if (!_this.isOptionDisabled(newValue, selectValue)) {
	            _this.setValue([].concat(_toConsumableArray(selectValue), [newValue]), 'select-option', newValue);

	            _this.announceAriaLiveSelection({
	              event: 'select-option',
	              context: {
	                value: _this.getOptionLabel(newValue)
	              }
	            });
	          } else {
	            // announce that option is disabled
	            _this.announceAriaLiveSelection({
	              event: 'select-option',
	              context: {
	                value: _this.getOptionLabel(newValue),
	                isDisabled: true
	              }
	            });
	          }
	        }
	      } else {
	        if (!_this.isOptionDisabled(newValue, selectValue)) {
	          _this.setValue(newValue, 'select-option');

	          _this.announceAriaLiveSelection({
	            event: 'select-option',
	            context: {
	              value: _this.getOptionLabel(newValue)
	            }
	          });
	        } else {
	          // announce that option is disabled
	          _this.announceAriaLiveSelection({
	            event: 'select-option',
	            context: {
	              value: _this.getOptionLabel(newValue),
	              isDisabled: true
	            }
	          });
	        }
	      }

	      if (blurInputOnSelect) {
	        _this.blurInput();
	      }
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "removeValue", function (removedValue) {
	      var selectValue = _this.state.selectValue;

	      var candidate = _this.getOptionValue(removedValue);

	      _this.onChange(selectValue.filter(function (i) {
	        return _this.getOptionValue(i) !== candidate;
	      }), {
	        action: 'remove-value',
	        removedValue: removedValue
	      });

	      _this.announceAriaLiveSelection({
	        event: 'remove-value',
	        context: {
	          value: removedValue ? _this.getOptionLabel(removedValue) : ''
	        }
	      });

	      _this.focusInput();
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clearValue", function () {
	      var isMulti = _this.props.isMulti;

	      _this.onChange(isMulti ? [] : null, {
	        action: 'clear'
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "popValue", function () {
	      var selectValue = _this.state.selectValue;
	      var lastSelectedValue = selectValue[selectValue.length - 1];

	      _this.announceAriaLiveSelection({
	        event: 'pop-value',
	        context: {
	          value: lastSelectedValue ? _this.getOptionLabel(lastSelectedValue) : ''
	        }
	      });

	      _this.onChange(selectValue.slice(0, selectValue.length - 1), {
	        action: 'pop-value',
	        removedValue: lastSelectedValue
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOptionLabel", function (data) {
	      return _this.props.getOptionLabel(data);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOptionValue", function (data) {
	      return _this.props.getOptionValue(data);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getStyles", function (key, props) {
	      var base = defaultStyles[key](props);
	      base.boxSizing = 'border-box';
	      var custom = _this.props.styles[key];
	      return custom ? custom(base, props) : base;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getElementId", function (element) {
	      return "".concat(_this.instancePrefix, "-").concat(element);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getActiveDescendentId", function () {
	      var menuIsOpen = _this.props.menuIsOpen;
	      var _this$state = _this.state,
	          menuOptions = _this$state.menuOptions,
	          focusedOption = _this$state.focusedOption;
	      if (!focusedOption || !menuIsOpen) return undefined;
	      var index = menuOptions.focusable.indexOf(focusedOption);
	      var option = menuOptions.render[index];
	      return option && option.key;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "announceAriaLiveSelection", function (_ref2) {
	      var event = _ref2.event,
	          context = _ref2.context;

	      _this.setState({
	        ariaLiveSelection: valueEventAriaMessage(event, context)
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "announceAriaLiveContext", function (_ref3) {
	      var event = _ref3.event,
	          context = _ref3.context;

	      _this.setState({
	        ariaLiveContext: instructionsAriaMessage(event, _objectSpread({}, context, {
	          label: _this.props['aria-label']
	        }))
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMenuMouseDown", function (event) {
	      if (event.button !== 0) {
	        return;
	      }

	      event.stopPropagation();
	      event.preventDefault();

	      _this.focusInput();
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMenuMouseMove", function (event) {
	      _this.blockOptionHover = false;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onControlMouseDown", function (event) {
	      var openMenuOnClick = _this.props.openMenuOnClick;

	      if (!_this.state.isFocused) {
	        if (openMenuOnClick) {
	          _this.openAfterFocus = true;
	        }

	        _this.focusInput();
	      } else if (!_this.props.menuIsOpen) {
	        if (openMenuOnClick) {
	          _this.openMenu('first');
	        }
	      } else {
	        //$FlowFixMe
	        if (event.target.tagName !== 'INPUT') {
	          _this.onMenuClose();
	        }
	      } //$FlowFixMe


	      if (event.target.tagName !== 'INPUT') {
	        event.preventDefault();
	      }
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onDropdownIndicatorMouseDown", function (event) {
	      // ignore mouse events that weren't triggered by the primary button
	      if (event && event.type === 'mousedown' && event.button !== 0) {
	        return;
	      }

	      if (_this.props.isDisabled) return;
	      var _this$props4 = _this.props,
	          isMulti = _this$props4.isMulti,
	          menuIsOpen = _this$props4.menuIsOpen;

	      _this.focusInput();

	      if (menuIsOpen) {
	        _this.inputIsHiddenAfterUpdate = !isMulti;

	        _this.onMenuClose();
	      } else {
	        _this.openMenu('first');
	      }

	      event.preventDefault();
	      event.stopPropagation();
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClearIndicatorMouseDown", function (event) {
	      // ignore mouse events that weren't triggered by the primary button
	      if (event && event.type === 'mousedown' && event.button !== 0) {
	        return;
	      }

	      _this.clearValue();

	      event.stopPropagation();
	      _this.openAfterFocus = false;
	      setTimeout(function () {
	        return _this.focusInput();
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onScroll", function (event) {
	      if (typeof _this.props.closeMenuOnScroll === 'boolean') {
	        if (event.target instanceof HTMLElement && isDocumentElement(event.target)) {
	          _this.props.onMenuClose();
	        }
	      } else if (typeof _this.props.closeMenuOnScroll === 'function') {
	        if (_this.props.closeMenuOnScroll(event)) {
	          _this.props.onMenuClose();
	        }
	      }
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onCompositionStart", function () {
	      _this.isComposing = true;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onCompositionEnd", function () {
	      _this.isComposing = false;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchStart", function (_ref4) {
	      var touches = _ref4.touches;
	      var touch = touches.item(0);

	      if (!touch) {
	        return;
	      }

	      _this.initialTouchX = touch.clientX;
	      _this.initialTouchY = touch.clientY;
	      _this.userIsDragging = false;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchMove", function (_ref5) {
	      var touches = _ref5.touches;
	      var touch = touches.item(0);

	      if (!touch) {
	        return;
	      }

	      var deltaX = Math.abs(touch.clientX - _this.initialTouchX);
	      var deltaY = Math.abs(touch.clientY - _this.initialTouchY);
	      var moveThreshold = 5;
	      _this.userIsDragging = deltaX > moveThreshold || deltaY > moveThreshold;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchEnd", function (event) {
	      if (_this.userIsDragging) return; // close the menu if the user taps outside
	      // we're checking on event.target here instead of event.currentTarget, because we want to assert information
	      // on events on child elements, not the document (which we've attached this handler to).

	      if (_this.controlRef && !_this.controlRef.contains(event.target) && _this.menuListRef && !_this.menuListRef.contains(event.target)) {
	        _this.blurInput();
	      } // reset move vars


	      _this.initialTouchX = 0;
	      _this.initialTouchY = 0;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onControlTouchEnd", function (event) {
	      if (_this.userIsDragging) return;

	      _this.onControlMouseDown(event);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClearIndicatorTouchEnd", function (event) {
	      if (_this.userIsDragging) return;

	      _this.onClearIndicatorMouseDown(event);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onDropdownIndicatorTouchEnd", function (event) {
	      if (_this.userIsDragging) return;

	      _this.onDropdownIndicatorMouseDown(event);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputChange", function (event) {
	      var inputValue = event.currentTarget.value;
	      _this.inputIsHiddenAfterUpdate = false;

	      _this.onInputChange(inputValue, {
	        action: 'input-change'
	      });

	      _this.onMenuOpen();
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onInputFocus", function (event) {
	      var _this$props5 = _this.props,
	          isSearchable = _this$props5.isSearchable,
	          isMulti = _this$props5.isMulti;

	      if (_this.props.onFocus) {
	        _this.props.onFocus(event);
	      }

	      _this.inputIsHiddenAfterUpdate = false;

	      _this.announceAriaLiveContext({
	        event: 'input',
	        context: {
	          isSearchable: isSearchable,
	          isMulti: isMulti
	        }
	      });

	      _this.setState({
	        isFocused: true
	      });

	      if (_this.openAfterFocus || _this.props.openMenuOnFocus) {
	        _this.openMenu('first');
	      }

	      _this.openAfterFocus = false;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onInputBlur", function (event) {
	      if (_this.menuListRef && _this.menuListRef.contains(document.activeElement)) {
	        _this.inputRef.focus();

	        return;
	      }

	      if (_this.props.onBlur) {
	        _this.props.onBlur(event);
	      }

	      _this.onInputChange('', {
	        action: 'input-blur'
	      });

	      _this.onMenuClose();

	      _this.setState({
	        focusedValue: null,
	        isFocused: false
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onOptionHover", function (focusedOption) {
	      if (_this.blockOptionHover || _this.state.focusedOption === focusedOption) {
	        return;
	      }

	      _this.setState({
	        focusedOption: focusedOption
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "shouldHideSelectedOptions", function () {
	      var _this$props6 = _this.props,
	          hideSelectedOptions = _this$props6.hideSelectedOptions,
	          isMulti = _this$props6.isMulti;
	      if (hideSelectedOptions === undefined) return isMulti;
	      return hideSelectedOptions;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onKeyDown", function (event) {
	      var _this$props7 = _this.props,
	          isMulti = _this$props7.isMulti,
	          backspaceRemovesValue = _this$props7.backspaceRemovesValue,
	          escapeClearsValue = _this$props7.escapeClearsValue,
	          inputValue = _this$props7.inputValue,
	          isClearable = _this$props7.isClearable,
	          isDisabled = _this$props7.isDisabled,
	          menuIsOpen = _this$props7.menuIsOpen,
	          onKeyDown = _this$props7.onKeyDown,
	          tabSelectsValue = _this$props7.tabSelectsValue,
	          openMenuOnFocus = _this$props7.openMenuOnFocus;
	      var _this$state2 = _this.state,
	          focusedOption = _this$state2.focusedOption,
	          focusedValue = _this$state2.focusedValue,
	          selectValue = _this$state2.selectValue;
	      if (isDisabled) return;

	      if (typeof onKeyDown === 'function') {
	        onKeyDown(event);

	        if (event.defaultPrevented) {
	          return;
	        }
	      } // Block option hover events when the user has just pressed a key


	      _this.blockOptionHover = true;

	      switch (event.key) {
	        case 'ArrowLeft':
	          if (!isMulti || inputValue) return;

	          _this.focusValue('previous');

	          break;

	        case 'ArrowRight':
	          if (!isMulti || inputValue) return;

	          _this.focusValue('next');

	          break;

	        case 'Delete':
	        case 'Backspace':
	          if (inputValue) return;

	          if (focusedValue) {
	            _this.removeValue(focusedValue);
	          } else {
	            if (!backspaceRemovesValue) return;

	            if (isMulti) {
	              _this.popValue();
	            } else if (isClearable) {
	              _this.clearValue();
	            }
	          }

	          break;

	        case 'Tab':
	          if (_this.isComposing) return;

	          if (event.shiftKey || !menuIsOpen || !tabSelectsValue || !focusedOption || // don't capture the event if the menu opens on focus and the focused
	          // option is already selected; it breaks the flow of navigation
	          openMenuOnFocus && _this.isOptionSelected(focusedOption, selectValue)) {
	            return;
	          }

	          _this.selectOption(focusedOption);

	          break;

	        case 'Enter':
	          if (event.keyCode === 229) {
	            // ignore the keydown event from an Input Method Editor(IME)
	            // ref. https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
	            break;
	          }

	          if (menuIsOpen) {
	            if (!focusedOption) return;
	            if (_this.isComposing) return;

	            _this.selectOption(focusedOption);

	            break;
	          }

	          return;

	        case 'Escape':
	          if (menuIsOpen) {
	            _this.inputIsHiddenAfterUpdate = false;

	            _this.onInputChange('', {
	              action: 'menu-close'
	            });

	            _this.onMenuClose();
	          } else if (isClearable && escapeClearsValue) {
	            _this.clearValue();
	          }

	          break;

	        case ' ':
	          // space
	          if (inputValue) {
	            return;
	          }

	          if (!menuIsOpen) {
	            _this.openMenu('first');

	            break;
	          }

	          if (!focusedOption) return;

	          _this.selectOption(focusedOption);

	          break;

	        case 'ArrowUp':
	          if (menuIsOpen) {
	            _this.focusOption('up');
	          } else {
	            _this.openMenu('last');
	          }

	          break;

	        case 'ArrowDown':
	          if (menuIsOpen) {
	            _this.focusOption('down');
	          } else {
	            _this.openMenu('first');
	          }

	          break;

	        case 'PageUp':
	          if (!menuIsOpen) return;

	          _this.focusOption('pageup');

	          break;

	        case 'PageDown':
	          if (!menuIsOpen) return;

	          _this.focusOption('pagedown');

	          break;

	        case 'Home':
	          if (!menuIsOpen) return;

	          _this.focusOption('first');

	          break;

	        case 'End':
	          if (!menuIsOpen) return;

	          _this.focusOption('last');

	          break;

	        default:
	          return;
	      }

	      event.preventDefault();
	    });

	    var value = _props.value;
	    _this.cacheComponents = memoizeOne(_this.cacheComponents, exportedEqual).bind(_assertThisInitialized(_assertThisInitialized(_this)));

	    _this.cacheComponents(_props.components);

	    _this.instancePrefix = 'react-select-' + (_this.props.instanceId || ++instanceId);

	    var _selectValue = cleanValue(value);

	    var _menuOptions = _this.buildMenuOptions(_props, _selectValue);

	    _this.state.menuOptions = _menuOptions;
	    _this.state.selectValue = _selectValue;
	    return _this;
	  }

	  _createClass(Select, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.startListeningComposition();
	      this.startListeningToTouch();

	      if (this.props.closeMenuOnScroll && document && document.addEventListener) {
	        // Listen to all scroll events, and filter them out inside of 'onScroll'
	        document.addEventListener('scroll', this.onScroll, true);
	      }

	      if (this.props.autoFocus) {
	        this.focusInput();
	      }
	    }
	  }, {
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(nextProps) {
	      var _this$props8 = this.props,
	          options = _this$props8.options,
	          value = _this$props8.value,
	          inputValue = _this$props8.inputValue; // re-cache custom components

	      this.cacheComponents(nextProps.components); // rebuild the menu options

	      if (nextProps.value !== value || nextProps.options !== options || nextProps.inputValue !== inputValue) {
	        var selectValue = cleanValue(nextProps.value);
	        var menuOptions = this.buildMenuOptions(nextProps, selectValue);
	        var focusedValue = this.getNextFocusedValue(selectValue);
	        var focusedOption = this.getNextFocusedOption(menuOptions.focusable);
	        this.setState({
	          menuOptions: menuOptions,
	          selectValue: selectValue,
	          focusedOption: focusedOption,
	          focusedValue: focusedValue
	        });
	      } // some updates should toggle the state of the input visibility


	      if (this.inputIsHiddenAfterUpdate != null) {
	        this.setState({
	          inputIsHidden: this.inputIsHiddenAfterUpdate
	        });
	        delete this.inputIsHiddenAfterUpdate;
	      }
	    }
	  }, {
	    key: "componentDidUpdate",
	    value: function componentDidUpdate(prevProps) {
	      var _this$props9 = this.props,
	          isDisabled = _this$props9.isDisabled,
	          menuIsOpen = _this$props9.menuIsOpen;
	      var isFocused = this.state.isFocused;

	      if ( // ensure focus is restored correctly when the control becomes enabled
	      isFocused && !isDisabled && prevProps.isDisabled || // ensure focus is on the Input when the menu opens
	      isFocused && menuIsOpen && !prevProps.menuIsOpen) {
	        this.focusInput();
	      } // scroll the focused option into view if necessary


	      if (this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate) {
	        scrollIntoView(this.menuListRef, this.focusedOptionRef);
	      }

	      this.scrollToFocusedOptionOnUpdate = false;
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this.stopListeningComposition();
	      this.stopListeningToTouch();
	      document.removeEventListener('scroll', this.onScroll, true);
	    }
	  }, {
	    key: "onMenuOpen",
	    // ==============================
	    // Consumer Handlers
	    // ==============================
	    value: function onMenuOpen() {
	      this.props.onMenuOpen();
	    }
	  }, {
	    key: "onMenuClose",
	    value: function onMenuClose() {
	      var _this$props10 = this.props,
	          isSearchable = _this$props10.isSearchable,
	          isMulti = _this$props10.isMulti;
	      this.announceAriaLiveContext({
	        event: 'input',
	        context: {
	          isSearchable: isSearchable,
	          isMulti: isMulti
	        }
	      });
	      this.onInputChange('', {
	        action: 'menu-close'
	      });
	      this.props.onMenuClose();
	    }
	  }, {
	    key: "onInputChange",
	    value: function onInputChange(newValue, actionMeta) {
	      this.props.onInputChange(newValue, actionMeta);
	    } // ==============================
	    // Methods
	    // ==============================

	  }, {
	    key: "focusInput",
	    value: function focusInput() {
	      if (!this.inputRef) return;
	      this.inputRef.focus();
	    }
	  }, {
	    key: "blurInput",
	    value: function blurInput() {
	      if (!this.inputRef) return;
	      this.inputRef.blur();
	    } // aliased for consumers

	  }, {
	    key: "openMenu",
	    value: function openMenu(focusOption) {
	      var _this$state3 = this.state,
	          menuOptions = _this$state3.menuOptions,
	          selectValue = _this$state3.selectValue,
	          isFocused = _this$state3.isFocused;
	      var isMulti = this.props.isMulti;
	      var openAtIndex = focusOption === 'first' ? 0 : menuOptions.focusable.length - 1;

	      if (!isMulti) {
	        var selectedIndex = menuOptions.focusable.indexOf(selectValue[0]);

	        if (selectedIndex > -1) {
	          openAtIndex = selectedIndex;
	        }
	      } // only scroll if the menu isn't already open


	      this.scrollToFocusedOptionOnUpdate = !(isFocused && this.menuListRef);
	      this.inputIsHiddenAfterUpdate = false;
	      this.onMenuOpen();
	      this.setState({
	        focusedValue: null,
	        focusedOption: menuOptions.focusable[openAtIndex]
	      });
	      this.announceAriaLiveContext({
	        event: 'menu'
	      });
	    }
	  }, {
	    key: "focusValue",
	    value: function focusValue(direction) {
	      var _this$props11 = this.props,
	          isMulti = _this$props11.isMulti,
	          isSearchable = _this$props11.isSearchable;
	      var _this$state4 = this.state,
	          selectValue = _this$state4.selectValue,
	          focusedValue = _this$state4.focusedValue; // Only multiselects support value focusing

	      if (!isMulti) return;
	      this.setState({
	        focusedOption: null
	      });
	      var focusedIndex = selectValue.indexOf(focusedValue);

	      if (!focusedValue) {
	        focusedIndex = -1;
	        this.announceAriaLiveContext({
	          event: 'value'
	        });
	      }

	      var lastIndex = selectValue.length - 1;
	      var nextFocus = -1;
	      if (!selectValue.length) return;

	      switch (direction) {
	        case 'previous':
	          if (focusedIndex === 0) {
	            // don't cycle from the start to the end
	            nextFocus = 0;
	          } else if (focusedIndex === -1) {
	            // if nothing is focused, focus the last value first
	            nextFocus = lastIndex;
	          } else {
	            nextFocus = focusedIndex - 1;
	          }

	          break;

	        case 'next':
	          if (focusedIndex > -1 && focusedIndex < lastIndex) {
	            nextFocus = focusedIndex + 1;
	          }

	          break;
	      }

	      if (nextFocus === -1) {
	        this.announceAriaLiveContext({
	          event: 'input',
	          context: {
	            isSearchable: isSearchable,
	            isMulti: isMulti
	          }
	        });
	      }

	      this.setState({
	        inputIsHidden: nextFocus === -1 ? false : true,
	        focusedValue: selectValue[nextFocus]
	      });
	    }
	  }, {
	    key: "focusOption",
	    value: function focusOption() {
	      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'first';
	      var pageSize = this.props.pageSize;
	      var _this$state5 = this.state,
	          focusedOption = _this$state5.focusedOption,
	          menuOptions = _this$state5.menuOptions;
	      var options = menuOptions.focusable;
	      if (!options.length) return;
	      var nextFocus = 0; // handles 'first'

	      var focusedIndex = options.indexOf(focusedOption);

	      if (!focusedOption) {
	        focusedIndex = -1;
	        this.announceAriaLiveContext({
	          event: 'menu'
	        });
	      }

	      if (direction === 'up') {
	        nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
	      } else if (direction === 'down') {
	        nextFocus = (focusedIndex + 1) % options.length;
	      } else if (direction === 'pageup') {
	        nextFocus = focusedIndex - pageSize;
	        if (nextFocus < 0) nextFocus = 0;
	      } else if (direction === 'pagedown') {
	        nextFocus = focusedIndex + pageSize;
	        if (nextFocus > options.length - 1) nextFocus = options.length - 1;
	      } else if (direction === 'last') {
	        nextFocus = options.length - 1;
	      }

	      this.scrollToFocusedOptionOnUpdate = true;
	      this.setState({
	        focusedOption: options[nextFocus],
	        focusedValue: null
	      });
	      this.announceAriaLiveContext({
	        event: 'menu',
	        context: {
	          isDisabled: isOptionDisabled(options[nextFocus])
	        }
	      });
	    }
	  }, {
	    key: "getTheme",
	    // ==============================
	    // Getters
	    // ==============================
	    value: function getTheme() {
	      // Use the default theme if there are no customizations.
	      if (!this.props.theme) {
	        return defaultTheme;
	      } // If the theme prop is a function, assume the function
	      // knows how to merge the passed-in default theme with
	      // its own modifications.


	      if (typeof this.props.theme === 'function') {
	        return this.props.theme(defaultTheme);
	      } // Otherwise, if a plain theme object was passed in,
	      // overlay it with the default theme.


	      return _objectSpread({}, defaultTheme, this.props.theme);
	    }
	  }, {
	    key: "getCommonProps",
	    value: function getCommonProps() {
	      var clearValue = this.clearValue,
	          getStyles = this.getStyles,
	          setValue = this.setValue,
	          selectOption = this.selectOption,
	          props = this.props;
	      var classNamePrefix = props.classNamePrefix,
	          isMulti = props.isMulti,
	          isRtl = props.isRtl,
	          options = props.options;
	      var selectValue = this.state.selectValue;
	      var hasValue = this.hasValue();

	      var getValue = function getValue() {
	        return selectValue;
	      };

	      var cx = classNames.bind(null, classNamePrefix);
	      return {
	        cx: cx,
	        clearValue: clearValue,
	        getStyles: getStyles,
	        getValue: getValue,
	        hasValue: hasValue,
	        isMulti: isMulti,
	        isRtl: isRtl,
	        options: options,
	        selectOption: selectOption,
	        setValue: setValue,
	        selectProps: props,
	        theme: this.getTheme()
	      };
	    }
	  }, {
	    key: "getNextFocusedValue",
	    value: function getNextFocusedValue(nextSelectValue) {
	      if (this.clearFocusValueOnUpdate) {
	        this.clearFocusValueOnUpdate = false;
	        return null;
	      }

	      var _this$state6 = this.state,
	          focusedValue = _this$state6.focusedValue,
	          lastSelectValue = _this$state6.selectValue;
	      var lastFocusedIndex = lastSelectValue.indexOf(focusedValue);

	      if (lastFocusedIndex > -1) {
	        var nextFocusedIndex = nextSelectValue.indexOf(focusedValue);

	        if (nextFocusedIndex > -1) {
	          // the focused value is still in the selectValue, return it
	          return focusedValue;
	        } else if (lastFocusedIndex < nextSelectValue.length) {
	          // the focusedValue is not present in the next selectValue array by
	          // reference, so return the new value at the same index
	          return nextSelectValue[lastFocusedIndex];
	        }
	      }

	      return null;
	    }
	  }, {
	    key: "getNextFocusedOption",
	    value: function getNextFocusedOption(options) {
	      var lastFocusedOption = this.state.focusedOption;
	      return lastFocusedOption && options.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options[0];
	    }
	  }, {
	    key: "hasValue",
	    value: function hasValue() {
	      var selectValue = this.state.selectValue;
	      return selectValue.length > 0;
	    }
	  }, {
	    key: "hasOptions",
	    value: function hasOptions() {
	      return !!this.state.menuOptions.render.length;
	    }
	  }, {
	    key: "countOptions",
	    value: function countOptions() {
	      return this.state.menuOptions.focusable.length;
	    }
	  }, {
	    key: "isClearable",
	    value: function isClearable() {
	      var _this$props12 = this.props,
	          isClearable = _this$props12.isClearable,
	          isMulti = _this$props12.isMulti; // single select, by default, IS NOT clearable
	      // multi select, by default, IS clearable

	      if (isClearable === undefined) return isMulti;
	      return isClearable;
	    }
	  }, {
	    key: "isOptionDisabled",
	    value: function isOptionDisabled$$1(option, selectValue) {
	      return typeof this.props.isOptionDisabled === 'function' ? this.props.isOptionDisabled(option, selectValue) : false;
	    }
	  }, {
	    key: "isOptionSelected",
	    value: function isOptionSelected(option, selectValue) {
	      var _this2 = this;

	      if (selectValue.indexOf(option) > -1) return true;

	      if (typeof this.props.isOptionSelected === 'function') {
	        return this.props.isOptionSelected(option, selectValue);
	      }

	      var candidate = this.getOptionValue(option);
	      return selectValue.some(function (i) {
	        return _this2.getOptionValue(i) === candidate;
	      });
	    }
	  }, {
	    key: "filterOption",
	    value: function filterOption(option, inputValue) {
	      return this.props.filterOption ? this.props.filterOption(option, inputValue) : true;
	    }
	  }, {
	    key: "formatOptionLabel",
	    value: function formatOptionLabel(data, context) {
	      if (typeof this.props.formatOptionLabel === 'function') {
	        var inputValue = this.props.inputValue;
	        var selectValue = this.state.selectValue;
	        return this.props.formatOptionLabel(data, {
	          context: context,
	          inputValue: inputValue,
	          selectValue: selectValue
	        });
	      } else {
	        return this.getOptionLabel(data);
	      }
	    }
	  }, {
	    key: "formatGroupLabel",
	    value: function formatGroupLabel$$1(data) {
	      return this.props.formatGroupLabel(data);
	    } // ==============================
	    // Mouse Handlers
	    // ==============================

	  }, {
	    key: "startListeningComposition",
	    // ==============================
	    // Composition Handlers
	    // ==============================
	    value: function startListeningComposition() {
	      if (document && document.addEventListener) {
	        document.addEventListener('compositionstart', this.onCompositionStart, false);
	        document.addEventListener('compositionend', this.onCompositionEnd, false);
	      }
	    }
	  }, {
	    key: "stopListeningComposition",
	    value: function stopListeningComposition() {
	      if (document && document.removeEventListener) {
	        document.removeEventListener('compositionstart', this.onCompositionStart);
	        document.removeEventListener('compositionend', this.onCompositionEnd);
	      }
	    }
	  }, {
	    key: "startListeningToTouch",
	    // ==============================
	    // Touch Handlers
	    // ==============================
	    value: function startListeningToTouch() {
	      if (document && document.addEventListener) {
	        document.addEventListener('touchstart', this.onTouchStart, false);
	        document.addEventListener('touchmove', this.onTouchMove, false);
	        document.addEventListener('touchend', this.onTouchEnd, false);
	      }
	    }
	  }, {
	    key: "stopListeningToTouch",
	    value: function stopListeningToTouch() {
	      if (document && document.removeEventListener) {
	        document.removeEventListener('touchstart', this.onTouchStart);
	        document.removeEventListener('touchmove', this.onTouchMove);
	        document.removeEventListener('touchend', this.onTouchEnd);
	      }
	    }
	  }, {
	    key: "buildMenuOptions",
	    // ==============================
	    // Menu Options
	    // ==============================
	    value: function buildMenuOptions(props, selectValue) {
	      var _this3 = this;

	      var _props$inputValue = props.inputValue,
	          inputValue = _props$inputValue === void 0 ? '' : _props$inputValue,
	          options = props.options;

	      var toOption = function toOption(option, id) {
	        var isDisabled = _this3.isOptionDisabled(option, selectValue);

	        var isSelected = _this3.isOptionSelected(option, selectValue);

	        var label = _this3.getOptionLabel(option);

	        var value = _this3.getOptionValue(option);

	        if (_this3.shouldHideSelectedOptions() && isSelected || !_this3.filterOption({
	          label: label,
	          value: value,
	          data: option
	        }, inputValue)) {
	          return;
	        }

	        var onHover = isDisabled ? undefined : function () {
	          return _this3.onOptionHover(option);
	        };
	        var onSelect = isDisabled ? undefined : function () {
	          return _this3.selectOption(option);
	        };
	        var optionId = "".concat(_this3.getElementId('option'), "-").concat(id);
	        return {
	          innerProps: {
	            id: optionId,
	            onClick: onSelect,
	            onMouseMove: onHover,
	            onMouseOver: onHover,
	            tabIndex: -1
	          },
	          data: option,
	          isDisabled: isDisabled,
	          isSelected: isSelected,
	          key: optionId,
	          label: label,
	          type: 'option',
	          value: value
	        };
	      };

	      return options.reduce(function (acc, item, itemIndex) {
	        if (item.options) {
	          // TODO needs a tidier implementation
	          if (!_this3.hasGroups) _this3.hasGroups = true;
	          var items = item.options;
	          var children = items.map(function (child, i) {
	            var option = toOption(child, "".concat(itemIndex, "-").concat(i));
	            if (option) acc.focusable.push(child);
	            return option;
	          }).filter(Boolean);

	          if (children.length) {
	            var groupId = "".concat(_this3.getElementId('group'), "-").concat(itemIndex);
	            acc.render.push({
	              type: 'group',
	              key: groupId,
	              data: item,
	              options: children
	            });
	          }
	        } else {
	          var option = toOption(item, "".concat(itemIndex));

	          if (option) {
	            acc.render.push(option);
	            acc.focusable.push(item);
	          }
	        }

	        return acc;
	      }, {
	        render: [],
	        focusable: []
	      });
	    } // ==============================
	    // Renderers
	    // ==============================

	  }, {
	    key: "constructAriaLiveMessage",
	    value: function constructAriaLiveMessage() {
	      var _this$state7 = this.state,
	          ariaLiveContext = _this$state7.ariaLiveContext,
	          selectValue = _this$state7.selectValue,
	          focusedValue = _this$state7.focusedValue,
	          focusedOption = _this$state7.focusedOption;
	      var _this$props13 = this.props,
	          options = _this$props13.options,
	          menuIsOpen = _this$props13.menuIsOpen,
	          inputValue = _this$props13.inputValue,
	          screenReaderStatus = _this$props13.screenReaderStatus; // An aria live message representing the currently focused value in the select.

	      var focusedValueMsg = focusedValue ? valueFocusAriaMessage({
	        focusedValue: focusedValue,
	        getOptionLabel: this.getOptionLabel,
	        selectValue: selectValue
	      }) : ''; // An aria live message representing the currently focused option in the select.

	      var focusedOptionMsg = focusedOption && menuIsOpen ? optionFocusAriaMessage({
	        focusedOption: focusedOption,
	        getOptionLabel: this.getOptionLabel,
	        options: options
	      }) : ''; // An aria live message representing the set of focusable results and current searchterm/inputvalue.

	      var resultsMsg = resultsAriaMessage({
	        inputValue: inputValue,
	        screenReaderMessage: screenReaderStatus({
	          count: this.countOptions()
	        })
	      });
	      return "".concat(focusedValueMsg, " ").concat(focusedOptionMsg, " ").concat(resultsMsg, " ").concat(ariaLiveContext);
	    }
	  }, {
	    key: "renderInput",
	    value: function renderInput() {
	      var _this$props14 = this.props,
	          isDisabled = _this$props14.isDisabled,
	          isSearchable = _this$props14.isSearchable,
	          inputId = _this$props14.inputId,
	          inputValue = _this$props14.inputValue,
	          tabIndex = _this$props14.tabIndex;
	      var Input = this.components.Input;
	      var inputIsHidden = this.state.inputIsHidden;
	      var id = inputId || this.getElementId('input');

	      if (!isSearchable) {
	        // use a dummy input to maintain focus/blur functionality
	        return React__default.createElement(DummyInput, {
	          id: id,
	          innerRef: this.getInputRef,
	          onBlur: this.onInputBlur,
	          onChange: noop,
	          onFocus: this.onInputFocus,
	          readOnly: true,
	          disabled: isDisabled,
	          tabIndex: tabIndex,
	          value: ""
	        });
	      } // aria attributes makes the JSX "noisy", separated for clarity


	      var ariaAttributes = {
	        'aria-autocomplete': 'list',
	        'aria-label': this.props['aria-label'],
	        'aria-labelledby': this.props['aria-labelledby']
	      };
	      var _this$commonProps = this.commonProps,
	          cx = _this$commonProps.cx,
	          theme = _this$commonProps.theme,
	          selectProps = _this$commonProps.selectProps;
	      return React__default.createElement(Input, _extends({
	        autoCapitalize: "none",
	        autoComplete: "off",
	        autoCorrect: "off",
	        cx: cx,
	        getStyles: this.getStyles,
	        id: id,
	        innerRef: this.getInputRef,
	        isDisabled: isDisabled,
	        isHidden: inputIsHidden,
	        onBlur: this.onInputBlur,
	        onChange: this.handleInputChange,
	        onFocus: this.onInputFocus,
	        selectProps: selectProps,
	        spellCheck: "false",
	        tabIndex: tabIndex,
	        theme: theme,
	        type: "text",
	        value: inputValue
	      }, ariaAttributes));
	    }
	  }, {
	    key: "renderPlaceholderOrValue",
	    value: function renderPlaceholderOrValue() {
	      var _this4 = this;

	      var _this$components = this.components,
	          MultiValue = _this$components.MultiValue,
	          MultiValueContainer = _this$components.MultiValueContainer,
	          MultiValueLabel = _this$components.MultiValueLabel,
	          MultiValueRemove = _this$components.MultiValueRemove,
	          SingleValue = _this$components.SingleValue,
	          Placeholder = _this$components.Placeholder;
	      var commonProps = this.commonProps;
	      var _this$props15 = this.props,
	          controlShouldRenderValue = _this$props15.controlShouldRenderValue,
	          isDisabled = _this$props15.isDisabled,
	          isMulti = _this$props15.isMulti,
	          inputValue = _this$props15.inputValue,
	          placeholder = _this$props15.placeholder;
	      var _this$state8 = this.state,
	          selectValue = _this$state8.selectValue,
	          focusedValue = _this$state8.focusedValue,
	          isFocused = _this$state8.isFocused;

	      if (!this.hasValue() || !controlShouldRenderValue) {
	        return inputValue ? null : React__default.createElement(Placeholder, _extends({}, commonProps, {
	          key: "placeholder",
	          isDisabled: isDisabled,
	          isFocused: isFocused
	        }), placeholder);
	      }

	      if (isMulti) {
	        var selectValues = selectValue.map(function (opt) {
	          var isOptionFocused = opt === focusedValue;
	          return React__default.createElement(MultiValue, _extends({}, commonProps, {
	            components: {
	              Container: MultiValueContainer,
	              Label: MultiValueLabel,
	              Remove: MultiValueRemove
	            },
	            isFocused: isOptionFocused,
	            isDisabled: isDisabled,
	            key: _this4.getOptionValue(opt),
	            removeProps: {
	              onClick: function onClick() {
	                return _this4.removeValue(opt);
	              },
	              onTouchEnd: function onTouchEnd() {
	                return _this4.removeValue(opt);
	              },
	              onMouseDown: function onMouseDown(e) {
	                e.preventDefault();
	                e.stopPropagation();
	              }
	            },
	            data: opt
	          }), _this4.formatOptionLabel(opt, 'value'));
	        });
	        return selectValues;
	      }

	      if (inputValue) {
	        return null;
	      }

	      var singleValue = selectValue[0];
	      return React__default.createElement(SingleValue, _extends({}, commonProps, {
	        data: singleValue,
	        isDisabled: isDisabled
	      }), this.formatOptionLabel(singleValue, 'value'));
	    }
	  }, {
	    key: "renderClearIndicator",
	    value: function renderClearIndicator() {
	      var ClearIndicator = this.components.ClearIndicator;
	      var commonProps = this.commonProps;
	      var _this$props16 = this.props,
	          isDisabled = _this$props16.isDisabled,
	          isLoading = _this$props16.isLoading;
	      var isFocused = this.state.isFocused;

	      if (!this.isClearable() || !ClearIndicator || isDisabled || !this.hasValue() || isLoading) {
	        return null;
	      }

	      var innerProps = {
	        onMouseDown: this.onClearIndicatorMouseDown,
	        onTouchEnd: this.onClearIndicatorTouchEnd,
	        'aria-hidden': 'true'
	      };
	      return React__default.createElement(ClearIndicator, _extends({}, commonProps, {
	        innerProps: innerProps,
	        isFocused: isFocused
	      }));
	    }
	  }, {
	    key: "renderLoadingIndicator",
	    value: function renderLoadingIndicator() {
	      var LoadingIndicator = this.components.LoadingIndicator;
	      var commonProps = this.commonProps;
	      var _this$props17 = this.props,
	          isDisabled = _this$props17.isDisabled,
	          isLoading = _this$props17.isLoading;
	      var isFocused = this.state.isFocused;
	      if (!LoadingIndicator || !isLoading) return null;
	      var innerProps = {
	        'aria-hidden': 'true'
	      };
	      return React__default.createElement(LoadingIndicator, _extends({}, commonProps, {
	        innerProps: innerProps,
	        isDisabled: isDisabled,
	        isFocused: isFocused
	      }));
	    }
	  }, {
	    key: "renderIndicatorSeparator",
	    value: function renderIndicatorSeparator() {
	      var _this$components2 = this.components,
	          DropdownIndicator = _this$components2.DropdownIndicator,
	          IndicatorSeparator = _this$components2.IndicatorSeparator; // separator doesn't make sense without the dropdown indicator

	      if (!DropdownIndicator || !IndicatorSeparator) return null;
	      var commonProps = this.commonProps;
	      var isDisabled = this.props.isDisabled;
	      var isFocused = this.state.isFocused;
	      return React__default.createElement(IndicatorSeparator, _extends({}, commonProps, {
	        isDisabled: isDisabled,
	        isFocused: isFocused
	      }));
	    }
	  }, {
	    key: "renderDropdownIndicator",
	    value: function renderDropdownIndicator() {
	      var DropdownIndicator = this.components.DropdownIndicator;
	      if (!DropdownIndicator) return null;
	      var commonProps = this.commonProps;
	      var isDisabled = this.props.isDisabled;
	      var isFocused = this.state.isFocused;
	      var innerProps = {
	        onMouseDown: this.onDropdownIndicatorMouseDown,
	        onTouchEnd: this.onDropdownIndicatorTouchEnd,
	        'aria-hidden': 'true'
	      };
	      return React__default.createElement(DropdownIndicator, _extends({}, commonProps, {
	        innerProps: innerProps,
	        isDisabled: isDisabled,
	        isFocused: isFocused
	      }));
	    }
	  }, {
	    key: "renderMenu",
	    value: function renderMenu() {
	      var _this5 = this;

	      var _this$components3 = this.components,
	          Group = _this$components3.Group,
	          GroupHeading = _this$components3.GroupHeading,
	          Menu$$1 = _this$components3.Menu,
	          MenuList$$1 = _this$components3.MenuList,
	          MenuPortal$$1 = _this$components3.MenuPortal,
	          LoadingMessage$$1 = _this$components3.LoadingMessage,
	          NoOptionsMessage$$1 = _this$components3.NoOptionsMessage,
	          Option = _this$components3.Option;
	      var commonProps = this.commonProps;
	      var _this$state9 = this.state,
	          focusedOption = _this$state9.focusedOption,
	          menuOptions = _this$state9.menuOptions;
	      var _this$props18 = this.props,
	          captureMenuScroll = _this$props18.captureMenuScroll,
	          inputValue = _this$props18.inputValue,
	          isLoading = _this$props18.isLoading,
	          loadingMessage = _this$props18.loadingMessage,
	          minMenuHeight = _this$props18.minMenuHeight,
	          maxMenuHeight = _this$props18.maxMenuHeight,
	          menuIsOpen = _this$props18.menuIsOpen,
	          menuPlacement = _this$props18.menuPlacement,
	          menuPosition = _this$props18.menuPosition,
	          menuPortalTarget = _this$props18.menuPortalTarget,
	          menuShouldBlockScroll = _this$props18.menuShouldBlockScroll,
	          menuShouldScrollIntoView = _this$props18.menuShouldScrollIntoView,
	          noOptionsMessage = _this$props18.noOptionsMessage,
	          onMenuScrollToTop = _this$props18.onMenuScrollToTop,
	          onMenuScrollToBottom = _this$props18.onMenuScrollToBottom;
	      if (!menuIsOpen) return null; // TODO: Internal Option Type here

	      var render = function render(props) {
	        // for performance, the menu options in state aren't changed when the
	        // focused option changes so we calculate additional props based on that
	        var isFocused = focusedOption === props.data;
	        props.innerRef = isFocused ? _this5.getFocusedOptionRef : undefined;
	        return React__default.createElement(Option, _extends({}, commonProps, props, {
	          isFocused: isFocused
	        }), _this5.formatOptionLabel(props.data, 'menu'));
	      };

	      var menuUI;

	      if (this.hasOptions()) {
	        menuUI = menuOptions.render.map(function (item) {
	          if (item.type === 'group') {
	            var type = item.type,
	                group = _objectWithoutProperties(item, ["type"]);

	            var headingId = "".concat(item.key, "-heading");
	            return React__default.createElement(Group, _extends({}, commonProps, group, {
	              Heading: GroupHeading,
	              headingProps: {
	                id: headingId
	              },
	              label: _this5.formatGroupLabel(item.data)
	            }), item.options.map(function (option) {
	              return render(option);
	            }));
	          } else if (item.type === 'option') {
	            return render(item);
	          }
	        });
	      } else if (isLoading) {
	        var message = loadingMessage({
	          inputValue: inputValue
	        });
	        if (message === null) return null;
	        menuUI = React__default.createElement(LoadingMessage$$1, commonProps, message);
	      } else {
	        var _message = noOptionsMessage({
	          inputValue: inputValue
	        });

	        if (_message === null) return null;
	        menuUI = React__default.createElement(NoOptionsMessage$$1, commonProps, _message);
	      }

	      var menuPlacementProps = {
	        minMenuHeight: minMenuHeight,
	        maxMenuHeight: maxMenuHeight,
	        menuPlacement: menuPlacement,
	        menuPosition: menuPosition,
	        menuShouldScrollIntoView: menuShouldScrollIntoView
	      };
	      var menuElement = React__default.createElement(MenuPlacer, _extends({}, commonProps, menuPlacementProps), function (_ref6) {
	        var ref = _ref6.ref,
	            _ref6$placerProps = _ref6.placerProps,
	            placement = _ref6$placerProps.placement,
	            maxHeight = _ref6$placerProps.maxHeight;
	        return React__default.createElement(Menu$$1, _extends({}, commonProps, menuPlacementProps, {
	          innerRef: ref,
	          innerProps: {
	            onMouseDown: _this5.onMenuMouseDown,
	            onMouseMove: _this5.onMenuMouseMove
	          },
	          isLoading: isLoading,
	          placement: placement
	        }), React__default.createElement(ScrollCaptorSwitch, {
	          isEnabled: captureMenuScroll,
	          onTopArrive: onMenuScrollToTop,
	          onBottomArrive: onMenuScrollToBottom
	        }, React__default.createElement(ScrollBlock, {
	          isEnabled: menuShouldBlockScroll
	        }, React__default.createElement(MenuList$$1, _extends({}, commonProps, {
	          innerRef: _this5.getMenuListRef,
	          isLoading: isLoading,
	          maxHeight: maxHeight
	        }), menuUI))));
	      }); // positioning behaviour is almost identical for portalled and fixed,
	      // so we use the same component. the actual portalling logic is forked
	      // within the component based on `menuPosition`

	      return menuPortalTarget || menuPosition === 'fixed' ? React__default.createElement(MenuPortal$$1, _extends({}, commonProps, {
	        appendTo: menuPortalTarget,
	        controlElement: this.controlRef,
	        menuPlacement: menuPlacement,
	        menuPosition: menuPosition
	      }), menuElement) : menuElement;
	    }
	  }, {
	    key: "renderFormField",
	    value: function renderFormField() {
	      var _this6 = this;

	      var _this$props19 = this.props,
	          delimiter = _this$props19.delimiter,
	          isDisabled = _this$props19.isDisabled,
	          isMulti = _this$props19.isMulti,
	          name = _this$props19.name;
	      var selectValue = this.state.selectValue;
	      if (!name || isDisabled) return;

	      if (isMulti) {
	        if (delimiter) {
	          var value = selectValue.map(function (opt) {
	            return _this6.getOptionValue(opt);
	          }).join(delimiter);
	          return React__default.createElement("input", {
	            name: name,
	            type: "hidden",
	            value: value
	          });
	        } else {
	          var input = selectValue.length > 0 ? selectValue.map(function (opt, i) {
	            return React__default.createElement("input", {
	              key: "i-".concat(i),
	              name: name,
	              type: "hidden",
	              value: _this6.getOptionValue(opt)
	            });
	          }) : React__default.createElement("input", {
	            name: name,
	            type: "hidden"
	          });
	          return React__default.createElement("div", null, input);
	        }
	      } else {
	        var _value = selectValue[0] ? this.getOptionValue(selectValue[0]) : '';

	        return React__default.createElement("input", {
	          name: name,
	          type: "hidden",
	          value: _value
	        });
	      }
	    }
	  }, {
	    key: "renderLiveRegion",
	    value: function renderLiveRegion() {
	      if (!this.state.isFocused) return null;
	      return React__default.createElement(A11yText, {
	        "aria-live": "assertive"
	      }, React__default.createElement("p", {
	        id: "aria-selection-event"
	      }, "\xA0", this.state.ariaLiveSelection), React__default.createElement("p", {
	        id: "aria-context"
	      }, "\xA0", this.constructAriaLiveMessage()));
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this$components4 = this.components,
	          Control = _this$components4.Control,
	          IndicatorsContainer = _this$components4.IndicatorsContainer,
	          SelectContainer = _this$components4.SelectContainer,
	          ValueContainer = _this$components4.ValueContainer;
	      var _this$props20 = this.props,
	          className = _this$props20.className,
	          id = _this$props20.id,
	          isDisabled = _this$props20.isDisabled,
	          menuIsOpen = _this$props20.menuIsOpen;
	      var isFocused = this.state.isFocused;
	      var commonProps = this.commonProps = this.getCommonProps();
	      return React__default.createElement(SelectContainer, _extends({}, commonProps, {
	        className: className,
	        innerProps: {
	          id: id,
	          onKeyDown: this.onKeyDown
	        },
	        isDisabled: isDisabled,
	        isFocused: isFocused
	      }), this.renderLiveRegion(), React__default.createElement(Control, _extends({}, commonProps, {
	        innerRef: this.getControlRef,
	        innerProps: {
	          onMouseDown: this.onControlMouseDown,
	          onTouchEnd: this.onControlTouchEnd
	        },
	        isDisabled: isDisabled,
	        isFocused: isFocused,
	        menuIsOpen: menuIsOpen
	      }), React__default.createElement(ValueContainer, _extends({}, commonProps, {
	        isDisabled: isDisabled
	      }), this.renderPlaceholderOrValue(), this.renderInput()), React__default.createElement(IndicatorsContainer, _extends({}, commonProps, {
	        isDisabled: isDisabled
	      }), this.renderClearIndicator(), this.renderLoadingIndicator(), this.renderIndicatorSeparator(), this.renderDropdownIndicator())), this.renderMenu(), this.renderFormField());
	    }
	  }]);

	  return Select;
	}(React.Component);

	_defineProperty(Select, "defaultProps", defaultProps);

	var defaultProps$1 = {
	  defaultInputValue: '',
	  defaultMenuIsOpen: false,
	  defaultValue: null
	};

	var manageState = function manageState(SelectComponent) {
	  var _class, _temp;

	  return _temp = _class =
	  /*#__PURE__*/
	  function (_Component) {
	    _inherits(StateManager, _Component);

	    function StateManager() {
	      var _getPrototypeOf2;

	      var _this;

	      _classCallCheck(this, StateManager);

	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StateManager)).call.apply(_getPrototypeOf2, [this].concat(args)));

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "select", void 0);

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
	        inputValue: _this.props.inputValue !== undefined ? _this.props.inputValue : _this.props.defaultInputValue,
	        menuIsOpen: _this.props.menuIsOpen !== undefined ? _this.props.menuIsOpen : _this.props.defaultMenuIsOpen,
	        value: _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue
	      });

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (value, actionMeta) {
	        _this.callProp('onChange', value, actionMeta);

	        _this.setState({
	          value: value
	        });
	      });

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onInputChange", function (value, actionMeta) {
	        // TODO: for backwards compatibility, we allow the prop to return a new
	        // value, but now inputValue is a controllable prop we probably shouldn't
	        var newValue = _this.callProp('onInputChange', value, actionMeta);

	        _this.setState({
	          inputValue: newValue !== undefined ? newValue : value
	        });
	      });

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMenuOpen", function () {
	        _this.callProp('onMenuOpen');

	        _this.setState({
	          menuIsOpen: true
	        });
	      });

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMenuClose", function () {
	        _this.callProp('onMenuClose');

	        _this.setState({
	          menuIsOpen: false
	        });
	      });

	      return _this;
	    }

	    _createClass(StateManager, [{
	      key: "focus",
	      value: function focus() {
	        this.select.focus();
	      }
	    }, {
	      key: "blur",
	      value: function blur() {
	        this.select.blur();
	      } // FIXME: untyped flow code, return any

	    }, {
	      key: "getProp",
	      value: function getProp(key) {
	        return this.props[key] !== undefined ? this.props[key] : this.state[key];
	      } // FIXME: untyped flow code, return any

	    }, {
	      key: "callProp",
	      value: function callProp(name) {
	        if (typeof this.props[name] === 'function') {
	          var _this$props;

	          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	            args[_key2 - 1] = arguments[_key2];
	          }

	          return (_this$props = this.props)[name].apply(_this$props, args);
	        }
	      }
	    }, {
	      key: "render",
	      value: function render() {
	        var _this2 = this;

	        var _this$props2 = this.props,
	            defaultInputValue = _this$props2.defaultInputValue,
	            defaultMenuIsOpen = _this$props2.defaultMenuIsOpen,
	            defaultValue = _this$props2.defaultValue,
	            props = _objectWithoutProperties(_this$props2, ["defaultInputValue", "defaultMenuIsOpen", "defaultValue"]);

	        return React__default.createElement(SelectComponent, _extends({}, props, {
	          ref: function ref(_ref) {
	            _this2.select = _ref;
	          },
	          inputValue: this.getProp('inputValue'),
	          menuIsOpen: this.getProp('menuIsOpen'),
	          onChange: this.onChange,
	          onInputChange: this.onInputChange,
	          onMenuClose: this.onMenuClose,
	          onMenuOpen: this.onMenuOpen,
	          value: this.getProp('value')
	        }));
	      }
	    }]);

	    return StateManager;
	  }(React.Component), _defineProperty(_class, "defaultProps", defaultProps$1), _temp;
	};

	var defaultProps$2 = {
	  cacheOptions: false,
	  defaultOptions: false,
	  filterOption: null
	};
	var makeAsyncSelect = function makeAsyncSelect(SelectComponent) {
	  var _class, _temp;

	  return _temp = _class =
	  /*#__PURE__*/
	  function (_Component) {
	    _inherits(Async, _Component);

	    function Async(props) {
	      var _this;

	      _classCallCheck(this, Async);

	      _this = _possibleConstructorReturn(this, _getPrototypeOf(Async).call(this));

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "select", void 0);

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "lastRequest", void 0);

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mounted", false);

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "optionsCache", {});

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputChange", function (newValue, actionMeta) {
	        var _this$props = _this.props,
	            cacheOptions = _this$props.cacheOptions,
	            onInputChange = _this$props.onInputChange; // TODO

	        var inputValue = handleInputChange(newValue, actionMeta, onInputChange);

	        if (!inputValue) {
	          delete _this.lastRequest;

	          _this.setState({
	            inputValue: '',
	            loadedInputValue: '',
	            loadedOptions: [],
	            isLoading: false,
	            passEmptyOptions: false
	          });

	          return;
	        }

	        if (cacheOptions && _this.optionsCache[inputValue]) {
	          _this.setState({
	            inputValue: inputValue,
	            loadedInputValue: inputValue,
	            loadedOptions: _this.optionsCache[inputValue],
	            isLoading: false,
	            passEmptyOptions: false
	          });
	        } else {
	          var request = _this.lastRequest = {};

	          _this.setState({
	            inputValue: inputValue,
	            isLoading: true,
	            passEmptyOptions: !_this.state.loadedInputValue
	          }, function () {
	            _this.loadOptions(inputValue, function (options) {
	              if (!_this.mounted) return;

	              if (options) {
	                _this.optionsCache[inputValue] = options;
	              }

	              if (request !== _this.lastRequest) return;
	              delete _this.lastRequest;

	              _this.setState({
	                isLoading: false,
	                loadedInputValue: inputValue,
	                loadedOptions: options || [],
	                passEmptyOptions: false
	              });
	            });
	          });
	        }

	        return inputValue;
	      });

	      _this.state = {
	        defaultOptions: Array.isArray(props.defaultOptions) ? props.defaultOptions : undefined,
	        inputValue: typeof props.inputValue !== 'undefined' ? props.inputValue : '',
	        isLoading: props.defaultOptions === true ? true : false,
	        loadedOptions: [],
	        passEmptyOptions: false
	      };
	      return _this;
	    }

	    _createClass(Async, [{
	      key: "componentDidMount",
	      value: function componentDidMount() {
	        var _this2 = this;

	        this.mounted = true;
	        var defaultOptions = this.props.defaultOptions;
	        var inputValue = this.state.inputValue;

	        if (defaultOptions === true) {
	          this.loadOptions(inputValue, function (options) {
	            if (!_this2.mounted) return;
	            var isLoading = !!_this2.lastRequest;

	            _this2.setState({
	              defaultOptions: options || [],
	              isLoading: isLoading
	            });
	          });
	        }
	      }
	    }, {
	      key: "componentWillReceiveProps",
	      value: function componentWillReceiveProps(nextProps) {
	        // if the cacheOptions prop changes, clear the cache
	        if (nextProps.cacheOptions !== this.props.cacheOptions) {
	          this.optionsCache = {};
	        }

	        if (nextProps.defaultOptions !== this.props.defaultOptions) {
	          this.setState({
	            defaultOptions: Array.isArray(nextProps.defaultOptions) ? nextProps.defaultOptions : undefined
	          });
	        }
	      }
	    }, {
	      key: "componentWillUnmount",
	      value: function componentWillUnmount() {
	        this.mounted = false;
	      }
	    }, {
	      key: "focus",
	      value: function focus() {
	        this.select.focus();
	      }
	    }, {
	      key: "blur",
	      value: function blur() {
	        this.select.blur();
	      }
	    }, {
	      key: "loadOptions",
	      value: function loadOptions(inputValue, callback) {
	        var loadOptions = this.props.loadOptions;
	        if (!loadOptions) return callback();
	        var loader = loadOptions(inputValue, callback);

	        if (loader && typeof loader.then === 'function') {
	          loader.then(callback, function () {
	            return callback();
	          });
	        }
	      }
	    }, {
	      key: "render",
	      value: function render() {
	        var _this3 = this;

	        var _this$props2 = this.props,
	            loadOptions = _this$props2.loadOptions,
	            props = _objectWithoutProperties(_this$props2, ["loadOptions"]);

	        var _this$state = this.state,
	            defaultOptions = _this$state.defaultOptions,
	            inputValue = _this$state.inputValue,
	            isLoading = _this$state.isLoading,
	            loadedInputValue = _this$state.loadedInputValue,
	            loadedOptions = _this$state.loadedOptions,
	            passEmptyOptions = _this$state.passEmptyOptions;
	        var options = passEmptyOptions ? [] : inputValue && loadedInputValue ? loadedOptions : defaultOptions || [];
	        return React__default.createElement(SelectComponent, _extends({}, props, {
	          ref: function ref(_ref) {
	            _this3.select = _ref;
	          },
	          options: options,
	          isLoading: isLoading,
	          onInputChange: this.handleInputChange
	        }));
	      }
	    }]);

	    return Async;
	  }(React.Component), _defineProperty(_class, "defaultProps", defaultProps$2), _temp;
	};
	var SelectState = manageState(Select);
	var Async = makeAsyncSelect(SelectState);

	var compareOption = function compareOption() {
	  var inputValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var option = arguments.length > 1 ? arguments[1] : undefined;
	  var candidate = String(inputValue).toLowerCase();
	  var optionValue = String(option.value).toLowerCase();
	  var optionLabel = String(option.label).toLowerCase();
	  return optionValue === candidate || optionLabel === candidate;
	};

	var builtins = {
	  formatCreateLabel: function formatCreateLabel(inputValue) {
	    return "Create \"".concat(inputValue, "\"");
	  },
	  isValidNewOption: function isValidNewOption(inputValue, selectValue, selectOptions) {
	    return !(!inputValue || selectValue.some(function (option) {
	      return compareOption(inputValue, option);
	    }) || selectOptions.some(function (option) {
	      return compareOption(inputValue, option);
	    }));
	  },
	  getNewOptionData: function getNewOptionData(inputValue, optionLabel) {
	    return {
	      label: optionLabel,
	      value: inputValue,
	      __isNew__: true
	    };
	  }
	};
	var defaultProps$3 = _objectSpread({
	  allowCreateWhileLoading: false,
	  createOptionPosition: 'last'
	}, builtins);
	var makeCreatableSelect = function makeCreatableSelect(SelectComponent) {
	  var _class, _temp;

	  return _temp = _class =
	  /*#__PURE__*/
	  function (_Component) {
	    _inherits(Creatable, _Component);

	    function Creatable(props) {
	      var _this;

	      _classCallCheck(this, Creatable);

	      _this = _possibleConstructorReturn(this, _getPrototypeOf(Creatable).call(this, props));

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "select", void 0);

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (newValue, actionMeta) {
	        var _this$props = _this.props,
	            getNewOptionData = _this$props.getNewOptionData,
	            inputValue = _this$props.inputValue,
	            isMulti = _this$props.isMulti,
	            onChange = _this$props.onChange,
	            onCreateOption = _this$props.onCreateOption,
	            value = _this$props.value;

	        if (actionMeta.action !== 'select-option') {
	          return onChange(newValue, actionMeta);
	        }

	        var newOption = _this.state.newOption;
	        var valueArray = Array.isArray(newValue) ? newValue : [newValue];

	        if (valueArray[valueArray.length - 1] === newOption) {
	          if (onCreateOption) onCreateOption(inputValue);else {
	            var newOptionData = getNewOptionData(inputValue, inputValue);
	            var newActionMeta = {
	              action: 'create-option'
	            };

	            if (isMulti) {
	              onChange([].concat(_toConsumableArray(cleanValue(value)), [newOptionData]), newActionMeta);
	            } else {
	              onChange(newOptionData, newActionMeta);
	            }
	          }
	          return;
	        }

	        onChange(newValue, actionMeta);
	      });

	      var options = props.options || [];
	      _this.state = {
	        newOption: undefined,
	        options: options
	      };
	      return _this;
	    }

	    _createClass(Creatable, [{
	      key: "componentWillReceiveProps",
	      value: function componentWillReceiveProps(nextProps) {
	        var allowCreateWhileLoading = nextProps.allowCreateWhileLoading,
	            createOptionPosition = nextProps.createOptionPosition,
	            formatCreateLabel = nextProps.formatCreateLabel,
	            getNewOptionData = nextProps.getNewOptionData,
	            inputValue = nextProps.inputValue,
	            isLoading = nextProps.isLoading,
	            isValidNewOption = nextProps.isValidNewOption,
	            value = nextProps.value;
	        var options = nextProps.options || [];
	        var newOption = this.state.newOption;

	        if (isValidNewOption(inputValue, cleanValue(value), options)) {
	          newOption = getNewOptionData(inputValue, formatCreateLabel(inputValue));
	        } else {
	          newOption = undefined;
	        }

	        this.setState({
	          newOption: newOption,
	          options: (allowCreateWhileLoading || !isLoading) && newOption ? createOptionPosition === 'first' ? [newOption].concat(_toConsumableArray(options)) : [].concat(_toConsumableArray(options), [newOption]) : options
	        });
	      }
	    }, {
	      key: "focus",
	      value: function focus() {
	        this.select.focus();
	      }
	    }, {
	      key: "blur",
	      value: function blur() {
	        this.select.blur();
	      }
	    }, {
	      key: "render",
	      value: function render() {
	        var _this2 = this;

	        var props = _extends({}, this.props);

	        var options = this.state.options;
	        return React__default.createElement(SelectComponent, _extends({}, props, {
	          ref: function ref(_ref) {
	            _this2.select = _ref;
	          },
	          options: options,
	          onChange: this.onChange
	        }));
	      }
	    }]);

	    return Creatable;
	  }(React.Component), _defineProperty(_class, "defaultProps", defaultProps$3), _temp;
	}; // TODO: do this in package entrypoint

	var SelectCreatable = makeCreatableSelect(Select);
	var Creatable = manageState(SelectCreatable);

	var SelectCreatable$1 = makeCreatableSelect(Select);
	var SelectCreatableState = manageState(SelectCreatable$1);
	var AsyncCreatable = makeAsyncSelect(SelectCreatableState);

	// strip transition props off before spreading onto select component
	// note we need to be explicit about innerRef for flow
	var AnimatedInput = function AnimatedInput(WrappedComponent) {
	  return function (_ref) {
	    var inProp = _ref.in,
	        onExited = _ref.onExited,
	        appear = _ref.appear,
	        enter = _ref.enter,
	        exit = _ref.exit,
	        props = _objectWithoutProperties(_ref, ["in", "onExited", "appear", "enter", "exit"]);

	    return React__default.createElement(WrappedComponent, props);
	  };
	};

	var Fade = function Fade(_ref) {
	  var Tag = _ref.component,
	      _ref$duration = _ref.duration,
	      duration = _ref$duration === void 0 ? 1 : _ref$duration,
	      inProp = _ref.in,
	      onExited = _ref.onExited,
	      props = _objectWithoutProperties(_ref, ["component", "duration", "in", "onExited"]);

	  var transition = {
	    entering: {
	      opacity: 0
	    },
	    entered: {
	      opacity: 1,
	      transition: "opacity ".concat(duration, "ms")
	    },
	    exiting: {
	      opacity: 0
	    },
	    exited: {
	      opacity: 0
	    }
	  };
	  return React__default.createElement(reactTransitionGroup_1, {
	    mountOnEnter: true,
	    unmountOnExit: true,
	    in: inProp,
	    timeout: duration
	  }, function (state) {
	    var innerProps = {
	      style: _objectSpread({}, transition[state])
	    };
	    return React__default.createElement(Tag, _extends({
	      innerProps: innerProps
	    }, props));
	  });
	}; // ==============================
	// Collapse Transition
	// ==============================

	var collapseDuration = 260;
	// wrap each MultiValue with a collapse transition; decreases width until
	// finally removing from DOM
	var Collapse =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(Collapse, _Component);

	  function Collapse() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, Collapse);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Collapse)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "duration", collapseDuration);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "rafID", void 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
	      width: 'auto'
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "transition", {
	      exiting: {
	        width: 0,
	        transition: "width ".concat(_this.duration, "ms ease-out")
	      },
	      exited: {
	        width: 0
	      }
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getWidth", function (ref) {
	      if (ref && isNaN(_this.state.width)) {
	        /*
	          Here we're invoking requestAnimationFrame with a callback invoking our
	          call to getBoundingClientRect and setState in order to resolve an edge case
	          around portalling. Certain portalling solutions briefly remove children from the DOM
	          before appending them to the target node. This is to avoid us trying to call getBoundingClientrect
	          while the Select component is in this state.
	        */
	        // cannot use `offsetWidth` because it is rounded
	        _this.rafID = window.requestAnimationFrame(function () {
	          var _ref$getBoundingClien = ref.getBoundingClientRect(),
	              width = _ref$getBoundingClien.width;

	          _this.setState({
	            width: width
	          });
	        });
	      }
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getStyle", function (width) {
	      return {
	        overflow: 'hidden',
	        whiteSpace: 'nowrap',
	        width: width
	      };
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getTransition", function (state) {
	      return _this.transition[state];
	    });

	    return _this;
	  }

	  _createClass(Collapse, [{
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      if (this.rafID) {
	        window.cancelAnimationFrame(this.rafID);
	      }
	    } // width must be calculated; cannot transition from `undefined` to `number`

	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;

	      var _this$props = this.props,
	          children = _this$props.children,
	          inProp = _this$props.in;
	      var width = this.state.width;
	      return React__default.createElement(reactTransitionGroup_1, {
	        enter: false,
	        mountOnEnter: true,
	        unmountOnExit: true,
	        in: inProp,
	        timeout: this.duration
	      }, function (state) {
	        var style = _objectSpread({}, _this2.getStyle(width), _this2.getTransition(state));

	        return React__default.createElement("div", {
	          ref: _this2.getWidth,
	          style: style
	        }, children);
	      });
	    }
	  }]);

	  return Collapse;
	}(React.Component);

	var AnimatedMultiValue = function AnimatedMultiValue(WrappedComponent) {
	  return function (_ref) {
	    var inProp = _ref.in,
	        onExited = _ref.onExited,
	        props = _objectWithoutProperties(_ref, ["in", "onExited"]);

	    return React__default.createElement(Collapse, {
	      in: inProp,
	      onExited: onExited
	    }, React__default.createElement(WrappedComponent, _extends({
	      cropWithEllipsis: inProp
	    }, props)));
	  };
	};

	var AnimatedPlaceholder = function AnimatedPlaceholder(WrappedComponent) {
	  return function (props) {
	    return React__default.createElement(Fade, _extends({
	      component: WrappedComponent,
	      duration: props.isMulti ? collapseDuration : 1
	    }, props));
	  };
	};

	var AnimatedSingleValue = function AnimatedSingleValue(WrappedComponent) {
	  return function (props) {
	    return React__default.createElement(Fade, _extends({
	      component: WrappedComponent
	    }, props));
	  };
	};

	// make ValueContainer a transition group
	var AnimatedValueContainer = function AnimatedValueContainer(WrappedComponent) {
	  return function (props) {
	    return React__default.createElement(reactTransitionGroup_2, _extends({
	      component: WrappedComponent
	    }, props));
	  };
	};

	var makeAnimated = function makeAnimated() {
	  var externalComponents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var components$$1 = defaultComponents({
	    components: externalComponents
	  });

	  var Input = components$$1.Input,
	      MultiValue = components$$1.MultiValue,
	      Placeholder = components$$1.Placeholder,
	      SingleValue = components$$1.SingleValue,
	      ValueContainer = components$$1.ValueContainer,
	      rest = _objectWithoutProperties(components$$1, ["Input", "MultiValue", "Placeholder", "SingleValue", "ValueContainer"]);

	  return _objectSpread({
	    Input: AnimatedInput(Input),
	    MultiValue: AnimatedMultiValue(MultiValue),
	    Placeholder: AnimatedPlaceholder(Placeholder),
	    SingleValue: AnimatedSingleValue(SingleValue),
	    ValueContainer: AnimatedValueContainer(ValueContainer)
	  }, rest);
	};

	var AnimatedComponents = makeAnimated();
	var Input$1 = AnimatedComponents.Input;
	var MultiValue$1 = AnimatedComponents.MultiValue;
	var Placeholder$1$1 = AnimatedComponents.Placeholder;
	var SingleValue$1 = AnimatedComponents.SingleValue;
	var ValueContainer$1 = AnimatedComponents.ValueContainer;
	var index = memoizeOne(makeAnimated, exportedEqual);

	var index$1 = manageState(Select);

	class Edit$2 extends React__default.Component {
	  constructor(props) {
	    super(props);
	    this.handleInputChange = this.handleInputChange.bind(this);
	    this.handleSelectChange = this.handleSelectChange.bind(this);
	  }

	  handleInputChange(event) {
	    const {
	      onChange,
	      property
	    } = this.props;
	    onChange(property.name, event.target.value);
	  }

	  handleSelectChange(selected) {
	    const {
	      onChange,
	      property
	    } = this.props;
	    const value = selected ? selected.value : '';
	    onChange(property.name, value);
	  }

	  renderInput() {
	    const {
	      property,
	      record
	    } = this.props;
	    const value = record.params && typeof record.params[property.name] !== 'undefined' ? record.params[property.name] : '';

	    if (property.availableValues) {
	      const selected = property.availableValues.find(av => av.value === value);
	      return React__default.createElement(index$1, {
	        isClearable: true,
	        value: selected,
	        options: property.availableValues,
	        onChange: this.handleSelectChange
	      });
	    }

	    return React__default.createElement("input", {
	      type: "text",
	      className: "input",
	      id: property.name,
	      name: property.name,
	      onChange: this.handleInputChange,
	      value: value
	    });
	  }

	  render() {
	    const {
	      property,
	      record
	    } = this.props;
	    const error = record.errors && record.errors[property.name];
	    return React__default.createElement(PropertyInEdit, {
	      property: property,
	      error: error
	    }, this.renderInput());
	  }

	}
	Edit$2.propTypes = {
	  property: simplifiedPropertyType.isRequired,
	  record: recordType.isRequired,
	  onChange: PropTypes$1.func.isRequired
	};

	/**
	 * @file Default AdminBro theme
	 */
	// sorted alphabetically

	const colors$1 = {
	  defaultText: '#111114',
	  lightText: '#a9aabc',
	  lightBck: '#F8F8FA',
	  superLightBack: '#F1F1F5',
	  border: '#eeeeef',
	  borderOnDark: '#4E5779',
	  bck: '#f7f7Fa',
	  darkBck: '#303b62',
	  superDarkBck: '#192035',
	  love: '#e6282b',
	  primary: '#718af4',
	  primaryHover: '#545B8C',
	  success: '#21C197',
	  successBorder: '#8CDAD9',
	  lightSuccess: '#DBF0F1',
	  error: '#F0616F',
	  lightError: '#F6E1E6',
	  warning: '#FF9F89'
	};
	const sizes = {
	  navbarHeight: '64px',
	  sidebarWidth: '300px',
	  sidebarMobileWidth: '98px',
	  paddingLayout: '30px',
	  padding: '15px',
	  paddingMin: '5px'
	};
	const fonts = {
	  base: '14px',
	  medium: '12px',
	  min: '11px',
	  header: '32px'
	};
	const breakpoints = {
	  minMobileWidth: '320px',
	  minTabletWidth: '769px',
	  minDesktopWidth: '1024px',
	  minWidescreenWidth: '1216px',
	  minFullhdWidth: '1408px'
	};

	var style = /*#__PURE__*/Object.freeze({
		colors: colors$1,
		sizes: sizes,
		fonts: fonts,
		breakpoints: breakpoints
	});

	/* eslint-disable @typescript-eslint/explicit-function-return-type */
	const selectStyles = {
	  control: (provided, state) => ({ ...provided,
	    border: state.isFocused ? `1px solid ${colors$1.primary}` : `1px solid ${colors$1.border}`,
	    borderRadius: '0px',
	    background: 'transparent'
	  }),
	  menu: provided => ({ ...provided,
	    borderRadius: '0px',
	    borderColor: colors$1.border
	  })
	};
	const filterStyles = {
	  control: (provided, state) => ({ ...provided,
	    border: state.isFocused ? `1px solid ${colors$1.primary}` : `1px solid ${colors$1.borderOnDark}`,
	    borderRadius: '0px',
	    background: 'transparent',
	    color: colors$1.lightText
	  }),
	  input: () => ({
	    color: '#fff'
	  }),
	  singleValue: () => ({
	    color: colors$1.lightText
	  }),
	  option: (provided, state) => ({ ...provided,
	    color: state.isSelected ? '#ffffff' : colors$1.lightText,
	    background: state.isFocused ? 'rgba(32,39,62,0.25)' : 'transparent'
	  }),
	  menu: provided => ({ ...provided,
	    borderRadius: '0px',
	    borderColor: colors$1.border,
	    background: colors$1.darkBck,
	    zIndex: 5
	  })
	};

	class Filter extends React__default.PureComponent {
	  constructor(props) {
	    super(props);
	    this.handleInputChange = this.handleInputChange.bind(this);
	    this.handleSelectChange = this.handleSelectChange.bind(this);
	  }

	  handleInputChange(event) {
	    const {
	      onChange,
	      property
	    } = this.props;
	    onChange(property.name, event.target.value);
	  }

	  handleSelectChange(selected) {
	    const {
	      onChange,
	      property
	    } = this.props;
	    const value = selected ? selected.value : '';
	    onChange(property.name, value);
	  }

	  renderInput() {
	    const {
	      property,
	      filter
	    } = this.props;
	    const filterKey = `filter-${property.name}`;
	    const value = filter[property.name] || '';

	    if (property.availableValues) {
	      const selected = property.availableValues.find(av => av.value === value);
	      return React__default.createElement(index$1, {
	        value: typeof selected === 'undefined' ? '' : selected,
	        isClearable: true,
	        options: property.availableValues,
	        styles: filterStyles,
	        onChange: this.handleSelectChange
	      });
	    }

	    return React__default.createElement(React__default.Fragment, null, React__default.createElement("span", {
	      className: "icon is-small is-right"
	    }, React__default.createElement("i", {
	      className: "fas fa-search"
	    })), React__default.createElement("input", {
	      type: "text",
	      className: "input filter",
	      name: filterKey,
	      onChange: this.handleInputChange,
	      value: value
	    }));
	  }

	  render() {
	    const {
	      property
	    } = this.props;
	    return React__default.createElement(PropertyInFilter, {
	      property: property
	    }, React__default.createElement("div", {
	      className: "control has-icons-left"
	    }, this.renderInput()));
	  }

	}
	Filter.propTypes = {
	  property: propertyType.isRequired,
	  onChange: PropTypes$1.func.isRequired,
	  // eslint-disable-next-line react/forbid-prop-types
	  filter: PropTypes$1.object
	};
	Filter.defaultProps = {
	  filter: {}
	};

	class List$2 extends React__default.PureComponent {
	  render() {
	    const {
	      property,
	      record,
	      resource
	    } = this.props;
	    const showAction = record.recordActions.find(a => a.name === 'show');
	    const value = record.params[property.name];

	    if (resource.titleProperty.name === property.name && showAction) {
	      const h = new ViewHelpers();
	      const href = h.recordActionUrl({
	        resourceId: resource.id,
	        recordId: record.id,
	        actionName: 'show'
	      });
	      return React__default.createElement(reactRouterDom.Link, {
	        to: href
	      }, value);
	    }

	    const className = property.availableValues ? 'tag' : '';
	    return React__default.createElement("span", {
	      className: className
	    }, value);
	  }

	}

	var defaultType = {
	  show: Show$2,
	  edit: Edit$2,
	  filter: Filter,
	  list: List$2
	};

	class Edit$3 extends React__default.PureComponent {
	  handleChange(event) {
	    const {
	      property,
	      onChange
	    } = this.props;
	    const {
	      checked
	    } = event.target;
	    onChange(property.name, checked);
	  }

	  render() {
	    const {
	      property,
	      record
	    } = this.props;
	    const value = record.params && record.params[property.name] || '';
	    const error = record.errors && record.errors[property.name];
	    return React__default.createElement(PropertyInEdit, {
	      property: property,
	      error: error
	    }, React__default.createElement("input", {
	      type: "checkbox",
	      className: "checkbox",
	      id: property.name,
	      name: property.name,
	      onChange: this.handleChange.bind(this),
	      checked: value
	    }));
	  }

	}
	Edit$3.propTypes = {
	  property: simplifiedPropertyType.isRequired,
	  onChange: PropTypes$1.func.isRequired,
	  record: recordType.isRequired
	};

	var mapValue = (value => value ? 'Yes' : 'No');

	class Show$3 extends React__default.PureComponent {
	  render() {
	    const {
	      property,
	      record
	    } = this.props;
	    const value = mapValue(record.params[property.name]);
	    return React__default.createElement(PropertyInShow, {
	      property: property
	    }, value);
	  }

	}
	Show$3.propTypes = {
	  property: propertyType.isRequired,
	  record: recordType.isRequired
	};

	class List$3 extends React__default.PureComponent {
	  render() {
	    const {
	      property,
	      record,
	      resource
	    } = this.props;
	    const showAction = record.recordActions.find(a => a.name === 'show');
	    const value = mapValue(record.params[property.name]);

	    if (resource.titleProperty.name === property.name && showAction) {
	      const h = new ViewHelpers();
	      const href = h.recordActionUrl({
	        resourceId: resource.id,
	        recordId: record.id,
	        actionName: 'show'
	      });
	      return React__default.createElement(reactRouterDom.Link, {
	        to: href
	      }, value);
	    }

	    return React__default.createElement("span", null, value);
	  }

	}

	class Filter$1 extends React__default.PureComponent {
	  constructor(props) {
	    super(props);
	    this.handleChange = this.handleChange.bind(this);
	  }

	  handleChange(selected) {
	    const {
	      onChange,
	      property
	    } = this.props;
	    const value = selected ? selected.value : '';
	    onChange(property.name, value);
	  }

	  render() {
	    const {
	      property,
	      filter
	    } = this.props;
	    const value = typeof filter[property.name] === 'undefined' ? '' : filter[property.name];
	    const options = [{
	      value: true,
	      label: mapValue(true)
	    }, {
	      value: false,
	      label: mapValue(false)
	    }];
	    const selected = options.find(o => o.value === value);
	    return React__default.createElement(PropertyInFilter, {
	      property: property
	    }, React__default.createElement(index$1, {
	      value: typeof selected === 'undefined' ? '' : selected,
	      isClearable: true,
	      options: options,
	      styles: filterStyles,
	      onChange: this.handleChange
	    }));
	  }

	}
	Filter$1.propTypes = {
	  onChange: PropTypes$1.func.isRequired,
	  property: propertyType.isRequired,
	  // eslint-disable-next-line react/forbid-prop-types
	  filter: PropTypes$1.object
	};
	Filter$1.defaultProps = {
	  filter: {}
	};

	var boolean = {
	  edit: Edit$3,
	  show: Show$3,
	  list: List$3,
	  filter: Filter$1
	};

	class Edit$4 extends React__default.Component {
	  constructor(props) {
	    super(props);
	    this.datepickerRef = React__default.createRef();
	  }

	  componentDidMount() {
	    this.setupDatePicker();
	  }

	  shouldComponentUpdate(nextProps) {
	    const {
	      record,
	      property
	    } = this.props;
	    const nextRecord = nextProps.record;
	    const value = record.params && record.params[property.name] || '';
	    const nextValue = nextRecord.params && nextRecord.params[property.name] || '';

	    if (nextValue !== value) {
	      if (nextValue) {
	        this.datepickerRef.current._flatpickr.jumpToDate(nextValue);
	      } else {
	        this.datepickerRef.current._flatpickr.input.value = '';
	      }
	    }

	    const prevError = record.errors && record.errors[property.name];
	    const newError = nextRecord.errors && nextRecord.errors[property.name];
	    return prevError !== newError;
	  }

	  setupDatePicker() {
	    const {
	      record,
	      property
	    } = this.props;
	    const defaultDate = record.params && record.params[property.name] || null;
	    let options = {
	      format: 'Y-m-d'
	    };

	    if (property.type === 'datetime') {
	      options = {
	        format: 'Y-m-d H:i',
	        enableTime: true,
	        // eslint-disable-next-line @typescript-eslint/camelcase
	        time_24hr: true
	      };
	    }

	    const inst = flatpickr(this.datepickerRef.current, {
	      defaultDate,
	      ...options
	    });
	    inst.config.onChange.push((dates, text) => {
	      this.handleChange(text);
	    });
	  }

	  handleChange(value) {
	    const {
	      onChange,
	      property
	    } = this.props;
	    onChange(property.name, new Date(value));
	  }

	  render() {
	    const {
	      property,
	      record
	    } = this.props;
	    const error = record.errors && record.errors[property.name];
	    return React__default.createElement(PropertyInEdit, {
	      property: property,
	      error: error
	    }, React__default.createElement("div", {
	      className: "control has-icons-right"
	    }, React__default.createElement("input", {
	      type: "text",
	      className: "input pickadate",
	      id: property.name,
	      ref: this.datepickerRef,
	      name: property.name
	    }), React__default.createElement("span", {
	      className: "icon is-small is-right"
	    }, React__default.createElement("i", {
	      className: "icomoon-calendar"
	    }))));
	  }

	}
	Edit$4.propTypes = {
	  property: simplifiedPropertyType.isRequired,
	  record: recordType.isRequired,
	  onChange: PropTypes$1.func.isRequired
	};

	var mapValue$1 = (value => {
	  if (!value) {
	    return '';
	  }

	  const date = new Date(value);
	  return date.toLocaleString();
	});

	class Show$4 extends React__default.PureComponent {
	  render() {
	    const {
	      property,
	      record
	    } = this.props;
	    const value = mapValue$1(record.params[property.name], property.type);
	    return React__default.createElement(PropertyInShow, {
	      property: property
	    }, value);
	  }

	}
	Show$4.propTypes = {
	  property: propertyType.isRequired,
	  record: recordType.isRequired
	};

	class List$4 extends React__default.PureComponent {
	  render() {
	    const {
	      property,
	      record,
	      resource
	    } = this.props;
	    const showAction = record.recordActions.find(a => a.name === 'show');
	    const value = mapValue$1(record.params[property.name]);

	    if (resource.titleProperty.name === property.name && showAction) {
	      const h = new ViewHelpers();
	      const href = h.recordActionUrl({
	        resourceId: resource.id,
	        recordId: record.id,
	        actionName: 'show'
	      });
	      return React__default.createElement(reactRouterDom.Link, {
	        to: href
	      }, value);
	    }

	    return React__default.createElement("span", null, value);
	  }

	}

	const PARAM_SEPARATOR = '~~';

	/**
	 * Filter object wrapping up selected filters.
	 * @private
	 */
	class Filter$2 {
	  /**
	   * Changes raw nested filters to form Object<path, value>.
	   *
	   * @example
	   * const filters = {
	   *  nested: {field: 'ala'},
	   *  'dataField~~from': '2019-08-14'
	   * }
	   *
	   * const normalized = Filter.normalizeFilters(filters)
	   * // {
	   * //   'nested.filter': 'ala',
	   * //   'dataField': {from: '2019-08-14'}
	   * // }
	   *
	   *
	   * @param   {Object}  filters
	   *
	   * @return  {Object}
	   */
	  static normalizeKeys(filters) {
	    return flat_2(flat_1(filters), {
	      delimiter: PARAM_SEPARATOR
	    });
	  }
	  /**
	   * @param   {Object<String,Object | String>}  filters   selected filters
	   * @param   {BaseResource}                    resource    resource which is filtered
	   */


	  constructor(filters = {}, resource) {
	    this.resource = resource;
	    const normalized = Filter$2.normalizeKeys(filters);
	    this.filters = Object.keys(normalized).reduce((memo, path) => ({
	      [path]: {
	        path,
	        property: this.resource.property(path),
	        value: normalized[path]
	      },
	      ...memo
	    }), {});
	  }
	  /**
	   * Returns filter for a given property key
	   *
	   * @param {String} key      property key
	   * @returns {Filter.Property | undefined}
	   */


	  get(key) {
	    return this.filters[key];
	  }
	  /**
	   * Populates all filtered properties which referes to other resources
	   */


	  async populate() {
	    const keys = Object.keys(this.filters);

	    for (let index = 0; index < keys.length; index += 1) {
	      const key = keys[index];
	      const referenceResource = this.resource.decorate().getPropertyByKey(key).reference();

	      if (referenceResource) {
	        this.filters[key].populated = await referenceResource.findOne(this.filters[key].value);
	      }
	    }

	    return this;
	  }

	  reduce(callback, initial) {
	    return Object.values(this.filters).reduce(callback, initial || {});
	  }

	  isVisible() {
	    return !!Object.keys(this.filters).length;
	  }

	}

	var BackendFilter = /*#__PURE__*/Object.freeze({
		PARAM_SEPARATOR: PARAM_SEPARATOR,
		'default': Filter$2
	});

	const {
	  PARAM_SEPARATOR: PARAM_SEPARATOR$1
	} = BackendFilter;
	class Filter$3 extends React__default.Component {
	  constructor(props) {
	    super(props);
	    this.pickerRef = {
	      from: React__default.createRef(),
	      to: React__default.createRef()
	    };
	  }

	  componentDidMount() {
	    this.setupDatePicker('from');
	    this.setupDatePicker('to');
	  }

	  shouldComponentUpdate(nextProps) {
	    const {
	      property
	    } = this.props;
	    const fromKey = `${property.name}${PARAM_SEPARATOR$1}from`;
	    const toKey = `${property.name}${PARAM_SEPARATOR$1}to`;
	    const nextFilter = nextProps.filter || {};

	    if (nextFilter[fromKey]) {
	      this.pickerRef.from.current._flatpickr.jumpToDate(nextFilter[fromKey]);
	    } else {
	      this.pickerRef.from.current._flatpickr.input.value = '';
	    }

	    if (nextFilter[toKey]) {
	      this.pickerRef.to.current._flatpickr.jumpToDate(nextFilter[toKey]);
	    } else {
	      this.pickerRef.to.current._flatpickr.input.value = '';
	    }

	    return false;
	  }

	  setupDatePicker(key) {
	    const {
	      property,
	      filter
	    } = this.props;
	    const fieldKey = `${property.name}.${key}`;
	    const defaultDate = filter[fieldKey] && new Date(filter[fieldKey]) || '';
	    let options = {
	      format: 'Y-m-d'
	    };

	    if (property.type === 'datetime') {
	      options = {
	        format: 'Y-m-d H:i',
	        enableTime: true,
	        // eslint-disable-next-line @typescript-eslint/camelcase
	        time_24hr: true
	      };
	    }

	    const inst = flatpickr(this.pickerRef[key].current, {
	      format: 'Y-m-d H:i',
	      defaultDate,
	      ...options
	    });
	    inst.config.onChange.push((dates, text) => {
	      this.handleChange(key, new Date(text));
	    });
	  }

	  handleChange(key, value) {
	    const {
	      onChange,
	      property
	    } = this.props;
	    const date = value !== '' ? new Date(value).toISOString() : '';
	    onChange(`${property.name}${PARAM_SEPARATOR$1}${key}`, date);
	  }

	  renderFilter(where) {
	    const key = where.toLowerCase();
	    const {
	      property
	    } = this.props;
	    const filterKey = `filter-${property.name}`;
	    return React__default.createElement("div", null, React__default.createElement(Label, null, "-", where, ":"), React__default.createElement("div", {
	      className: "control has-icons-right"
	    }, React__default.createElement("input", {
	      type: "text",
	      ref: this.pickerRef[key],
	      className: "input filter",
	      name: `${filterKey}${PARAM_SEPARATOR$1}${key}`
	    }), React__default.createElement("span", {
	      className: "icon is-small is-right"
	    }, React__default.createElement("i", {
	      className: "icomoon-calendar"
	    }))));
	  }

	  render() {
	    const {
	      property
	    } = this.props;
	    return React__default.createElement(PropertyInFilter, {
	      property: property
	    }, React__default.createElement("div", {
	      className: "date-range"
	    }, this.renderFilter('From'), this.renderFilter('To')));
	  }

	}
	Filter$3.propTypes = {
	  property: propertyType.isRequired,
	  onChange: PropTypes$1.func.isRequired,
	  filter: PropTypes$1.shape({
	    from: PropTypes$1.instanceOf(Date),
	    to: PropTypes$1.instanceOf(Date)
	  }).isRequired
	};

	var datetime = {
	  edit: Edit$4,
	  show: Show$4,
	  list: List$4,
	  filter: Filter$3
	};

	/* eslint-disable jsx-a11y/label-has-for */
	const toolbarOptions = [[{
	  header: [1, 2, 3, 4, 5, 6, false]
	}], ['bold', 'italic', 'underline', 'strike'], // toggled buttons
	['blockquote', 'code-block'], [{
	  list: 'ordered'
	}, {
	  list: 'bullet'
	}], [{
	  script: 'sub'
	}, {
	  script: 'super'
	}], // superscript/subscript
	[{
	  indent: '-1'
	}, {
	  indent: '+1'
	}], // outdent/indent
	[{
	  direction: 'rtl'
	}], // text direction
	[{
	  size: ['small', false, 'large', 'huge']
	}], // custom dropdown
	[{
	  color: []
	}, {
	  background: []
	}], // dropdown with defaults from theme
	[{
	  font: []
	}], [{
	  align: []
	}], ['clean'] // remove formatting button
	];
	class Edit$5 extends React__default.Component {
	  constructor(props) {
	    super(props);
	    this.wysiwigRef = React__default.createRef();
	  }

	  componentDidMount() {
	    this.setupWysiwig();
	  }

	  shouldComponentUpdate() {
	    return false;
	  }

	  componentDidUpdate() {
	    this.setupWysiwig();
	  }

	  setupWysiwig() {
	    const {
	      property,
	      record
	    } = this.props;
	    const value = record.params && record.params[property.name] || '';
	    this.wysiwigRef.current.innerHTML = value;
	    const quill = new Quill(this.wysiwigRef.current, {
	      modules: {
	        toolbar: toolbarOptions
	      },
	      theme: 'snow'
	    });
	    quill.on('text-change', () => {
	      this.handleChange(this.wysiwigRef.current.children[0].innerHTML);
	    });
	  }

	  handleChange(value) {
	    const {
	      onChange,
	      property
	    } = this.props;
	    onChange(property.name, value);
	  }

	  render() {
	    const {
	      property,
	      record
	    } = this.props;
	    const error = record.errors && record.errors[property.name];
	    return React__default.createElement("div", {
	      className: "field"
	    }, React__default.createElement("label", {
	      htmlFor: property.name,
	      className: "label"
	    }, property.label), React__default.createElement("div", {
	      className: "control has-icons-right"
	    }, React__default.createElement("div", {
	      className: "quill-editor",
	      ref: this.wysiwigRef,
	      style: {
	        height: '400px'
	      }
	    })), error && React__default.createElement("div", {
	      className: "help is-danger"
	    }, error.message));
	  }

	}
	Edit$5.propTypes = {
	  property: simplifiedPropertyType.isRequired,
	  record: recordType.isRequired,
	  onChange: PropTypes$1.func.isRequired
	};

	class Show$5 extends React__default.PureComponent {
	  constructor(props) {
	    super(props);
	    this.contentRef = React__default.createRef();
	  }

	  componentDidMount() {
	    const {
	      property,
	      record
	    } = this.props;
	    const value = record.params[property.name];
	    this.contentRef.current.innerHTML = value;
	  }

	  render() {
	    const {
	      property
	    } = this.props;
	    return React__default.createElement(PropertyInShow, {
	      property: property
	    }, React__default.createElement("div", {
	      className: "rich-text-value content",
	      ref: this.contentRef
	    }));
	  }

	}
	Show$5.propTypes = {
	  property: propertyType.isRequired,
	  record: recordType.isRequired
	};

	class List$5 extends React__default.PureComponent {
	  render() {
	    const {
	      property,
	      record,
	      resource
	    } = this.props;
	    const showAction = record.recordActions.find(a => a.name === 'show');
	    const original = record.params[property.name] || '';
	    const value = original.substring(0, 15) + (original.length > 15 ? '...' : '');

	    if (resource.titleProperty.name === property.name && showAction) {
	      const h = new ViewHelpers();
	      const href = h.recordActionUrl({
	        resourceId: resource.id,
	        recordId: record.id,
	        actionName: 'show'
	      });
	      return React__default.createElement(reactRouterDom.Link, {
	        to: href
	      }, value);
	    }

	    return React__default.createElement("span", null, value);
	  }

	}

	var richtext = {
	  edit: Edit$5,
	  show: Show$5,
	  list: List$5 // filter: Filter,

	};

	var utils = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.classNames = classNames;
	exports.handleInputChange = handleInputChange;
	exports.isDocumentElement = isDocumentElement;
	exports.normalizedHeight = normalizedHeight;
	exports.getScrollTop = getScrollTop;
	exports.scrollTo = scrollTo;
	exports.getScrollParent = getScrollParent;
	exports.animatedScrollTo = animatedScrollTo;
	exports.scrollIntoView = scrollIntoView;
	exports.getBoundingClientObj = getBoundingClientObj;
	exports.toKey = toKey;
	exports.isTouchCapable = isTouchCapable;
	exports.isMobileDevice = isMobileDevice;
	exports.cleanValue = exports.emptyString = exports.noop = void 0;

	var _raf = _interopRequireDefault(raf_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	// ==============================
	// NO OP
	// ==============================
	var noop = function noop() {};

	exports.noop = noop;

	var emptyString = function emptyString() {
	  return '';
	}; // ==============================
	// Class Name Prefixer
	// ==============================

	/**
	 String representation of component state for styling with class names.

	 Expects an array of strings OR a string/object pair:
	 - className(['comp', 'comp-arg', 'comp-arg-2'])
	   @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
	 - className('comp', { some: true, state: false })
	   @returns 'react-select__comp react-select__comp--some'
	*/


	exports.emptyString = emptyString;

	function applyPrefixToName(prefix, name) {
	  if (!name) {
	    return prefix;
	  } else if (name[0] === '-') {
	    return prefix + name;
	  } else {
	    return prefix + '__' + name;
	  }
	}

	function classNames(prefix, cssKey, state, className) {
	  var arr = [cssKey, className];

	  if (state && prefix) {
	    for (var key in state) {
	      if (state.hasOwnProperty(key) && state[key]) {
	        arr.push("".concat(applyPrefixToName(prefix, key)));
	      }
	    }
	  }

	  return arr.filter(function (i) {
	    return i;
	  }).map(function (i) {
	    return String(i).trim();
	  }).join(' ');
	} // ==============================
	// Clean Value
	// ==============================


	var cleanValue = function cleanValue(value) {
	  if (Array.isArray(value)) return value.filter(Boolean);
	  if (_typeof(value) === 'object' && value !== null) return [value];
	  return [];
	}; // ==============================
	// Handle Input Change
	// ==============================


	exports.cleanValue = cleanValue;

	function handleInputChange(inputValue, actionMeta, onInputChange) {
	  if (onInputChange) {
	    var newValue = onInputChange(inputValue, actionMeta);
	    if (typeof newValue === 'string') return newValue;
	  }

	  return inputValue;
	} // ==============================
	// Scroll Helpers
	// ==============================


	function isDocumentElement(el) {
	  return [document.documentElement, document.body, window].indexOf(el) > -1;
	} // Normalized Scroll Top
	// ------------------------------


	function normalizedHeight(el) {
	  if (isDocumentElement(el)) {
	    return window.innerHeight;
	  }

	  return el.clientHeight;
	} // Normalized scrollTo & scrollTop
	// ------------------------------


	function getScrollTop(el) {
	  if (isDocumentElement(el)) {
	    return window.pageYOffset;
	  }

	  return el.scrollTop;
	}

	function scrollTo(el, top) {
	  // with a scroll distance, we perform scroll on the element
	  if (isDocumentElement(el)) {
	    window.scrollTo(0, top);
	    return;
	  }

	  el.scrollTop = top;
	} // Get Scroll Parent
	// ------------------------------


	function getScrollParent(element) {
	  var style = getComputedStyle(element);
	  var excludeStaticParent = style.position === 'absolute';
	  var overflowRx = /(auto|scroll)/;
	  var docEl = document.documentElement; // suck it, flow...

	  if (style.position === 'fixed') return docEl;

	  for (var parent = element; parent = parent.parentElement;) {
	    style = getComputedStyle(parent);

	    if (excludeStaticParent && style.position === 'static') {
	      continue;
	    }

	    if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) {
	      return parent;
	    }
	  }

	  return docEl;
	} // Animated Scroll To
	// ------------------------------

	/**
	  @param t: time (elapsed)
	  @param b: initial value
	  @param c: amount of change
	  @param d: duration
	*/


	function easeOutCubic(t, b, c, d) {
	  return c * ((t = t / d - 1) * t * t + 1) + b;
	}

	function animatedScrollTo(element, to) {
	  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
	  var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
	  var start = getScrollTop(element);
	  var change = to - start;
	  var increment = 10;
	  var currentTime = 0;

	  function animateScroll() {
	    currentTime += increment;
	    var val = easeOutCubic(currentTime, start, change, duration);
	    scrollTo(element, val);

	    if (currentTime < duration) {
	      (0, _raf.default)(animateScroll);
	    } else {
	      callback(element);
	    }
	  }

	  animateScroll();
	} // Scroll Into View
	// ------------------------------


	function scrollIntoView(menuEl, focusedEl) {
	  var menuRect = menuEl.getBoundingClientRect();
	  var focusedRect = focusedEl.getBoundingClientRect();
	  var overScroll = focusedEl.offsetHeight / 3;

	  if (focusedRect.bottom + overScroll > menuRect.bottom) {
	    scrollTo(menuEl, Math.min(focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll, menuEl.scrollHeight));
	  } else if (focusedRect.top - overScroll < menuRect.top) {
	    scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
	  }
	} // ==============================
	// Get bounding client object
	// ==============================
	// cannot get keys using array notation with DOMRect


	function getBoundingClientObj(element) {
	  var rect = element.getBoundingClientRect();
	  return {
	    bottom: rect.bottom,
	    height: rect.height,
	    left: rect.left,
	    right: rect.right,
	    top: rect.top,
	    width: rect.width
	  };
	}

	// ==============================
	// String to Key (kebabify)
	// ==============================
	function toKey(str) {
	  return str.replace(/\W/g, '-');
	} // ==============================
	// Touch Capability Detector
	// ==============================


	function isTouchCapable() {
	  try {
	    document.createEvent('TouchEvent');
	    return true;
	  } catch (e) {
	    return false;
	  }
	} // ==============================
	// Mobile Device Detector
	// ==============================


	function isMobileDevice() {
	  try {
	    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	  } catch (e) {
	    return false;
	  }
	}
	});

	unwrapExports(utils);
	var utils_1 = utils.classNames;
	var utils_2 = utils.handleInputChange;
	var utils_3 = utils.isDocumentElement;
	var utils_4 = utils.normalizedHeight;
	var utils_5 = utils.getScrollTop;
	var utils_6 = utils.scrollTo;
	var utils_7 = utils.getScrollParent;
	var utils_8 = utils.animatedScrollTo;
	var utils_9 = utils.scrollIntoView;
	var utils_10 = utils.getBoundingClientObj;
	var utils_11 = utils.toKey;
	var utils_12 = utils.isTouchCapable;
	var utils_13 = utils.isMobileDevice;
	var utils_14 = utils.cleanValue;
	var utils_15 = utils.emptyString;
	var utils_16 = utils.noop;

	var Menu_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getMenuPlacement = getMenuPlacement;
	exports.MenuPortal = exports.menuPortalCSS = exports.LoadingMessage = exports.NoOptionsMessage = exports.loadingMessageCSS = exports.noOptionsMessageCSS = exports.MenuList = exports.menuListCSS = exports.default = exports.MenuPlacer = exports.menuCSS = void 0;

	var _react = _interopRequireWildcard(React__default);





	var _propTypes = _interopRequireDefault(PropTypes$1);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function getMenuPlacement(_ref) {
	  var maxHeight = _ref.maxHeight,
	      menuEl = _ref.menuEl,
	      minHeight = _ref.minHeight,
	      placement = _ref.placement,
	      shouldScroll = _ref.shouldScroll,
	      isFixedPosition = _ref.isFixedPosition,
	      theme = _ref.theme;
	  var spacing = theme.spacing;
	  var scrollParent = (0, utils.getScrollParent)(menuEl);
	  var defaultState = {
	    placement: 'bottom',
	    maxHeight: maxHeight
	  }; // something went wrong, return default state

	  if (!menuEl || !menuEl.offsetParent) return defaultState; // we can't trust `scrollParent.scrollHeight` --> it may increase when
	  // the menu is rendered

	  var _scrollParent$getBoun = scrollParent.getBoundingClientRect(),
	      scrollHeight = _scrollParent$getBoun.height;

	  var _menuEl$getBoundingCl = menuEl.getBoundingClientRect(),
	      menuBottom = _menuEl$getBoundingCl.bottom,
	      menuHeight = _menuEl$getBoundingCl.height,
	      menuTop = _menuEl$getBoundingCl.top;

	  var _menuEl$offsetParent$ = menuEl.offsetParent.getBoundingClientRect(),
	      containerTop = _menuEl$offsetParent$.top;

	  var viewHeight = window.innerHeight;
	  var scrollTop = (0, utils.getScrollTop)(scrollParent);
	  var marginBottom = parseInt(getComputedStyle(menuEl).marginBottom, 10);
	  var marginTop = parseInt(getComputedStyle(menuEl).marginTop, 10);
	  var viewSpaceAbove = containerTop - marginTop;
	  var viewSpaceBelow = viewHeight - menuTop;
	  var scrollSpaceAbove = viewSpaceAbove + scrollTop;
	  var scrollSpaceBelow = scrollHeight - scrollTop - menuTop;
	  var scrollDown = menuBottom - viewHeight + scrollTop + marginBottom;
	  var scrollUp = scrollTop + menuTop - marginTop;
	  var scrollDuration = 160;

	  switch (placement) {
	    case 'auto':
	    case 'bottom':
	      // 1: the menu will fit, do nothing
	      if (viewSpaceBelow >= menuHeight) {
	        return {
	          placement: 'bottom',
	          maxHeight: maxHeight
	        };
	      } // 2: the menu will fit, if scrolled


	      if (scrollSpaceBelow >= menuHeight && !isFixedPosition) {
	        if (shouldScroll) {
	          (0, utils.animatedScrollTo)(scrollParent, scrollDown, scrollDuration);
	        }

	        return {
	          placement: 'bottom',
	          maxHeight: maxHeight
	        };
	      } // 3: the menu will fit, if constrained


	      if (!isFixedPosition && scrollSpaceBelow >= minHeight || isFixedPosition && viewSpaceBelow >= minHeight) {
	        if (shouldScroll) {
	          (0, utils.animatedScrollTo)(scrollParent, scrollDown, scrollDuration);
	        } // we want to provide as much of the menu as possible to the user,
	        // so give them whatever is available below rather than the minHeight.


	        var constrainedHeight = isFixedPosition ? viewSpaceBelow - marginBottom : scrollSpaceBelow - marginBottom;
	        return {
	          placement: 'bottom',
	          maxHeight: constrainedHeight
	        };
	      } // 4. Forked beviour when there isn't enough space below
	      // AUTO: flip the menu, render above


	      if (placement === 'auto' || isFixedPosition) {
	        // may need to be constrained after flipping
	        var _constrainedHeight = maxHeight;
	        var spaceAbove = isFixedPosition ? viewSpaceAbove : scrollSpaceAbove;

	        if (spaceAbove >= minHeight) {
	          _constrainedHeight = Math.min(spaceAbove - marginBottom - spacing.controlHeight, maxHeight);
	        }

	        return {
	          placement: 'top',
	          maxHeight: _constrainedHeight
	        };
	      } // BOTTOM: allow browser to increase scrollable area and immediately set scroll


	      if (placement === 'bottom') {
	        (0, utils.scrollTo)(scrollParent, scrollDown);
	        return {
	          placement: 'bottom',
	          maxHeight: maxHeight
	        };
	      }

	      break;

	    case 'top':
	      // 1: the menu will fit, do nothing
	      if (viewSpaceAbove >= menuHeight) {
	        return {
	          placement: 'top',
	          maxHeight: maxHeight
	        };
	      } // 2: the menu will fit, if scrolled


	      if (scrollSpaceAbove >= menuHeight && !isFixedPosition) {
	        if (shouldScroll) {
	          (0, utils.animatedScrollTo)(scrollParent, scrollUp, scrollDuration);
	        }

	        return {
	          placement: 'top',
	          maxHeight: maxHeight
	        };
	      } // 3: the menu will fit, if constrained


	      if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
	        var _constrainedHeight2 = maxHeight; // we want to provide as much of the menu as possible to the user,
	        // so give them whatever is available below rather than the minHeight.

	        if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
	          _constrainedHeight2 = isFixedPosition ? viewSpaceAbove - marginTop : scrollSpaceAbove - marginTop;
	        }

	        if (shouldScroll) {
	          (0, utils.animatedScrollTo)(scrollParent, scrollUp, scrollDuration);
	        }

	        return {
	          placement: 'top',
	          maxHeight: _constrainedHeight2
	        };
	      } // 4. not enough space, the browser WILL NOT increase scrollable area when
	      // absolutely positioned element rendered above the viewport (only below).
	      // Flip the menu, render below


	      return {
	        placement: 'bottom',
	        maxHeight: maxHeight
	      };

	    default:
	      throw new Error("Invalid placement provided \"".concat(placement, "\"."));
	  } // fulfil contract with flow: implicit return value of undefined


	  return defaultState;
	} // Menu Component
	// ------------------------------


	function alignToControl(placement) {
	  var placementToCSSProp = {
	    bottom: 'top',
	    top: 'bottom'
	  };
	  return placement ? placementToCSSProp[placement] : 'bottom';
	}

	var coercePlacement = function coercePlacement(p) {
	  return p === 'auto' ? 'bottom' : p;
	};

	var menuCSS = function menuCSS(_ref2) {
	  var _ref3;

	  var placement = _ref2.placement,
	      _ref2$theme = _ref2.theme,
	      borderRadius = _ref2$theme.borderRadius,
	      spacing = _ref2$theme.spacing,
	      colors = _ref2$theme.colors;
	  return _ref3 = {
	    label: 'menu'
	  }, _defineProperty(_ref3, alignToControl(placement), '100%'), _defineProperty(_ref3, "backgroundColor", colors.neutral0), _defineProperty(_ref3, "borderRadius", borderRadius), _defineProperty(_ref3, "boxShadow", '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)'), _defineProperty(_ref3, "marginBottom", spacing.menuGutter), _defineProperty(_ref3, "marginTop", spacing.menuGutter), _defineProperty(_ref3, "position", 'absolute'), _defineProperty(_ref3, "width", '100%'), _defineProperty(_ref3, "zIndex", 1), _ref3;
	}; // NOTE: internal only


	exports.menuCSS = menuCSS;

	var MenuPlacer =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(MenuPlacer, _Component);

	  function MenuPlacer() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, MenuPlacer);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MenuPlacer)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
	      maxHeight: _this.props.maxMenuHeight,
	      placement: null
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPlacement", function (ref) {
	      var _this$props = _this.props,
	          minMenuHeight = _this$props.minMenuHeight,
	          maxMenuHeight = _this$props.maxMenuHeight,
	          menuPlacement = _this$props.menuPlacement,
	          menuPosition = _this$props.menuPosition,
	          menuShouldScrollIntoView = _this$props.menuShouldScrollIntoView,
	          theme = _this$props.theme;
	      var getPortalPlacement = _this.context.getPortalPlacement;
	      if (!ref) return; // DO NOT scroll if position is fixed

	      var isFixedPosition = menuPosition === 'fixed';
	      var shouldScroll = menuShouldScrollIntoView && !isFixedPosition;
	      var state = getMenuPlacement({
	        maxHeight: maxMenuHeight,
	        menuEl: ref,
	        minHeight: minMenuHeight,
	        placement: menuPlacement,
	        shouldScroll: shouldScroll,
	        isFixedPosition: isFixedPosition,
	        theme: theme
	      });
	      if (getPortalPlacement) getPortalPlacement(state);

	      _this.setState(state);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getUpdatedProps", function () {
	      var menuPlacement = _this.props.menuPlacement;
	      var placement = _this.state.placement || coercePlacement(menuPlacement);
	      return _objectSpread({}, _this.props, {
	        placement: placement,
	        maxHeight: _this.state.maxHeight
	      });
	    });

	    return _this;
	  }

	  _createClass(MenuPlacer, [{
	    key: "render",
	    value: function render() {
	      var children = this.props.children;
	      return children({
	        ref: this.getPlacement,
	        placerProps: this.getUpdatedProps()
	      });
	    }
	  }]);

	  return MenuPlacer;
	}(_react.Component);

	exports.MenuPlacer = MenuPlacer;

	_defineProperty(MenuPlacer, "contextTypes", {
	  getPortalPlacement: _propTypes.default.func
	});

	var Menu = function Menu(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerRef = props.innerRef,
	      innerProps = props.innerProps;
	  var cn = cx(
	  /*#__PURE__*/
	  (0, index_esm.css)(getStyles('menu', props)), {
	    menu: true
	  }, className);
	  return _react.default.createElement("div", _extends({
	    className: cn
	  }, innerProps, {
	    ref: innerRef
	  }), children);
	};

	var _default = Menu; // ==============================
	// Menu List
	// ==============================

	exports.default = _default;

	var menuListCSS = function menuListCSS(_ref4) {
	  var maxHeight = _ref4.maxHeight,
	      baseUnit = _ref4.theme.spacing.baseUnit;
	  return {
	    maxHeight: maxHeight,
	    overflowY: 'auto',
	    paddingBottom: baseUnit,
	    paddingTop: baseUnit,
	    position: 'relative',
	    // required for offset[Height, Top] > keyboard scroll
	    WebkitOverflowScrolling: 'touch'
	  };
	};

	exports.menuListCSS = menuListCSS;

	var MenuList = function MenuList(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      isMulti = props.isMulti,
	      innerRef = props.innerRef;
	  return _react.default.createElement("div", {
	    className: cx(
	    /*#__PURE__*/
	    (0, index_esm.css)(getStyles('menuList', props)), {
	      'menu-list': true,
	      'menu-list--is-multi': isMulti
	    }, className),
	    ref: innerRef
	  }, children);
	}; // ==============================
	// Menu Notices
	// ==============================


	exports.MenuList = MenuList;

	var noticeCSS = function noticeCSS(_ref5) {
	  var _ref5$theme = _ref5.theme,
	      baseUnit = _ref5$theme.spacing.baseUnit,
	      colors = _ref5$theme.colors;
	  return {
	    color: colors.neutral40,
	    padding: "".concat(baseUnit * 2, "px ").concat(baseUnit * 3, "px"),
	    textAlign: 'center'
	  };
	};

	var noOptionsMessageCSS = noticeCSS;
	exports.noOptionsMessageCSS = noOptionsMessageCSS;
	var loadingMessageCSS = noticeCSS;
	exports.loadingMessageCSS = loadingMessageCSS;

	var NoOptionsMessage = function NoOptionsMessage(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;
	  return _react.default.createElement("div", _extends({
	    className: cx(
	    /*#__PURE__*/
	    (0, index_esm.css)(getStyles('noOptionsMessage', props)), {
	      'menu-notice': true,
	      'menu-notice--no-options': true
	    }, className)
	  }, innerProps), children);
	};

	exports.NoOptionsMessage = NoOptionsMessage;
	NoOptionsMessage.defaultProps = {
	  children: 'No options'
	};

	var LoadingMessage = function LoadingMessage(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;
	  return _react.default.createElement("div", _extends({
	    className: cx(
	    /*#__PURE__*/
	    (0, index_esm.css)(getStyles('loadingMessage', props)), {
	      'menu-notice': true,
	      'menu-notice--loading': true
	    }, className)
	  }, innerProps), children);
	};

	exports.LoadingMessage = LoadingMessage;
	LoadingMessage.defaultProps = {
	  children: 'Loading...'
	}; // ==============================
	// Menu Portal
	// ==============================

	var menuPortalCSS = function menuPortalCSS(_ref6) {
	  var rect = _ref6.rect,
	      offset = _ref6.offset,
	      position = _ref6.position;
	  return {
	    left: rect.left,
	    position: position,
	    top: offset,
	    width: rect.width,
	    zIndex: 1
	  };
	};

	exports.menuPortalCSS = menuPortalCSS;

	var MenuPortal =
	/*#__PURE__*/
	function (_Component2) {
	  _inherits(MenuPortal, _Component2);

	  function MenuPortal() {
	    var _getPrototypeOf3;

	    var _this2;

	    _classCallCheck(this, MenuPortal);

	    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(MenuPortal)).call.apply(_getPrototypeOf3, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "state", {
	      placement: null
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "getPortalPlacement", function (_ref7) {
	      var placement = _ref7.placement;
	      var initialPlacement = coercePlacement(_this2.props.menuPlacement); // avoid re-renders if the placement has not changed

	      if (placement !== initialPlacement) {
	        _this2.setState({
	          placement: placement
	        });
	      }
	    });

	    return _this2;
	  }

	  _createClass(MenuPortal, [{
	    key: "getChildContext",
	    value: function getChildContext() {
	      return {
	        getPortalPlacement: this.getPortalPlacement
	      };
	    } // callback for occassions where the menu must "flip"

	  }, {
	    key: "render",
	    value: function render() {
	      var _this$props2 = this.props,
	          appendTo = _this$props2.appendTo,
	          children = _this$props2.children,
	          controlElement = _this$props2.controlElement,
	          menuPlacement = _this$props2.menuPlacement,
	          position = _this$props2.menuPosition,
	          getStyles = _this$props2.getStyles;
	      var isFixed = position === 'fixed'; // bail early if required elements aren't present

	      if (!appendTo && !isFixed || !controlElement) {
	        return null;
	      }

	      var placement = this.state.placement || coercePlacement(menuPlacement);
	      var rect = (0, utils.getBoundingClientObj)(controlElement);
	      var scrollDistance = isFixed ? 0 : window.pageYOffset;
	      var offset = rect[placement] + scrollDistance;
	      var state = {
	        offset: offset,
	        position: position,
	        rect: rect
	      }; // same wrapper element whether fixed or portalled

	      var menuWrapper = _react.default.createElement("div", {
	        className:
	        /*#__PURE__*/

	        /*#__PURE__*/
	        (0, index_esm.css)(getStyles('menuPortal', state))
	      }, children);

	      return appendTo ? (0, reactDom__default.createPortal)(menuWrapper, appendTo) : menuWrapper;
	    }
	  }]);

	  return MenuPortal;
	}(_react.Component);

	exports.MenuPortal = MenuPortal;

	_defineProperty(MenuPortal, "childContextTypes", {
	  getPortalPlacement: _propTypes.default.func
	});
	});

	unwrapExports(Menu_1);
	var Menu_2 = Menu_1.getMenuPlacement;
	var Menu_3 = Menu_1.MenuPortal;
	var Menu_4 = Menu_1.menuPortalCSS;
	var Menu_5 = Menu_1.LoadingMessage;
	var Menu_6 = Menu_1.NoOptionsMessage;
	var Menu_7 = Menu_1.loadingMessageCSS;
	var Menu_8 = Menu_1.noOptionsMessageCSS;
	var Menu_9 = Menu_1.MenuList;
	var Menu_10 = Menu_1.menuListCSS;
	var Menu_11 = Menu_1.MenuPlacer;
	var Menu_12 = Menu_1.menuCSS;

	var reactFastCompare = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exportedEqual;

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	var isArray = Array.isArray;
	var keyList = Object.keys;
	var hasProp = Object.prototype.hasOwnProperty;

	function equal(a, b) {
	  // fast-deep-equal index.js 2.0.1
	  if (a === b) return true;

	  if (a && b && _typeof(a) == 'object' && _typeof(b) == 'object') {
	    var arrA = isArray(a),
	        arrB = isArray(b),
	        i,
	        length,
	        key;

	    if (arrA && arrB) {
	      length = a.length;
	      if (length != b.length) return false;

	      for (i = length; i-- !== 0;) {
	        if (!equal(a[i], b[i])) return false;
	      }

	      return true;
	    }

	    if (arrA != arrB) return false;
	    var dateA = a instanceof Date,
	        dateB = b instanceof Date;
	    if (dateA != dateB) return false;
	    if (dateA && dateB) return a.getTime() == b.getTime();
	    var regexpA = a instanceof RegExp,
	        regexpB = b instanceof RegExp;
	    if (regexpA != regexpB) return false;
	    if (regexpA && regexpB) return a.toString() == b.toString();
	    var keys = keyList(a);
	    length = keys.length;

	    if (length !== keyList(b).length) {
	      return false;
	    }

	    for (i = length; i-- !== 0;) {
	      if (!hasProp.call(b, keys[i])) return false;
	    } // end fast-deep-equal
	    // Custom handling for React


	    for (i = length; i-- !== 0;) {
	      key = keys[i];

	      if (key === '_owner' && a.$$typeof) {
	        // React-specific: avoid traversing React elements' _owner.
	        //  _owner contains circular references
	        // and is not needed when comparing the actual elements (and not their owners)
	        // .$$typeof and ._store on just reasonable markers of a react element
	        continue;
	      } else {
	        // all other properties should be traversed as usual
	        if (!equal(a[key], b[key])) return false;
	      }
	    } // fast-deep-equal index.js 2.0.1


	    return true;
	  }

	  return a !== a && b !== b;
	} // end fast-deep-equal


	function exportedEqual(a, b) {
	  try {
	    return equal(a, b);
	  } catch (error) {
	    if (error.message && error.message.match(/stack|recursion/i)) {
	      // warn on circular references, don't crash
	      // browsers give this different errors name and messages:
	      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
	      // firefox: "InternalError", too much recursion"
	      // edge: "Error", "Out of stack space"
	      console.warn('Warning: react-fast-compare does not handle circular references.', error.name, error.message);
	      return false;
	    } // some other error. we should definitely know about these


	    throw error;
	  }
	}
	});

	unwrapExports(reactFastCompare);

	var diacritics_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.stripDiacritics = void 0;
	var diacritics = [{
	  base: 'A',
	  letters: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g
	}, {
	  base: 'AA',
	  letters: /[\uA732]/g
	}, {
	  base: 'AE',
	  letters: /[\u00C6\u01FC\u01E2]/g
	}, {
	  base: 'AO',
	  letters: /[\uA734]/g
	}, {
	  base: 'AU',
	  letters: /[\uA736]/g
	}, {
	  base: 'AV',
	  letters: /[\uA738\uA73A]/g
	}, {
	  base: 'AY',
	  letters: /[\uA73C]/g
	}, {
	  base: 'B',
	  letters: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g
	}, {
	  base: 'C',
	  letters: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g
	}, {
	  base: 'D',
	  letters: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g
	}, {
	  base: 'DZ',
	  letters: /[\u01F1\u01C4]/g
	}, {
	  base: 'Dz',
	  letters: /[\u01F2\u01C5]/g
	}, {
	  base: 'E',
	  letters: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g
	}, {
	  base: 'F',
	  letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g
	}, {
	  base: 'G',
	  letters: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g
	}, {
	  base: 'H',
	  letters: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g
	}, {
	  base: 'I',
	  letters: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g
	}, {
	  base: 'J',
	  letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g
	}, {
	  base: 'K',
	  letters: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g
	}, {
	  base: 'L',
	  letters: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g
	}, {
	  base: 'LJ',
	  letters: /[\u01C7]/g
	}, {
	  base: 'Lj',
	  letters: /[\u01C8]/g
	}, {
	  base: 'M',
	  letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g
	}, {
	  base: 'N',
	  letters: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g
	}, {
	  base: 'NJ',
	  letters: /[\u01CA]/g
	}, {
	  base: 'Nj',
	  letters: /[\u01CB]/g
	}, {
	  base: 'O',
	  letters: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g
	}, {
	  base: 'OI',
	  letters: /[\u01A2]/g
	}, {
	  base: 'OO',
	  letters: /[\uA74E]/g
	}, {
	  base: 'OU',
	  letters: /[\u0222]/g
	}, {
	  base: 'P',
	  letters: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g
	}, {
	  base: 'Q',
	  letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g
	}, {
	  base: 'R',
	  letters: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g
	}, {
	  base: 'S',
	  letters: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g
	}, {
	  base: 'T',
	  letters: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g
	}, {
	  base: 'TZ',
	  letters: /[\uA728]/g
	}, {
	  base: 'U',
	  letters: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g
	}, {
	  base: 'V',
	  letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g
	}, {
	  base: 'VY',
	  letters: /[\uA760]/g
	}, {
	  base: 'W',
	  letters: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g
	}, {
	  base: 'X',
	  letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g
	}, {
	  base: 'Y',
	  letters: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g
	}, {
	  base: 'Z',
	  letters: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g
	}, {
	  base: 'a',
	  letters: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g
	}, {
	  base: 'aa',
	  letters: /[\uA733]/g
	}, {
	  base: 'ae',
	  letters: /[\u00E6\u01FD\u01E3]/g
	}, {
	  base: 'ao',
	  letters: /[\uA735]/g
	}, {
	  base: 'au',
	  letters: /[\uA737]/g
	}, {
	  base: 'av',
	  letters: /[\uA739\uA73B]/g
	}, {
	  base: 'ay',
	  letters: /[\uA73D]/g
	}, {
	  base: 'b',
	  letters: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g
	}, {
	  base: 'c',
	  letters: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g
	}, {
	  base: 'd',
	  letters: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g
	}, {
	  base: 'dz',
	  letters: /[\u01F3\u01C6]/g
	}, {
	  base: 'e',
	  letters: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g
	}, {
	  base: 'f',
	  letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g
	}, {
	  base: 'g',
	  letters: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g
	}, {
	  base: 'h',
	  letters: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g
	}, {
	  base: 'hv',
	  letters: /[\u0195]/g
	}, {
	  base: 'i',
	  letters: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g
	}, {
	  base: 'j',
	  letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g
	}, {
	  base: 'k',
	  letters: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g
	}, {
	  base: 'l',
	  letters: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g
	}, {
	  base: 'lj',
	  letters: /[\u01C9]/g
	}, {
	  base: 'm',
	  letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g
	}, {
	  base: 'n',
	  letters: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g
	}, {
	  base: 'nj',
	  letters: /[\u01CC]/g
	}, {
	  base: 'o',
	  letters: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g
	}, {
	  base: 'oi',
	  letters: /[\u01A3]/g
	}, {
	  base: 'ou',
	  letters: /[\u0223]/g
	}, {
	  base: 'oo',
	  letters: /[\uA74F]/g
	}, {
	  base: 'p',
	  letters: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g
	}, {
	  base: 'q',
	  letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g
	}, {
	  base: 'r',
	  letters: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g
	}, {
	  base: 's',
	  letters: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g
	}, {
	  base: 't',
	  letters: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g
	}, {
	  base: 'tz',
	  letters: /[\uA729]/g
	}, {
	  base: 'u',
	  letters: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g
	}, {
	  base: 'v',
	  letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g
	}, {
	  base: 'vy',
	  letters: /[\uA761]/g
	}, {
	  base: 'w',
	  letters: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g
	}, {
	  base: 'x',
	  letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g
	}, {
	  base: 'y',
	  letters: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g
	}, {
	  base: 'z',
	  letters: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g
	}];

	var stripDiacritics = function stripDiacritics(str) {
	  for (var i = 0; i < diacritics.length; i++) {
	    str = str.replace(diacritics[i].letters, diacritics[i].base);
	  }

	  return str;
	};

	exports.stripDiacritics = stripDiacritics;
	});

	unwrapExports(diacritics_1);
	var diacritics_2 = diacritics_1.stripDiacritics;

	var filters = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createFilter = void 0;



	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var trimString = function trimString(str) {
	  return str.replace(/^\s+|\s+$/g, '');
	};

	var defaultStringify = function defaultStringify(option) {
	  return "".concat(option.label, " ").concat(option.value);
	};

	var createFilter = function createFilter(config) {
	  return function (option, rawInput) {
	    var _ignoreCase$ignoreAcc = _objectSpread({
	      ignoreCase: true,
	      ignoreAccents: true,
	      stringify: defaultStringify,
	      trim: true,
	      matchFrom: 'any'
	    }, config),
	        ignoreCase = _ignoreCase$ignoreAcc.ignoreCase,
	        ignoreAccents = _ignoreCase$ignoreAcc.ignoreAccents,
	        stringify = _ignoreCase$ignoreAcc.stringify,
	        trim = _ignoreCase$ignoreAcc.trim,
	        matchFrom = _ignoreCase$ignoreAcc.matchFrom;

	    var input = trim ? trimString(rawInput) : rawInput;
	    var candidate = trim ? trimString(stringify(option)) : stringify(option);

	    if (ignoreCase) {
	      input = input.toLowerCase();
	      candidate = candidate.toLowerCase();
	    }

	    if (ignoreAccents) {
	      input = (0, diacritics_1.stripDiacritics)(input);
	      candidate = (0, diacritics_1.stripDiacritics)(candidate);
	    }

	    return matchFrom === 'start' ? candidate.substr(0, input.length) === input : candidate.indexOf(input) > -1;
	  };
	};

	exports.createFilter = createFilter;
	});

	unwrapExports(filters);
	var filters_1 = filters.createFilter;

	var A11yText_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _react = _interopRequireDefault(React__default);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	// Assistive text to describe visual elements. Hidden for sighted users.
	var A11yText = function A11yText(props) {
	  return _react.default.createElement("span", _extends({
	    className:
	    /*#__PURE__*/

	    /*#__PURE__*/
	    (0, index_esm.css)({
	      label: 'a11yText',
	      zIndex: 9999,
	      border: 0,
	      clip: 'rect(1px, 1px, 1px, 1px)',
	      height: 1,
	      width: 1,
	      position: 'absolute',
	      overflow: 'hidden',
	      padding: 0,
	      whiteSpace: 'nowrap',
	      backgroundColor: 'red',
	      color: 'blue'
	    })
	  }, props));
	};

	var _default = A11yText;
	exports.default = _default;
	});

	unwrapExports(A11yText_1);

	var DummyInput_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _react = _interopRequireWildcard(React__default);



	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

	function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	var DummyInput =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(DummyInput, _Component);

	  function DummyInput() {
	    _classCallCheck(this, DummyInput);

	    return _possibleConstructorReturn(this, _getPrototypeOf(DummyInput).apply(this, arguments));
	  }

	  _createClass(DummyInput, [{
	    key: "render",
	    value: function render() {
	      var _this$props = this.props,
	          inProp = _this$props.in,
	          out = _this$props.out,
	          onExited = _this$props.onExited,
	          appear = _this$props.appear,
	          enter = _this$props.enter,
	          exit = _this$props.exit,
	          innerRef = _this$props.innerRef,
	          emotion = _this$props.emotion,
	          props = _objectWithoutProperties(_this$props, ["in", "out", "onExited", "appear", "enter", "exit", "innerRef", "emotion"]);

	      return _react.default.createElement("input", _extends({
	        ref: innerRef
	      }, props, {
	        className:
	        /*#__PURE__*/

	        /*#__PURE__*/
	        (0, index_esm.css)({
	          label: 'dummyInput',
	          // get rid of any default styles
	          background: 0,
	          border: 0,
	          fontSize: 'inherit',
	          outline: 0,
	          padding: 0,
	          // important! without `width` browsers won't allow focus
	          width: 1,
	          // remove cursor on desktop
	          color: 'transparent',
	          // remove cursor on mobile whilst maintaining "scroll into view" behaviour
	          left: -100,
	          opacity: 0,
	          position: 'relative',
	          transform: 'scale(0)'
	        })
	      }));
	    }
	  }]);

	  return DummyInput;
	}(_react.Component);

	exports.default = DummyInput;
	});

	unwrapExports(DummyInput_1);

	var NodeResolver_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;





	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	var NodeResolver =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(NodeResolver, _Component);

	  function NodeResolver() {
	    _classCallCheck(this, NodeResolver);

	    return _possibleConstructorReturn(this, _getPrototypeOf(NodeResolver).apply(this, arguments));
	  }

	  _createClass(NodeResolver, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.props.innerRef((0, reactDom__default.findDOMNode)(this));
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this.props.innerRef(null);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return this.props.children;
	    }
	  }]);

	  return NodeResolver;
	}(React__default.Component);

	exports.default = NodeResolver;
	});

	unwrapExports(NodeResolver_1);

	var constants = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LOCK_STYLES = exports.STYLE_KEYS = void 0;
	var STYLE_KEYS = ['boxSizing', 'height', 'overflow', 'paddingRight', 'position'];
	exports.STYLE_KEYS = STYLE_KEYS;
	var LOCK_STYLES = {
	  boxSizing: 'border-box',
	  // account for possible declaration `width: 100%;` on body
	  overflow: 'hidden',
	  position: 'relative',
	  height: '100%'
	};
	exports.LOCK_STYLES = LOCK_STYLES;
	});

	unwrapExports(constants);
	var constants_1 = constants.LOCK_STYLES;
	var constants_2 = constants.STYLE_KEYS;

	var utils$1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.preventTouchMove = preventTouchMove;
	exports.allowTouchMove = allowTouchMove;
	exports.preventInertiaScroll = preventInertiaScroll;
	exports.isTouchDevice = isTouchDevice;

	function preventTouchMove(e) {
	  e.preventDefault();
	}

	function allowTouchMove(e) {
	  e.stopPropagation();
	}

	function preventInertiaScroll() {
	  var top = this.scrollTop;
	  var totalScroll = this.scrollHeight;
	  var currentScroll = top + this.offsetHeight;

	  if (top === 0) {
	    this.scrollTop = 1;
	  } else if (currentScroll === totalScroll) {
	    this.scrollTop = top - 1;
	  }
	} // `ontouchstart` check works on most browsers
	// `maxTouchPoints` works on IE10/11 and Surface


	function isTouchDevice() {
	  return 'ontouchstart' in window || navigator.maxTouchPoints;
	}
	});

	unwrapExports(utils$1);
	var utils_1$1 = utils$1.preventTouchMove;
	var utils_2$1 = utils$1.allowTouchMove;
	var utils_3$1 = utils$1.preventInertiaScroll;
	var utils_4$1 = utils$1.isTouchDevice;

	var ScrollLock_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;







	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	var activeScrollLocks = 0;

	var ScrollLock =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(ScrollLock, _Component);

	  function ScrollLock() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, ScrollLock);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ScrollLock)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "originalStyles", {});

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "listenerOptions", {
	      capture: false,
	      passive: false
	    });

	    return _this;
	  }

	  _createClass(ScrollLock, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      var _this2 = this;

	      if (!canUseDOM) return;
	      var _this$props = this.props,
	          accountForScrollbars = _this$props.accountForScrollbars,
	          touchScrollTarget = _this$props.touchScrollTarget;
	      var target = document.body;
	      var targetStyle = target && target.style;

	      if (accountForScrollbars) {
	        // store any styles already applied to the body
	        constants.STYLE_KEYS.forEach(function (key) {
	          var val = targetStyle && targetStyle[key];
	          _this2.originalStyles[key] = val;
	        });
	      } // apply the lock styles and padding if this is the first scroll lock


	      if (accountForScrollbars && activeScrollLocks < 1) {
	        var currentPadding = parseInt(this.originalStyles.paddingRight, 10) || 0;
	        var clientWidth = document.body ? document.body.clientWidth : 0;
	        var adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;
	        Object.keys(constants.LOCK_STYLES).forEach(function (key) {
	          var val = constants.LOCK_STYLES[key];

	          if (targetStyle) {
	            targetStyle[key] = val;
	          }
	        });

	        if (targetStyle) {
	          targetStyle.paddingRight = "".concat(adjustedPadding, "px");
	        }
	      } // account for touch devices


	      if (target && (0, utils$1.isTouchDevice)()) {
	        // Mobile Safari ignores { overflow: hidden } declaration on the body.
	        target.addEventListener('touchmove', utils$1.preventTouchMove, this.listenerOptions); // Allow scroll on provided target

	        if (touchScrollTarget) {
	          touchScrollTarget.addEventListener('touchstart', utils$1.preventInertiaScroll, this.listenerOptions);
	          touchScrollTarget.addEventListener('touchmove', utils$1.allowTouchMove, this.listenerOptions);
	        }
	      } // increment active scroll locks


	      activeScrollLocks += 1;
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      var _this3 = this;

	      if (!canUseDOM) return;
	      var _this$props2 = this.props,
	          accountForScrollbars = _this$props2.accountForScrollbars,
	          touchScrollTarget = _this$props2.touchScrollTarget;
	      var target = document.body;
	      var targetStyle = target && target.style; // safely decrement active scroll locks

	      activeScrollLocks = Math.max(activeScrollLocks - 1, 0); // reapply original body styles, if any

	      if (accountForScrollbars && activeScrollLocks < 1) {
	        constants.STYLE_KEYS.forEach(function (key) {
	          var val = _this3.originalStyles[key];

	          if (targetStyle) {
	            targetStyle[key] = val;
	          }
	        });
	      } // remove touch listeners


	      if (target && (0, utils$1.isTouchDevice)()) {
	        target.removeEventListener('touchmove', utils$1.preventTouchMove, this.listenerOptions);

	        if (touchScrollTarget) {
	          touchScrollTarget.removeEventListener('touchstart', utils$1.preventInertiaScroll, this.listenerOptions);
	          touchScrollTarget.removeEventListener('touchmove', utils$1.allowTouchMove, this.listenerOptions);
	        }
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return null;
	    }
	  }]);

	  return ScrollLock;
	}(React__default.Component);

	exports.default = ScrollLock;

	_defineProperty(ScrollLock, "defaultProps", {
	  accountForScrollbars: true
	});
	});

	unwrapExports(ScrollLock_1);

	var ScrollBlock_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _react = _interopRequireWildcard(React__default);



	var _NodeResolver = _interopRequireDefault(NodeResolver_1);

	var _index = _interopRequireDefault(ScrollLock_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	// NOTE:
	// We shouldn't need this after updating to React v16.3.0, which introduces:
	// - createRef() https://reactjs.org/docs/react-api.html#reactcreateref
	// - forwardRef() https://reactjs.org/docs/react-api.html#reactforwardref
	var ScrollBlock =
	/*#__PURE__*/
	function (_PureComponent) {
	  _inherits(ScrollBlock, _PureComponent);

	  function ScrollBlock() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, ScrollBlock);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ScrollBlock)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
	      touchScrollTarget: null
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getScrollTarget", function (ref) {
	      if (ref === _this.state.touchScrollTarget) return;

	      _this.setState({
	        touchScrollTarget: ref
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "blurSelectInput", function () {
	      if (document.activeElement) {
	        document.activeElement.blur();
	      }
	    });

	    return _this;
	  }

	  _createClass(ScrollBlock, [{
	    key: "render",
	    value: function render() {
	      var _this$props = this.props,
	          children = _this$props.children,
	          isEnabled = _this$props.isEnabled;
	      var touchScrollTarget = this.state.touchScrollTarget; // bail early if not enabled

	      if (!isEnabled) return children;
	      /*
	       * Div
	       * ------------------------------
	       * blocks scrolling on non-body elements behind the menu
	        * NodeResolver
	       * ------------------------------
	       * we need a reference to the scrollable element to "unlock" scroll on
	       * mobile devices
	        * ScrollLock
	       * ------------------------------
	       * actually does the scroll locking
	       */

	      return _react.default.createElement("div", null, _react.default.createElement("div", {
	        onClick: this.blurSelectInput,
	        className:
	        /*#__PURE__*/

	        /*#__PURE__*/
	        (0, index_esm.css)({
	          position: 'fixed',
	          left: 0,
	          bottom: 0,
	          right: 0,
	          top: 0
	        })
	      }), _react.default.createElement(_NodeResolver.default, {
	        innerRef: this.getScrollTarget
	      }, children), touchScrollTarget ? _react.default.createElement(_index.default, {
	        touchScrollTarget: touchScrollTarget
	      }) : null);
	    }
	  }]);

	  return ScrollBlock;
	}(_react.PureComponent);

	exports.default = ScrollBlock;
	});

	unwrapExports(ScrollBlock_1);

	var ScrollCaptor_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _react = _interopRequireWildcard(React__default);

	var _NodeResolver = _interopRequireDefault(NodeResolver_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

	function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

	function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var ScrollCaptor =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(ScrollCaptor, _Component);

	  function ScrollCaptor() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, ScrollCaptor);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ScrollCaptor)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isBottom", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isTop", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollTarget", void 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "touchStart", void 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "cancelScroll", function (event) {
	      event.preventDefault();
	      event.stopPropagation();
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleEventDelta", function (event, delta) {
	      var _this$props = _this.props,
	          onBottomArrive = _this$props.onBottomArrive,
	          onBottomLeave = _this$props.onBottomLeave,
	          onTopArrive = _this$props.onTopArrive,
	          onTopLeave = _this$props.onTopLeave;
	      var _this$scrollTarget = _this.scrollTarget,
	          scrollTop = _this$scrollTarget.scrollTop,
	          scrollHeight = _this$scrollTarget.scrollHeight,
	          clientHeight = _this$scrollTarget.clientHeight;
	      var target = _this.scrollTarget;
	      var isDeltaPositive = delta > 0;
	      var availableScroll = scrollHeight - clientHeight - scrollTop;
	      var shouldCancelScroll = false; // reset bottom/top flags

	      if (availableScroll > delta && _this.isBottom) {
	        if (onBottomLeave) onBottomLeave(event);
	        _this.isBottom = false;
	      }

	      if (isDeltaPositive && _this.isTop) {
	        if (onTopLeave) onTopLeave(event);
	        _this.isTop = false;
	      } // bottom limit


	      if (isDeltaPositive && delta > availableScroll) {
	        if (onBottomArrive && !_this.isBottom) {
	          onBottomArrive(event);
	        }

	        target.scrollTop = scrollHeight;
	        shouldCancelScroll = true;
	        _this.isBottom = true; // top limit
	      } else if (!isDeltaPositive && -delta > scrollTop) {
	        if (onTopArrive && !_this.isTop) {
	          onTopArrive(event);
	        }

	        target.scrollTop = 0;
	        shouldCancelScroll = true;
	        _this.isTop = true;
	      } // cancel scroll


	      if (shouldCancelScroll) {
	        _this.cancelScroll(event);
	      }
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onWheel", function (event) {
	      _this.handleEventDelta(event, event.deltaY);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchStart", function (event) {
	      // set touch start so we can calculate touchmove delta
	      _this.touchStart = event.changedTouches[0].clientY;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchMove", function (event) {
	      var deltaY = _this.touchStart - event.changedTouches[0].clientY;

	      _this.handleEventDelta(event, deltaY);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getScrollTarget", function (ref) {
	      _this.scrollTarget = ref;
	    });

	    return _this;
	  }

	  _createClass(ScrollCaptor, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.startListening(this.scrollTarget);
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this.stopListening(this.scrollTarget);
	    }
	  }, {
	    key: "startListening",
	    value: function startListening(el) {
	      // bail early if no scroll available
	      if (!el) return;
	      if (el.scrollHeight <= el.clientHeight) return; // all the if statements are to appease Flow 😢

	      if (typeof el.addEventListener === 'function') {
	        el.addEventListener('wheel', this.onWheel, false);
	      }

	      if (typeof el.addEventListener === 'function') {
	        el.addEventListener('touchstart', this.onTouchStart, false);
	      }

	      if (typeof el.addEventListener === 'function') {
	        el.addEventListener('touchmove', this.onTouchMove, false);
	      }
	    }
	  }, {
	    key: "stopListening",
	    value: function stopListening(el) {
	      // bail early if no scroll available
	      if (el.scrollHeight <= el.clientHeight) return; // all the if statements are to appease Flow 😢

	      if (typeof el.removeEventListener === 'function') {
	        el.removeEventListener('wheel', this.onWheel, false);
	      }

	      if (typeof el.removeEventListener === 'function') {
	        el.removeEventListener('touchstart', this.onTouchStart, false);
	      }

	      if (typeof el.removeEventListener === 'function') {
	        el.removeEventListener('touchmove', this.onTouchMove, false);
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react.default.createElement(_NodeResolver.default, {
	        innerRef: this.getScrollTarget
	      }, this.props.children);
	    }
	  }]);

	  return ScrollCaptor;
	}(_react.Component);

	var ScrollCaptorSwitch =
	/*#__PURE__*/
	function (_Component2) {
	  _inherits(ScrollCaptorSwitch, _Component2);

	  function ScrollCaptorSwitch() {
	    _classCallCheck(this, ScrollCaptorSwitch);

	    return _possibleConstructorReturn(this, _getPrototypeOf(ScrollCaptorSwitch).apply(this, arguments));
	  }

	  _createClass(ScrollCaptorSwitch, [{
	    key: "render",
	    value: function render() {
	      var _this$props2 = this.props,
	          isEnabled = _this$props2.isEnabled,
	          props = _objectWithoutProperties(_this$props2, ["isEnabled"]);

	      return isEnabled ? _react.default.createElement(ScrollCaptor, props) : this.props.children;
	    }
	  }]);

	  return ScrollCaptorSwitch;
	}(_react.Component);

	exports.default = ScrollCaptorSwitch;

	_defineProperty(ScrollCaptorSwitch, "defaultProps", {
	  isEnabled: true
	});
	});

	unwrapExports(ScrollCaptor_1);

	var internal = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	Object.defineProperty(exports, "A11yText", {
	  enumerable: true,
	  get: function get() {
	    return _A11yText.default;
	  }
	});
	Object.defineProperty(exports, "DummyInput", {
	  enumerable: true,
	  get: function get() {
	    return _DummyInput.default;
	  }
	});
	Object.defineProperty(exports, "NodeResolver", {
	  enumerable: true,
	  get: function get() {
	    return _NodeResolver.default;
	  }
	});
	Object.defineProperty(exports, "ScrollBlock", {
	  enumerable: true,
	  get: function get() {
	    return _ScrollBlock.default;
	  }
	});
	Object.defineProperty(exports, "ScrollCaptor", {
	  enumerable: true,
	  get: function get() {
	    return _ScrollCaptor.default;
	  }
	});

	var _A11yText = _interopRequireDefault(A11yText_1);

	var _DummyInput = _interopRequireDefault(DummyInput_1);

	var _NodeResolver = _interopRequireDefault(NodeResolver_1);

	var _ScrollBlock = _interopRequireDefault(ScrollBlock_1);

	var _ScrollCaptor = _interopRequireDefault(ScrollCaptor_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	});

	unwrapExports(internal);

	var accessibility = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.resultsAriaMessage = exports.optionFocusAriaMessage = exports.valueFocusAriaMessage = exports.valueEventAriaMessage = exports.instructionsAriaMessage = void 0;

	var instructionsAriaMessage = function instructionsAriaMessage(event) {
	  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var isSearchable = context.isSearchable,
	      isMulti = context.isMulti,
	      label = context.label,
	      isDisabled = context.isDisabled;

	  switch (event) {
	    case 'menu':
	      return "Use Up and Down to choose options".concat(isDisabled ? '' : ', press Enter to select the currently focused option', ", press Escape to exit the menu, press Tab to select the option and exit the menu.");

	    case 'input':
	      return "".concat(label ? label : 'Select', " is focused ").concat(isSearchable ? ',type to refine list' : '', ", press Down to open the menu, ").concat(isMulti ? ' press left to focus selected values' : '');

	    case 'value':
	      return 'Use left and right to toggle between focused values, press Backspace to remove the currently focused value';
	  }
	};

	exports.instructionsAriaMessage = instructionsAriaMessage;

	var valueEventAriaMessage = function valueEventAriaMessage(event, context) {
	  var value = context.value,
	      isDisabled = context.isDisabled;
	  if (!value) return;

	  switch (event) {
	    case 'deselect-option':
	    case 'pop-value':
	    case 'remove-value':
	      return "option ".concat(value, ", deselected.");

	    case 'select-option':
	      return isDisabled ? "option ".concat(value, " is disabled. Select another option.") : "option ".concat(value, ", selected.");
	  }
	};

	exports.valueEventAriaMessage = valueEventAriaMessage;

	var valueFocusAriaMessage = function valueFocusAriaMessage(_ref) {
	  var focusedValue = _ref.focusedValue,
	      getOptionLabel = _ref.getOptionLabel,
	      selectValue = _ref.selectValue;
	  return "value ".concat(getOptionLabel(focusedValue), " focused, ").concat(selectValue.indexOf(focusedValue) + 1, " of ").concat(selectValue.length, ".");
	};

	exports.valueFocusAriaMessage = valueFocusAriaMessage;

	var optionFocusAriaMessage = function optionFocusAriaMessage(_ref2) {
	  var focusedOption = _ref2.focusedOption,
	      getOptionLabel = _ref2.getOptionLabel,
	      options = _ref2.options;
	  return "option ".concat(getOptionLabel(focusedOption), " focused").concat(focusedOption.isDisabled ? ' disabled' : '', ", ").concat(options.indexOf(focusedOption) + 1, " of ").concat(options.length, ".");
	};

	exports.optionFocusAriaMessage = optionFocusAriaMessage;

	var resultsAriaMessage = function resultsAriaMessage(_ref3) {
	  var inputValue = _ref3.inputValue,
	      screenReaderMessage = _ref3.screenReaderMessage;
	  return "".concat(screenReaderMessage).concat(inputValue ? ' for search term ' + inputValue : '', ".");
	};

	exports.resultsAriaMessage = resultsAriaMessage;
	});

	unwrapExports(accessibility);
	var accessibility_1 = accessibility.resultsAriaMessage;
	var accessibility_2 = accessibility.optionFocusAriaMessage;
	var accessibility_3 = accessibility.valueFocusAriaMessage;
	var accessibility_4 = accessibility.valueEventAriaMessage;
	var accessibility_5 = accessibility.instructionsAriaMessage;

	var builtins$1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isOptionDisabled = exports.getOptionValue = exports.getOptionLabel = exports.formatGroupLabel = void 0;

	var formatGroupLabel = function formatGroupLabel(group) {
	  return group.label;
	};

	exports.formatGroupLabel = formatGroupLabel;

	var getOptionLabel = function getOptionLabel(option) {
	  return option.label;
	};

	exports.getOptionLabel = getOptionLabel;

	var getOptionValue = function getOptionValue(option) {
	  return option.value;
	};

	exports.getOptionValue = getOptionValue;

	var isOptionDisabled = function isOptionDisabled(option) {
	  return !!option.isDisabled;
	};

	exports.isOptionDisabled = isOptionDisabled;
	});

	unwrapExports(builtins$1);
	var builtins_1 = builtins$1.isOptionDisabled;
	var builtins_2 = builtins$1.getOptionValue;
	var builtins_3 = builtins$1.getOptionLabel;
	var builtins_4 = builtins$1.formatGroupLabel;

	var containers = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.IndicatorsContainer = exports.indicatorsContainerCSS = exports.ValueContainer = exports.valueContainerCSS = exports.SelectContainer = exports.containerCSS = void 0;

	var _react = _interopRequireWildcard(React__default);



	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	var containerCSS = function containerCSS(_ref) {
	  var isDisabled = _ref.isDisabled,
	      isRtl = _ref.isRtl;
	  return {
	    label: 'container',
	    direction: isRtl ? 'rtl' : null,
	    pointerEvents: isDisabled ? 'none' : null,
	    // cancel mouse events when disabled
	    position: 'relative'
	  };
	};

	exports.containerCSS = containerCSS;

	var SelectContainer = function SelectContainer(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps,
	      isDisabled = props.isDisabled,
	      isRtl = props.isRtl;
	  return _react.default.createElement("div", _extends({
	    className: cx(
	    /*#__PURE__*/
	    (0, index_esm.css)(getStyles('container', props)), {
	      '--is-disabled': isDisabled,
	      '--is-rtl': isRtl
	    }, className)
	  }, innerProps), children);
	}; // ==============================
	// Value Container
	// ==============================


	exports.SelectContainer = SelectContainer;

	var valueContainerCSS = function valueContainerCSS(_ref2) {
	  var spacing = _ref2.theme.spacing;
	  return {
	    alignItems: 'center',
	    display: 'flex',
	    flex: 1,
	    flexWrap: 'wrap',
	    padding: "".concat(spacing.baseUnit / 2, "px ").concat(spacing.baseUnit * 2, "px"),
	    WebkitOverflowScrolling: 'touch',
	    position: 'relative',
	    overflow: 'hidden'
	  };
	};

	exports.valueContainerCSS = valueContainerCSS;

	var ValueContainer =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(ValueContainer, _Component);

	  function ValueContainer() {
	    _classCallCheck(this, ValueContainer);

	    return _possibleConstructorReturn(this, _getPrototypeOf(ValueContainer).apply(this, arguments));
	  }

	  _createClass(ValueContainer, [{
	    key: "render",
	    value: function render() {
	      var _this$props = this.props,
	          children = _this$props.children,
	          className = _this$props.className,
	          cx = _this$props.cx,
	          isMulti = _this$props.isMulti,
	          getStyles = _this$props.getStyles,
	          hasValue = _this$props.hasValue;
	      return _react.default.createElement("div", {
	        className: cx(
	        /*#__PURE__*/
	        (0, index_esm.css)(getStyles('valueContainer', this.props)), {
	          'value-container': true,
	          'value-container--is-multi': isMulti,
	          'value-container--has-value': hasValue
	        }, className)
	      }, children);
	    }
	  }]);

	  return ValueContainer;
	}(_react.Component); // ==============================
	// Indicator Container
	// ==============================


	exports.ValueContainer = ValueContainer;

	var indicatorsContainerCSS = function indicatorsContainerCSS() {
	  return {
	    alignItems: 'center',
	    alignSelf: 'stretch',
	    display: 'flex',
	    flexShrink: 0
	  };
	};

	exports.indicatorsContainerCSS = indicatorsContainerCSS;

	var IndicatorsContainer = function IndicatorsContainer(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles;
	  return _react.default.createElement("div", {
	    className: cx(
	    /*#__PURE__*/
	    (0, index_esm.css)(getStyles('indicatorsContainer', props)), {
	      'indicators': true
	    }, className)
	  }, children);
	};

	exports.IndicatorsContainer = IndicatorsContainer;
	});

	unwrapExports(containers);
	var containers_1 = containers.IndicatorsContainer;
	var containers_2 = containers.indicatorsContainerCSS;
	var containers_3 = containers.ValueContainer;
	var containers_4 = containers.valueContainerCSS;
	var containers_5 = containers.SelectContainer;
	var containers_6 = containers.containerCSS;

	var indicators = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LoadingIndicator = exports.loadingIndicatorCSS = exports.IndicatorSeparator = exports.indicatorSeparatorCSS = exports.ClearIndicator = exports.clearIndicatorCSS = exports.DropdownIndicator = exports.dropdownIndicatorCSS = exports.DownChevron = exports.CrossIcon = void 0;

	var _react = _interopRequireDefault(React__default);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

	function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

	// ==============================
	// Dropdown & Clear Icons
	// ==============================
	var Svg = function Svg(_ref) {
	  var size = _ref.size,
	      props = _objectWithoutProperties(_ref, ["size"]);

	  return _react.default.createElement("svg", _extends({
	    height: size,
	    width: size,
	    viewBox: "0 0 20 20",
	    "aria-hidden": "true",
	    focusable: "false",
	    className:
	    /*#__PURE__*/

	    /*#__PURE__*/
	    (0, index_esm.css)({
	      display: 'inline-block',
	      fill: 'currentColor',
	      lineHeight: 1,
	      stroke: 'currentColor',
	      strokeWidth: 0
	    })
	  }, props));
	};

	var CrossIcon = function CrossIcon(props) {
	  return _react.default.createElement(Svg, _extends({
	    size: 20
	  }, props), _react.default.createElement("path", {
	    d: "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
	  }));
	};

	exports.CrossIcon = CrossIcon;

	var DownChevron = function DownChevron(props) {
	  return _react.default.createElement(Svg, _extends({
	    size: 20
	  }, props), _react.default.createElement("path", {
	    d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
	  }));
	}; // ==============================
	// Dropdown & Clear Buttons
	// ==============================


	exports.DownChevron = DownChevron;

	var baseCSS = function baseCSS(_ref2) {
	  var isFocused = _ref2.isFocused,
	      _ref2$theme = _ref2.theme,
	      baseUnit = _ref2$theme.spacing.baseUnit,
	      colors = _ref2$theme.colors;
	  return {
	    label: 'indicatorContainer',
	    color: isFocused ? colors.neutral60 : colors.neutral20,
	    display: 'flex',
	    padding: baseUnit * 2,
	    transition: 'color 150ms',
	    ':hover': {
	      color: isFocused ? colors.neutral80 : colors.neutral40
	    }
	  };
	};

	var dropdownIndicatorCSS = baseCSS;
	exports.dropdownIndicatorCSS = dropdownIndicatorCSS;

	var DropdownIndicator = function DropdownIndicator(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;
	  return _react.default.createElement("div", _extends({}, innerProps, {
	    className: cx(
	    /*#__PURE__*/
	    (0, index_esm.css)(getStyles('dropdownIndicator', props)), {
	      'indicator': true,
	      'dropdown-indicator': true
	    }, className)
	  }), children || _react.default.createElement(DownChevron, null));
	};

	exports.DropdownIndicator = DropdownIndicator;
	var clearIndicatorCSS = baseCSS;
	exports.clearIndicatorCSS = clearIndicatorCSS;

	var ClearIndicator = function ClearIndicator(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;
	  return _react.default.createElement("div", _extends({}, innerProps, {
	    className: cx(
	    /*#__PURE__*/
	    (0, index_esm.css)(getStyles('clearIndicator', props)), {
	      'indicator': true,
	      'clear-indicator': true
	    }, className)
	  }), children || _react.default.createElement(CrossIcon, null));
	}; // ==============================
	// Separator
	// ==============================


	exports.ClearIndicator = ClearIndicator;

	var indicatorSeparatorCSS = function indicatorSeparatorCSS(_ref3) {
	  var isDisabled = _ref3.isDisabled,
	      _ref3$theme = _ref3.theme,
	      baseUnit = _ref3$theme.spacing.baseUnit,
	      colors = _ref3$theme.colors;
	  return {
	    label: 'indicatorSeparator',
	    alignSelf: 'stretch',
	    backgroundColor: isDisabled ? colors.neutral10 : colors.neutral20,
	    marginBottom: baseUnit * 2,
	    marginTop: baseUnit * 2,
	    width: 1
	  };
	};

	exports.indicatorSeparatorCSS = indicatorSeparatorCSS;

	var IndicatorSeparator = function IndicatorSeparator(props) {
	  var className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;
	  return _react.default.createElement("span", _extends({}, innerProps, {
	    className: cx(
	    /*#__PURE__*/
	    (0, index_esm.css)(getStyles('indicatorSeparator', props)), {
	      'indicator-separator': true
	    }, className)
	  }));
	}; // ==============================
	// Loading
	// ==============================


	exports.IndicatorSeparator = IndicatorSeparator;
	var keyframesName = 'react-select-loading-indicator';
	var keyframesInjected = false;

	var loadingIndicatorCSS = function loadingIndicatorCSS(_ref4) {
	  var isFocused = _ref4.isFocused,
	      size = _ref4.size,
	      _ref4$theme = _ref4.theme,
	      colors = _ref4$theme.colors,
	      baseUnit = _ref4$theme.spacing.baseUnit;
	  return {
	    label: 'loadingIndicator',
	    color: isFocused ? colors.neutral60 : colors.neutral20,
	    display: 'flex',
	    padding: baseUnit * 2,
	    transition: 'color 150ms',
	    alignSelf: 'center',
	    fontSize: size,
	    lineHeight: 1,
	    marginRight: size,
	    textAlign: 'center',
	    verticalAlign: 'middle'
	  };
	};

	exports.loadingIndicatorCSS = loadingIndicatorCSS;

	var LoadingDot = function LoadingDot(_ref5) {
	  var color = _ref5.color,
	      delay = _ref5.delay,
	      offset = _ref5.offset;
	  return _react.default.createElement("span", {
	    className:
	    /*#__PURE__*/

	    /*#__PURE__*/
	    (0, index_esm.css)({
	      animationDuration: '1s',
	      animationDelay: "".concat(delay, "ms"),
	      animationIterationCount: 'infinite',
	      animationName: keyframesName,
	      animationTimingFunction: 'ease-in-out',
	      backgroundColor: color,
	      borderRadius: '1em',
	      display: 'inline-block',
	      marginLeft: offset ? '1em' : null,
	      height: '1em',
	      verticalAlign: 'top',
	      width: '1em'
	    })
	  });
	};

	var LoadingIndicator = function LoadingIndicator(props) {
	  var className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps,
	      isFocused = props.isFocused,
	      isRtl = props.isRtl,
	      colors = props.theme.colors;
	  var color = isFocused ? colors.neutral80 : colors.neutral20;

	  if (!keyframesInjected) {
	    // eslint-disable-next-line no-unused-expressions
	    (0, index_esm.injectGlobal)("@keyframes ", keyframesName, "{0%,80%,100%{opacity:0;}40%{opacity:1;}};");
	    keyframesInjected = true;
	  }

	  return _react.default.createElement("div", _extends({}, innerProps, {
	    className: cx(
	    /*#__PURE__*/
	    (0, index_esm.css)(getStyles('loadingIndicator', props)), {
	      'indicator': true,
	      'loading-indicator': true
	    }, className)
	  }), _react.default.createElement(LoadingDot, {
	    color: color,
	    delay: 0,
	    offset: isRtl
	  }), _react.default.createElement(LoadingDot, {
	    color: color,
	    delay: 160,
	    offset: true
	  }), _react.default.createElement(LoadingDot, {
	    color: color,
	    delay: 320,
	    offset: !isRtl
	  }));
	};

	exports.LoadingIndicator = LoadingIndicator;
	LoadingIndicator.defaultProps = {
	  size: 4
	};
	});

	unwrapExports(indicators);
	var indicators_1 = indicators.LoadingIndicator;
	var indicators_2 = indicators.loadingIndicatorCSS;
	var indicators_3 = indicators.IndicatorSeparator;
	var indicators_4 = indicators.indicatorSeparatorCSS;
	var indicators_5 = indicators.ClearIndicator;
	var indicators_6 = indicators.clearIndicatorCSS;
	var indicators_7 = indicators.DropdownIndicator;
	var indicators_8 = indicators.dropdownIndicatorCSS;
	var indicators_9 = indicators.DownChevron;
	var indicators_10 = indicators.CrossIcon;

	var Control_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.css = void 0;

	var _react = _interopRequireDefault(React__default);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	var css = function css(_ref) {
	  var isDisabled = _ref.isDisabled,
	      isFocused = _ref.isFocused,
	      _ref$theme = _ref.theme,
	      colors = _ref$theme.colors,
	      borderRadius = _ref$theme.borderRadius,
	      spacing = _ref$theme.spacing;
	  return {
	    label: 'control',
	    alignItems: 'center',
	    backgroundColor: isDisabled ? colors.neutral5 : colors.neutral0,
	    borderColor: isDisabled ? colors.neutral10 : isFocused ? colors.primary : colors.neutral20,
	    borderRadius: borderRadius,
	    borderStyle: 'solid',
	    borderWidth: 1,
	    boxShadow: isFocused ? "0 0 0 1px ".concat(colors.primary) : null,
	    cursor: 'default',
	    display: 'flex',
	    flexWrap: 'wrap',
	    justifyContent: 'space-between',
	    minHeight: spacing.controlHeight,
	    outline: '0 !important',
	    position: 'relative',
	    transition: 'all 100ms',
	    '&:hover': {
	      borderColor: isFocused ? colors.primary : colors.neutral30
	    }
	  };
	};

	exports.css = css;

	var Control = function Control(props) {
	  var children = props.children,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      className = props.className,
	      isDisabled = props.isDisabled,
	      isFocused = props.isFocused,
	      innerRef = props.innerRef,
	      innerProps = props.innerProps,
	      menuIsOpen = props.menuIsOpen;
	  return _react.default.createElement("div", _extends({
	    ref: innerRef,
	    className: cx(
	    /*#__PURE__*/
	    (0, index_esm.css)(getStyles('control', props)), {
	      'control': true,
	      'control--is-disabled': isDisabled,
	      'control--is-focused': isFocused,
	      'control--menu-is-open': menuIsOpen
	    }, className)
	  }, innerProps), children);
	};

	var _default = Control;
	exports.default = _default;
	});

	unwrapExports(Control_1);
	var Control_2 = Control_1.css;

	var Group_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.GroupHeading = exports.groupHeadingCSS = exports.groupCSS = void 0;

	var _react = _interopRequireDefault(React__default);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

	function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	var groupCSS = function groupCSS(_ref) {
	  var spacing = _ref.theme.spacing;
	  return {
	    paddingBottom: spacing.baseUnit * 2,
	    paddingTop: spacing.baseUnit * 2
	  };
	};

	exports.groupCSS = groupCSS;

	var Group = function Group(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      Heading = props.Heading,
	      headingProps = props.headingProps,
	      label = props.label,
	      theme = props.theme,
	      selectProps = props.selectProps;
	  return _react.default.createElement("div", {
	    className: cx(
	    /*#__PURE__*/
	    (0, index_esm.css)(getStyles('group', props)), {
	      'group': true
	    }, className)
	  }, _react.default.createElement(Heading, _extends({}, headingProps, {
	    selectProps: selectProps,
	    theme: theme,
	    getStyles: getStyles,
	    cx: cx
	  }), label), _react.default.createElement("div", null, children));
	};

	var groupHeadingCSS = function groupHeadingCSS(_ref2) {
	  var spacing = _ref2.theme.spacing;
	  return {
	    label: 'group',
	    color: '#999',
	    cursor: 'default',
	    display: 'block',
	    fontSize: '75%',
	    fontWeight: '500',
	    marginBottom: '0.25em',
	    paddingLeft: spacing.baseUnit * 3,
	    paddingRight: spacing.baseUnit * 3,
	    textTransform: 'uppercase'
	  };
	};

	exports.groupHeadingCSS = groupHeadingCSS;

	var GroupHeading = function GroupHeading(props) {
	  var className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      theme = props.theme,
	      selectProps = props.selectProps,
	      cleanProps = _objectWithoutProperties(props, ["className", "cx", "getStyles", "theme", "selectProps"]);

	  return _react.default.createElement("div", _extends({
	    className: cx(
	    /*#__PURE__*/
	    (0, index_esm.css)(getStyles('groupHeading', _objectSpread({
	      theme: theme
	    }, cleanProps))), {
	      'group-heading': true
	    }, className)
	  }, cleanProps));
	};

	exports.GroupHeading = GroupHeading;
	var _default = Group;
	exports.default = _default;
	});

	unwrapExports(Group_1);
	var Group_2 = Group_1.GroupHeading;
	var Group_3 = Group_1.groupHeadingCSS;
	var Group_4 = Group_1.groupCSS;

	var Input_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.inputCSS = void 0;

	var _react = _interopRequireDefault(React__default);



	var _reactInputAutosize = _interopRequireDefault(AutosizeInput_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

	function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

	var inputCSS = function inputCSS(_ref) {
	  var isDisabled = _ref.isDisabled,
	      _ref$theme = _ref.theme,
	      spacing = _ref$theme.spacing,
	      colors = _ref$theme.colors;
	  return {
	    margin: spacing.baseUnit / 2,
	    paddingBottom: spacing.baseUnit / 2,
	    paddingTop: spacing.baseUnit / 2,
	    visibility: isDisabled ? 'hidden' : 'visible',
	    color: colors.neutral80
	  };
	};

	exports.inputCSS = inputCSS;

	var inputStyle = function inputStyle(isHidden) {
	  return {
	    label: 'input',
	    background: 0,
	    border: 0,
	    fontSize: 'inherit',
	    opacity: isHidden ? 0 : 1,
	    outline: 0,
	    padding: 0,
	    color: 'inherit'
	  };
	};

	var Input = function Input(_ref2) {
	  var className = _ref2.className,
	      cx = _ref2.cx,
	      getStyles = _ref2.getStyles,
	      innerRef = _ref2.innerRef,
	      isHidden = _ref2.isHidden,
	      isDisabled = _ref2.isDisabled,
	      theme = _ref2.theme,
	      selectProps = _ref2.selectProps,
	      props = _objectWithoutProperties(_ref2, ["className", "cx", "getStyles", "innerRef", "isHidden", "isDisabled", "theme", "selectProps"]);

	  return _react.default.createElement("div", {
	    className:
	    /*#__PURE__*/

	    /*#__PURE__*/
	    (0, index_esm.css)(getStyles('input', _objectSpread({
	      theme: theme
	    }, props)))
	  }, _react.default.createElement(_reactInputAutosize.default, _extends({
	    className: cx(null, {
	      'input': true
	    }, className),
	    inputRef: innerRef,
	    inputStyle: inputStyle(isHidden),
	    disabled: isDisabled
	  }, props)));
	};

	var _default = Input;
	exports.default = _default;
	});

	unwrapExports(Input_1);
	var Input_2 = Input_1.inputCSS;

	var MultiValue_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.MultiValueRemove = exports.MultiValueLabel = exports.MultiValueContainer = exports.MultiValueGeneric = exports.multiValueRemoveCSS = exports.multiValueLabelCSS = exports.multiValueCSS = void 0;

	var _react = _interopRequireWildcard(React__default);





	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	var multiValueCSS = function multiValueCSS(_ref) {
	  var _ref$theme = _ref.theme,
	      spacing = _ref$theme.spacing,
	      borderRadius = _ref$theme.borderRadius,
	      colors = _ref$theme.colors;
	  return {
	    label: 'multiValue',
	    backgroundColor: colors.neutral10,
	    borderRadius: borderRadius / 2,
	    display: 'flex',
	    margin: spacing.baseUnit / 2,
	    minWidth: 0 // resolves flex/text-overflow bug

	  };
	};

	exports.multiValueCSS = multiValueCSS;

	var multiValueLabelCSS = function multiValueLabelCSS(_ref2) {
	  var _ref2$theme = _ref2.theme,
	      borderRadius = _ref2$theme.borderRadius,
	      colors = _ref2$theme.colors,
	      cropWithEllipsis = _ref2.cropWithEllipsis;
	  return {
	    borderRadius: borderRadius / 2,
	    color: colors.neutral80,
	    fontSize: '85%',
	    overflow: 'hidden',
	    padding: 3,
	    paddingLeft: 6,
	    textOverflow: cropWithEllipsis ? 'ellipsis' : null,
	    whiteSpace: 'nowrap'
	  };
	};

	exports.multiValueLabelCSS = multiValueLabelCSS;

	var multiValueRemoveCSS = function multiValueRemoveCSS(_ref3) {
	  var _ref3$theme = _ref3.theme,
	      spacing = _ref3$theme.spacing,
	      borderRadius = _ref3$theme.borderRadius,
	      colors = _ref3$theme.colors,
	      isFocused = _ref3.isFocused;
	  return {
	    alignItems: 'center',
	    borderRadius: borderRadius / 2,
	    backgroundColor: isFocused && colors.dangerLight,
	    display: 'flex',
	    paddingLeft: spacing.baseUnit,
	    paddingRight: spacing.baseUnit,
	    ':hover': {
	      backgroundColor: colors.dangerLight,
	      color: colors.danger
	    }
	  };
	};

	exports.multiValueRemoveCSS = multiValueRemoveCSS;

	var MultiValueGeneric = function MultiValueGeneric(_ref4) {
	  var children = _ref4.children,
	      innerProps = _ref4.innerProps;
	  return _react.default.createElement("div", innerProps, children);
	};

	exports.MultiValueGeneric = MultiValueGeneric;
	var MultiValueContainer = MultiValueGeneric;
	exports.MultiValueContainer = MultiValueContainer;
	var MultiValueLabel = MultiValueGeneric;
	exports.MultiValueLabel = MultiValueLabel;

	var MultiValueRemove =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(MultiValueRemove, _Component);

	  function MultiValueRemove() {
	    _classCallCheck(this, MultiValueRemove);

	    return _possibleConstructorReturn(this, _getPrototypeOf(MultiValueRemove).apply(this, arguments));
	  }

	  _createClass(MultiValueRemove, [{
	    key: "render",
	    value: function render() {
	      var _this$props = this.props,
	          children = _this$props.children,
	          innerProps = _this$props.innerProps;
	      return _react.default.createElement("div", innerProps, children || _react.default.createElement(indicators.CrossIcon, {
	        size: 14
	      }));
	    }
	  }]);

	  return MultiValueRemove;
	}(_react.Component);

	exports.MultiValueRemove = MultiValueRemove;

	var MultiValue =
	/*#__PURE__*/
	function (_Component2) {
	  _inherits(MultiValue, _Component2);

	  function MultiValue() {
	    _classCallCheck(this, MultiValue);

	    return _possibleConstructorReturn(this, _getPrototypeOf(MultiValue).apply(this, arguments));
	  }

	  _createClass(MultiValue, [{
	    key: "render",
	    value: function render() {
	      var _this$props2 = this.props,
	          children = _this$props2.children,
	          className = _this$props2.className,
	          components = _this$props2.components,
	          cx = _this$props2.cx,
	          data = _this$props2.data,
	          getStyles = _this$props2.getStyles,
	          innerProps = _this$props2.innerProps,
	          isDisabled = _this$props2.isDisabled,
	          removeProps = _this$props2.removeProps,
	          selectProps = _this$props2.selectProps;
	      var Container = components.Container,
	          Label = components.Label,
	          Remove = components.Remove;

	      var containerInnerProps = _objectSpread({
	        className: cx(
	        /*#__PURE__*/
	        (0, index_esm.css)(getStyles('multiValue', this.props)), {
	          'multi-value': true,
	          'multi-value--is-disabled': isDisabled
	        }, className)
	      }, innerProps);

	      var labelInnerProps = {
	        className: cx(
	        /*#__PURE__*/
	        (0, index_esm.css)(getStyles('multiValueLabel', this.props)), {
	          'multi-value__label': true
	        }, className)
	      };

	      var removeInnerProps = _objectSpread({
	        className: cx(
	        /*#__PURE__*/
	        (0, index_esm.css)(getStyles('multiValueRemove', this.props)), {
	          'multi-value__remove': true
	        }, className)
	      }, removeProps);

	      return _react.default.createElement(Container, {
	        data: data,
	        innerProps: containerInnerProps,
	        selectProps: selectProps
	      }, _react.default.createElement(Label, {
	        data: data,
	        innerProps: labelInnerProps,
	        selectProps: selectProps
	      }, children), _react.default.createElement(Remove, {
	        data: data,
	        innerProps: removeInnerProps,
	        selectProps: selectProps
	      }));
	    }
	  }]);

	  return MultiValue;
	}(_react.Component);

	_defineProperty(MultiValue, "defaultProps", {
	  cropWithEllipsis: true
	});

	var _default = MultiValue;
	exports.default = _default;
	});

	unwrapExports(MultiValue_1);
	var MultiValue_2 = MultiValue_1.MultiValueRemove;
	var MultiValue_3 = MultiValue_1.MultiValueLabel;
	var MultiValue_4 = MultiValue_1.MultiValueContainer;
	var MultiValue_5 = MultiValue_1.MultiValueGeneric;
	var MultiValue_6 = MultiValue_1.multiValueRemoveCSS;
	var MultiValue_7 = MultiValue_1.multiValueLabelCSS;
	var MultiValue_8 = MultiValue_1.multiValueCSS;

	var Option_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.optionCSS = void 0;

	var _react = _interopRequireDefault(React__default);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	var optionCSS = function optionCSS(_ref) {
	  var isDisabled = _ref.isDisabled,
	      isFocused = _ref.isFocused,
	      isSelected = _ref.isSelected,
	      _ref$theme = _ref.theme,
	      spacing = _ref$theme.spacing,
	      colors = _ref$theme.colors;
	  return {
	    label: 'option',
	    backgroundColor: isSelected ? colors.primary : isFocused ? colors.primary25 : 'transparent',
	    color: isDisabled ? colors.neutral20 : isSelected ? colors.neutral0 : 'inherit',
	    cursor: 'default',
	    display: 'block',
	    fontSize: 'inherit',
	    padding: "".concat(spacing.baseUnit * 2, "px ").concat(spacing.baseUnit * 3, "px"),
	    width: '100%',
	    userSelect: 'none',
	    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
	    // provide some affordance on touch devices
	    ':active': {
	      backgroundColor: !isDisabled && (isSelected ? colors.primary : colors.primary50)
	    }
	  };
	};

	exports.optionCSS = optionCSS;

	var Option = function Option(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      isDisabled = props.isDisabled,
	      isFocused = props.isFocused,
	      isSelected = props.isSelected,
	      innerRef = props.innerRef,
	      innerProps = props.innerProps;
	  return _react.default.createElement("div", _extends({
	    ref: innerRef,
	    className: cx(
	    /*#__PURE__*/
	    (0, index_esm.css)(getStyles('option', props)), {
	      'option': true,
	      'option--is-disabled': isDisabled,
	      'option--is-focused': isFocused,
	      'option--is-selected': isSelected
	    }, className)
	  }, innerProps), children);
	};

	var _default = Option;
	exports.default = _default;
	});

	unwrapExports(Option_1);
	var Option_2 = Option_1.optionCSS;

	var Placeholder_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.placeholderCSS = void 0;

	var _react = _interopRequireDefault(React__default);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	var placeholderCSS = function placeholderCSS(_ref) {
	  var _ref$theme = _ref.theme,
	      spacing = _ref$theme.spacing,
	      colors = _ref$theme.colors;
	  return {
	    label: 'placeholder',
	    color: colors.neutral50,
	    marginLeft: spacing.baseUnit / 2,
	    marginRight: spacing.baseUnit / 2,
	    position: 'absolute',
	    top: '50%',
	    transform: 'translateY(-50%)'
	  };
	};

	exports.placeholderCSS = placeholderCSS;

	var Placeholder = function Placeholder(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;
	  return _react.default.createElement("div", _extends({
	    className: cx(
	    /*#__PURE__*/
	    (0, index_esm.css)(getStyles('placeholder', props)), {
	      'placeholder': true
	    }, className)
	  }, innerProps), children);
	};

	var _default = Placeholder;
	exports.default = _default;
	});

	unwrapExports(Placeholder_1);
	var Placeholder_2 = Placeholder_1.placeholderCSS;

	var SingleValue_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.css = void 0;

	var _react = _interopRequireDefault(React__default);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	var css = function css(_ref) {
	  var isDisabled = _ref.isDisabled,
	      _ref$theme = _ref.theme,
	      spacing = _ref$theme.spacing,
	      colors = _ref$theme.colors;
	  return {
	    label: 'singleValue',
	    color: isDisabled ? colors.neutral40 : colors.neutral80,
	    marginLeft: spacing.baseUnit / 2,
	    marginRight: spacing.baseUnit / 2,
	    maxWidth: "calc(100% - ".concat(spacing.baseUnit * 2, "px)"),
	    overflow: 'hidden',
	    position: 'absolute',
	    textOverflow: 'ellipsis',
	    whiteSpace: 'nowrap',
	    top: '50%',
	    transform: 'translateY(-50%)'
	  };
	};

	exports.css = css;

	var SingleValue = function SingleValue(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      isDisabled = props.isDisabled,
	      innerProps = props.innerProps;
	  return _react.default.createElement("div", _extends({
	    className: cx(
	    /*#__PURE__*/
	    (0, index_esm.css)(getStyles('singleValue', props)), {
	      'single-value': true,
	      'single-value--is-disabled': isDisabled
	    }, className)
	  }, innerProps), children);
	};

	var _default = SingleValue;
	exports.default = _default;
	});

	unwrapExports(SingleValue_1);
	var SingleValue_2 = SingleValue_1.css;

	var components_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.defaultComponents = exports.components = void 0;





	var _Control = _interopRequireDefault(Control_1);

	var _Group = _interopRequireWildcard(Group_1);

	var _Input = _interopRequireDefault(Input_1);

	var _Menu = _interopRequireWildcard(Menu_1);

	var _MultiValue = _interopRequireWildcard(MultiValue_1);

	var _Option = _interopRequireDefault(Option_1);

	var _Placeholder = _interopRequireDefault(Placeholder_1);

	var _SingleValue = _interopRequireDefault(SingleValue_1);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var components = {
	  ClearIndicator: indicators.ClearIndicator,
	  Control: _Control.default,
	  DropdownIndicator: indicators.DropdownIndicator,
	  DownChevron: indicators.DownChevron,
	  CrossIcon: indicators.CrossIcon,
	  Group: _Group.default,
	  GroupHeading: _Group.GroupHeading,
	  IndicatorsContainer: containers.IndicatorsContainer,
	  IndicatorSeparator: indicators.IndicatorSeparator,
	  Input: _Input.default,
	  LoadingIndicator: indicators.LoadingIndicator,
	  Menu: _Menu.default,
	  MenuList: _Menu.MenuList,
	  MenuPortal: _Menu.MenuPortal,
	  LoadingMessage: _Menu.LoadingMessage,
	  NoOptionsMessage: _Menu.NoOptionsMessage,
	  MultiValue: _MultiValue.default,
	  MultiValueContainer: _MultiValue.MultiValueContainer,
	  MultiValueLabel: _MultiValue.MultiValueLabel,
	  MultiValueRemove: _MultiValue.MultiValueRemove,
	  Option: _Option.default,
	  Placeholder: _Placeholder.default,
	  SelectContainer: containers.SelectContainer,
	  SingleValue: _SingleValue.default,
	  ValueContainer: containers.ValueContainer
	};
	exports.components = components;

	var defaultComponents = function defaultComponents(props) {
	  return _objectSpread({}, components, props.components);
	};

	exports.defaultComponents = defaultComponents;
	});

	unwrapExports(components_1);
	var components_2 = components_1.defaultComponents;
	var components_3 = components_1.components;

	var styles = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mergeStyles = mergeStyles;
	exports.defaultStyles = void 0;





















	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var defaultStyles = {
	  clearIndicator: indicators.clearIndicatorCSS,
	  container: containers.containerCSS,
	  control: Control_1.css,
	  dropdownIndicator: indicators.dropdownIndicatorCSS,
	  group: Group_1.groupCSS,
	  groupHeading: Group_1.groupHeadingCSS,
	  indicatorsContainer: containers.indicatorsContainerCSS,
	  indicatorSeparator: indicators.indicatorSeparatorCSS,
	  input: Input_1.inputCSS,
	  loadingIndicator: indicators.loadingIndicatorCSS,
	  loadingMessage: Menu_1.loadingMessageCSS,
	  menu: Menu_1.menuCSS,
	  menuList: Menu_1.menuListCSS,
	  menuPortal: Menu_1.menuPortalCSS,
	  multiValue: MultiValue_1.multiValueCSS,
	  multiValueLabel: MultiValue_1.multiValueLabelCSS,
	  multiValueRemove: MultiValue_1.multiValueRemoveCSS,
	  noOptionsMessage: Menu_1.noOptionsMessageCSS,
	  option: Option_1.optionCSS,
	  placeholder: Placeholder_1.placeholderCSS,
	  singleValue: SingleValue_1.css,
	  valueContainer: containers.valueContainerCSS
	}; // Merge Utility
	// Allows consumers to extend a base Select with additional styles

	exports.defaultStyles = defaultStyles;

	function mergeStyles(source) {
	  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  // initialize with source styles
	  var styles = _objectSpread({}, source); // massage in target styles


	  Object.keys(target).forEach(function (key) {
	    if (source[key]) {
	      styles[key] = function (rsCss, props) {
	        return target[key](source[key](rsCss, props), props);
	      };
	    } else {
	      styles[key] = target[key];
	    }
	  });
	  return styles;
	}
	});

	unwrapExports(styles);
	var styles_1 = styles.mergeStyles;
	var styles_2 = styles.defaultStyles;

	var theme = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.defaultTheme = exports.spacing = exports.colors = void 0;
	var colors = {
	  primary: '#2684FF',
	  primary75: '#4C9AFF',
	  primary50: '#B2D4FF',
	  primary25: '#DEEBFF',
	  danger: '#DE350B',
	  dangerLight: '#FFBDAD',
	  neutral0: 'hsl(0, 0%, 100%)',
	  neutral5: 'hsl(0, 0%, 95%)',
	  neutral10: 'hsl(0, 0%, 90%)',
	  neutral20: 'hsl(0, 0%, 80%)',
	  neutral30: 'hsl(0, 0%, 70%)',
	  neutral40: 'hsl(0, 0%, 60%)',
	  neutral50: 'hsl(0, 0%, 50%)',
	  neutral60: 'hsl(0, 0%, 40%)',
	  neutral70: 'hsl(0, 0%, 30%)',
	  neutral80: 'hsl(0, 0%, 20%)',
	  neutral90: 'hsl(0, 0%, 10%)'
	};
	exports.colors = colors;
	var borderRadius = 4;
	var baseUnit = 4;
	/* Used to calculate consistent margin/padding on elements */

	var controlHeight = 38;
	/* The minimum height of the control */

	var menuGutter = baseUnit * 2;
	/* The amount of space between the control and menu */

	var spacing = {
	  baseUnit: baseUnit,
	  controlHeight: controlHeight,
	  menuGutter: menuGutter
	};
	exports.spacing = spacing;
	var defaultTheme = {
	  borderRadius: borderRadius,
	  colors: colors,
	  spacing: spacing
	};
	exports.defaultTheme = defaultTheme;
	});

	unwrapExports(theme);
	var theme_1 = theme.defaultTheme;
	var theme_2 = theme.spacing;
	var theme_3 = theme.colors;

	var Select_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.defaultProps = void 0;

	var _react = _interopRequireWildcard(React__default);

	var _memoizeOne = _interopRequireDefault(memoizeOne);



	var _reactFastCompare = _interopRequireDefault(reactFastCompare);

















	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

	function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

	function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

	function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

	function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var defaultProps = {
	  backspaceRemovesValue: true,
	  blurInputOnSelect: (0, utils.isTouchCapable)(),
	  captureMenuScroll: !(0, utils.isTouchCapable)(),
	  closeMenuOnSelect: true,
	  closeMenuOnScroll: false,
	  components: {},
	  controlShouldRenderValue: true,
	  escapeClearsValue: false,
	  filterOption: (0, filters.createFilter)(),
	  formatGroupLabel: builtins$1.formatGroupLabel,
	  getOptionLabel: builtins$1.getOptionLabel,
	  getOptionValue: builtins$1.getOptionValue,
	  isDisabled: false,
	  isLoading: false,
	  isMulti: false,
	  isRtl: false,
	  isSearchable: true,
	  isOptionDisabled: builtins$1.isOptionDisabled,
	  loadingMessage: function loadingMessage() {
	    return 'Loading...';
	  },
	  maxMenuHeight: 300,
	  minMenuHeight: 140,
	  menuIsOpen: false,
	  menuPlacement: 'bottom',
	  menuPosition: 'absolute',
	  menuShouldBlockScroll: false,
	  menuShouldScrollIntoView: !(0, utils.isMobileDevice)(),
	  noOptionsMessage: function noOptionsMessage() {
	    return 'No options';
	  },
	  openMenuOnFocus: false,
	  openMenuOnClick: true,
	  options: [],
	  pageSize: 5,
	  placeholder: 'Select...',
	  screenReaderStatus: function screenReaderStatus(_ref) {
	    var count = _ref.count;
	    return "".concat(count, " result").concat(count !== 1 ? 's' : '', " available");
	  },
	  styles: {},
	  tabIndex: '0',
	  tabSelectsValue: true
	};
	exports.defaultProps = defaultProps;
	var instanceId = 1;

	var Select =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(Select, _Component);

	  // Misc. Instance Properties
	  // ------------------------------
	  // TODO
	  // Refs
	  // ------------------------------
	  // Lifecycle
	  // ------------------------------
	  function Select(_props) {
	    var _this;

	    _classCallCheck(this, Select);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Select).call(this, _props));

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
	      ariaLiveSelection: '',
	      ariaLiveContext: '',
	      focusedOption: null,
	      focusedValue: null,
	      inputIsHidden: false,
	      isFocused: false,
	      menuOptions: {
	        render: [],
	        focusable: []
	      },
	      selectValue: []
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "blockOptionHover", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isComposing", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clearFocusValueOnUpdate", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "commonProps", void 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "components", void 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hasGroups", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initialTouchX", 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initialTouchY", 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "inputIsHiddenAfterUpdate", void 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "instancePrefix", '');

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "openAfterFocus", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollToFocusedOptionOnUpdate", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "userIsDragging", void 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "controlRef", null);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getControlRef", function (ref) {
	      _this.controlRef = ref;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "focusedOptionRef", null);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getFocusedOptionRef", function (ref) {
	      _this.focusedOptionRef = ref;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "menuListRef", null);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getMenuListRef", function (ref) {
	      _this.menuListRef = ref;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "inputRef", null);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getInputRef", function (ref) {
	      _this.inputRef = ref;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "cacheComponents", function (components) {
	      _this.components = (0, components_1.defaultComponents)({
	        components: components
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "focus", _this.focusInput);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "blur", _this.blurInput);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (newValue, actionMeta) {
	      var _this$props = _this.props,
	          onChange = _this$props.onChange,
	          name = _this$props.name;
	      onChange(newValue, _objectSpread({}, actionMeta, {
	        name: name
	      }));
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setValue", function (newValue) {
	      var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'set-value';
	      var option = arguments.length > 2 ? arguments[2] : undefined;
	      var _this$props2 = _this.props,
	          closeMenuOnSelect = _this$props2.closeMenuOnSelect,
	          isMulti = _this$props2.isMulti;

	      _this.onInputChange('', {
	        action: 'set-value'
	      });

	      if (closeMenuOnSelect) {
	        _this.inputIsHiddenAfterUpdate = !isMulti;

	        _this.onMenuClose();
	      } // when the select value should change, we should reset focusedValue


	      _this.clearFocusValueOnUpdate = true;

	      _this.onChange(newValue, {
	        action: action,
	        option: option
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "selectOption", function (newValue) {
	      var _this$props3 = _this.props,
	          blurInputOnSelect = _this$props3.blurInputOnSelect,
	          isMulti = _this$props3.isMulti;
	      var selectValue = _this.state.selectValue;

	      if (isMulti) {
	        if (_this.isOptionSelected(newValue, selectValue)) {
	          var candidate = _this.getOptionValue(newValue);

	          _this.setValue(selectValue.filter(function (i) {
	            return _this.getOptionValue(i) !== candidate;
	          }), 'deselect-option', newValue);

	          _this.announceAriaLiveSelection({
	            event: 'deselect-option',
	            context: {
	              value: _this.getOptionLabel(newValue)
	            }
	          });
	        } else {
	          if (!_this.isOptionDisabled(newValue, selectValue)) {
	            _this.setValue([].concat(_toConsumableArray(selectValue), [newValue]), 'select-option', newValue);

	            _this.announceAriaLiveSelection({
	              event: 'select-option',
	              context: {
	                value: _this.getOptionLabel(newValue)
	              }
	            });
	          } else {
	            // announce that option is disabled
	            _this.announceAriaLiveSelection({
	              event: 'select-option',
	              context: {
	                value: _this.getOptionLabel(newValue),
	                isDisabled: true
	              }
	            });
	          }
	        }
	      } else {
	        if (!_this.isOptionDisabled(newValue, selectValue)) {
	          _this.setValue(newValue, 'select-option');

	          _this.announceAriaLiveSelection({
	            event: 'select-option',
	            context: {
	              value: _this.getOptionLabel(newValue)
	            }
	          });
	        } else {
	          // announce that option is disabled
	          _this.announceAriaLiveSelection({
	            event: 'select-option',
	            context: {
	              value: _this.getOptionLabel(newValue),
	              isDisabled: true
	            }
	          });
	        }
	      }

	      if (blurInputOnSelect) {
	        _this.blurInput();
	      }
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "removeValue", function (removedValue) {
	      var selectValue = _this.state.selectValue;

	      var candidate = _this.getOptionValue(removedValue);

	      _this.onChange(selectValue.filter(function (i) {
	        return _this.getOptionValue(i) !== candidate;
	      }), {
	        action: 'remove-value',
	        removedValue: removedValue
	      });

	      _this.announceAriaLiveSelection({
	        event: 'remove-value',
	        context: {
	          value: removedValue ? _this.getOptionLabel(removedValue) : ''
	        }
	      });

	      _this.focusInput();
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clearValue", function () {
	      var isMulti = _this.props.isMulti;

	      _this.onChange(isMulti ? [] : null, {
	        action: 'clear'
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "popValue", function () {
	      var selectValue = _this.state.selectValue;
	      var lastSelectedValue = selectValue[selectValue.length - 1];

	      _this.announceAriaLiveSelection({
	        event: 'pop-value',
	        context: {
	          value: lastSelectedValue ? _this.getOptionLabel(lastSelectedValue) : ''
	        }
	      });

	      _this.onChange(selectValue.slice(0, selectValue.length - 1), {
	        action: 'pop-value',
	        removedValue: lastSelectedValue
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOptionLabel", function (data) {
	      return _this.props.getOptionLabel(data);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOptionValue", function (data) {
	      return _this.props.getOptionValue(data);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getStyles", function (key, props) {
	      var base = styles.defaultStyles[key](props);

	      base.boxSizing = 'border-box';
	      var custom = _this.props.styles[key];
	      return custom ? custom(base, props) : base;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getElementId", function (element) {
	      return "".concat(_this.instancePrefix, "-").concat(element);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getActiveDescendentId", function () {
	      var menuIsOpen = _this.props.menuIsOpen;
	      var _this$state = _this.state,
	          menuOptions = _this$state.menuOptions,
	          focusedOption = _this$state.focusedOption;
	      if (!focusedOption || !menuIsOpen) return undefined;
	      var index = menuOptions.focusable.indexOf(focusedOption);
	      var option = menuOptions.render[index];
	      return option && option.key;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "announceAriaLiveSelection", function (_ref2) {
	      var event = _ref2.event,
	          context = _ref2.context;

	      _this.setState({
	        ariaLiveSelection: (0, accessibility.valueEventAriaMessage)(event, context)
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "announceAriaLiveContext", function (_ref3) {
	      var event = _ref3.event,
	          context = _ref3.context;

	      _this.setState({
	        ariaLiveContext: (0, accessibility.instructionsAriaMessage)(event, _objectSpread({}, context, {
	          label: _this.props['aria-label']
	        }))
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMenuMouseDown", function (event) {
	      if (event.button !== 0) {
	        return;
	      }

	      event.stopPropagation();
	      event.preventDefault();

	      _this.focusInput();
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMenuMouseMove", function (event) {
	      _this.blockOptionHover = false;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onControlMouseDown", function (event) {
	      var openMenuOnClick = _this.props.openMenuOnClick;

	      if (!_this.state.isFocused) {
	        if (openMenuOnClick) {
	          _this.openAfterFocus = true;
	        }

	        _this.focusInput();
	      } else if (!_this.props.menuIsOpen) {
	        if (openMenuOnClick) {
	          _this.openMenu('first');
	        }
	      } else {
	        //$FlowFixMe
	        if (event.target.tagName !== 'INPUT') {
	          _this.onMenuClose();
	        }
	      } //$FlowFixMe


	      if (event.target.tagName !== 'INPUT') {
	        event.preventDefault();
	      }
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onDropdownIndicatorMouseDown", function (event) {
	      // ignore mouse events that weren't triggered by the primary button
	      if (event && event.type === 'mousedown' && event.button !== 0) {
	        return;
	      }

	      if (_this.props.isDisabled) return;
	      var _this$props4 = _this.props,
	          isMulti = _this$props4.isMulti,
	          menuIsOpen = _this$props4.menuIsOpen;

	      _this.focusInput();

	      if (menuIsOpen) {
	        _this.inputIsHiddenAfterUpdate = !isMulti;

	        _this.onMenuClose();
	      } else {
	        _this.openMenu('first');
	      }

	      event.preventDefault();
	      event.stopPropagation();
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClearIndicatorMouseDown", function (event) {
	      // ignore mouse events that weren't triggered by the primary button
	      if (event && event.type === 'mousedown' && event.button !== 0) {
	        return;
	      }

	      _this.clearValue();

	      event.stopPropagation();
	      _this.openAfterFocus = false;
	      setTimeout(function () {
	        return _this.focusInput();
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onScroll", function (event) {
	      if (typeof _this.props.closeMenuOnScroll === 'boolean') {
	        if (event.target instanceof HTMLElement && (0, utils.isDocumentElement)(event.target)) {
	          _this.props.onMenuClose();
	        }
	      } else if (typeof _this.props.closeMenuOnScroll === 'function') {
	        if (_this.props.closeMenuOnScroll(event)) {
	          _this.props.onMenuClose();
	        }
	      }
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onCompositionStart", function () {
	      _this.isComposing = true;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onCompositionEnd", function () {
	      _this.isComposing = false;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchStart", function (_ref4) {
	      var touches = _ref4.touches;
	      var touch = touches.item(0);

	      if (!touch) {
	        return;
	      }

	      _this.initialTouchX = touch.clientX;
	      _this.initialTouchY = touch.clientY;
	      _this.userIsDragging = false;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchMove", function (_ref5) {
	      var touches = _ref5.touches;
	      var touch = touches.item(0);

	      if (!touch) {
	        return;
	      }

	      var deltaX = Math.abs(touch.clientX - _this.initialTouchX);
	      var deltaY = Math.abs(touch.clientY - _this.initialTouchY);
	      var moveThreshold = 5;
	      _this.userIsDragging = deltaX > moveThreshold || deltaY > moveThreshold;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchEnd", function (event) {
	      if (_this.userIsDragging) return; // close the menu if the user taps outside
	      // we're checking on event.target here instead of event.currentTarget, because we want to assert information
	      // on events on child elements, not the document (which we've attached this handler to).

	      if (_this.controlRef && !_this.controlRef.contains(event.target) && _this.menuListRef && !_this.menuListRef.contains(event.target)) {
	        _this.blurInput();
	      } // reset move vars


	      _this.initialTouchX = 0;
	      _this.initialTouchY = 0;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onControlTouchEnd", function (event) {
	      if (_this.userIsDragging) return;

	      _this.onControlMouseDown(event);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClearIndicatorTouchEnd", function (event) {
	      if (_this.userIsDragging) return;

	      _this.onClearIndicatorMouseDown(event);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onDropdownIndicatorTouchEnd", function (event) {
	      if (_this.userIsDragging) return;

	      _this.onDropdownIndicatorMouseDown(event);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputChange", function (event) {
	      var inputValue = event.currentTarget.value;
	      _this.inputIsHiddenAfterUpdate = false;

	      _this.onInputChange(inputValue, {
	        action: 'input-change'
	      });

	      _this.onMenuOpen();
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onInputFocus", function (event) {
	      var _this$props5 = _this.props,
	          isSearchable = _this$props5.isSearchable,
	          isMulti = _this$props5.isMulti;

	      if (_this.props.onFocus) {
	        _this.props.onFocus(event);
	      }

	      _this.inputIsHiddenAfterUpdate = false;

	      _this.announceAriaLiveContext({
	        event: 'input',
	        context: {
	          isSearchable: isSearchable,
	          isMulti: isMulti
	        }
	      });

	      _this.setState({
	        isFocused: true
	      });

	      if (_this.openAfterFocus || _this.props.openMenuOnFocus) {
	        _this.openMenu('first');
	      }

	      _this.openAfterFocus = false;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onInputBlur", function (event) {
	      if (_this.menuListRef && _this.menuListRef.contains(document.activeElement)) {
	        _this.inputRef.focus();

	        return;
	      }

	      if (_this.props.onBlur) {
	        _this.props.onBlur(event);
	      }

	      _this.onInputChange('', {
	        action: 'input-blur'
	      });

	      _this.onMenuClose();

	      _this.setState({
	        focusedValue: null,
	        isFocused: false
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onOptionHover", function (focusedOption) {
	      if (_this.blockOptionHover || _this.state.focusedOption === focusedOption) {
	        return;
	      }

	      _this.setState({
	        focusedOption: focusedOption
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "shouldHideSelectedOptions", function () {
	      var _this$props6 = _this.props,
	          hideSelectedOptions = _this$props6.hideSelectedOptions,
	          isMulti = _this$props6.isMulti;
	      if (hideSelectedOptions === undefined) return isMulti;
	      return hideSelectedOptions;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onKeyDown", function (event) {
	      var _this$props7 = _this.props,
	          isMulti = _this$props7.isMulti,
	          backspaceRemovesValue = _this$props7.backspaceRemovesValue,
	          escapeClearsValue = _this$props7.escapeClearsValue,
	          inputValue = _this$props7.inputValue,
	          isClearable = _this$props7.isClearable,
	          isDisabled = _this$props7.isDisabled,
	          menuIsOpen = _this$props7.menuIsOpen,
	          onKeyDown = _this$props7.onKeyDown,
	          tabSelectsValue = _this$props7.tabSelectsValue,
	          openMenuOnFocus = _this$props7.openMenuOnFocus;
	      var _this$state2 = _this.state,
	          focusedOption = _this$state2.focusedOption,
	          focusedValue = _this$state2.focusedValue,
	          selectValue = _this$state2.selectValue;
	      if (isDisabled) return;

	      if (typeof onKeyDown === 'function') {
	        onKeyDown(event);

	        if (event.defaultPrevented) {
	          return;
	        }
	      } // Block option hover events when the user has just pressed a key


	      _this.blockOptionHover = true;

	      switch (event.key) {
	        case 'ArrowLeft':
	          if (!isMulti || inputValue) return;

	          _this.focusValue('previous');

	          break;

	        case 'ArrowRight':
	          if (!isMulti || inputValue) return;

	          _this.focusValue('next');

	          break;

	        case 'Delete':
	        case 'Backspace':
	          if (inputValue) return;

	          if (focusedValue) {
	            _this.removeValue(focusedValue);
	          } else {
	            if (!backspaceRemovesValue) return;

	            if (isMulti) {
	              _this.popValue();
	            } else if (isClearable) {
	              _this.clearValue();
	            }
	          }

	          break;

	        case 'Tab':
	          if (_this.isComposing) return;

	          if (event.shiftKey || !menuIsOpen || !tabSelectsValue || !focusedOption || // don't capture the event if the menu opens on focus and the focused
	          // option is already selected; it breaks the flow of navigation
	          openMenuOnFocus && _this.isOptionSelected(focusedOption, selectValue)) {
	            return;
	          }

	          _this.selectOption(focusedOption);

	          break;

	        case 'Enter':
	          if (event.keyCode === 229) {
	            // ignore the keydown event from an Input Method Editor(IME)
	            // ref. https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
	            break;
	          }

	          if (menuIsOpen) {
	            if (!focusedOption) return;
	            if (_this.isComposing) return;

	            _this.selectOption(focusedOption);

	            break;
	          }

	          return;

	        case 'Escape':
	          if (menuIsOpen) {
	            _this.inputIsHiddenAfterUpdate = false;

	            _this.onInputChange('', {
	              action: 'menu-close'
	            });

	            _this.onMenuClose();
	          } else if (isClearable && escapeClearsValue) {
	            _this.clearValue();
	          }

	          break;

	        case ' ':
	          // space
	          if (inputValue) {
	            return;
	          }

	          if (!menuIsOpen) {
	            _this.openMenu('first');

	            break;
	          }

	          if (!focusedOption) return;

	          _this.selectOption(focusedOption);

	          break;

	        case 'ArrowUp':
	          if (menuIsOpen) {
	            _this.focusOption('up');
	          } else {
	            _this.openMenu('last');
	          }

	          break;

	        case 'ArrowDown':
	          if (menuIsOpen) {
	            _this.focusOption('down');
	          } else {
	            _this.openMenu('first');
	          }

	          break;

	        case 'PageUp':
	          if (!menuIsOpen) return;

	          _this.focusOption('pageup');

	          break;

	        case 'PageDown':
	          if (!menuIsOpen) return;

	          _this.focusOption('pagedown');

	          break;

	        case 'Home':
	          if (!menuIsOpen) return;

	          _this.focusOption('first');

	          break;

	        case 'End':
	          if (!menuIsOpen) return;

	          _this.focusOption('last');

	          break;

	        default:
	          return;
	      }

	      event.preventDefault();
	    });

	    var value = _props.value;
	    _this.cacheComponents = (0, _memoizeOne.default)(_this.cacheComponents, _reactFastCompare.default).bind(_assertThisInitialized(_assertThisInitialized(_this)));

	    _this.cacheComponents(_props.components);

	    _this.instancePrefix = 'react-select-' + (_this.props.instanceId || ++instanceId);

	    var _selectValue = (0, utils.cleanValue)(value);

	    var _menuOptions = _this.buildMenuOptions(_props, _selectValue);

	    _this.state.menuOptions = _menuOptions;
	    _this.state.selectValue = _selectValue;
	    return _this;
	  }

	  _createClass(Select, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.startListeningComposition();
	      this.startListeningToTouch();

	      if (this.props.closeMenuOnScroll && document && document.addEventListener) {
	        // Listen to all scroll events, and filter them out inside of 'onScroll'
	        document.addEventListener('scroll', this.onScroll, true);
	      }

	      if (this.props.autoFocus) {
	        this.focusInput();
	      }
	    }
	  }, {
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(nextProps) {
	      var _this$props8 = this.props,
	          options = _this$props8.options,
	          value = _this$props8.value,
	          inputValue = _this$props8.inputValue; // re-cache custom components

	      this.cacheComponents(nextProps.components); // rebuild the menu options

	      if (nextProps.value !== value || nextProps.options !== options || nextProps.inputValue !== inputValue) {
	        var selectValue = (0, utils.cleanValue)(nextProps.value);
	        var menuOptions = this.buildMenuOptions(nextProps, selectValue);
	        var focusedValue = this.getNextFocusedValue(selectValue);
	        var focusedOption = this.getNextFocusedOption(menuOptions.focusable);
	        this.setState({
	          menuOptions: menuOptions,
	          selectValue: selectValue,
	          focusedOption: focusedOption,
	          focusedValue: focusedValue
	        });
	      } // some updates should toggle the state of the input visibility


	      if (this.inputIsHiddenAfterUpdate != null) {
	        this.setState({
	          inputIsHidden: this.inputIsHiddenAfterUpdate
	        });
	        delete this.inputIsHiddenAfterUpdate;
	      }
	    }
	  }, {
	    key: "componentDidUpdate",
	    value: function componentDidUpdate(prevProps) {
	      var _this$props9 = this.props,
	          isDisabled = _this$props9.isDisabled,
	          menuIsOpen = _this$props9.menuIsOpen;
	      var isFocused = this.state.isFocused;

	      if ( // ensure focus is restored correctly when the control becomes enabled
	      isFocused && !isDisabled && prevProps.isDisabled || // ensure focus is on the Input when the menu opens
	      isFocused && menuIsOpen && !prevProps.menuIsOpen) {
	        this.focusInput();
	      } // scroll the focused option into view if necessary


	      if (this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate) {
	        (0, utils.scrollIntoView)(this.menuListRef, this.focusedOptionRef);
	      }

	      this.scrollToFocusedOptionOnUpdate = false;
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this.stopListeningComposition();
	      this.stopListeningToTouch();
	      document.removeEventListener('scroll', this.onScroll, true);
	    }
	  }, {
	    key: "onMenuOpen",
	    // ==============================
	    // Consumer Handlers
	    // ==============================
	    value: function onMenuOpen() {
	      this.props.onMenuOpen();
	    }
	  }, {
	    key: "onMenuClose",
	    value: function onMenuClose() {
	      var _this$props10 = this.props,
	          isSearchable = _this$props10.isSearchable,
	          isMulti = _this$props10.isMulti;
	      this.announceAriaLiveContext({
	        event: 'input',
	        context: {
	          isSearchable: isSearchable,
	          isMulti: isMulti
	        }
	      });
	      this.onInputChange('', {
	        action: 'menu-close'
	      });
	      this.props.onMenuClose();
	    }
	  }, {
	    key: "onInputChange",
	    value: function onInputChange(newValue, actionMeta) {
	      this.props.onInputChange(newValue, actionMeta);
	    } // ==============================
	    // Methods
	    // ==============================

	  }, {
	    key: "focusInput",
	    value: function focusInput() {
	      if (!this.inputRef) return;
	      this.inputRef.focus();
	    }
	  }, {
	    key: "blurInput",
	    value: function blurInput() {
	      if (!this.inputRef) return;
	      this.inputRef.blur();
	    } // aliased for consumers

	  }, {
	    key: "openMenu",
	    value: function openMenu(focusOption) {
	      var _this$state3 = this.state,
	          menuOptions = _this$state3.menuOptions,
	          selectValue = _this$state3.selectValue,
	          isFocused = _this$state3.isFocused;
	      var isMulti = this.props.isMulti;
	      var openAtIndex = focusOption === 'first' ? 0 : menuOptions.focusable.length - 1;

	      if (!isMulti) {
	        var selectedIndex = menuOptions.focusable.indexOf(selectValue[0]);

	        if (selectedIndex > -1) {
	          openAtIndex = selectedIndex;
	        }
	      } // only scroll if the menu isn't already open


	      this.scrollToFocusedOptionOnUpdate = !(isFocused && this.menuListRef);
	      this.inputIsHiddenAfterUpdate = false;
	      this.onMenuOpen();
	      this.setState({
	        focusedValue: null,
	        focusedOption: menuOptions.focusable[openAtIndex]
	      });
	      this.announceAriaLiveContext({
	        event: 'menu'
	      });
	    }
	  }, {
	    key: "focusValue",
	    value: function focusValue(direction) {
	      var _this$props11 = this.props,
	          isMulti = _this$props11.isMulti,
	          isSearchable = _this$props11.isSearchable;
	      var _this$state4 = this.state,
	          selectValue = _this$state4.selectValue,
	          focusedValue = _this$state4.focusedValue; // Only multiselects support value focusing

	      if (!isMulti) return;
	      this.setState({
	        focusedOption: null
	      });
	      var focusedIndex = selectValue.indexOf(focusedValue);

	      if (!focusedValue) {
	        focusedIndex = -1;
	        this.announceAriaLiveContext({
	          event: 'value'
	        });
	      }

	      var lastIndex = selectValue.length - 1;
	      var nextFocus = -1;
	      if (!selectValue.length) return;

	      switch (direction) {
	        case 'previous':
	          if (focusedIndex === 0) {
	            // don't cycle from the start to the end
	            nextFocus = 0;
	          } else if (focusedIndex === -1) {
	            // if nothing is focused, focus the last value first
	            nextFocus = lastIndex;
	          } else {
	            nextFocus = focusedIndex - 1;
	          }

	          break;

	        case 'next':
	          if (focusedIndex > -1 && focusedIndex < lastIndex) {
	            nextFocus = focusedIndex + 1;
	          }

	          break;
	      }

	      if (nextFocus === -1) {
	        this.announceAriaLiveContext({
	          event: 'input',
	          context: {
	            isSearchable: isSearchable,
	            isMulti: isMulti
	          }
	        });
	      }

	      this.setState({
	        inputIsHidden: nextFocus === -1 ? false : true,
	        focusedValue: selectValue[nextFocus]
	      });
	    }
	  }, {
	    key: "focusOption",
	    value: function focusOption() {
	      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'first';
	      var pageSize = this.props.pageSize;
	      var _this$state5 = this.state,
	          focusedOption = _this$state5.focusedOption,
	          menuOptions = _this$state5.menuOptions;
	      var options = menuOptions.focusable;
	      if (!options.length) return;
	      var nextFocus = 0; // handles 'first'

	      var focusedIndex = options.indexOf(focusedOption);

	      if (!focusedOption) {
	        focusedIndex = -1;
	        this.announceAriaLiveContext({
	          event: 'menu'
	        });
	      }

	      if (direction === 'up') {
	        nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
	      } else if (direction === 'down') {
	        nextFocus = (focusedIndex + 1) % options.length;
	      } else if (direction === 'pageup') {
	        nextFocus = focusedIndex - pageSize;
	        if (nextFocus < 0) nextFocus = 0;
	      } else if (direction === 'pagedown') {
	        nextFocus = focusedIndex + pageSize;
	        if (nextFocus > options.length - 1) nextFocus = options.length - 1;
	      } else if (direction === 'last') {
	        nextFocus = options.length - 1;
	      }

	      this.scrollToFocusedOptionOnUpdate = true;
	      this.setState({
	        focusedOption: options[nextFocus],
	        focusedValue: null
	      });
	      this.announceAriaLiveContext({
	        event: 'menu',
	        context: {
	          isDisabled: (0, builtins$1.isOptionDisabled)(options[nextFocus])
	        }
	      });
	    }
	  }, {
	    key: "getTheme",
	    // ==============================
	    // Getters
	    // ==============================
	    value: function getTheme() {
	      // Use the default theme if there are no customizations.
	      if (!this.props.theme) {
	        return theme.defaultTheme;
	      } // If the theme prop is a function, assume the function
	      // knows how to merge the passed-in default theme with
	      // its own modifications.


	      if (typeof this.props.theme === 'function') {
	        return this.props.theme(theme.defaultTheme);
	      } // Otherwise, if a plain theme object was passed in,
	      // overlay it with the default theme.


	      return _objectSpread({}, theme.defaultTheme, this.props.theme);
	    }
	  }, {
	    key: "getCommonProps",
	    value: function getCommonProps() {
	      var clearValue = this.clearValue,
	          getStyles = this.getStyles,
	          setValue = this.setValue,
	          selectOption = this.selectOption,
	          props = this.props;
	      var classNamePrefix = props.classNamePrefix,
	          isMulti = props.isMulti,
	          isRtl = props.isRtl,
	          options = props.options;
	      var selectValue = this.state.selectValue;
	      var hasValue = this.hasValue();

	      var getValue = function getValue() {
	        return selectValue;
	      };

	      var cx = utils.classNames.bind(null, classNamePrefix);

	      return {
	        cx: cx,
	        clearValue: clearValue,
	        getStyles: getStyles,
	        getValue: getValue,
	        hasValue: hasValue,
	        isMulti: isMulti,
	        isRtl: isRtl,
	        options: options,
	        selectOption: selectOption,
	        setValue: setValue,
	        selectProps: props,
	        theme: this.getTheme()
	      };
	    }
	  }, {
	    key: "getNextFocusedValue",
	    value: function getNextFocusedValue(nextSelectValue) {
	      if (this.clearFocusValueOnUpdate) {
	        this.clearFocusValueOnUpdate = false;
	        return null;
	      }

	      var _this$state6 = this.state,
	          focusedValue = _this$state6.focusedValue,
	          lastSelectValue = _this$state6.selectValue;
	      var lastFocusedIndex = lastSelectValue.indexOf(focusedValue);

	      if (lastFocusedIndex > -1) {
	        var nextFocusedIndex = nextSelectValue.indexOf(focusedValue);

	        if (nextFocusedIndex > -1) {
	          // the focused value is still in the selectValue, return it
	          return focusedValue;
	        } else if (lastFocusedIndex < nextSelectValue.length) {
	          // the focusedValue is not present in the next selectValue array by
	          // reference, so return the new value at the same index
	          return nextSelectValue[lastFocusedIndex];
	        }
	      }

	      return null;
	    }
	  }, {
	    key: "getNextFocusedOption",
	    value: function getNextFocusedOption(options) {
	      var lastFocusedOption = this.state.focusedOption;
	      return lastFocusedOption && options.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options[0];
	    }
	  }, {
	    key: "hasValue",
	    value: function hasValue() {
	      var selectValue = this.state.selectValue;
	      return selectValue.length > 0;
	    }
	  }, {
	    key: "hasOptions",
	    value: function hasOptions() {
	      return !!this.state.menuOptions.render.length;
	    }
	  }, {
	    key: "countOptions",
	    value: function countOptions() {
	      return this.state.menuOptions.focusable.length;
	    }
	  }, {
	    key: "isClearable",
	    value: function isClearable() {
	      var _this$props12 = this.props,
	          isClearable = _this$props12.isClearable,
	          isMulti = _this$props12.isMulti; // single select, by default, IS NOT clearable
	      // multi select, by default, IS clearable

	      if (isClearable === undefined) return isMulti;
	      return isClearable;
	    }
	  }, {
	    key: "isOptionDisabled",
	    value: function isOptionDisabled(option, selectValue) {
	      return typeof this.props.isOptionDisabled === 'function' ? this.props.isOptionDisabled(option, selectValue) : false;
	    }
	  }, {
	    key: "isOptionSelected",
	    value: function isOptionSelected(option, selectValue) {
	      var _this2 = this;

	      if (selectValue.indexOf(option) > -1) return true;

	      if (typeof this.props.isOptionSelected === 'function') {
	        return this.props.isOptionSelected(option, selectValue);
	      }

	      var candidate = this.getOptionValue(option);
	      return selectValue.some(function (i) {
	        return _this2.getOptionValue(i) === candidate;
	      });
	    }
	  }, {
	    key: "filterOption",
	    value: function filterOption(option, inputValue) {
	      return this.props.filterOption ? this.props.filterOption(option, inputValue) : true;
	    }
	  }, {
	    key: "formatOptionLabel",
	    value: function formatOptionLabel(data, context) {
	      if (typeof this.props.formatOptionLabel === 'function') {
	        var inputValue = this.props.inputValue;
	        var selectValue = this.state.selectValue;
	        return this.props.formatOptionLabel(data, {
	          context: context,
	          inputValue: inputValue,
	          selectValue: selectValue
	        });
	      } else {
	        return this.getOptionLabel(data);
	      }
	    }
	  }, {
	    key: "formatGroupLabel",
	    value: function formatGroupLabel(data) {
	      return this.props.formatGroupLabel(data);
	    } // ==============================
	    // Mouse Handlers
	    // ==============================

	  }, {
	    key: "startListeningComposition",
	    // ==============================
	    // Composition Handlers
	    // ==============================
	    value: function startListeningComposition() {
	      if (document && document.addEventListener) {
	        document.addEventListener('compositionstart', this.onCompositionStart, false);
	        document.addEventListener('compositionend', this.onCompositionEnd, false);
	      }
	    }
	  }, {
	    key: "stopListeningComposition",
	    value: function stopListeningComposition() {
	      if (document && document.removeEventListener) {
	        document.removeEventListener('compositionstart', this.onCompositionStart);
	        document.removeEventListener('compositionend', this.onCompositionEnd);
	      }
	    }
	  }, {
	    key: "startListeningToTouch",
	    // ==============================
	    // Touch Handlers
	    // ==============================
	    value: function startListeningToTouch() {
	      if (document && document.addEventListener) {
	        document.addEventListener('touchstart', this.onTouchStart, false);
	        document.addEventListener('touchmove', this.onTouchMove, false);
	        document.addEventListener('touchend', this.onTouchEnd, false);
	      }
	    }
	  }, {
	    key: "stopListeningToTouch",
	    value: function stopListeningToTouch() {
	      if (document && document.removeEventListener) {
	        document.removeEventListener('touchstart', this.onTouchStart);
	        document.removeEventListener('touchmove', this.onTouchMove);
	        document.removeEventListener('touchend', this.onTouchEnd);
	      }
	    }
	  }, {
	    key: "buildMenuOptions",
	    // ==============================
	    // Menu Options
	    // ==============================
	    value: function buildMenuOptions(props, selectValue) {
	      var _this3 = this;

	      var _props$inputValue = props.inputValue,
	          inputValue = _props$inputValue === void 0 ? '' : _props$inputValue,
	          options = props.options;

	      var toOption = function toOption(option, id) {
	        var isDisabled = _this3.isOptionDisabled(option, selectValue);

	        var isSelected = _this3.isOptionSelected(option, selectValue);

	        var label = _this3.getOptionLabel(option);

	        var value = _this3.getOptionValue(option);

	        if (_this3.shouldHideSelectedOptions() && isSelected || !_this3.filterOption({
	          label: label,
	          value: value,
	          data: option
	        }, inputValue)) {
	          return;
	        }

	        var onHover = isDisabled ? undefined : function () {
	          return _this3.onOptionHover(option);
	        };
	        var onSelect = isDisabled ? undefined : function () {
	          return _this3.selectOption(option);
	        };
	        var optionId = "".concat(_this3.getElementId('option'), "-").concat(id);
	        return {
	          innerProps: {
	            id: optionId,
	            onClick: onSelect,
	            onMouseMove: onHover,
	            onMouseOver: onHover,
	            tabIndex: -1
	          },
	          data: option,
	          isDisabled: isDisabled,
	          isSelected: isSelected,
	          key: optionId,
	          label: label,
	          type: 'option',
	          value: value
	        };
	      };

	      return options.reduce(function (acc, item, itemIndex) {
	        if (item.options) {
	          // TODO needs a tidier implementation
	          if (!_this3.hasGroups) _this3.hasGroups = true;
	          var items = item.options;
	          var children = items.map(function (child, i) {
	            var option = toOption(child, "".concat(itemIndex, "-").concat(i));
	            if (option) acc.focusable.push(child);
	            return option;
	          }).filter(Boolean);

	          if (children.length) {
	            var groupId = "".concat(_this3.getElementId('group'), "-").concat(itemIndex);
	            acc.render.push({
	              type: 'group',
	              key: groupId,
	              data: item,
	              options: children
	            });
	          }
	        } else {
	          var option = toOption(item, "".concat(itemIndex));

	          if (option) {
	            acc.render.push(option);
	            acc.focusable.push(item);
	          }
	        }

	        return acc;
	      }, {
	        render: [],
	        focusable: []
	      });
	    } // ==============================
	    // Renderers
	    // ==============================

	  }, {
	    key: "constructAriaLiveMessage",
	    value: function constructAriaLiveMessage() {
	      var _this$state7 = this.state,
	          ariaLiveContext = _this$state7.ariaLiveContext,
	          selectValue = _this$state7.selectValue,
	          focusedValue = _this$state7.focusedValue,
	          focusedOption = _this$state7.focusedOption;
	      var _this$props13 = this.props,
	          options = _this$props13.options,
	          menuIsOpen = _this$props13.menuIsOpen,
	          inputValue = _this$props13.inputValue,
	          screenReaderStatus = _this$props13.screenReaderStatus; // An aria live message representing the currently focused value in the select.

	      var focusedValueMsg = focusedValue ? (0, accessibility.valueFocusAriaMessage)({
	        focusedValue: focusedValue,
	        getOptionLabel: this.getOptionLabel,
	        selectValue: selectValue
	      }) : ''; // An aria live message representing the currently focused option in the select.

	      var focusedOptionMsg = focusedOption && menuIsOpen ? (0, accessibility.optionFocusAriaMessage)({
	        focusedOption: focusedOption,
	        getOptionLabel: this.getOptionLabel,
	        options: options
	      }) : ''; // An aria live message representing the set of focusable results and current searchterm/inputvalue.

	      var resultsMsg = (0, accessibility.resultsAriaMessage)({
	        inputValue: inputValue,
	        screenReaderMessage: screenReaderStatus({
	          count: this.countOptions()
	        })
	      });
	      return "".concat(focusedValueMsg, " ").concat(focusedOptionMsg, " ").concat(resultsMsg, " ").concat(ariaLiveContext);
	    }
	  }, {
	    key: "renderInput",
	    value: function renderInput() {
	      var _this$props14 = this.props,
	          isDisabled = _this$props14.isDisabled,
	          isSearchable = _this$props14.isSearchable,
	          inputId = _this$props14.inputId,
	          inputValue = _this$props14.inputValue,
	          tabIndex = _this$props14.tabIndex;
	      var Input = this.components.Input;
	      var inputIsHidden = this.state.inputIsHidden;
	      var id = inputId || this.getElementId('input');

	      if (!isSearchable) {
	        // use a dummy input to maintain focus/blur functionality
	        return _react.default.createElement(internal.DummyInput, {
	          id: id,
	          innerRef: this.getInputRef,
	          onBlur: this.onInputBlur,
	          onChange: utils.noop,
	          onFocus: this.onInputFocus,
	          readOnly: true,
	          disabled: isDisabled,
	          tabIndex: tabIndex,
	          value: ""
	        });
	      } // aria attributes makes the JSX "noisy", separated for clarity


	      var ariaAttributes = {
	        'aria-autocomplete': 'list',
	        'aria-label': this.props['aria-label'],
	        'aria-labelledby': this.props['aria-labelledby']
	      };
	      var _this$commonProps = this.commonProps,
	          cx = _this$commonProps.cx,
	          theme = _this$commonProps.theme,
	          selectProps = _this$commonProps.selectProps;
	      return _react.default.createElement(Input, _extends({
	        autoCapitalize: "none",
	        autoComplete: "off",
	        autoCorrect: "off",
	        cx: cx,
	        getStyles: this.getStyles,
	        id: id,
	        innerRef: this.getInputRef,
	        isDisabled: isDisabled,
	        isHidden: inputIsHidden,
	        onBlur: this.onInputBlur,
	        onChange: this.handleInputChange,
	        onFocus: this.onInputFocus,
	        selectProps: selectProps,
	        spellCheck: "false",
	        tabIndex: tabIndex,
	        theme: theme,
	        type: "text",
	        value: inputValue
	      }, ariaAttributes));
	    }
	  }, {
	    key: "renderPlaceholderOrValue",
	    value: function renderPlaceholderOrValue() {
	      var _this4 = this;

	      var _this$components = this.components,
	          MultiValue = _this$components.MultiValue,
	          MultiValueContainer = _this$components.MultiValueContainer,
	          MultiValueLabel = _this$components.MultiValueLabel,
	          MultiValueRemove = _this$components.MultiValueRemove,
	          SingleValue = _this$components.SingleValue,
	          Placeholder = _this$components.Placeholder;
	      var commonProps = this.commonProps;
	      var _this$props15 = this.props,
	          controlShouldRenderValue = _this$props15.controlShouldRenderValue,
	          isDisabled = _this$props15.isDisabled,
	          isMulti = _this$props15.isMulti,
	          inputValue = _this$props15.inputValue,
	          placeholder = _this$props15.placeholder;
	      var _this$state8 = this.state,
	          selectValue = _this$state8.selectValue,
	          focusedValue = _this$state8.focusedValue,
	          isFocused = _this$state8.isFocused;

	      if (!this.hasValue() || !controlShouldRenderValue) {
	        return inputValue ? null : _react.default.createElement(Placeholder, _extends({}, commonProps, {
	          key: "placeholder",
	          isDisabled: isDisabled,
	          isFocused: isFocused
	        }), placeholder);
	      }

	      if (isMulti) {
	        var selectValues = selectValue.map(function (opt) {
	          var isOptionFocused = opt === focusedValue;
	          return _react.default.createElement(MultiValue, _extends({}, commonProps, {
	            components: {
	              Container: MultiValueContainer,
	              Label: MultiValueLabel,
	              Remove: MultiValueRemove
	            },
	            isFocused: isOptionFocused,
	            isDisabled: isDisabled,
	            key: _this4.getOptionValue(opt),
	            removeProps: {
	              onClick: function onClick() {
	                return _this4.removeValue(opt);
	              },
	              onTouchEnd: function onTouchEnd() {
	                return _this4.removeValue(opt);
	              },
	              onMouseDown: function onMouseDown(e) {
	                e.preventDefault();
	                e.stopPropagation();
	              }
	            },
	            data: opt
	          }), _this4.formatOptionLabel(opt, 'value'));
	        });
	        return selectValues;
	      }

	      if (inputValue) {
	        return null;
	      }

	      var singleValue = selectValue[0];
	      return _react.default.createElement(SingleValue, _extends({}, commonProps, {
	        data: singleValue,
	        isDisabled: isDisabled
	      }), this.formatOptionLabel(singleValue, 'value'));
	    }
	  }, {
	    key: "renderClearIndicator",
	    value: function renderClearIndicator() {
	      var ClearIndicator = this.components.ClearIndicator;
	      var commonProps = this.commonProps;
	      var _this$props16 = this.props,
	          isDisabled = _this$props16.isDisabled,
	          isLoading = _this$props16.isLoading;
	      var isFocused = this.state.isFocused;

	      if (!this.isClearable() || !ClearIndicator || isDisabled || !this.hasValue() || isLoading) {
	        return null;
	      }

	      var innerProps = {
	        onMouseDown: this.onClearIndicatorMouseDown,
	        onTouchEnd: this.onClearIndicatorTouchEnd,
	        'aria-hidden': 'true'
	      };
	      return _react.default.createElement(ClearIndicator, _extends({}, commonProps, {
	        innerProps: innerProps,
	        isFocused: isFocused
	      }));
	    }
	  }, {
	    key: "renderLoadingIndicator",
	    value: function renderLoadingIndicator() {
	      var LoadingIndicator = this.components.LoadingIndicator;
	      var commonProps = this.commonProps;
	      var _this$props17 = this.props,
	          isDisabled = _this$props17.isDisabled,
	          isLoading = _this$props17.isLoading;
	      var isFocused = this.state.isFocused;
	      if (!LoadingIndicator || !isLoading) return null;
	      var innerProps = {
	        'aria-hidden': 'true'
	      };
	      return _react.default.createElement(LoadingIndicator, _extends({}, commonProps, {
	        innerProps: innerProps,
	        isDisabled: isDisabled,
	        isFocused: isFocused
	      }));
	    }
	  }, {
	    key: "renderIndicatorSeparator",
	    value: function renderIndicatorSeparator() {
	      var _this$components2 = this.components,
	          DropdownIndicator = _this$components2.DropdownIndicator,
	          IndicatorSeparator = _this$components2.IndicatorSeparator; // separator doesn't make sense without the dropdown indicator

	      if (!DropdownIndicator || !IndicatorSeparator) return null;
	      var commonProps = this.commonProps;
	      var isDisabled = this.props.isDisabled;
	      var isFocused = this.state.isFocused;
	      return _react.default.createElement(IndicatorSeparator, _extends({}, commonProps, {
	        isDisabled: isDisabled,
	        isFocused: isFocused
	      }));
	    }
	  }, {
	    key: "renderDropdownIndicator",
	    value: function renderDropdownIndicator() {
	      var DropdownIndicator = this.components.DropdownIndicator;
	      if (!DropdownIndicator) return null;
	      var commonProps = this.commonProps;
	      var isDisabled = this.props.isDisabled;
	      var isFocused = this.state.isFocused;
	      var innerProps = {
	        onMouseDown: this.onDropdownIndicatorMouseDown,
	        onTouchEnd: this.onDropdownIndicatorTouchEnd,
	        'aria-hidden': 'true'
	      };
	      return _react.default.createElement(DropdownIndicator, _extends({}, commonProps, {
	        innerProps: innerProps,
	        isDisabled: isDisabled,
	        isFocused: isFocused
	      }));
	    }
	  }, {
	    key: "renderMenu",
	    value: function renderMenu() {
	      var _this5 = this;

	      var _this$components3 = this.components,
	          Group = _this$components3.Group,
	          GroupHeading = _this$components3.GroupHeading,
	          Menu = _this$components3.Menu,
	          MenuList = _this$components3.MenuList,
	          MenuPortal = _this$components3.MenuPortal,
	          LoadingMessage = _this$components3.LoadingMessage,
	          NoOptionsMessage = _this$components3.NoOptionsMessage,
	          Option = _this$components3.Option;
	      var commonProps = this.commonProps;
	      var _this$state9 = this.state,
	          focusedOption = _this$state9.focusedOption,
	          menuOptions = _this$state9.menuOptions;
	      var _this$props18 = this.props,
	          captureMenuScroll = _this$props18.captureMenuScroll,
	          inputValue = _this$props18.inputValue,
	          isLoading = _this$props18.isLoading,
	          loadingMessage = _this$props18.loadingMessage,
	          minMenuHeight = _this$props18.minMenuHeight,
	          maxMenuHeight = _this$props18.maxMenuHeight,
	          menuIsOpen = _this$props18.menuIsOpen,
	          menuPlacement = _this$props18.menuPlacement,
	          menuPosition = _this$props18.menuPosition,
	          menuPortalTarget = _this$props18.menuPortalTarget,
	          menuShouldBlockScroll = _this$props18.menuShouldBlockScroll,
	          menuShouldScrollIntoView = _this$props18.menuShouldScrollIntoView,
	          noOptionsMessage = _this$props18.noOptionsMessage,
	          onMenuScrollToTop = _this$props18.onMenuScrollToTop,
	          onMenuScrollToBottom = _this$props18.onMenuScrollToBottom;
	      if (!menuIsOpen) return null; // TODO: Internal Option Type here

	      var render = function render(props) {
	        // for performance, the menu options in state aren't changed when the
	        // focused option changes so we calculate additional props based on that
	        var isFocused = focusedOption === props.data;
	        props.innerRef = isFocused ? _this5.getFocusedOptionRef : undefined;
	        return _react.default.createElement(Option, _extends({}, commonProps, props, {
	          isFocused: isFocused
	        }), _this5.formatOptionLabel(props.data, 'menu'));
	      };

	      var menuUI;

	      if (this.hasOptions()) {
	        menuUI = menuOptions.render.map(function (item) {
	          if (item.type === 'group') {
	            var type = item.type,
	                group = _objectWithoutProperties(item, ["type"]);

	            var headingId = "".concat(item.key, "-heading");
	            return _react.default.createElement(Group, _extends({}, commonProps, group, {
	              Heading: GroupHeading,
	              headingProps: {
	                id: headingId
	              },
	              label: _this5.formatGroupLabel(item.data)
	            }), item.options.map(function (option) {
	              return render(option);
	            }));
	          } else if (item.type === 'option') {
	            return render(item);
	          }
	        });
	      } else if (isLoading) {
	        var message = loadingMessage({
	          inputValue: inputValue
	        });
	        if (message === null) return null;
	        menuUI = _react.default.createElement(LoadingMessage, commonProps, message);
	      } else {
	        var _message = noOptionsMessage({
	          inputValue: inputValue
	        });

	        if (_message === null) return null;
	        menuUI = _react.default.createElement(NoOptionsMessage, commonProps, _message);
	      }

	      var menuPlacementProps = {
	        minMenuHeight: minMenuHeight,
	        maxMenuHeight: maxMenuHeight,
	        menuPlacement: menuPlacement,
	        menuPosition: menuPosition,
	        menuShouldScrollIntoView: menuShouldScrollIntoView
	      };

	      var menuElement = _react.default.createElement(Menu_1.MenuPlacer, _extends({}, commonProps, menuPlacementProps), function (_ref6) {
	        var ref = _ref6.ref,
	            _ref6$placerProps = _ref6.placerProps,
	            placement = _ref6$placerProps.placement,
	            maxHeight = _ref6$placerProps.maxHeight;
	        return _react.default.createElement(Menu, _extends({}, commonProps, menuPlacementProps, {
	          innerRef: ref,
	          innerProps: {
	            onMouseDown: _this5.onMenuMouseDown,
	            onMouseMove: _this5.onMenuMouseMove
	          },
	          isLoading: isLoading,
	          placement: placement
	        }), _react.default.createElement(internal.ScrollCaptor, {
	          isEnabled: captureMenuScroll,
	          onTopArrive: onMenuScrollToTop,
	          onBottomArrive: onMenuScrollToBottom
	        }, _react.default.createElement(internal.ScrollBlock, {
	          isEnabled: menuShouldBlockScroll
	        }, _react.default.createElement(MenuList, _extends({}, commonProps, {
	          innerRef: _this5.getMenuListRef,
	          isLoading: isLoading,
	          maxHeight: maxHeight
	        }), menuUI))));
	      }); // positioning behaviour is almost identical for portalled and fixed,
	      // so we use the same component. the actual portalling logic is forked
	      // within the component based on `menuPosition`


	      return menuPortalTarget || menuPosition === 'fixed' ? _react.default.createElement(MenuPortal, _extends({}, commonProps, {
	        appendTo: menuPortalTarget,
	        controlElement: this.controlRef,
	        menuPlacement: menuPlacement,
	        menuPosition: menuPosition
	      }), menuElement) : menuElement;
	    }
	  }, {
	    key: "renderFormField",
	    value: function renderFormField() {
	      var _this6 = this;

	      var _this$props19 = this.props,
	          delimiter = _this$props19.delimiter,
	          isDisabled = _this$props19.isDisabled,
	          isMulti = _this$props19.isMulti,
	          name = _this$props19.name;
	      var selectValue = this.state.selectValue;
	      if (!name || isDisabled) return;

	      if (isMulti) {
	        if (delimiter) {
	          var value = selectValue.map(function (opt) {
	            return _this6.getOptionValue(opt);
	          }).join(delimiter);
	          return _react.default.createElement("input", {
	            name: name,
	            type: "hidden",
	            value: value
	          });
	        } else {
	          var input = selectValue.length > 0 ? selectValue.map(function (opt, i) {
	            return _react.default.createElement("input", {
	              key: "i-".concat(i),
	              name: name,
	              type: "hidden",
	              value: _this6.getOptionValue(opt)
	            });
	          }) : _react.default.createElement("input", {
	            name: name,
	            type: "hidden"
	          });
	          return _react.default.createElement("div", null, input);
	        }
	      } else {
	        var _value = selectValue[0] ? this.getOptionValue(selectValue[0]) : '';

	        return _react.default.createElement("input", {
	          name: name,
	          type: "hidden",
	          value: _value
	        });
	      }
	    }
	  }, {
	    key: "renderLiveRegion",
	    value: function renderLiveRegion() {
	      if (!this.state.isFocused) return null;
	      return _react.default.createElement(internal.A11yText, {
	        "aria-live": "assertive"
	      }, _react.default.createElement("p", {
	        id: "aria-selection-event"
	      }, "\xA0", this.state.ariaLiveSelection), _react.default.createElement("p", {
	        id: "aria-context"
	      }, "\xA0", this.constructAriaLiveMessage()));
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this$components4 = this.components,
	          Control = _this$components4.Control,
	          IndicatorsContainer = _this$components4.IndicatorsContainer,
	          SelectContainer = _this$components4.SelectContainer,
	          ValueContainer = _this$components4.ValueContainer;
	      var _this$props20 = this.props,
	          className = _this$props20.className,
	          id = _this$props20.id,
	          isDisabled = _this$props20.isDisabled,
	          menuIsOpen = _this$props20.menuIsOpen;
	      var isFocused = this.state.isFocused;
	      var commonProps = this.commonProps = this.getCommonProps();
	      return _react.default.createElement(SelectContainer, _extends({}, commonProps, {
	        className: className,
	        innerProps: {
	          id: id,
	          onKeyDown: this.onKeyDown
	        },
	        isDisabled: isDisabled,
	        isFocused: isFocused
	      }), this.renderLiveRegion(), _react.default.createElement(Control, _extends({}, commonProps, {
	        innerRef: this.getControlRef,
	        innerProps: {
	          onMouseDown: this.onControlMouseDown,
	          onTouchEnd: this.onControlTouchEnd
	        },
	        isDisabled: isDisabled,
	        isFocused: isFocused,
	        menuIsOpen: menuIsOpen
	      }), _react.default.createElement(ValueContainer, _extends({}, commonProps, {
	        isDisabled: isDisabled
	      }), this.renderPlaceholderOrValue(), this.renderInput()), _react.default.createElement(IndicatorsContainer, _extends({}, commonProps, {
	        isDisabled: isDisabled
	      }), this.renderClearIndicator(), this.renderLoadingIndicator(), this.renderIndicatorSeparator(), this.renderDropdownIndicator())), this.renderMenu(), this.renderFormField());
	    }
	  }]);

	  return Select;
	}(_react.Component);

	exports.default = Select;

	_defineProperty(Select, "defaultProps", defaultProps);
	});

	unwrapExports(Select_1);
	var Select_2 = Select_1.defaultProps;

	var stateManager = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.defaultProps = void 0;

	var _react = _interopRequireWildcard(React__default);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

	function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var defaultProps = {
	  defaultInputValue: '',
	  defaultMenuIsOpen: false,
	  defaultValue: null
	};
	exports.defaultProps = defaultProps;

	var manageState = function manageState(SelectComponent) {
	  var _class, _temp;

	  return _temp = _class =
	  /*#__PURE__*/
	  function (_Component) {
	    _inherits(StateManager, _Component);

	    function StateManager() {
	      var _getPrototypeOf2;

	      var _this;

	      _classCallCheck(this, StateManager);

	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StateManager)).call.apply(_getPrototypeOf2, [this].concat(args)));

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "select", void 0);

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
	        inputValue: _this.props.inputValue !== undefined ? _this.props.inputValue : _this.props.defaultInputValue,
	        menuIsOpen: _this.props.menuIsOpen !== undefined ? _this.props.menuIsOpen : _this.props.defaultMenuIsOpen,
	        value: _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue
	      });

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (value, actionMeta) {
	        _this.callProp('onChange', value, actionMeta);

	        _this.setState({
	          value: value
	        });
	      });

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onInputChange", function (value, actionMeta) {
	        // TODO: for backwards compatibility, we allow the prop to return a new
	        // value, but now inputValue is a controllable prop we probably shouldn't
	        var newValue = _this.callProp('onInputChange', value, actionMeta);

	        _this.setState({
	          inputValue: newValue !== undefined ? newValue : value
	        });
	      });

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMenuOpen", function () {
	        _this.callProp('onMenuOpen');

	        _this.setState({
	          menuIsOpen: true
	        });
	      });

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMenuClose", function () {
	        _this.callProp('onMenuClose');

	        _this.setState({
	          menuIsOpen: false
	        });
	      });

	      return _this;
	    }

	    _createClass(StateManager, [{
	      key: "focus",
	      value: function focus() {
	        this.select.focus();
	      }
	    }, {
	      key: "blur",
	      value: function blur() {
	        this.select.blur();
	      } // FIXME: untyped flow code, return any

	    }, {
	      key: "getProp",
	      value: function getProp(key) {
	        return this.props[key] !== undefined ? this.props[key] : this.state[key];
	      } // FIXME: untyped flow code, return any

	    }, {
	      key: "callProp",
	      value: function callProp(name) {
	        if (typeof this.props[name] === 'function') {
	          var _this$props;

	          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	            args[_key2 - 1] = arguments[_key2];
	          }

	          return (_this$props = this.props)[name].apply(_this$props, args);
	        }
	      }
	    }, {
	      key: "render",
	      value: function render() {
	        var _this2 = this;

	        var _this$props2 = this.props,
	            defaultInputValue = _this$props2.defaultInputValue,
	            defaultMenuIsOpen = _this$props2.defaultMenuIsOpen,
	            defaultValue = _this$props2.defaultValue,
	            props = _objectWithoutProperties(_this$props2, ["defaultInputValue", "defaultMenuIsOpen", "defaultValue"]);

	        return _react.default.createElement(SelectComponent, _extends({}, props, {
	          ref: function ref(_ref) {
	            _this2.select = _ref;
	          },
	          inputValue: this.getProp('inputValue'),
	          menuIsOpen: this.getProp('menuIsOpen'),
	          onChange: this.onChange,
	          onInputChange: this.onInputChange,
	          onMenuClose: this.onMenuClose,
	          onMenuOpen: this.onMenuOpen,
	          value: this.getProp('value')
	        }));
	      }
	    }]);

	    return StateManager;
	  }(_react.Component), _defineProperty(_class, "defaultProps", defaultProps), _temp;
	};

	var _default = manageState;
	exports.default = _default;
	});

	unwrapExports(stateManager);
	var stateManager_1 = stateManager.defaultProps;

	var Async$1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.makeAsyncSelect = exports.defaultProps = void 0;

	var _react = _interopRequireWildcard(React__default);

	var _Select = _interopRequireDefault(Select_1);



	var _stateManager = _interopRequireDefault(stateManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

	function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var defaultProps = {
	  cacheOptions: false,
	  defaultOptions: false,
	  filterOption: null
	};
	exports.defaultProps = defaultProps;

	var makeAsyncSelect = function makeAsyncSelect(SelectComponent) {
	  var _class, _temp;

	  return _temp = _class =
	  /*#__PURE__*/
	  function (_Component) {
	    _inherits(Async, _Component);

	    function Async(props) {
	      var _this;

	      _classCallCheck(this, Async);

	      _this = _possibleConstructorReturn(this, _getPrototypeOf(Async).call(this));

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "select", void 0);

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "lastRequest", void 0);

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mounted", false);

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "optionsCache", {});

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputChange", function (newValue, actionMeta) {
	        var _this$props = _this.props,
	            cacheOptions = _this$props.cacheOptions,
	            onInputChange = _this$props.onInputChange; // TODO

	        var inputValue = (0, utils.handleInputChange)(newValue, actionMeta, onInputChange);

	        if (!inputValue) {
	          delete _this.lastRequest;

	          _this.setState({
	            inputValue: '',
	            loadedInputValue: '',
	            loadedOptions: [],
	            isLoading: false,
	            passEmptyOptions: false
	          });

	          return;
	        }

	        if (cacheOptions && _this.optionsCache[inputValue]) {
	          _this.setState({
	            inputValue: inputValue,
	            loadedInputValue: inputValue,
	            loadedOptions: _this.optionsCache[inputValue],
	            isLoading: false,
	            passEmptyOptions: false
	          });
	        } else {
	          var request = _this.lastRequest = {};

	          _this.setState({
	            inputValue: inputValue,
	            isLoading: true,
	            passEmptyOptions: !_this.state.loadedInputValue
	          }, function () {
	            _this.loadOptions(inputValue, function (options) {
	              if (!_this.mounted) return;

	              if (options) {
	                _this.optionsCache[inputValue] = options;
	              }

	              if (request !== _this.lastRequest) return;
	              delete _this.lastRequest;

	              _this.setState({
	                isLoading: false,
	                loadedInputValue: inputValue,
	                loadedOptions: options || [],
	                passEmptyOptions: false
	              });
	            });
	          });
	        }

	        return inputValue;
	      });

	      _this.state = {
	        defaultOptions: Array.isArray(props.defaultOptions) ? props.defaultOptions : undefined,
	        inputValue: typeof props.inputValue !== 'undefined' ? props.inputValue : '',
	        isLoading: props.defaultOptions === true ? true : false,
	        loadedOptions: [],
	        passEmptyOptions: false
	      };
	      return _this;
	    }

	    _createClass(Async, [{
	      key: "componentDidMount",
	      value: function componentDidMount() {
	        var _this2 = this;

	        this.mounted = true;
	        var defaultOptions = this.props.defaultOptions;
	        var inputValue = this.state.inputValue;

	        if (defaultOptions === true) {
	          this.loadOptions(inputValue, function (options) {
	            if (!_this2.mounted) return;
	            var isLoading = !!_this2.lastRequest;

	            _this2.setState({
	              defaultOptions: options || [],
	              isLoading: isLoading
	            });
	          });
	        }
	      }
	    }, {
	      key: "componentWillReceiveProps",
	      value: function componentWillReceiveProps(nextProps) {
	        // if the cacheOptions prop changes, clear the cache
	        if (nextProps.cacheOptions !== this.props.cacheOptions) {
	          this.optionsCache = {};
	        }

	        if (nextProps.defaultOptions !== this.props.defaultOptions) {
	          this.setState({
	            defaultOptions: Array.isArray(nextProps.defaultOptions) ? nextProps.defaultOptions : undefined
	          });
	        }
	      }
	    }, {
	      key: "componentWillUnmount",
	      value: function componentWillUnmount() {
	        this.mounted = false;
	      }
	    }, {
	      key: "focus",
	      value: function focus() {
	        this.select.focus();
	      }
	    }, {
	      key: "blur",
	      value: function blur() {
	        this.select.blur();
	      }
	    }, {
	      key: "loadOptions",
	      value: function loadOptions(inputValue, callback) {
	        var loadOptions = this.props.loadOptions;
	        if (!loadOptions) return callback();
	        var loader = loadOptions(inputValue, callback);

	        if (loader && typeof loader.then === 'function') {
	          loader.then(callback, function () {
	            return callback();
	          });
	        }
	      }
	    }, {
	      key: "render",
	      value: function render() {
	        var _this3 = this;

	        var _this$props2 = this.props,
	            loadOptions = _this$props2.loadOptions,
	            props = _objectWithoutProperties(_this$props2, ["loadOptions"]);

	        var _this$state = this.state,
	            defaultOptions = _this$state.defaultOptions,
	            inputValue = _this$state.inputValue,
	            isLoading = _this$state.isLoading,
	            loadedInputValue = _this$state.loadedInputValue,
	            loadedOptions = _this$state.loadedOptions,
	            passEmptyOptions = _this$state.passEmptyOptions;
	        var options = passEmptyOptions ? [] : inputValue && loadedInputValue ? loadedOptions : defaultOptions || [];
	        return _react.default.createElement(SelectComponent, _extends({}, props, {
	          ref: function ref(_ref) {
	            _this3.select = _ref;
	          },
	          options: options,
	          isLoading: isLoading,
	          onInputChange: this.handleInputChange
	        }));
	      }
	    }]);

	    return Async;
	  }(_react.Component), _defineProperty(_class, "defaultProps", defaultProps), _temp;
	};

	exports.makeAsyncSelect = makeAsyncSelect;
	var SelectState = (0, _stateManager.default)(_Select.default);

	var _default = makeAsyncSelect(SelectState);

	exports.default = _default;
	});

	var Select$1 = unwrapExports(Async$1);
	var Async_1 = Async$1.makeAsyncSelect;
	var Async_2 = Async$1.defaultProps;

	class Edit$6 extends React__default.Component {
	  constructor(props) {
	    super(props);
	    this.loadOptions = this.loadOptions.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	  }

	  handleChange(selected) {
	    const {
	      onChange,
	      property
	    } = this.props;
	    this.selected = selected.record;
	    onChange(property.name, selected.value, selected.record);
	  }

	  async loadOptions(inputValue) {
	    const {
	      property
	    } = this.props;
	    const api = new ApiClient();
	    const records = await api.searchRecords({
	      resourceId: property.reference,
	      query: inputValue
	    });
	    return records.map(record => ({
	      value: record.id,
	      label: record.title,
	      record
	    }));
	  }

	  render() {
	    const {
	      property,
	      record
	    } = this.props;
	    const error = record.errors && record.errors[property.name];
	    const reference = record.populated && record.populated[property.name];
	    let selectedOption = reference && {
	      value: reference.id,
	      label: reference.title
	    };

	    if (this.selected) {
	      selectedOption = {
	        value: this.selected.id,
	        label: this.selected.title
	      };
	    }

	    return React__default.createElement(PropertyInEdit, {
	      property: property,
	      error: error
	    }, React__default.createElement(Select$1, {
	      cacheOptions: true,
	      value: selectedOption,
	      styles: selectStyles,
	      defaultOptions: true,
	      loadOptions: this.loadOptions,
	      onChange: this.handleChange
	    }));
	  }

	}
	Edit$6.propTypes = {
	  property: simplifiedPropertyType.isRequired,
	  record: recordType.isRequired,
	  onChange: PropTypes$1.func.isRequired
	};

	const ReferenceValue = props => {
	  const {
	    property,
	    record
	  } = props;
	  const h = new ViewHelpers();
	  const refId = record.params[property.name];
	  const populated = record.populated[property.name];
	  const value = populated && populated.title || refId;

	  if (populated && populated.recordActions.find(a => a.name === 'show')) {
	    const href = h.recordActionUrl({
	      resourceId: property.reference,
	      recordId: refId,
	      actionName: 'show'
	    });
	    return React__default.createElement(reactRouterDom.Link, {
	      to: href
	    }, value);
	  }

	  return React__default.createElement("span", null, value);
	};

	class Show$6 extends React__default.PureComponent {
	  render() {
	    const {
	      property,
	      record
	    } = this.props;
	    return React__default.createElement(PropertyInShow, {
	      property: property
	    }, React__default.createElement(ReferenceValue, {
	      property: property,
	      record: record
	    }));
	  }

	}
	Show$6.propTypes = {
	  property: propertyType.isRequired,
	  record: recordType.isRequired
	};

	class List$6 extends React__default.PureComponent {
	  render() {
	    const {
	      property,
	      record
	    } = this.props;
	    return React__default.createElement(ReferenceValue, {
	      property: property,
	      record: record
	    });
	  }

	}
	List$6.propTypes = {
	  property: propertyType.isRequired,
	  record: recordType.isRequired
	};

	class Filter$4 extends React__default.PureComponent {
	  constructor(props) {
	    super(props);
	    this.loadOptions = this.loadOptions.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	  }

	  handleChange(selected) {
	    const {
	      onChange,
	      property
	    } = this.props;
	    onChange(property.name, selected ? selected.value : '');
	  }

	  async loadOptions(inputValue) {
	    this.api = new ApiClient();
	    const {
	      property
	    } = this.props;
	    const records = await this.api.searchRecords({
	      resourceId: property.reference,
	      query: inputValue
	    });
	    this.options = records.map(r => ({
	      value: r.id,
	      label: r.title
	    }));
	    return this.options;
	  }

	  render() {
	    const {
	      property,
	      filter
	    } = this.props;
	    const value = typeof filter[property.name] === 'undefined' ? '' : filter[property.name];
	    const selected = (this.options || []).find(o => o.value === value);
	    return React__default.createElement(PropertyInFilter, {
	      property: property
	    }, React__default.createElement(Select$1, {
	      value: typeof selected === 'undefined' ? '' : selected,
	      isClearable: true,
	      cacheOptions: true,
	      styles: filterStyles,
	      loadOptions: this.loadOptions,
	      onChange: this.handleChange,
	      defaultOptions: true
	    }));
	  }

	}
	Filter$4.propTypes = {
	  property: propertyType.isRequired,
	  onChange: PropTypes$1.func.isRequired,
	  // eslint-disable-next-line react/forbid-prop-types
	  filter: PropTypes$1.object
	};
	Filter$4.defaultProps = {
	  filter: {}
	};

	var reference = {
	  edit: Edit$6,
	  show: Show$6,
	  list: List$6,
	  filter: Filter$4
	};

	const types$1 = {
	  boolean,
	  datetime,
	  reference,
	  date: datetime,
	  richtext
	};
	/**
	 * Component which renders properties in all the places in the AdminBro UI. By all the
	 * places I mean:
	 * - **list**: on the List,
	 * - **edit**: on default actions where user can modify the record like: {@link EditAction},
	 * and {@link NewAction},
	 * - **show**: on the default {@link ShowAction} where user can see the details of a record,
	 * - **filter**: and finally on the sidebar filter,
	 *
	 * Based on the type of given property and where the property is rendered **BasePropertyComponent**
	 * picks Component to use. That is how **date** fields are rendered as **datepickers**
	 * or **boolean** values as **checkbox**'es.
	 *
	 * You can override default behaviour by changing **components** param
	 * for given property in **AdminBroOptions**. Take a look at the folowing example:
	 *
	 * ```
	 * const AdminBro = require('admin-bro')
	 * const ResourceModel = require('./resource-model')
	 * const AdminBroOptions = {
	 *   resources: [{
	 *     resource: ResourceModel
	 *     options: {
	 *       properties: {
	 *         name: {
	 *           components: {
	 *             show: AdminBro.bundle('./my-react-component'),
	 *           },
	 *         },
	 *       },
	 *     },
	 *   }],
	 * }
	 * ```
	 *
	 * In the example above we are altering how **name** property will look
	 * like on the {@link ShowAction}. When we will define **my-react-component.jsx** like this:
	 *
	 * ```
	 * import React from 'react'
	 * import PropertyInShow from 'admin-bro/components'
	 *
	 * const MyReactComponent = props => {
	 *   const { record, property } = props
	 *   const value = record.params[property.name] === 'foo' ? 'bar' : 'zoe'
	 *   return (
	 *     <PropertyInShow property={property}>
	 *       {value}
	 *     </PropertyInShow>
	 *   )
	 * }
	 * ```
	 *
	 * When record value for given property (**name**) equals 'foo' we will reder 'bar', otherwise 'zoe'
	 *
	 * We also use {@link PropertyInShow} helper component to render field with a label that it looks
	 * similar to alredy defined properties. For other places you can use
	 * a different _wrapper components_:
	 * - `edit`: {@link PropertyInEdit}
	 * - `show`: {@link PropertyInShow}
	 * - `filter`: {@link PropertyInFilter}
	 * - `list`: doesn't have any special wrapper,
	 *
	 * In your components you have access to the following prop types:
	 *
	 * @component
	 * @name BasePropertyComponent
	 * @category Base
	 * @example
	 * const booleanProperty = {
	 *   isTitle: false,
	 *   name: 'awesome',
	 *   isId: false,
	 *   position: -1,
	 *   label: 'I am awesome',
	 *   type: 'boolean',
	 * }
	 *
	 * const stringProperty = {
	 *   isTitle: true,
	 *   name: 'name',
	 *   isId: false,
	 *   position: -1,
	 *   label: 'Name of a user',
	 *   type: 'string',
	 * }
	 * // Resource is taken from the database
	 * const resource = {
	 *   id: 'User',
	 *   name: 'User Model',
	 *   titleProperty: 'name',
	 *   resourceActions: [],
	 *   listProperties: [booleanProperty, stringProperty],
	 *   editProperties: [booleanProperty, stringProperty],
	 *   showProperties: [booleanProperty, stringProperty],
	 *   filterProperties: [booleanProperty, stringProperty],
	 * }
	 *
	 * const record = {
	 *   id: '1',
	 *   title: 'John',
	 *   params: {
	 *     name: 'John',
	 *     gender: 'male',
	 *   },
	 *   recordActions: [],
	 * }
	 *
	 * return (
	 *   <WrapperBox border>
	 *     <BasePropertyComponent
	 *       property={booleanProperty}
	 *       resource={resource}
	 *       where="edit"
	 *       record={record}
	 *     />
	 *     <BasePropertyComponent
	 *       property={stringProperty}
	 *       resource={resource}
	 *       where="edit"
	 *       record={record}
	 *     />
	 *   </WrapperBox>
	 * )
	 */

	class BasePropertyComponent extends React__default.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      isClient: false
	    };
	  }

	  componentDidMount() {
	    this.setState({
	      isClient: true
	    });
	  }

	  render() {
	    const {
	      property,
	      resource,
	      record,
	      filter,
	      where,
	      onChange
	    } = this.props;
	    const {
	      isClient
	    } = this.state;
	    let Component = types$1[property.type] && types$1[property.type][where] || defaultType[where];

	    if (property.components && property.components[where] && isClient) {
	      Component = AdminBro.UserComponents[property.components[where]];
	      return React__default.createElement(ErrorBoundary, null, React__default.createElement(Component, {
	        property: property,
	        resource: resource,
	        record: record,
	        filter: filter,
	        onChange: onChange
	      }));
	    }

	    const Array = ArrayType[where];
	    const Mixed = MixedType[where];

	    if (property.isArray) {
	      return React__default.createElement(Array, _extends_1({}, this.props, {
	        ItemComponent: BasePropertyComponent
	      }));
	    }

	    if (property.type === 'mixed' && property.subProperties && property.subProperties.length) {
	      return React__default.createElement(Mixed, _extends_1({}, this.props, {
	        ItemComponent: BasePropertyComponent
	      }));
	    }

	    return React__default.createElement(ErrorBoundary, null, React__default.createElement(Component, {
	      property: property,
	      resource: resource,
	      record: record,
	      filter: filter,
	      onChange: onChange
	    }));
	  }

	}
	BasePropertyComponent.propTypes = {
	  /**
	   * Object of type: {@link PropertyJSON}
	   */
	  property: propertyType.isRequired,

	  /**
	   * Object of type: {@link ResourceJSON}
	   */
	  resource: resourceType.isRequired,

	  /**
	   * Object of type: {@link RecordJSON}
	   */
	  record: recordType,

	  /**
	   * Filter object taken from the query params. It is used on the _filter_ components
	   */
	  filter: PropTypes$1.object,
	  // eslint-disable-line react/forbid-prop-types
	  where: PropTypes$1.oneOf(['edit', 'filter', 'show', 'list']).isRequired,

	  /**
	   * Function which indicates change of the property value. It takes either
	   * one argument which is entire {@link RecordJSON} or 2 arguments - one
	   * property.name and the second one: value. Used by the _edit_ and _filter_ components
	   */
	  onChange: PropTypes$1.func
	};
	BasePropertyComponent.defaultProps = {
	  filter: {},
	  record: null,
	  onChange: null
	};

	const camelizePropertyType = type => ({
	  Edit: type.edit,
	  Show: type.show,
	  List: type.list,
	  Filter: type.filter
	});

	BasePropertyComponent.DefaultType = camelizePropertyType(defaultType);
	BasePropertyComponent.Boolean = camelizePropertyType(boolean);
	BasePropertyComponent.DateTime = camelizePropertyType(datetime);
	BasePropertyComponent.RichText = camelizePropertyType(richtext);
	BasePropertyComponent.Reference = camelizePropertyType(reference);

	/**
	 * @name NewAction
	 * @category Actions
	 * @description Shows form for creating a given record.
	 * @component
	 * @private
	 */

	class New extends React__default.Component {
	  constructor(props) {
	    super(props);
	    const {
	      record
	    } = props;
	    this.api = new ApiClient();
	    this.handleChange = this.handleChange.bind(this);
	    this.state = {
	      record: {
	        params: record && record.params || {},
	        errors: record && record.errors || {},
	        populated: record && record.populated || {}
	      }
	    };
	  }

	  handleChange(propertyOrRecord, value) {
	    if (typeof value === 'undefined' && propertyOrRecord.params) {
	      this.setState({
	        record: propertyOrRecord
	      });
	    } else {
	      this.setState(state => ({
	        record: { ...state.record,
	          params: { ...state.record.params,
	            [propertyOrRecord]: value
	          }
	        }
	      }));
	    }
	  }

	  handleSubmit(event) {
	    event.preventDefault();
	    const {
	      resource,
	      history,
	      addNotice
	    } = this.props;
	    const {
	      record
	    } = this.state;
	    const {
	      params
	    } = record;
	    this.api.resourceAction({
	      resourceId: resource.id,
	      actionName: 'new',
	      payload: {
	        record: params
	      }
	    }).then(response => {
	      if (response.data.redirectUrl) {
	        addNotice({
	          message: 'Record has been successfully created!'
	        });
	        history.push(response.data.redirectUrl);
	      } else {
	        addNotice({
	          type: 'error',
	          message: 'There were errors in the record object. Check them out'
	        });
	        this.setState(state => ({
	          record: { ...state.record,
	            errors: response.data.record.errors
	          }
	        }));
	      }
	    });
	    return false;
	  }

	  render() {
	    const {
	      resource
	    } = this.props;
	    const properties = resource.editProperties;
	    const {
	      record
	    } = this.state;
	    return React__default.createElement(WrapperBox, {
	      border: true
	    }, React__default.createElement("form", {
	      onSubmit: this.handleSubmit.bind(this)
	    }, properties.map(property => React__default.createElement(BasePropertyComponent, {
	      key: property.name,
	      where: "edit",
	      property: property,
	      resource: resource,
	      onChange: this.handleChange,
	      record: record
	    })), React__default.createElement(StyledButton, {
	      as: "button",
	      type: "submit",
	      className: "is-primary"
	    }, React__default.createElement("i", {
	      className: "icomoon-save"
	    }), React__default.createElement("span", {
	      className: "btn-text"
	    }, "Save"))));
	  }

	}

	New.propTypes = {
	  /**
	   * Object of type: {@link ResourceJSON}
	   */
	  resource: resourceType.isRequired,

	  /**
	   * history object used by ReactRouter
	   */
	  history: historyType.isRequired,

	  /**
	   * Object of type: {@link RecordJSON}
	   */
	  record: recordType,

	  /**
	   * Function which adds a new `notice` information.
	   */
	  addNotice: PropTypes$1.func.isRequired
	};
	New.defaultProps = {
	  record: null
	};
	var _new = withNotice(reactRouterDom.withRouter(New));

	/**
	 * @name EditAction
	 * @category Actions
	 * @description Shows form for updating a given record.
	 * @private
	 * @component
	 */

	class Edit$7 extends React__default.Component {
	  constructor(props) {
	    super(props);
	    const {
	      record
	    } = props;
	    this.handleChange = this.handleChange.bind(this);
	    this.state = {
	      record
	    };
	    this.api = new ApiClient();
	  }

	  handleChange(propertyOrRecord, value) {
	    if (typeof value === 'undefined' && propertyOrRecord.params) {
	      this.setState({
	        record: propertyOrRecord
	      });
	    } else {
	      this.setState(state => ({
	        record: { ...state.record,
	          params: { ...state.record.params,
	            [propertyOrRecord]: value
	          }
	        }
	      }));
	    }
	  }

	  handleSubmit(event) {
	    const {
	      resource,
	      history,
	      addNotice
	    } = this.props;
	    const {
	      record
	    } = this.state;
	    this.api.recordAction({
	      resourceId: resource.id,
	      actionName: 'edit',
	      recordId: record.id,
	      payload: {
	        record: record.params
	      }
	    }).then(response => {
	      if (response.data.redirectUrl) {
	        history.push(response.data.redirectUrl);
	        addNotice({
	          message: 'Record has been successfully updated!'
	        });
	      } else {
	        addNotice({
	          type: 'error',
	          message: 'There were errors in the record object. Check them out'
	        });
	        this.setState(state => ({
	          record: { ...state.record,
	            errors: response.data.record.errors
	          }
	        }));
	      }
	    });
	    event.preventDefault();
	    return false;
	  }

	  render() {
	    const {
	      resource
	    } = this.props;
	    const properties = resource.editProperties;
	    const {
	      record
	    } = this.state;
	    return React__default.createElement(WrapperBox, {
	      border: true
	    }, React__default.createElement("form", {
	      onSubmit: this.handleSubmit.bind(this)
	    }, properties.map(property => React__default.createElement(BasePropertyComponent, {
	      key: property.name,
	      where: "edit",
	      onChange: this.handleChange,
	      property: property,
	      resource: resource,
	      record: record
	    })), React__default.createElement(StyledButton, {
	      as: "button",
	      type: "submit",
	      className: "is-primary"
	    }, React__default.createElement("i", {
	      className: "icomoon-save"
	    }), React__default.createElement("span", {
	      className: "btn-text"
	    }, "Save"))));
	  }

	}

	Edit$7.propTypes = {
	  /**
	   * Object of type: {@link ResourceJSON}
	   */
	  resource: resourceType.isRequired,

	  /**
	   * Object of type: {@link ActionJSON}
	   */
	  record: recordType.isRequired,

	  /**
	   * history object used by ReactRouter
	   */
	  history: historyType.isRequired,

	  /**
	   * Function which adds a new `notice` information.
	   */
	  addNotice: PropTypes$1.func.isRequired
	};
	var edit = withNotice(reactRouterDom.withRouter(Edit$7));

	/**
	 * @name ShowAction
	 * @category Actions
	 * @description Shows a given record.
	 * @component
	 * @private
	 */

	const Show$7 = props => {
	  const {
	    resource,
	    record
	  } = props;
	  const properties = resource.showProperties;
	  return React__default.createElement(WrapperBox, {
	    border: true
	  }, properties.map(property => React__default.createElement(BasePropertyComponent, {
	    key: property.name,
	    where: "show",
	    property: property,
	    resource: resource,
	    record: record
	  })));
	};

	Show$7.propTypes = {
	  /**
	   * Object of type: {@link ResourceJSON}
	   */
	  resource: resourceType.isRequired,

	  /**
	   * Id of a given record
	   */
	  record: recordType.isRequired
	};

	const Td = styled__default.td.withConfig({
	  displayName: "record-in-list__Td",
	  componentId: "sc-145opzz-0"
	})(["&&&{color:", ";& a:not(.in-dropdown){color:", ";}&.main{font-weight:bold;}}"], ({
	  theme
	}) => theme.colors.defaultText, ({
	  theme
	}) => theme.colors.primary);
	class RecordInList extends React__default.PureComponent {
	  render() {
	    const {
	      resource,
	      record,
	      actionPerformed,
	      isLoading
	    } = this.props;
	    const {
	      recordActions
	    } = record;
	    return React__default.createElement("tr", null, resource.listProperties.map(property => React__default.createElement(Td, {
	      key: property.name,
	      className: resource.titleProperty.name === property.name ? 'main' : null
	    }, isLoading ? React__default.createElement(Placeholder, {
	      style: {
	        height: 14
	      }
	    }) : React__default.createElement(BasePropertyComponent, {
	      key: property.name,
	      where: "list",
	      property: property,
	      resource: resource,
	      record: record
	    }))), React__default.createElement(Td, {
	      key: "options"
	    }, recordActions.length ? React__default.createElement(Dropdown$1, {
	      className: "is-right is-hoverable"
	    }, recordActions.map(action => React__default.createElement(ActionButton$1, {
	      action: action,
	      key: action.name,
	      resourceId: resource.id,
	      recordId: record.id,
	      actionPerformed: actionPerformed,
	      className: "is-white in-dropdown"
	    }))) : ''));
	  }

	}

	const Th = styled__default.th.withConfig({
	  displayName: "property-header__Th",
	  componentId: "ja7yij-0"
	})(["&&&{font-size:", ";text-transform:uppercase;color:", ";font-weight:normal;padding:", ";letter-spacing:0.1em;border:none;}"], ({
	  theme
	}) => theme.fonts.min, ({
	  theme
	}) => theme.colors.lightText, ({
	  theme
	}) => theme.sizes.padding);
	const StyledLink = styled__default(reactRouterDom.NavLink).attrs({
	  className: 'is-sortable text-small'
	}).withConfig({
	  displayName: "property-header__StyledLink",
	  componentId: "ja7yij-1"
	})(["color:", ";&.active{color:", ";}& > i{margin-left:", "}"], ({
	  theme
	}) => theme.colors.lightText, ({
	  theme
	}) => theme.colors.primary, ({
	  theme
	}) => theme.sizes.padding);

	class SortLink extends React__default.PureComponent {
	  constructor(props) {
	    super(props);
	    this.isActive = this.isActive.bind(this);
	  }

	  isActive() {
	    const {
	      sortBy,
	      property
	    } = this.props;
	    return sortBy === property.name;
	  }

	  render() {
	    const {
	      property,
	      location,
	      direction
	    } = this.props;
	    const query = new URLSearchParams(location.search);
	    const opositeDirection = this.isActive() && direction === 'asc' ? 'desc' : 'asc';
	    const sortedByClass = `icomoon-dropdown-${direction === 'asc' ? 'open' : 'close'}`;
	    query.set('direction', opositeDirection);
	    query.set('sortBy', property.name);
	    return React__default.createElement(StyledLink, {
	      to: {
	        search: query.toString()
	      },
	      isActive: this.isActive
	    }, property.label, this.isActive() ? React__default.createElement("i", {
	      className: sortedByClass
	    }) : '');
	  }

	}

	const PropertyHeader = props => {
	  const {
	    property,
	    titleProperty
	  } = props;
	  const isMain = property.name === titleProperty.name;
	  return React__default.createElement(Th, {
	    className: isMain ? 'main' : null
	  }, property.isSortable ? React__default.createElement(SortLink, props) : property.label);
	};

	SortLink.propTypes = {
	  property: propertyType.isRequired,
	  location: locationType.isRequired,
	  direction: PropTypes$1.string.isRequired,
	  sortBy: PropTypes$1.string.isRequired
	};
	PropertyHeader.propTypes = {
	  property: propertyType.isRequired,

	  /**
	   * Property which should be treated as main property.
	   */
	  titleProperty: propertyType.isRequired,

	  /**
	   * currently selected direction. Either 'asc' or 'desc'.
	   */
	  direction: PropTypes$1.string.isRequired,

	  /**
	   * currently selected field by which list is sorted.
	   */
	  sortBy: PropTypes$1.string.isRequired
	};
	var PropertyHeader$1 = reactRouterDom.withRouter(PropertyHeader);

	/**
	 * Prints `thead` section for table with records.
	 *
	 * @component
	 * @example <caption>List with 2 properties</caption>
	 * const properties = [{
	 *   label: 'First Name',
	 *   name: 'firstName',
	 *   isSortable: true,
	 * }, {
	 *   label: 'Last Name',
	 *   name: 'lastName',
	 * }]
	 * return (
	 * <WrapperBox border>
	 *   <Table>
	 *    <RecordsTableHeader
	 *      properties={properties}
	 *      titleProperty={properties[0]}
	 *      sortBy={'firstName'}
	 *      direction={'asc'}
	 *    />
	 *    <tbody><tr>
	 *      <td>John</td>
	 *      <td>Doe</td>
	 *      <td><StyledButton>Do something with John</StyledButton></td>
	 *    </tr></tbody>
	 *   </Table>
	 * </WrapperBox>
	 * )
	 */

	const RecordsTableHeader = props => {
	  const {
	    titleProperty,
	    properties,
	    sortBy,
	    direction
	  } = props;
	  return React__default.createElement("thead", null, React__default.createElement("tr", {
	    key: "header"
	  }, properties.map(property => React__default.createElement(PropertyHeader$1, {
	    key: property.name,
	    titleProperty: titleProperty,
	    property: property,
	    sortBy: sortBy,
	    direction: direction
	  })), React__default.createElement("th", {
	    key: "actions",
	    style: {
	      width: 80
	    }
	  })));
	};

	RecordsTableHeader.propTypes = {
	  /**
	   * {@link PropertyJSON}
	   */
	  titleProperty: propertyType.isRequired,

	  /**
	   * Array of {@link PropertyJSON}
	   */
	  properties: PropTypes$1.arrayOf(propertyType).isRequired,

	  /**
	   * Name of the property which should be marked as currently sorted by
	   */
	  sortBy: PropTypes$1.string.isRequired,

	  /**
	   * Sort direction
	   */
	  direction: PropTypes$1.oneOf(['asc', 'desc']).isRequired
	};

	const NoRecords = props => {
	  const {
	    resource
	  } = props;
	  const canCreate = resource.resourceActions.find(a => a.name === 'new');
	  const h = new ViewHelpers();
	  const newAction = h.resourceActionUrl({
	    resourceId: resource.id,
	    actionName: 'new'
	  });
	  return React__default.createElement("div", {
	    className: "content has-text-centered"
	  }, React__default.createElement("h3", null, "No records"), React__default.createElement("p", null, "There are no records in this resource.", canCreate ? React__default.createElement(React__default.Fragment, null, 'Create ', React__default.createElement(reactRouterDom.Link, {
	    to: newAction
	  }, "first record")) : ''));
	};

	NoRecords.propTypes = {
	  resource: resourceType.isRequired
	};

	const RecordsTable = props => {
	  const {
	    resource,
	    records,
	    actionPerformed,
	    sortBy,
	    direction,
	    isLoading
	  } = props;

	  if (!records.length) {
	    return React__default.createElement(NoRecords, {
	      resource: resource
	    });
	  }

	  return React__default.createElement(Table, null, React__default.createElement(RecordsTableHeader, {
	    properties: resource.listProperties,
	    titleProperty: resource.titleProperty,
	    direction: direction,
	    sortBy: sortBy
	  }), React__default.createElement("tbody", null, records.map(record => React__default.createElement(RecordInList, {
	    record: record,
	    resource: resource,
	    key: record.id,
	    actionPerformed: actionPerformed,
	    isLoading: isLoading
	  }))));
	};

	RecordsTable.propTypes = {
	  resource: resourceType.isRequired,
	  records: PropTypes$1.arrayOf(recordType).isRequired,
	  actionPerformed: PropTypes$1.func.isRequired,
	  sortBy: PropTypes$1.string.isRequired,
	  direction: PropTypes$1.string.isRequired,
	  isLoading: PropTypes$1.bool.isRequired
	};

	/**
	 * @name NewAction
	 * @category Actions
	 * @description Shows form for creating a given record.
	 * @component
	 * @private
	 */

	class List$7 extends React__default.Component {
	  constructor(props) {
	    super(props);
	    this.api = new ApiClient();
	    this.handleActionPerformed = this.handleActionPerformed.bind(this);
	    this.state = {
	      records: [],
	      page: 1,
	      perPage: 20,
	      total: 0,
	      loading: true,
	      direction: 'asc',
	      sortBy: null
	    };
	  }

	  componentDidMount() {
	    this._fetchData();
	  }

	  componentDidUpdate(prevProps) {
	    const {
	      resource,
	      location
	    } = this.props;

	    if (resource.id !== prevProps.resource.id || location.search !== prevProps.location.search) {
	      this._fetchData();
	    }
	  }

	  _fetchData() {
	    const {
	      location,
	      resource
	    } = this.props;
	    const api = new ApiClient();
	    this.setState({
	      loading: true
	    });
	    const query = new URLSearchParams(location.search);
	    api.resourceAction({
	      actionName: 'list',
	      resourceId: resource.id,
	      params: query
	    }).then(response => {
	      this.setState({
	        records: response.data.records,
	        page: response.data.meta.page,
	        perPage: response.data.meta.perPage,
	        total: response.data.meta.total,
	        direction: response.data.meta.direction,
	        sortBy: response.data.meta.sortBy,
	        loading: false
	      });
	    });
	  }

	  handleActionPerformed() {
	    this._fetchData();
	  }

	  render() {
	    const {
	      resource
	    } = this.props;
	    const {
	      records,
	      page,
	      perPage,
	      total,
	      loading,
	      direction,
	      sortBy
	    } = this.state;
	    return React__default.createElement(WrapperBox, {
	      border: true
	    }, React__default.createElement(RecordsTable, {
	      resource: resource,
	      records: records,
	      actionPerformed: this.handleActionPerformed,
	      direction: direction,
	      sortBy: sortBy,
	      isLoading: loading
	    }), React__default.createElement(Paginate$1, {
	      page: page,
	      perPage: perPage,
	      total: total
	    }));
	  }

	}

	List$7.propTypes = {
	  /**
	   * Object of type: {@link ResourceJSON}
	   */
	  resource: resourceType.isRequired,
	  location: locationType.isRequired
	};
	var list = withNotice(reactRouterDom.withRouter(List$7));



	var actions = /*#__PURE__*/Object.freeze({
		'new': _new,
		edit: edit,
		show: Show$7,
		list: list
	});

	// eslint-disable-next-line import/prefer-default-export
	const DOCS = 'https://softwarebrothers.github.io/admin-bro-dev';

	/**
	 * Component which renders all the default and custom actions for both the Resource and the Record.
	 *
	 * It passes all props down to the actual Action component.
	 *
	 * Example of creating your own actions:
	 * ```
	 * // AdminBro options
	 * const AdminBroOptions = {
	 *   resources: [
	 *      resource,
	 *      options: {
	 *        actions: {
	 *           myNewAction: {
	 *             label: 'amazing action',
	 *             icon: 'fas fa-eye',
	 *             inVisible: (resource, record) => record.param('email') !== '',
	 *             actionType: 'record',
	 *             component: AdminBro.bundle('./my-new-action'),
	 *             handler: (request, response, data) => {
	 *               return {
	 *                  ...
	 *               }
	 *             }
	 *           }
	 *        }
	 *      }
	 *   ]
	 * }
	 * ```
	 *
	 * ```
	 * // ./my-new-action.jsx
	 * import WrapperBox from 'admin-bro/components'
	 *
	 * const MyNewAction = (props) => {
	 *   const { resource, action, record } = props
	 *   // do something with the props and render action
	 *   return (
	 *     <WrapperBox>Some Action Content</WrapperBox>
	 *   )
	 * }
	 * ```
	 *
	 * @component
	 * @name BaseActionComponent
	 * @category Base
	 */

	class BaseActionComponent extends React__default.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      isClient: false
	    };
	  }

	  componentDidMount() {
	    this.setState({
	      isClient: true
	    });
	  }

	  render() {
	    const {
	      resource,
	      action,
	      record
	    } = this.props;
	    const {
	      isClient
	    } = this.state;
	    const documentationLink = [DOCS, 'BaseAction.html'].join('/');
	    let Action = actions[action.name];

	    if (isClient && action.component) {
	      Action = AdminBro.UserComponents[action.component];
	    }

	    if (Action) {
	      return React__default.createElement(ErrorBoundary, null, React__default.createElement(Action, {
	        action: action,
	        resource: resource,
	        record: record
	      }));
	    }

	    return Action || React__default.createElement(WrapperBox, {
	      border: true
	    }, React__default.createElement("div", {
	      className: "notification"
	    }, "You have to implement action component for your Action. See:", ' ', React__default.createElement("a", {
	      href: documentationLink
	    }, "the documentation")));
	  }

	}

	BaseActionComponent.propTypes = {
	  /**
	   * Object of type: {@link ResourceJSON}
	   */
	  resource: resourceType.isRequired,

	  /**
	   * Object of type: {@link ActionJSON}
	   */
	  action: actionType.isRequired,

	  /**
	   * Object of type: {@link RecordJSON}
	   */
	  record: recordType
	};
	BaseActionComponent.defaultProps = {
	  record: null
	};

	const ContainerRecord = styled__default.div.withConfig({
	  displayName: "record-action__ContainerRecord",
	  componentId: "aqlm90-0"
	})(["display:flex;flex-direction:column;"]);
	const NoticeWrapper$1 = styled__default.div.withConfig({
	  displayName: "record-action__NoticeWrapper",
	  componentId: "aqlm90-1"
	})(["width:100%;position:relative;"]);

	class RecordAction extends React__default.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      record: null,
	      isLoading: true
	    };
	  }

	  componentDidMount() {
	    const {
	      match
	    } = this.props;
	    this.fetchRecord(match.params);
	  }

	  shouldComponentUpdate(newProps) {
	    const {
	      match
	    } = this.props;
	    const {
	      actionName,
	      recordId,
	      resourceId
	    } = match.params;

	    if (newProps.match.params.actionName !== actionName || newProps.match.params.recordId !== recordId || newProps.match.params.resourceId !== resourceId) {
	      this.fetchRecord(newProps.match.params);
	      return false;
	    }

	    return true;
	  }

	  getResourceAndAction(name = null) {
	    const {
	      match,
	      resources
	    } = this.props;
	    const {
	      resourceId,
	      actionName
	    } = match.params;
	    const {
	      record
	    } = this.state;
	    const nameToCheck = name || actionName;
	    const resource = resources.find(r => r.id === resourceId);
	    const action = record && record.recordActions.find(r => r.name === nameToCheck);
	    return {
	      resource,
	      action
	    };
	  }

	  fetchRecord({
	    actionName,
	    recordId,
	    resourceId
	  }) {
	    const api = new ApiClient();
	    this.setState({
	      isLoading: true,
	      record: null
	    });
	    api.recordAction({
	      resourceId,
	      recordId,
	      actionName
	    }).then(response => {
	      this.setState({
	        isLoading: false,
	        record: response.data.record
	      });
	    });
	  }

	  render() {
	    const {
	      match
	    } = this.props;
	    const {
	      actionName,
	      recordId
	    } = match.params;
	    const {
	      record,
	      isLoading
	    } = this.state;
	    const {
	      resource,
	      action
	    } = this.getResourceAndAction();
	    return React__default.createElement(ContainerRecord, null, React__default.createElement(NoticeWrapper$1, null, React__default.createElement(Notice, null)), React__default.createElement(WrapperBox, null, React__default.createElement(Breadcrumbs, {
	      resource: resource,
	      actionName: actionName,
	      record: record
	    }), React__default.createElement(ActionHeader, {
	      resource: resource,
	      recordId: recordId,
	      action: action,
	      record: record
	    }), isLoading ? React__default.createElement(Loader, null) : React__default.createElement(BaseActionComponent, {
	      action: action,
	      resource: resource,
	      record: record
	    })));
	  }

	}

	const mapStateToProps$4 = state => ({
	  resources: state.resources
	});

	var RecordAction$1 = reactRedux.connect(mapStateToProps$4)(RecordAction);

	const FilterWrapper = styled__default.section.withConfig({
	  displayName: "filter__FilterWrapper",
	  componentId: "mowuhm-0"
	})(["background:", ";flex-shrink:0;width:", ";color:#fff;padding-top:60px;transition:width 0.5s;position:absolute;top:0;right:0;bottom:0;overflow-x:hidden;overflow-y:scroll;&.filter-hidden{width:0;transition:width 0.5s;}"], ({
	  theme
	}) => theme.colors.darkBck, ({
	  theme
	}) => theme.sizes.sidebarWidth);
	const FilterLink = styled__default.a.withConfig({
	  displayName: "filter__FilterLink",
	  componentId: "mowuhm-1"
	})(["color:#fff;& > span{opacity:0.25;color:", ";border:1px solid ", ";border-radius:3px;padding:8px 10px;margin-right:", ";}&:hover{color:", ";& span{color:", ";border-color:", ";opacity:1;}}"], ({
	  theme
	}) => theme.colors.lightText, ({
	  theme
	}) => theme.colors.lightText, ({
	  theme
	}) => theme.sizes.padding, ({
	  theme
	}) => theme.colors.primary, ({
	  theme
	}) => theme.colors.primary, ({
	  theme
	}) => theme.colors.primary);
	const FilterContent = styled__default.section.withConfig({
	  displayName: "filter__FilterContent",
	  componentId: "mowuhm-2"
	})(["padding:", ";width:", ";overflow:hidden;& a,& button{margin:", " 0;width:100%;}"], ({
	  theme
	}) => theme.sizes.paddingLayout, ({
	  theme
	}) => theme.sizes.sidebarWidth, ({
	  theme
	}) => theme.sizes.paddingMin);

	class Filter$5 extends React__default.Component {
	  constructor(props) {
	    super(props);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	    this.resetFilter = this.resetFilter.bind(this);
	    this.state = {
	      filter: this.parseQuery()
	    };
	  }

	  componentWillReceiveProps(nextProps) {
	    const {
	      match
	    } = this.props;

	    if (nextProps.match.params.resourceId !== match.params.resourceId) {
	      this.setState({
	        filter: {}
	      });
	    }
	  }

	  parseQuery() {
	    const {
	      location
	    } = this.props;
	    const filter = {};
	    const query = new URLSearchParams(location.search);

	    for (const entry of query.entries()) {
	      const [key, value] = entry;

	      if (key.match('filters.')) {
	        filter[key.replace('filters.', '')] = value;
	      }
	    }

	    return filter;
	  }

	  handleSubmit(event) {
	    event.preventDefault();
	    const {
	      filter
	    } = this.state;
	    const {
	      history
	    } = this.props;
	    const search = new URLSearchParams(window.location.search);
	    Object.keys(filter).forEach(key => {
	      if (filter[key] !== '') {
	        search.set(`filters.${key}`, filter[key]);
	      } else {
	        search.delete(`filters.${key}`);
	      }
	    });
	    search.set('page', 1);
	    history.push(`${history.location.pathname}?${search.toString()}`);
	    return false;
	  }

	  resetFilter(event) {
	    const {
	      history
	    } = this.props;
	    event.preventDefault();
	    const filteredSearch = new URLSearchParams();
	    const search = new URLSearchParams(window.location.search);

	    for (const key of search.keys()) {
	      if (!key.match('filters.')) {
	        filteredSearch.set(key, search.get(key));
	      }
	    }

	    const query = filteredSearch.toString() === '' ? `?${filteredSearch.toString()}` : '';
	    history.push(history.location.pathname + query);
	    this.setState({
	      filter: {}
	    });
	  }

	  handleChange(propertyName, value) {
	    this.setState(state => ({
	      filter: { ...state.filter,
	        [propertyName]: value
	      }
	    }));
	  }

	  render() {
	    const {
	      resource,
	      isVisible,
	      toggleFilter
	    } = this.props;
	    const {
	      filter
	    } = this.state;
	    const properties = resource.filterProperties;
	    return React__default.createElement(FilterWrapper, {
	      className: isVisible ? null : 'filter-hidden'
	    }, React__default.createElement(FilterContent, null, React__default.createElement(FilterLink, {
	      onClick: toggleFilter
	    }, React__default.createElement("span", null, React__default.createElement("i", {
	      className: "fas fa-arrow-right"
	    })), "Filter"), React__default.createElement("form", {
	      onSubmit: this.handleSubmit.bind(this)
	    }, properties.map(property => React__default.createElement(BasePropertyComponent, {
	      key: property.name,
	      where: "filter",
	      onChange: this.handleChange,
	      property: property,
	      filter: filter,
	      resource: resource
	    })), React__default.createElement(StyledButton, {
	      as: "button",
	      className: "is-primary"
	    }, "Apply Changes"), React__default.createElement(StyledButton, {
	      as: "a",
	      className: "is-text",
	      onClick: this.resetFilter
	    }, "Clear filters"))));
	  }

	}

	Filter$5.propTypes = {
	  location: locationType.isRequired,
	  history: historyType.isRequired,
	  resource: resourceType.isRequired,
	  isVisible: PropTypes$1.bool.isRequired,
	  toggleFilter: PropTypes$1.func.isRequired,
	  match: matchType.isRequired
	};
	var Filter$6 = reactRouterDom.withRouter(Filter$5);

	var queryHasFilter = (queryString => {
	  const query = new URLSearchParams(queryString);

	  for (const key of query.keys()) {
	    if (key.match('filters.')) {
	      return true;
	    }
	  }

	  return false;
	});

	const NoticeWrapper$2 = styled__default.div.withConfig({
	  displayName: "resource-action__NoticeWrapper",
	  componentId: "sc-2qdil3-0"
	})(["width:100%;position:relative;"]);

	const ResourceAction = props => {
	  const {
	    resources,
	    match,
	    paths,
	    location
	  } = props;
	  const {
	    resourceId,
	    actionName
	  } = match.params;
	  const resource = resources.find(r => r.id === resourceId);
	  const action = resource.resourceActions.find(r => r.name === actionName);
	  const [filterVisible, setFilerVisible] = React.useState(queryHasFilter(location.search));
	  return React__default.createElement("div", null, React__default.createElement(NoticeWrapper$2, null, React__default.createElement(Notice, null)), React__default.createElement(WrapperBox, null, React__default.createElement(Breadcrumbs, {
	    resource: resource,
	    actionName: actionName
	  }), React__default.createElement(ActionHeader, {
	    resource: resource,
	    action: action,
	    toggleFilter: action.showFilter ? () => setFilerVisible(!filterVisible) : undefined
	  }), React__default.createElement(BaseActionComponent, {
	    action: action,
	    resource: resource,
	    paths: paths
	  })), action.showFilter ? React__default.createElement(Filter$6, {
	    resource: resource,
	    isVisible: filterVisible,
	    toggleFilter: () => setFilerVisible(!filterVisible)
	  }) : '');
	};

	const mapStateToProps$5 = state => ({
	  paths: state.paths,
	  resources: state.resources
	});

	ResourceAction.propTypes = {
	  resources: PropTypes$1.arrayOf(resourceType).isRequired,
	  match: matchType.isRequired,
	  paths: pathsType.isRequired,
	  location: locationType.isRequired
	};
	var ResourceAction$1 = reactRedux.connect(mapStateToProps$5)(ResourceAction);

	const GlobalStyle = styled.createGlobalStyle`
  html, body, #app {
      width: 100%;
      height: 100%;
  }

  a {
    color: ${({
  theme
}) => theme.colors.primary};
  }
`;
	const ApplicationWrapper = styled__default.section.withConfig({
	  displayName: "application__ApplicationWrapper",
	  componentId: "sc-5s7xyz-0"
	})(["font-size:14px;font-family:'Roboto',sans-serif;display:flex;flex-direction:row;height:100%;"]);
	const Core = styled__default.section.withConfig({
	  displayName: "application__Core",
	  componentId: "sc-5s7xyz-1"
	})(["height:100%;overflow-y:auto;width:100%;background:", ";display:flex;flex-direction:column;"], ({
	  theme
	}) => theme.colors.bck);

	const App = props => {
	  const {
	    paths
	  } = props;
	  const h = new ViewHelpers({
	    options: paths
	  });
	  const resourceId = ':resourceId';
	  const actionName = ':actionName';
	  const recordId = ':recordId';
	  const recordActionUrl = h.recordActionUrl({
	    resourceId,
	    recordId,
	    actionName
	  });
	  const resourceActionUrl = h.resourceActionUrl({
	    resourceId,
	    actionName
	  });
	  return React__default.createElement(React__default.Fragment, null, React__default.createElement(GlobalStyle, null), React__default.createElement(ApplicationWrapper, null, React__default.createElement(Sidebar$1, null), React__default.createElement(Core, null, React__default.createElement(Topbar$1, null), React__default.createElement(reactRouterDom.Switch, null, React__default.createElement(reactRouterDom.Route, {
	    path: h.dashboardUrl(),
	    exact: true,
	    component: Dashboard$2
	  }), React__default.createElement(reactRouterDom.Route, {
	    path: resourceActionUrl,
	    exact: true,
	    component: ResourceAction$1
	  }), React__default.createElement(reactRouterDom.Route, {
	    path: recordActionUrl,
	    exact: true,
	    component: RecordAction$1
	  })))));
	};

	App.propTypes = {
	  paths: pathsType.isRequired
	};

	const mapStateToProps$6 = state => ({
	  paths: state.paths
	});

	var App$1 = reactRedux.connect(mapStateToProps$6)(App);



	var AppComponents = /*#__PURE__*/Object.freeze({
		ActionButton: ActionButton$1,
		ActionHeader: ActionHeader,
		BaseActionComponent: BaseActionComponent,
		Breadcrumps: Breadcrumbs,
		DefaultDashboard: Dashboard,
		ErrorBoundary: ErrorBoundary,
		Filter: Filter$6,
		LoggedIn: LoggedIn,
		NoRecords: NoRecords,
		Notice: Notice,
		PropertyHeader: PropertyHeader$1,
		RecordInList: RecordInList,
		RecordsTableHeader: RecordsTableHeader,
		RecordsTable: RecordsTable,
		Topbar: Topbar$1,
		Version: Version
	});

	const env = {
	  NODE_ENV: "development" 
	};
	const store = createStore(window.REDUX_STATE);
	const theme$1 = window.THEME;
	const Application = React__default.createElement(reactRedux.Provider, {
	  store: store
	}, React__default.createElement(styled.ThemeProvider, {
	  theme: theme$1
	}, React__default.createElement(reactRouterDom.BrowserRouter, null, React__default.createElement(App$1, null)))); // eslint-disable-next-line no-undef

	window.regeneratorRuntime = regenerator;
	var bundleEntry = {
	  Application,
	  ViewHelpers,
	  Components: { ...Components,
	    ...AppComponents
	  },
	  UserComponents: {},
	  ApiClient,
	  style,
	  PropertyTypes: BasePropertyComponent,
	  types,
	  env
	};

	return bundleEntry;

}(React, ReactRedux, ReactRouterDOM, styled, PropTypes, axios, Redux, ReactDOM));
