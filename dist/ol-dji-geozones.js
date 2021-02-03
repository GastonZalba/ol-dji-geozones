(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ol/layer/Vector'), require('ol/source/Vector'), require('ol/Feature'), require('ol/Overlay'), require('ol/proj'), require('ol/sphere'), require('ol/geom'), require('ol/style'), require('ol/control'), require('ol/color'), require('ol/geom/Polygon'), require('ol/extent'), require('ol/Observable')) :
  typeof define === 'function' && define.amd ? define(['ol/layer/Vector', 'ol/source/Vector', 'ol/Feature', 'ol/Overlay', 'ol/proj', 'ol/sphere', 'ol/geom', 'ol/style', 'ol/control', 'ol/color', 'ol/geom/Polygon', 'ol/extent', 'ol/Observable'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DjiGeozones = factory(global.ol.layer.Vector, global.ol.source.Vector, global.ol.Feature, global.ol.Overlay, global.ol.proj, global.ol.sphere, global.ol.geom, global.ol.style, global.ol.control, global.ol.color, global.ol.geom.Polygon, global.ol.extent, global.ol.Observable));
}(this, (function (VectorLayer, VectorSource, Feature, Overlay, proj, sphere, geom, style, control, color, Polygon, extent, Observable) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var VectorLayer__default = /*#__PURE__*/_interopDefaultLegacy(VectorLayer);
  var VectorSource__default = /*#__PURE__*/_interopDefaultLegacy(VectorSource);
  var Feature__default = /*#__PURE__*/_interopDefaultLegacy(Feature);
  var Overlay__default = /*#__PURE__*/_interopDefaultLegacy(Overlay);

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  var arrayWithHoles = _arrayWithHoles;

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  var iterableToArrayLimit = _iterableToArrayLimit;

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  var arrayLikeToArray = _arrayLikeToArray;

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
  }

  var unsupportedIterableToArray = _unsupportedIterableToArray;

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var nonIterableRest = _nonIterableRest;

  function _slicedToArray(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
  }

  var slicedToArray = _slicedToArray;

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return arrayLikeToArray(arr);
  }

  var arrayWithoutHoles = _arrayWithoutHoles;

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  var iterableToArray = _iterableToArray;

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var nonIterableSpread = _nonIterableSpread;

  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
  }

  var toConsumableArray = _toConsumableArray;

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var runtime_1 = createCommonjsModule(function (module) {
  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }

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
    GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    );

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
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
        define(genFun, toStringTagSymbol, "GeneratorFunction");
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

    function AsyncIterator(generator, PromiseImpl) {
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
            return PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function(unwrapped) {
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
          return new PromiseImpl(function(resolve, reject) {
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
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;

      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
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

    define(Gp, toStringTagSymbol, "Generator");

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

  var levelsParams = [
  	{
  		id: 0,
  		color: "#FFCC00",
  		zIndex: 1,
  		markerIcon: "https://www1.djicdn.com/dps/6734f5340f66c7be37db48c8889392bf.png",
  		markerCircle: "https://www2.djicdn.com/assets/images/flysafe/geo-system/warning-98a8a2c8d6768e22957488ce962d77c3.png?from=cdnMap"
  	},
  	{
  		id: 1,
  		color: "#1088F2",
  		zIndex: 3,
  		markerIcon: "https://www1.djicdn.com/dps/fbbea9e33581907cac182adb4bcd0c94.png",
  		markerCircle: "https://www4.djicdn.com/assets/images/flysafe/geo-system/authorization-878e879982c9555bcaab7bb6bce3c6ca.png?from=cdnMap"
  	},
  	{
  		id: 2,
  		color: "#DE4329",
  		zIndex: 5,
  		markerIcon: "https://www1.djicdn.com/dps/d47dfe9f089f259631fbed99610b8b5a.png",
  		markerCircle: "https://www5.djicdn.com/assets/images/flysafe/geo-system/restricted-e0ce1467a8df2d07ec6a33cf11f4279e.png?from=cdnMap"
  	},
  	{
  		id: 3,
  		color: "#EE8815",
  		zIndex: 2,
  		markerIcon: "https://www1.djicdn.com/dps/df822149e1e6e9e804e177813e044238.png",
  		markerCircle: "https://www4.djicdn.com/assets/images/flysafe/geo-system/enhanced_warning-623fea05bff2f83f3c0ff5a65a41a1df.png?from=cdnMap"
  	},
  	{
  		id: 4,
  		color: "#37C4DB",
  		zIndex: 1,
  		markerIcon: "https://www1.djicdn.com/dps/53b33783709b6ed06bc3afdd21ac2a81.png",
  		markerCircle: "https://www4.djicdn.com/assets/images/flysafe/geo-system/recommended-e92f991d039ae145c9b1c72ad62b26b2.png?from=cdnMap"
  	},
  	{
  		id: 5,
  		color: "#00BE00",
  		zIndex: 1,
  		markerIcon: "https://www1.djicdn.com/dps/53b33783709b6ed06bc3afdd21ac2a81.png",
  		markerCircle: "https://www4.djicdn.com/assets/images/flysafe/geo-system/recommended-e92f991d039ae145c9b1c72ad62b26b2.png?from=cdnMap"
  	},
  	{
  		id: 6,
  		color: "#979797",
  		zIndex: 0,
  		markerIcon: "https://www1.djicdn.com/dps/f5961991d664e130fcf9ad01b1f28043.png",
  		markerCircle: "https://www1.djicdn.com/assets/images/flysafe/geo-system/Oval-34907c1071d63a3f1fffdc739b0943d9.png?from=cdnMap"
  	},
  	{
  		id: 7,
  		color: "#00BE00",
  		zIndex: 1,
  		markerIcon: "https://www1.djicdn.com/dps/9d922ae5fbd80d3166a844a9e249ceb3.png",
  		markerCircle: "https://www1.djicdn.com/assets/images/flysafe/geo-system/regulations-2dfeef5b11017811dcaa720c86c49406.png?from=cdnMap"
  	},
  	{
  		id: 8,
  		color: "#00BE00",
  		zIndex: 1,
  		markerIcon: "https://www1.djicdn.com/dps/53b33783709b6ed06bc3afdd21ac2a81.png",
  		markerCircle: "https://www1.djicdn.com/dps/a968914208241c3f6a5a3c64c221b8ff.png"
  	},
  	{
  		id: 9,
  		color: "#DE4329",
  		zIndex: 5,
  		markerIcon: "https://www1.djicdn.com/dps/d47dfe9f089f259631fbed99610b8b5a.png",
  		markerCircle: "https://www5.djicdn.com/assets/images/flysafe/geo-system/restricted-e0ce1467a8df2d07ec6a33cf11f4279e.png?from=cdnMap"
  	}
  ];

  var dronesList = [
  	{
  		id: "mavic-mini",
  		label: "Mavic Mini"
  	},
  	{
  		id: "mavic-2-enterprise",
  		label: "Mavic 2 Enterprise"
  	},
  	{
  		id: "mavic-2",
  		label: "Mavic 2"
  	},
  	{
  		id: "mavic-air",
  		label: "Mavic Air"
  	},
  	{
  		id: "mavic-air-2",
  		label: "Mavic Air 2"
  	},
  	{
  		id: "mavic-pro",
  		label: "Mavic Pro"
  	},
  	{
  		id: "spark",
  		label: "Spark"
  	},
  	{
  		id: "phantom-4-pro",
  		label: "Phantom 4 Pro"
  	},
  	{
  		id: "phantom-4-advanced",
  		label: "Phantom 4 Advanced"
  	},
  	{
  		id: "phantom-4",
  		label: "Phantom 4"
  	},
  	{
  		id: "phantom-4-rtk",
  		label: "Phantom 4 RTK"
  	},
  	{
  		id: "phantom-4-multispectral",
  		label: "Phantom 4 Multispectral"
  	},
  	{
  		id: "phantom-3-pro",
  		label: "Phantom 3 Pro"
  	},
  	{
  		id: "phantom-3-advanced",
  		label: "Phantom 3 Advanced"
  	},
  	{
  		id: "phantom-3-standard",
  		label: "Phantom 3 Standard"
  	},
  	{
  		id: "phantom-3-4K",
  		label: "Phantom 3 4K"
  	},
  	{
  		id: "phantom-3-se",
  		label: "Phantom 3 SE"
  	},
  	{
  		id: "inspire-2",
  		label: "Inspire 2"
  	},
  	{
  		id: "inspire-1-series",
  		label: "Inspire 1 Series"
  	},
  	{
  		id: "m200-series",
  		label: "M200 Series"
  	},
  	{
  		id: "m300-series",
  		label: "M300 Series"
  	},
  	{
  		id: "m600-series",
  		label: "M600 Series"
  	},
  	{
  		id: "m100",
  		label: "M100"
  	},
  	{
  		id: "mg1p",
  		label: "MG 1S/1A/1P/1P RTK/T10/T16/T20/T30"
  	},
  	{
  		id: "dji-mini-2",
  		label: "DJI Mini 2"
  	}
  ];

  var es = {
    labels: {
      djiGeoZones: 'Zonas Geo DJI',
      level: 'Nivel',
      type: 'Tipo',
      startTime: 'Horario de apertura',
      endTime: 'Horario de cierre',
      timeTips: 'Sistema horario: 24 horas',
      maxAltitude: 'Altitud máxima',
      address: 'Dirección',
      tips: 'Consejos',
      link: 'Enlace',
      learnMore: 'Leer más',
      helperZoom: 'Acerque la vista para ver las Zonas Geo',
      expand: 'Expandir',
      collapse: 'Colapsar',
      hideGeozones: 'Ocultar Zonas Geo',
      showHide: 'Mostrar/Ocultar Zonas Geo'
    },
    levels: [{
      id: 0,
      name: 'Zonas de advertencia',
      desc: 'En estas Zonas, que pueden no aparecer necesariamente en el mapa DJI GO, los usuarios recibirán un mensaje de advertencia. Ejemplo de zona de advertencia: espacio aéreo de clase E'
    }, {
      id: 1,
      name: 'Zonas de autorización',
      desc: 'En estas Zonas, que aparecen en azul en el mapa DJI GO, los usuarios recibirán una advertencia y el vuelo está limitado por defecto. Las zonas de autorización pueden ser desbloqueadas por usuarios autorizados mediante una cuenta verificada por DJI.'
    }, {
      id: 2,
      name: 'Zonas restringidas',
      desc: 'En estas Zonas, que aparecen en rojo en la aplicación DJI GO, los usuarios recibirán una advertencia y se impedirá el vuelo. Si cree que tiene la autorización para operar en una Zona restringida, comuníquese con flysafe@dji.com o Desbloqueo en línea.'
    }, {
      id: 3,
      name: 'Zonas de advertencia ampliadas',
      desc: 'En estas Zonas, GEO le pedirá en el momento del vuelo que desbloquee la zona siguiendo los mismos pasos que en una Zona de autorización, pero no necesita una cuenta verificada o una conexión a Internet en el momento de su vuelo.'
    }, {
      id: 4,
      name: 'Zonas reglamentarias restringidas',
      desc: 'Debido a las regulaciones y políticas locales, los vuelos están prohibidos dentro del alcance de algunas áreas especiales. (Ejemplo: prisión)'
    }, {
      id: 5,
      name: 'Zonas recomendadas',
      desc: ''
    }, {
      id: 6,
      name: 'Zonas de altiutud',
      desc: 'Las zonas de altitud aparecerán en gris en el mapa. Los usuarios reciben advertencias en DJI GO o DJI GO 4 y la altitud de vuelo es limitada.'
    }, {
      id: 7,
      name: 'Zonas recomendadas',
      desc: 'Esta área se muestra en verde en el mapa. Se recomienda que elija estas áreas para los arreglos de vuelo.'
    }, {
      id: 8,
      name: 'Zonas aprobadas para VANTs livianos (China)',
      desc: 'Para las zonas aprobadas, los pilotos de vehículos aéreos no tripulados ligeros que vuelan a una altitud de 120 mo menos no están obligados a obtener permiso para volar. Los pilotos que planean volar UAV de tamaño mediano en Zonas Aprobadas a una altitud superior a 120 m, o en Zonas GEO distintas de las Zonas Aprobadas, deben obtener permiso a través de UTMISS antes de despegar.'
    }, {
      id: 9,
      name: 'Áreas densamente pobladas',
      desc: 'Esta área se muestra en rojo en el mapa. En circunstancias normales, la población de esta zona está más concentrada, así que no sobrevuele esta zona. (Ejemplo: bloque comercial)'
    }],
    types: [{
      id: 0,
      name: 'Aeropuerto'
    }, {
      id: 1,
      name: 'Zona especial'
    }, {
      id: 2,
      name: 'Zona Militar'
    }, {
      id: 4,
      name: 'Zona recomendada'
    }, {
      id: 10,
      name: 'Aeropuerto'
    }, {
      id: 13,
      name: 'Aeropuerto recreacional'
    }, {
      id: 14,
      name: 'Aeropuerto recreacional'
    }, {
      id: 15,
      name: 'Espacio aéreo clase B'
    }, {
      id: 16,
      name: 'Espacio aéreo clase C'
    }, {
      id: 17,
      name: 'Espacio aéreo clase D'
    }, {
      id: 18,
      name: 'Espacio aéreo clase E'
    }, {
      id: 19,
      name: 'Helipuerto'
    }, {
      id: 23,
      name: 'Planta de energía'
    }, {
      id: 24,
      name: 'Prisión'
    }, {
      id: 26,
      name: 'Estadio'
    }, {
      id: 27,
      name: 'Espacio aéreo prohibido'
    }, {
      id: 28,
      name: 'Espacio aéreo restringido'
    }, {
      id: 29,
      name: 'Restricción de vuelo temporal'
    }, {
      id: 30,
      name: 'Planta de energía nuclear'
    }, {
      id: 31,
      name: 'Aeropuertos sin pavimentar'
    }, {
      id: 32,
      name: 'Zonas especiales'
    }, {
      id: 33,
      name: 'Zonas militares'
    }, {
      id: 34,
      name: 'Helipuerto'
    }, {
      id: 35,
      name: 'Base de hidroaviones'
    }, {
      id: 36,
      name: 'Restricción de vuelo temporal'
    }, {
      id: 39,
      name: 'Zonas aprobadas para VANTs livianos'
    }, {
      id: 41,
      name: 'Zonas reglamentarias restringidas para VANTs livianos'
    }]
  };

  var en = {
    labels: {
      djiGeoZones: 'Dji Geo Zones',
      level: 'Level',
      type: 'Type',
      startTime: 'Start Time',
      endTime: 'End Time',
      timeTips: 'Time: 24-hour clock',
      maxAltitude: 'Max. Altitude',
      address: 'Address',
      tips: 'Tips',
      link: 'Link',
      learnMore: 'Learn More',
      helperZoom: 'Zoom in to see the Geo Zones',
      expand: 'Expand',
      collapse: 'Collapse',
      hideGeozones: 'Hide Geo Zones',
      showHide: 'Show/Hide Geo Zones'
    },
    levels: [{
      id: 0,
      name: 'Warning Zones',
      desc: 'In these Zones, which may not necessarily appear on the DJI GO map, users will be prompted with a warning message. Example Warning Zone: Class E airspace'
    }, {
      id: 1,
      name: 'Authorization Zones',
      desc: 'In these Zones, which appear blue in the DJI GO map, users will be prompted with a warning and flight is limited by default. Authorization Zones may be unlocked by authorized users using a DJI verified account.'
    }, {
      id: 2,
      name: 'Restricted Zones',
      desc: 'In these Zones, which appear red the DJI GO app, users will be prompted with a warning and flight is prevented. If you believe you have the authorization to operate in a Restricted Zone, please contact flysafe@dji.com or Online Unlocking.'
    }, {
      id: 3,
      name: 'Enhanced Warning Zones',
      desc: 'In these Zones, you will be prompted by GEO at the time of flight to unlock the zone using the same steps as in an Authorization Zone, but you do not require a verified account or an internet connection at the time of your flight.'
    }, {
      id: 4,
      name: 'Regulatory Restricted Zones',
      desc: 'Due to local regulations and policies, flights are prohibited within the scope of some special areas. (Example：Prison)'
    }, {
      id: 5,
      name: 'Recommended Zones',
      desc: ''
    }, {
      id: 6,
      name: 'Altitude Zones',
      desc: 'Altitude zones will appear in gray on the map. Users receive warnings in DJI GO, or DJI GO 4 and flight altitude is limited.'
    }, {
      id: 7,
      name: 'Recommended Zones',
      desc: 'This area is shown in green on the map. It is recommended that you choose these areas for flight arrangements.'
    }, {
      id: 8,
      name: 'Approved Zones for Light UAVs(China)',
      desc: 'For Approved Zones, pilots of light UAVs flying at an altitude of 120 m or less are not required to obtain permission to fly. Pilots who are planning to fly medium-sized UAVs in Approved Zones at an altitude higher than 120 m, or in GEO Zones other than Approved Zones, must obtain permission via UTMISS before taking off'
    }, {
      id: 9,
      name: 'Densely Populated Area',
      desc: 'This area is shown in red on the map. Under normal circumstances, the population of this area is more concentrated, so please do not fly over this area. (Example: Commercial Block)'
    }],
    types: [{
      id: 0,
      name: 'Airport'
    }, {
      id: 1,
      name: 'Special Zone'
    }, {
      id: 2,
      name: 'Military Zone'
    }, {
      id: 4,
      name: 'Recommended Zones'
    }, {
      id: 10,
      name: 'Airport'
    }, {
      id: 13,
      name: 'Recreational airport'
    }, {
      id: 14,
      name: 'Recreational airport'
    }, {
      id: 15,
      name: 'Class B Airspace'
    }, {
      id: 16,
      name: 'Class C Airspace'
    }, {
      id: 17,
      name: 'Class D Airspace'
    }, {
      id: 18,
      name: 'Class E Airspace'
    }, {
      id: 19,
      name: 'Heliport'
    }, {
      id: 23,
      name: 'Power plant'
    }, {
      id: 24,
      name: 'Prison'
    }, {
      id: 26,
      name: 'Stadium'
    }, {
      id: 27,
      name: 'Prohibited Airspace'
    }, {
      id: 28,
      name: 'Restricted Airspace'
    }, {
      id: 29,
      name: 'Temporary Flight Restriction'
    }, {
      id: 30,
      name: 'Nuclear Power Plant'
    }, {
      id: 31,
      name: 'Unpaved Airports'
    }, {
      id: 32,
      name: 'Special Zones'
    }, {
      id: 33,
      name: 'Military Zones'
    }, {
      id: 34,
      name: 'Heliport'
    }, {
      id: 35,
      name: 'Seaplane Base'
    }, {
      id: 36,
      name: 'Temporary Flight Restriction'
    }, {
      id: 39,
      name: 'Approved Zones for Light UAVs'
    }, {
      id: 41,
      name: 'Regulatory Restricted Zones for Light UAVs'
    }]
  };

  var languages = /*#__PURE__*/Object.freeze({
    __proto__: null,
    es: es,
    en: en
  });

  const img = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 280.18 280.18'%3e%3cdefs%3e%3cstyle%3e.cls-1%7bfill:%23ffce00%3bfill-opacity:0.68%3bstroke:%23ffce00%3b%7d.cls-1%2c.cls-3%2c.cls-5%2c.cls-6%7bstroke-miterlimit:10%3bstroke-width:0.75px%3b%7d.cls-2%7bfill:%23ff7900%3bfill-opacity:0.46%3b%7d.cls-3%7bfill:%231072d6%3bfill-opacity:0.57%3bstroke:%231072d6%3b%7d.cls-4%7bopacity:0.63%3b%7d.cls-5%7bfill:%23bcbcbc%3bstroke:%23666%3b%7d.cls-6%7bfill:%23fc3424%3bfill-opacity:0.4%3bstroke:%23fc3424%3b%7d%3c/style%3e%3c/defs%3e%3cpath class='cls-1' d='M109.79%2c109.23c-44.68%2c44.68-40.36%2c121.45%2c9.66%2c171.47S246.24%2c335%2c290.92%2c290.36s40.36-121.46-9.65-171.48S154.48%2c64.54%2c109.79%2c109.23ZM270.56%2c270c-34.64%2c34.64-94.15%2c31.29-132.92-7.48s-42.12-98.28-7.48-132.92%2c94.14-31.29%2c132.92%2c7.48S305.2%2c235.36%2c270.56%2c270Z' transform='translate(-59.88 -59.29)'/%3e%3cpath class='cls-2' d='M130.16%2c129.59c-34.64%2c34.64-31.29%2c94.15%2c7.48%2c132.92s98.28%2c42.12%2c132.92%2c7.48%2c31.29-94.14-7.48-132.92S164.79%2c95%2c130.16%2c129.59Zm118%2c118c-24%2c24-64.91%2c22.14-91.29-4.23S128.56%2c176.07%2c152.6%2c152s64.91-22.14%2c91.28%2c4.24S272.15%2c223.51%2c248.12%2c247.55Z' transform='translate(-59.88 -59.29)'/%3e%3cellipse class='cls-3' cx='200.36' cy='199.79' rx='61.55' ry='67.54' transform='translate(-142.47 140.9) rotate(-45)'/%3e%3cg id='Layer_3' data-name='Layer 3'%3e%3cg class='cls-4'%3e%3cpolygon class='cls-5' points='166.25 180 236.66 279.6 236.75 279.51 279.51 236.75 279.6 236.66 180 166.25 166.25 180'/%3e%3cpolygon class='cls-5' points='113.92 100.18 43.51 0.58 43.43 0.67 0.67 43.43 0.58 43.51 100.18 113.92 113.92 100.18'/%3e%3c/g%3e%3cpolygon class='cls-6' points='180 113.92 166.25 100.18 140.09 126.34 113.92 100.18 100.18 113.92 126.34 140.09 100.18 166.25 113.92 180 140.09 153.84 166.25 180 180 166.25 153.84 140.09 180 113.92'/%3e%3c/g%3e%3cg id='Layer_3_copy' data-name='Layer 3 copy'%3e%3cg class='cls-4'%3e%3cpolygon class='cls-5' points='100.18 166.25 0.58 236.66 0.67 236.75 43.43 279.51 43.51 279.6 113.92 180 100.18 166.25'/%3e%3cpolygon class='cls-5' points='180 113.92 279.6 43.51 279.51 43.43 236.75 0.67 236.66 0.58 166.25 100.18 180 113.92'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";

  const img$1 = "data:image/svg+xml,%3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='768' height='768' viewBox='0 0 768 768'%3e%3ctitle%3e%3c/title%3e%3cpath d='M352.5 288v-64.5h63v64.5h-63zM384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM352.5 544.5v-192h63v192h-63z'%3e%3c/path%3e%3c/svg%3e";

  const img$2 = "data:image/svg+xml,%3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='768' height='768' viewBox='0 0 768 768'%3e%3cpath d='M384 288q39 0 67.5 28.5t28.5 67.5-28.5 67.5-67.5 28.5-67.5-28.5-28.5-67.5 28.5-67.5 67.5-28.5zM384 544.5q66 0 113.25-47.25t47.25-113.25-47.25-113.25-113.25-47.25-113.25 47.25-47.25 113.25 47.25 113.25 113.25 47.25zM384 144q118.5 0 214.5 66t138 174q-42 108-138 174t-214.5 66-214.5-66-138-174q42-108 138-174t214.5-66z'%3e%3c/path%3e%3c/svg%3e";

  function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

  function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  /**
   * @protected
   */

  var API_AREAS_ENDPOINT = 'https://www-api.dji.com/api/geo/areas';
  var API_INFO_ENDPOINT = 'https://www-api.dji.com/api/geo/point-info';
  var API_LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // request all the levels, we filter later to avoid some api problems

  var MIN_ZOOM = 9; // < 9 breaks the API

  var HIDDEN_CLASS = 'ol-dji-geozones--ctrl-toggle-hidden';
  /**
   * OpenLayers DJI Geozone, creates multiples VectorLayers to
   * display interactives DJI Geo Zones on the map, requesting the
   * data on the fly to an DJI API.
   *
   * Also, add a Control to select levels of interest and drone to filter the results.
   *
   * @constructor
   * @param map Instance of the created map
   * @param url_proxy Proxy's url to avoid CORS protection in the API.
   * @param opt_options DjiGeozones options, see [DjiGeozones Options](#options) for more details.
   */

  var DjiGeozones = /*#__PURE__*/function () {
    function DjiGeozones(map, opt_options) {
      classCallCheck(this, DjiGeozones);

      var options = Object.assign({}, opt_options); // LANGUAGE SUPPORT

      this._i18n = options.i18n || languages[options.language || 'en']; // API PARAMETERS

      this._drone = options.drone || 'spark';
      this._zonesMode = options.zonesMode || 'total';
      this._country = options.country || 'US';
      this._displayLevels = options.displayLevels || [2, 6, 1, 0, 3, 4, 7];
      this._activeLevels = options.activeLevels || [2, 6, 1, 0, 3, 4, 7];
      this._paramsLevels = levelsParams; // If not provided, we use all the available drones
      // This can be passed to use translations.

      this._dronesToDisplay = options.dronesToDisplay || dronesList;
      this._extent = options.extent || null;
      this._urlProxy = options.urlProxy || '';
      this._loadingElement = options.loadingElement || '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
      this.clickEvent = options.clickEvent || 'singleclick'; // By default, we use the properties features to show in the popup.
      // The official DJI map, makes an extra request to another API to get the data. I don't understand why.
      // It's more slow and requieres extra requests to an already downloaded data...
      // Either way, this extra API calls are supported if you want.

      this._useApiForPopUp = false; // MAP

      var createPanel = 'createPanel' in options ? options.createPanel : 'full';
      var targetPanel = options.targetPanel || null;
      var startCollapsed = 'startCollapsed' in options ? options.startCollapsed : false;
      this.theme = options.theme || 'light';
      this.map = map;
      this.view = map.getView();
      this.projection = this.view.getProjection();
      this._hideGeozones = 'startActive' in options ? !options.startActive : false;
      this._isVisible = this._hideGeozones ? false : this.view.getZoom() >= MIN_ZOOM;
      this._layers = [];
      this.divControl = null;
      this._areaDownloaded = null; // Only initialize if is active on load

      if (!this._hideGeozones) {
        this._initialize();
      }

      if (createPanel) {
        this._createPanel(createPanel, startCollapsed, targetPanel);
      }
    }

    createClass(DjiGeozones, [{
      key: "_initialize",
      value: function _initialize() {
        var _this = this;

        /**
         * Create and add a Vector Layer for each level
         * @protected
         */
        var createVectorLayers = function createVectorLayers() {
          /**
           * Create the style of each layer acoording to the geometry,
           * level, and color obtained from the API
           *
           * @param feature
           * @protected
           */
          var styleFunction = function styleFunction(feature) {
            var geomType = feature.getGeometry().getType();
            var level = feature.get('level');

            var levelParams = _this.getLevelParamsById(level);

            var style$1;

            if (geomType === 'Polygon' || geomType === 'Circle') {
              var color = feature.get('color');
              style$1 = new style.Style({
                fill: new style.Fill({
                  color: DjiGeozones.colorWithAlpha(color, 0.3)
                }),
                stroke: new style.Stroke({
                  color: color,
                  width: 1
                }),
                zIndex: levelParams.zIndex
              });
            } else if (geomType === 'Point') {
              style$1 = new style.Style({
                image: new style.Icon({
                  src: levelParams.markerIcon,
                  scale: 0.35,
                  anchor: [0.5, 0.9]
                }),
                zIndex: levelParams.zIndex * 2
              });
            }

            return style$1;
          };

          API_LEVELS.forEach(function (level) {
            var props = {
              name: 'ol-dji-geozones',
              level: level,
              zIndex: _this.getLevelParamsById(level).zIndex * 2,
              visible: _this._hideGeozones ? false : _this.activeLevels.includes(level) ? true : false,
              source: new VectorSource__default['default']({
                attributions: '<a href="https://www.dji.com/flysafe/geo-map" rel="nofollow noopener noreferrer" target="_blank">DJI GeoZoneMap</a>'
              }),
              style: styleFunction
            };
            if (_this._extent) props['extent'] = _this._extent;
            var layer = new VectorLayer__default['default'](props);

            _this.map.addLayer(layer);

            _this._layers.push(layer);
          });
        };
        /**
         * Create the PopUp element and add it to an Overlay
         * @protected
         */


        var createPopUpOverlay = function createPopUpOverlay() {
          var popupContainer = document.createElement('div');
          popupContainer.id = 'ol-dji-geozones--popup';
          popupContainer.className = "ol-dji-geozones--ol-popup ol-dji-geozones--".concat(_this.theme);
          _this.popupContent = document.createElement('div');
          _this.popupContent.id = 'ol-dji-geozones--popup-content';
          _this.popupContent.className = 'ol-dji-geozones--ol-popup-content';
          var popupCloser = document.createElement('a');
          popupCloser.id = 'ol-dji-geozones--popup-closer';
          popupCloser.className = 'ol-dji-geozones--ol-popup-closer';
          popupCloser.href = '#';

          popupCloser.onclick = function () {
            _this.overlay.setPosition(undefined);

            popupCloser.blur();
            return false;
          };

          popupContainer.append(popupCloser);
          popupContainer.append(_this.popupContent);
          _this.overlay = new Overlay__default['default']({
            element: popupContainer,
            autoPan: true,
            autoPanAnimation: {
              duration: 250
            }
          });

          _this.map.addOverlay(_this.overlay);
        };
        /**
         * @protected
         */


        var addMapEvents = function addMapEvents() {
          var handleZoomEnd = function handleZoomEnd() {
            if (_this._currentZoom < MIN_ZOOM) {
              // Hide the layer and disable the control
              if (_this._isVisible) {
                _this._setLayersVisible(false);

                _this._isVisible = false;

                _this._setControlEnabled(false);
              }
            } else {
              // Show the layers and enable the control
              if (!_this._isVisible) {
                _this._setLayersVisible(true);

                _this._isVisible = true;

                _this._setControlEnabled(true);

                if (_this.divControl) {
                  _this.divControl.classList.remove(HIDDEN_CLASS);
                }
              } else {
                // If the view is closer, don't do anything, we already had the features
                if (_this._currentZoom > _this._lastZoom) return;
              }

              _this.getInfoFromView();
            }
          };

          var handleDragEnd = function handleDragEnd() {
            if (!_this._isVisible) return;

            _this.getInfoFromView();
          };

          var clickHandler = function clickHandler(evt) {
            var type = _this._useApiForPopUp ? 'useApiForPopUp' : 'useFeaturesForPopUp';

            _this.getPointInfoFromClick(evt, type);
          };

          _this._moveendEvtKey = _this.map.on('moveend', function () {
            if (_this._hideGeozones) return;
            _this._currentZoom = _this.view.getZoom();
            if (_this._currentZoom !== _this._lastZoom) handleZoomEnd();else handleDragEnd();
            _this._lastZoom = _this._currentZoom;
          });
          _this._clickEvtKey = _this.map.on(_this.clickEvent, clickHandler);
        };

        this._isInitialized = true;
        createVectorLayers();
        createPopUpOverlay();
        addMapEvents();
      }
      /**
       * Create a control panel in the map
       *
       * @param createPanel
       * @param startCollapsed
       * @param targetPanel
       * @private
       */

    }, {
      key: "_createPanel",
      value: function _createPanel(createPanel, startCollapsed, targetPanel) {
        var _this2 = this;

        /**
         * Add the 'full' control panel to the viewport map or custom target.
         * This displays each level as a layer, with the possibility to activate or deactivate each one,
         * color legends and a drone switcher.
         *
         * @param targetPanel If provided, the panel wil be rendered outside the viewport
         * @protected
         */
        var addMapControlFull = function addMapControlFull() {
          var createDroneSelector = function createDroneSelector() {
            var handleChange = function handleChange(_ref) {
              var target = _ref.target;
              _this2.drone = target.value || target.options[target.selectedIndex].value;

              _this2.getInfoFromView(
              /* clear = */
              true);
            };

            var droneSelector = document.createElement('div');
            droneSelector.className = 'ol-dji-geozones--drone-selector';
            var select = document.createElement('select');
            select.onchange = handleChange;
            if (!_this2._isVisible) select.setAttribute('disabled', 'disabled');
            var options = '';

            _this2.dronesToDisplay.forEach(function (drone) {
              var selected = _this2.drone === drone.id ? 'selected' : '';
              options += "<option value=\"".concat(drone.id, "\" ").concat(selected, ">").concat(drone.label, "</option>");
            });

            select.innerHTML = options;
            droneSelector.append(select);
            return droneSelector;
          };

          var createLevelSelector = function createLevelSelector() {
            var handleClick = function handleClick(_ref2) {
              var target = _ref2.target;
              var level = Number(target.value);

              if (target.checked) {
                _this2.addLevels(level);
              } else {
                _this2.removeLevels(level);
              }
            };

            var createLegend = function createLegend(color) {
              var span = document.createElement('span');
              span.className = 'ol-dji-geozones--mark';
              span.style.border = "1px ".concat(color, " solid");
              span.style.backgroundColor = DjiGeozones.colorWithAlpha(color, 0.4);
              return span;
            };

            var createLabel = function createLabel(label, name, color) {
              var labelEl = document.createElement('label');
              labelEl.htmlFor = name;
              labelEl.append(createLegend(color));
              labelEl.append(label);
              return labelEl;
            };

            var createCheckbox = function createCheckbox(name, value, disabled) {
              var checkbox = document.createElement('input');
              checkbox.type = 'checkbox';
              checkbox.name = name;
              checkbox.id = name;
              checkbox.value = String(value);
              checkbox.onclick = handleClick;
              if (_this2.activeLevels.indexOf(value) !== -1) checkbox.checked = true;
              if (disabled) checkbox.disabled = true;
              return checkbox;
            };

            var createLevelItem = function createLevelItem(value, _ref3) {
              var name = _ref3.name,
                  desc = _ref3.desc,
                  color = _ref3.color;
              var disabled = !_this2._isVisible;
              var id = 'level' + value;
              var divContainer = document.createElement('div');
              divContainer.className = "ol-dji-geozones--item-ctl ol-dji-geozones--item-ctl-".concat(value);
              divContainer.title = desc; // divContainer.setAttribute('style', `--level-color: ${color}`);
              // divContainer.setAttribute('data-geotooltip', desc);

              divContainer.setAttribute('data-level', String(value));
              divContainer.append(createCheckbox(id, value, disabled));
              divContainer.append(createLabel(name, id, color));
              return divContainer;
            };

            var levelSelector = document.createElement('div');
            levelSelector.className = 'ol-dji-geozones--level-selector';

            _this2._displayLevels.forEach(function (lev) {
              var level = createLevelItem(lev, _this2.getLevelById(lev));
              levelSelector.append(level);
            });

            return levelSelector;
          };

          var createButtonCollapser = function createButtonCollapser() {
            var button = document.createElement('button');
            button.className = 'ol-dji-geozones--collapse ol-dji-geozones--btn-sm';
            button.title = _this2._i18n.labels.collapse;

            button.onclick = function () {
              return _this2.setPanelCollapsed(true);
            };

            return button;
          };

          var createButtonVisibility = function createButtonVisibility() {
            var button = document.createElement('button');
            button.className = 'ol-dji-geozones--visibility ol-dji-geozones--btn-sm';
            button.title = _this2._i18n.labels.hideGeozones;
            button.innerHTML = "<img src=\"".concat(img$2, "\"/>");

            button.onclick = function () {
              _this2.hide();
            };

            return button;
          };

          _this2.divControl.classList.add('ol-dji-geozones--ctrl-full');

          _this2.divControl.innerHTML = "\n            <header>\n                <h3>".concat(_this2._i18n.labels.djiGeoZones, "</h3>\n                <span class=\"ol-dji-geozones--loading\">\n                    ").concat(_this2._loadingElement, "\n                </span>\n            </header>\n            <main>\n                <section class=\"ol-dji-geozones--selectors\"></section>\n                <section>\n                    <div class=\"ol-dji-geozones--logo\" title=\"").concat(_this2._i18n.labels.expand, "\"><img src=\"").concat(img, "\"/></div>\n                    <span class=\"ol-dji-geozones--advice\">").concat(_this2._i18n.labels.helperZoom, "</span>\n                </section>\n            </main>\n            ");
          var droneSelector = createDroneSelector();

          _this2.divControl.querySelector('.ol-dji-geozones--selectors').append(droneSelector);

          var levelSelector = createLevelSelector();

          _this2.divControl.querySelector('.ol-dji-geozones--selectors').append(levelSelector);

          var buttonCollapse = createButtonCollapser();

          _this2.divControl.querySelector('header').append(buttonCollapse);

          var buttonVisibility = createButtonVisibility();

          _this2.divControl.querySelector('header').append(buttonVisibility);

          var logo = _this2.divControl.querySelector('.ol-dji-geozones--logo');

          logo.onclick = function () {
            if (_this2.divControl.classList.contains(HIDDEN_CLASS)) {
              _this2.show();
            }

            _this2.setPanelCollapsed(false);
          };
        };
        /**
         * Add the 'compact' control panel to the viewport map or custom target.
         * This is a simple Toggler to activate/deactivate the Geozones
         *
         * @param targetPanel If provided, the panel wil be rendered outside the viewport
         * @protected
         */


        var addMapControlCompact = function addMapControlCompact() {
          _this2.divControl.classList.add('ol-dji-geozones--ctrl-compact');

          _this2.divControl.innerHTML = "\n            <header>\n                <span class=\"ol-dji-geozones--loading\">\n                    ".concat(_this2._loadingElement, "\n                </span>\n            </header>\n            <main>\n                <section>\n                    <div class=\"ol-dji-geozones--logo\" title=\"").concat(_this2._i18n.labels.showHide, "\"><img src=\"").concat(img, "\"/></div>\n                </section>\n            </main>\n            ");

          var logo = _this2.divControl.querySelector('.ol-dji-geozones--logo');

          logo.onclick = function () {
            var hiddenClass = 'ol-dji-geozones--ctrl-toggle-hidden';

            if (_this2.divControl.classList.contains(hiddenClass)) {
              _this2.show();
            } else {
              _this2.hide();
            }
          };
        };

        this.divControl = document.createElement('div');
        this.divControl.className = "ol-dji-geozones ol-control ol-dji-geozones--".concat(this.theme);

        if (this._hideGeozones) {
          this.divControl.classList.add('ol-dji-geozones--ctrl-toggle-hidden');
          this.divControl.classList.add('ol-dji-geozones--ctrl-collapsed');
        } else {
          if (!this._isVisible) {
            this.divControl.classList.add('ol-dji-geozones--ctrl-disabled');
          }

          if (startCollapsed) {
            this.divControl.classList.add('ol-dji-geozones--ctrl-collapsed');
          }
        }

        if (createPanel === true || createPanel === 'full') {
          addMapControlFull();
        } else if (createPanel === 'compact') {
          addMapControlCompact();
        } else {
          return;
        }

        var options = {
          element: this.divControl,
          target: null
        };

        if (targetPanel) {
          options.target = targetPanel;
        }

        this.control = new control.Control(options);
        this.map.addControl(this.control);
      }
      /**
       * @private
       */

    }, {
      key: "_setLayersVisible",
      value: function _setLayersVisible(bool) {
        var _this3 = this;

        this.layers.forEach(function (layer) {
          if (!bool) {
            layer.setVisible(bool);
          } else if (bool && _this3.activeLevels.includes(layer.get('level'))) {
            layer.setVisible(bool);
          }
        });
      }
      /**
       * Enable or disable the inputs and the select in the control
       * @private
       */

    }, {
      key: "_setControlEnabled",
      value: function _setControlEnabled(enabled) {
        if (!this.divControl) return;

        var changeState = function changeState(array) {
          array.forEach(function (el) {
            if (enabled) {
              el.removeAttribute('disabled');
            } else {
              el.disabled = true;
            }
          });
        };

        if (enabled) {
          this.divControl.classList.remove('ol-dji-geozones--ctrl-disabled');
        } else {
          this.divControl.classList.add('ol-dji-geozones--ctrl-disabled');
        }

        var inputs = this.divControl.querySelectorAll('input');
        changeState(inputs);
        var selects = this.divControl.querySelectorAll('select');
        changeState(selects);
      }
      /**
       *
       * @param evt
       * @param type
       * @protected
       */

    }, {
      key: "getPointInfoFromClick",
      value: function getPointInfoFromClick(evt, type) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee3() {
          var _this4 = this;

          var infoKeys, idInfoRequest, getInfoFromApiLatLng, getInfoFromFeatures, showGeozoneDataInPopUp, opt_options, data, features;
          return regenerator.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  infoKeys = ['name', 'level', 'type', 'height', 'shape', 'start_at', 'end_at', 'url', 'address', 'description'];
                  idInfoRequest = 0;

                  getInfoFromApiLatLng = function getInfoFromApiLatLng(coordinate) {
                    return __awaiter(_this4, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee2() {
                      var _this5 = this;

                      var request;
                      return regenerator.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              // Prevent multiples requests
                              idInfoRequest += 1;
                              request = idInfoRequest;
                              return _context2.abrupt("return", new Promise(function (resolve) {
                                setTimeout(function () {
                                  return __awaiter(_this5, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee() {
                                    var center4326, clickLatLng, apiJson, areas, featuresProps, _iterator, _step, area;

                                    return regenerator.wrap(function _callee$(_context) {
                                      while (1) {
                                        switch (_context.prev = _context.next) {
                                          case 0:
                                            if (!(request !== idInfoRequest)) {
                                              _context.next = 2;
                                              break;
                                            }

                                            return _context.abrupt("return");

                                          case 2:
                                            center4326 = proj.transform(coordinate, this.projection, 'EPSG:4326');
                                            clickLatLng = {
                                              lat: center4326[1],
                                              lng: center4326[0]
                                            };
                                            _context.next = 6;
                                            return this.getApiGeoData('info', clickLatLng);

                                          case 6:
                                            apiJson = _context.sent;
                                            areas = apiJson.areas;
                                            if (!areas.length) resolve(false);
                                            featuresProps = [];
                                            _iterator = _createForOfIteratorHelper(areas);

                                            try {
                                              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                                                area = _step.value;
                                                featuresProps.push(area);
                                              }
                                            } catch (err) {
                                              _iterator.e(err);
                                            } finally {
                                              _iterator.f();
                                            }

                                            resolve(featuresProps);

                                          case 13:
                                          case "end":
                                            return _context.stop();
                                        }
                                      }
                                    }, _callee, this);
                                  }));
                                }, 100);
                              }));

                            case 3:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2);
                    }));
                  };
                  /**
                   *
                   * @param features
                   * @protected
                   */


                  getInfoFromFeatures = function getInfoFromFeatures(features) {
                    var featuresProps = [];
                    features.forEach(function (feature) {
                      var props = {};
                      infoKeys.forEach(function (key) {
                        return props[key] = feature.get(key);
                      });
                      featuresProps.push(props);
                    });
                    return featuresProps;
                  };

                  showGeozoneDataInPopUp = function showGeozoneDataInPopUp(geozonesData, coordinates) {
                    var createTooltip = function createTooltip(level) {
                      var getPos = function getPos(el) {
                        return el.getBoundingClientRect();
                      };

                      var evtKey;

                      var showPopUp = function showPopUp() {
                        infoTooltip.style.position = 'fixed';
                        var position = getPos(iconTooltip);
                        infoTooltip.style.top = position.top + 'px';
                        infoTooltip.style.left = position.left + 'px';
                        infoTooltip.classList.add('ol-dji-geozones--active-tooltip');
                        evtKey = _this4.map.once('movestart', function () {
                          return closePopUp();
                        });
                        document.body.append(infoTooltip);
                      };

                      var closePopUp = function closePopUp() {
                        infoTooltip.classList.remove('ol-dji-geozones--active-tooltip');
                        Observable.unByKey(evtKey);
                        container.append(infoTooltip);
                      };

                      var infoTooltip = document.createElement('span');
                      infoTooltip.className = "ol-dji-geozones--info ol-dji-geozones--".concat(_this4.theme);
                      infoTooltip.innerHTML = "<span class=\"ol-dji-geozones--info-text\">".concat(level.desc, "</span><span class=\"ol-dji-geozones--info-back\"></span>");
                      infoTooltip.setAttribute('style', "--level-color: ".concat(level.color));
                      var iconTooltip = document.createElement('span');
                      iconTooltip.className = 'ol-dji-geozones--icon';
                      iconTooltip.innerHTML = "<img src=\"".concat(img$1, "\">");

                      iconTooltip.onmouseover = function () {
                        return showPopUp();
                      };

                      iconTooltip.onclick = function () {
                        return showPopUp();
                      };

                      iconTooltip.onmouseout = function () {
                        return closePopUp();
                      };

                      var container = document.createElement('div');
                      container.className = 'ol-dji-geozones--tooltip';
                      container.append(iconTooltip);
                      container.append(infoTooltip);
                      return container;
                    };

                    var parseDataToHtml = function parseDataToHtml(responseApiArea) {
                      var name = responseApiArea.name,
                          level = responseApiArea.level,
                          type = responseApiArea.type,
                          height = responseApiArea.height,
                          description = responseApiArea.description,
                          begin_at = responseApiArea.begin_at,
                          end_at = responseApiArea.end_at,
                          address = responseApiArea.address,
                          url = responseApiArea.url;

                      var levelValues = _this4.getLevelById(level);

                      var lbl = _this4._i18n.labels;
                      var html = "\n                    <div class=\"ol-dji-geozones--marker\">\n                        <img src=\"".concat(levelValues.markerCircle, "\">\n                    </div>\n                    <div class=\"ol-dji-geozones--main\">\n                        <h3 class=\"ol-dji-geozones--title\">").concat(name, "</h3>\n                        <p class=\"ol-dji-geozones--level\">").concat(lbl.level, ": ").concat(levelValues.name, " </p>\n                        <p class=\"ol-dji-geozones--type\">").concat(lbl.type, ": ").concat(_this4.getGeozoneTypeById(type).name, "</p>\n                        ").concat(begin_at ? "<p class=\"ol-dji-geozones--start_time\">".concat(lbl.startTime, ": ").concat(begin_at, "</p>") : '', "\n                        ").concat(end_at ? "<p class=\"ol-dji-geozones--end_time\">".concat(lbl.endTime, ": ").concat(end_at, "</p><p class=\"ol-dji-geozones--time_tips\">").concat(lbl.timeTips, "</p>") : '', "         \n                        ").concat(height ? "<p class=\"ol-dji-geozones--height\">".concat(lbl.maxAltitude, " (m): ").concat(height, "</p>") : '', " \n                        ").concat(address ? "<p class=\"ol-dji-geozones--address\">".concat(lbl.address, ": ").concat(address, "</p>") : '', "\n                        ").concat(description ? "<p class=\"ol-dji-geozones--desc\">".concat(lbl.tips, ": ").concat(description, "</p>") : '', "\n                        ").concat(url ? "<p class=\"ol-dji-geozones--url\">".concat(lbl.link, ": <a href=\"").concat(url, "\">").concat(lbl.learnMore, "</a></p>") : '', "\n                </div>");
                      var item = document.createElement('div');
                      item.className = 'ol-dji-geozones--item';
                      item.innerHTML = html;
                      item.querySelector('.ol-dji-geozones--level').append(createTooltip(levelValues));
                      return item;
                    };

                    var preventDuplicates = [];
                    var arrGeozonesData = Array.isArray(geozonesData) ? geozonesData : [geozonesData];
                    _this4.popupContent.innerHTML = '';
                    arrGeozonesData.forEach(function (geozoneProps) {
                      var element = parseDataToHtml(geozoneProps); // The oficial DJI map show duplicates, but we don't want that

                      if (preventDuplicates.indexOf(element.innerHTML) === -1) {
                        preventDuplicates.push(element.innerHTML);

                        _this4.popupContent.append(element);

                        _this4.popupContent.append(document.createElement('HR'));
                      }
                    });

                    _this4.overlay.setPosition(coordinates);
                  };

                  _context3.prev = 5;

                  if (this._isVisible) {
                    _context3.next = 9;
                    break;
                  }

                  this.overlay.setPosition(undefined);
                  return _context3.abrupt("return");

                case 9:
                  opt_options = {
                    layerFilter: function layerFilter(layer) {
                      return layer.get('name') === 'ol-dji-geozones';
                    }
                  };

                  if (!(type === 'useApiForPopUp')) {
                    _context3.next = 19;
                    break;
                  }

                  if (!this.map.hasFeatureAtPixel(evt.pixel, opt_options)) {
                    _context3.next = 17;
                    break;
                  }

                  this.popupContent.innerHTML = this._loadingElement.toString();
                  this.overlay.setPosition(evt.coordinate);
                  _context3.next = 16;
                  return getInfoFromApiLatLng(evt.coordinate);

                case 16:
                  data = _context3.sent;

                case 17:
                  _context3.next = 21;
                  break;

                case 19:
                  features = this.map.getFeaturesAtPixel(evt.pixel, opt_options);

                  if (features && features.length) {
                    data = getInfoFromFeatures(features);
                  }

                case 21:
                  if (data && data.length) showGeozoneDataInPopUp(data, evt.coordinate);else this.overlay.setPosition(undefined);
                  _context3.next = 27;
                  break;

                case 24:
                  _context3.prev = 24;
                  _context3.t0 = _context3["catch"](5);
                  console.log(_context3.t0);

                case 27:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[5, 24]]);
        }));
      }
      /**
       *
       * @param clear
       * @protected
       */

    }, {
      key: "getInfoFromView",
      value: function getInfoFromView() {
        var _this6 = this;

        var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var idAreasRequest = 0;
        /**
         * The level parameter returned by the API is wrong, so wee need to fixed using the color
         * @param feature
         * @protected
         */

        var fixLevelValue = function fixLevelValue(feature) {
          var color = feature.get('color');
          var level = Object.keys(_this6._paramsLevels).find(function (key) {
            return _this6._paramsLevels[key].color === color;
          });
          feature.set('level', level);
          return feature;
        };
        /**
         * Parse the json response of the API an create Open Layers features.
         * @param djiJson
         * @protected
         */


        var apiResponseToFeatures = function apiResponseToFeatures(djiJson) {
          /**
           *
           * @param id
           * @protected
           */
          var getFeatureById = function getFeatureById(id) {
            var feature;

            var _iterator2 = _createForOfIteratorHelper(_this6.layers),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var layer = _step2.value;
                feature = layer.getSource().getFeatureById(id);
                if (feature) break;
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            return feature;
          };

          var areas = djiJson.areas;
          if (!areas || !areas.length) return false;
          var features = [];

          var _iterator3 = _createForOfIteratorHelper(areas),
              _step3;

          try {
            var _loop = function _loop() {
              var area = _step3.value;

              // If the feature already exists, continue
              if (getFeatureById(area.area_id)) {
                return "continue";
              }

              var featureProps = {
                address: area.address,
                begin_at: area.begin_at,
                color: area.color,
                city: area.city,
                country: area.country,
                data_source: area.data_source,
                description: area.description,
                end_at: area.end_at,
                height: area.height,
                level: area.level,
                name: area.name,
                radius: area.radius,
                shape: area.shape,
                type: area.type,
                url: area.url,
                lng: area.lng,
                lat: area.lat
              }; // Only a few of "areas" come with polygons

              if (area.polygon_points) {
                var featureExtra = new Feature__default['default'](Object.assign(Object.assign({}, featureProps), {
                  geometry: new geom.Polygon(area.polygon_points).transform('EPSG:4326', _this6.projection)
                }));
                featureExtra.setId(area.area_id + '_poly');
                features.push(fixLevelValue(featureExtra));
              }

              var feature = new Feature__default['default'](Object.assign(Object.assign({}, featureProps), {
                geometry: new geom.Point([area.lng, area.lat]).transform('EPSG:4326', _this6.projection)
              })); // Store the id to avoid duplicates

              feature.setId(area.area_id);
              features.push(fixLevelValue(feature));

              if (area.sub_areas) {
                area.sub_areas.forEach(function (sub_area) {
                  var subFeature;

                  if (sub_area.polygon_points) {
                    subFeature = new Feature__default['default']({
                      color: sub_area.color,
                      height: sub_area.height,
                      level: sub_area.level,
                      name: area.name,
                      radius: sub_area.radius,
                      shape: sub_area.shape,
                      type: area.type,
                      lng: sub_area.lng,
                      lat: sub_area.lat,
                      geometry: new geom.Polygon(sub_area.polygon_points).transform('EPSG:4326', _this6.projection)
                    });
                  } else {
                    subFeature = new Feature__default['default']({
                      color: sub_area.color,
                      height: sub_area.height,
                      level: sub_area.level,
                      name: area.name,
                      radius: sub_area.radius,
                      shape: sub_area.shape,
                      type: area.type,
                      lng: sub_area.lng,
                      lat: sub_area.lat,
                      geometry: new geom.Circle([sub_area.lng, sub_area.lat], sub_area.radius / 100000).transform('EPSG:4326', _this6.projection)
                    });
                  }

                  subFeature.setId(sub_area.area_id);
                  features.push(fixLevelValue(subFeature));
                });
              }
            };

            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _ret = _loop();

              if (_ret === "continue") continue;
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          return features;
        };
        /**
         *
         * @param features
         * @protected
         */


        var addFeaturesToEachLevel = function addFeaturesToEachLevel(features) {
          if (!features) return;
          features.forEach(function (feature) {
            var level = feature.get('level');

            var layer = _this6.getLayerByLevel(level);

            layer.getSource().addFeature(feature);
          });
        };
        /**
         * Clear all the elements in the Dji Geozones layers
         * @protected
         */


        var clearFeatures = function clearFeatures() {
          _this6.layers.forEach(function (layer) {
            layer.getSource().clear();
          });
        }; // Prevent multiples requests


        idAreasRequest += 1;
        var request = idAreasRequest; // Original DJI map same behavior to prevent multiples requests

        setTimeout(function () {
          return __awaiter(_this6, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee4() {
            var center, center4326, viewLatLng, data, features;
            return regenerator.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!(request !== idAreasRequest)) {
                      _context4.next = 2;
                      break;
                    }

                    return _context4.abrupt("return");

                  case 2:
                    _context4.prev = 2;

                    this._showLoading(true);

                    center = this.view.getCenter();
                    center4326 = proj.transform(center, this.projection, 'EPSG:4326');
                    viewLatLng = {
                      lat: center4326[1],
                      lng: center4326[0]
                    };

                    if (clear) {
                      this._areaDownloaded = null; // Remove area already downloaded
                    }

                    _context4.next = 10;
                    return this.getApiGeoData('areas', viewLatLng);

                  case 10:
                    data = _context4.sent;

                    if (data) {
                      _context4.next = 13;
                      break;
                    }

                    throw new Error();

                  case 13:
                    if (clear) clearFeatures();
                    features = apiResponseToFeatures(data);
                    addFeaturesToEachLevel(features);

                    this._showLoading(false); // console.log(data);


                    _context4.next = 23;
                    break;

                  case 19:
                    _context4.prev = 19;
                    _context4.t0 = _context4["catch"](2);
                    if (_context4.t0.message) console.error(_context4.t0);

                    this._showLoading(false);

                  case 23:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this, [[2, 19]]);
          }));
        }, 300);
      }
      /**
       * Controller for the API rquests.
       * @param typeApiRequest
       * @param latLng
       * @protected
       */

    }, {
      key: "getApiGeoData",
      value: function getApiGeoData(typeApiRequest, latLng) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee8() {
          var _this7 = this;

          var apiRequest, getPointInfo, getAreas, getMapRadius, searchRadius, data;
          return regenerator.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  apiRequest = function apiRequest(typeApiRequest, _ref4, searchRadius) {
                    var lng = _ref4.lng,
                        lat = _ref4.lat;
                    return __awaiter(_this7, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee5() {
                      var api_endpoint, url, queryObj, response;
                      return regenerator.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              api_endpoint = typeApiRequest === 'areas' ? API_AREAS_ENDPOINT : API_INFO_ENDPOINT; // If not proxy is passed, make a direct request
                              // Maybe in the future the api will has updated CORS restrictions

                              url = new URL(api_endpoint);
                              queryObj = {
                                drone: this.drone,
                                zones_mode: this.zonesMode,
                                country: this.country,
                                level: API_LEVELS,
                                lng: lng,
                                lat: lat,
                                search_radius: searchRadius
                              };
                              Object.keys(queryObj).forEach(function (key) {
                                return url.searchParams.append(key, queryObj[key]);
                              });
                              _context5.next = 6;
                              return fetch(this._urlProxy + encodeURIComponent(url.toString()));

                            case 6:
                              response = _context5.sent;

                              if (response.ok) {
                                _context5.next = 9;
                                break;
                              }

                              throw new Error('HTTP-Error: ' + response.status);

                            case 9:
                              _context5.next = 11;
                              return response.json();

                            case 11:
                              return _context5.abrupt("return", _context5.sent);

                            case 12:
                            case "end":
                              return _context5.stop();
                          }
                        }
                      }, _callee5, this);
                    }));
                  };

                  getPointInfo = function getPointInfo(latLng, searchRadius) {
                    return __awaiter(_this7, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee6() {
                      var data;
                      return regenerator.wrap(function _callee6$(_context6) {
                        while (1) {
                          switch (_context6.prev = _context6.next) {
                            case 0:
                              _context6.next = 2;
                              return apiRequest('info', latLng, searchRadius);

                            case 2:
                              data = _context6.sent;
                              return _context6.abrupt("return", data);

                            case 4:
                            case "end":
                              return _context6.stop();
                          }
                        }
                      }, _callee6);
                    }));
                  };

                  getAreas = function getAreas(centerLatLng, searchRadius) {
                    return __awaiter(_this7, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee7() {
                      var extent$1, polygon, data;
                      return regenerator.wrap(function _callee7$(_context7) {
                        while (1) {
                          switch (_context7.prev = _context7.next) {
                            case 0:
                              extent$1 = this.view.calculateExtent();
                              polygon = Polygon.fromExtent(extent$1);

                              if (!this._areaDownloaded) {
                                _context7.next = 8;
                                break;
                              }

                              if (!(this._areaDownloaded.intersectsCoordinate(extent.getCenter(extent$1)) && this._areaDownloaded.intersectsCoordinate(extent.getBottomLeft(extent$1)) && this._areaDownloaded.intersectsCoordinate(extent.getTopRight(extent$1)) && this._areaDownloaded.intersectsCoordinate(extent.getBottomRight(extent$1)) && this._areaDownloaded.intersectsCoordinate(extent.getTopLeft(extent$1)))) {
                                _context7.next = 5;
                                break;
                              }

                              return _context7.abrupt("return");

                            case 5:
                              this._areaDownloaded.appendPolygon(polygon);

                              _context7.next = 9;
                              break;

                            case 8:
                              this._areaDownloaded = new geom.MultiPolygon([polygon.getCoordinates()]);

                            case 9:
                              _context7.next = 11;
                              return apiRequest('areas', centerLatLng, searchRadius);

                            case 11:
                              data = _context7.sent;
                              return _context7.abrupt("return", data);

                            case 13:
                            case "end":
                              return _context7.stop();
                          }
                        }
                      }, _callee7, this);
                    }));
                  };

                  getMapRadius = function getMapRadius(_ref5) {
                    var lng = _ref5.lng,
                        lat = _ref5.lat;
                    var center = [lng, lat];

                    var size = _this7.map.getSize();

                    var extent = _this7.view.calculateExtent(size);

                    extent = proj.transformExtent(extent, _this7.projection, 'EPSG:4326');
                    var posSW = [extent[0], extent[1]];
                    var centerToSW = sphere.getDistance(center, posSW);
                    return parseInt(String(centerToSW));
                  };

                  if (this._isVisible) {
                    _context8.next = 6;
                    break;
                  }

                  return _context8.abrupt("return");

                case 6:
                  searchRadius = getMapRadius(latLng);

                  if (!(typeApiRequest === 'areas')) {
                    _context8.next = 13;
                    break;
                  }

                  _context8.next = 10;
                  return getAreas(latLng, searchRadius);

                case 10:
                  data = _context8.sent;
                  _context8.next = 16;
                  break;

                case 13:
                  _context8.next = 15;
                  return getPointInfo(latLng, searchRadius);

                case 15:
                  data = _context8.sent;

                case 16:
                  return _context8.abrupt("return", data);

                case 17:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8, this);
        }));
      }
      /**
       * Show/hide the loading in the control
       * @param {Boolean} bool
       * @protected
       */

    }, {
      key: "_showLoading",
      value: function _showLoading(bool) {
        if (!this.divControl) return;
        if (bool) this.divControl.classList.add('ol-dji-geozones--isLoading');else this.divControl.classList.remove('ol-dji-geozones--isLoading');
      }
    }, {
      key: "setPanelVisible",

      /**
       * Show or hides the control panel
       * @param visible
       */
      value: function setPanelVisible(visible) {
        if (!this.divControl) {
          return;
        }

        if (visible) {
          this.divControl.classList.remove('ol-dji-geozones--ctrl-hidden');
        } else {
          this.divControl.classList.add('ol-dji-geozones--ctrl-hidden');
        }
      }
      /**
       * Collapse/expand the control panel
       * @param collapsed
       */

    }, {
      key: "setPanelCollapsed",
      value: function setPanelCollapsed(collapsed) {
        if (!this.divControl) {
          return;
        }

        if (collapsed) {
          this.divControl.classList.add('ol-dji-geozones--ctrl-collapsed');
        } else {
          this.divControl.classList.remove('ol-dji-geozones--ctrl-collapsed');
        }
      }
      /**
       * Get all the layers
       */

    }, {
      key: "getLayerByLevel",

      /**
       * Get the layer acordding the level
       * @param level
       */
      value: function getLayerByLevel(level) {
        var find;

        var _iterator4 = _createForOfIteratorHelper(this.layers),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var layer = _step4.value;

            if (layer.get('level') != undefined && layer.get('level') == level) {
              find = layer;
              break;
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        return find;
      }
      /**
       * Get the geozone type (airport, heliport, etc) by id
       * @param id
       * @protected
       */

    }, {
      key: "getGeozoneTypeById",
      value: function getGeozoneTypeById() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        return this._i18n.types.find(function (el) {
          return el.id == id;
        });
      }
      /**
       * Getter for the list with all the supported Drones
       * @protected
       */

    }, {
      key: "getLevelParamsById",

      /**
       * Get the level parameters, like color, icon, and description
       * @param id
       * @protected
       */
      value: function getLevelParamsById() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        return this._paramsLevels.find(function (lev) {
          return lev.id == id;
        });
      }
      /**
       * Get all the parameters from a level and the i18n texts
       * @param id
       */

    }, {
      key: "getLevelById",
      value: function getLevelById() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        var params = this._paramsLevels.find(function (lev) {
          return lev.id == id;
        });

        var texts = this._i18n.levels.find(function (lev) {
          return lev.id == id;
        });

        return Object.assign(Object.assign({}, params), texts);
      }
      /**
       * Replace the active levels with this values and refresh the view
       * @param levels
       */

    }, {
      key: "addLevels",

      /**
       * Add the level/s to the view
       * @param levels
       * @param refresh If true, refresh the view and show the active levels
       */
      value: function addLevels(levels) {
        var _this8 = this;

        var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var arrLevels = !Array.isArray(levels) ? [levels] : levels;
        this.activeLevels = [].concat(toConsumableArray(this.activeLevels), toConsumableArray(arrLevels));

        if (refresh) {
          arrLevels.forEach(function (lev) {
            var layer = _this8.getLayerByLevel(lev);

            layer.setVisible(true);
          });
        }
      }
      /**
       * Remove the level/s from the view
       *
       * @param levels
       * @param refresh If true, refresh the view and show the actived levels
       */

    }, {
      key: "removeLevels",
      value: function removeLevels(levels) {
        var _this9 = this;

        var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var arrLevels = !Array.isArray(levels) ? [levels] : levels;
        this.activeLevels = this.activeLevels.filter(function (x) {
          return !arrLevels.includes(x);
        });

        if (refresh) {
          arrLevels.forEach(function (lev) {
            var layer = _this9.getLayerByLevel(lev);

            layer.setVisible(false);
          });
        }
      }
      /**
       * Removes the control, layers and events from the map
       */

    }, {
      key: "destroy",
      value: function destroy() {
        var _this10 = this;

        this.map.removeControl(this.control);
        this.layers.forEach(function (layer) {
          _this10.map.removeLayer(layer);
        });
        Observable.unByKey(this._clickEvtKey);
        Observable.unByKey(this._moveendEvtKey);
      }
      /**
       * Hide the geoZones and the Control
       */

    }, {
      key: "hide",
      value: function hide() {
        this._hideGeozones = true;

        this._setLayersVisible(false);

        this._setControlEnabled(false);

        if (this.divControl) {
          this.divControl.classList.add(HIDDEN_CLASS);
        }
      }
      /**
       * Show the geoZones nd the Control
       */

    }, {
      key: "show",
      value: function show() {
        this._hideGeozones = false;
        this._isVisible = this.view.getZoom() >= MIN_ZOOM;

        if (!this._isInitialized) {
          this._initialize();
        }

        this._showLoading(true);

        if (this._isVisible) {
          this._setControlEnabled(true);

          this.getInfoFromView();

          this._setLayersVisible(true);

          if (this.divControl) {
            this.divControl.classList.remove(HIDDEN_CLASS);
          }
        } else {
          alert(this._i18n.labels.helperZoom);
        }
      }
      /**
       *  **_[static]_** - Generate an RGBA color from an hexadecimal
       *
       * Adapted from https://stackoverflow.com/questions/28004153
       * @param color Hexadeciaml color
       * @param alpha Opacity
       * @protected
       */

    }, {
      key: "layers",
      get: function get() {
        return this._layers;
      }
    }, {
      key: "dronesToDisplay",
      get: function get() {
        return this._dronesToDisplay;
      }
      /**
       * Setter for API parameter `drone`. Triggers an API request
       * @param drone
       */

    }, {
      key: "drone",
      set: function set(drone) {
        this._drone = drone;
        this.getInfoFromView();
      }
      /**
       * Getter for Api parameter drone
       */
      ,
      get: function get() {
        return this._drone;
      }
      /**
       * Setter for API parameter `zonesMode`. Triggers an API request
       * @param zonesMode
       */

    }, {
      key: "zonesMode",
      set: function set(zonesMode) {
        this._zonesMode = zonesMode;
        this.getInfoFromView();
      }
      /**
       * Getter for API parameter `zonesMode`
       */
      ,
      get: function get() {
        return this._zonesMode;
      }
      /**
       * Setter for API parameter `country`. Triggers an API request
       * @param country
       */

    }, {
      key: "country",
      set: function set(country) {
        this._country = country;
        this.getInfoFromView();
      }
      /**
       * Getter for API parameter `country`
       */
      ,
      get: function get() {
        return this._country;
      }
    }, {
      key: "activeLevels",
      set: function set(levels) {
        var _this11 = this;

        this._activeLevels = levels;

        this._displayLevels.forEach(function (lev) {
          var layer = _this11.getLayerByLevel(lev);

          if (levels.includes(lev)) {
            layer.setVisible(true);
          } else {
            layer.setVisible(false);
          }
        });
      },
      get: function get() {
        return this._activeLevels;
      }
    }], [{
      key: "colorWithAlpha",
      value: function colorWithAlpha(color$1) {
        var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        var _Array$from = Array.from(color.asArray(color$1)),
            _Array$from2 = slicedToArray(_Array$from, 3),
            r = _Array$from2[0],
            g = _Array$from2[1],
            b = _Array$from2[2];

        return color.asString([r, g, b, alpha]);
      }
    }]);

    return DjiGeozones;
  }();

  return DjiGeozones;

})));
