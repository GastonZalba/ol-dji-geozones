(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ol/layer/Vector'), require('ol/source/Vector'), require('ol/Feature'), require('ol/Overlay'), require('ol/proj'), require('ol/sphere'), require('ol/geom/Polygon'), require('ol/geom/MultiPolygon'), require('ol/geom/Point'), require('ol/geom/Circle'), require('ol/events/Event'), require('ol/style/Style'), require('ol/style/Fill'), require('ol/style/Stroke'), require('ol/style/Icon'), require('ol/control/Control'), require('ol/color'), require('ol/extent'), require('ol/Observable')) :
  typeof define === 'function' && define.amd ? define(['ol/layer/Vector', 'ol/source/Vector', 'ol/Feature', 'ol/Overlay', 'ol/proj', 'ol/sphere', 'ol/geom/Polygon', 'ol/geom/MultiPolygon', 'ol/geom/Point', 'ol/geom/Circle', 'ol/events/Event', 'ol/style/Style', 'ol/style/Fill', 'ol/style/Stroke', 'ol/style/Icon', 'ol/control/Control', 'ol/color', 'ol/extent', 'ol/Observable'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DjiGeozones = factory(global.ol.layer.Vector, global.ol.source.Vector, global.ol.Feature, global.ol.Overlay, global.ol.proj, global.ol.sphere, global.ol.geom.Polygon, global.ol.geom.MultiPolygon, global.ol.geom.Point, global.ol.geom.Circle, global.ol.events.Event, global.ol.style.Style, global.ol.style.Fill, global.ol.style.Stroke, global.ol.style.Icon, global.ol.control.Control, global.ol.color, global.ol.extent, global.ol.Observable));
})(this, (function (VectorLayer, VectorSource, Feature, Overlay, proj, sphere, Polygon, MultiPolygon, Point, Circle, BaseEvent, Style, Fill, Stroke, Icon, Control, color, extent, Observable) { 'use strict';

  function _typeof$1(obj) {
    "@babel/helpers - typeof";

    return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof$1(obj);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }

  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }

  function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
  }

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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _toPrimitive(input, hint) {
    if (_typeof$1(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof$1(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof$1(key) === "symbol" ? key : String(key);
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }

  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get.bind();
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }
        return desc.value;
      };
    }
    return _get.apply(this, arguments);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
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
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var regeneratorRuntime$1 = {exports: {}};

  var _typeof = {exports: {}};

  (function (module) {
  	function _typeof(obj) {
  	  "@babel/helpers - typeof";

  	  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
  	    return typeof obj;
  	  } : function (obj) {
  	    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  	  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
  	}
  	module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports; 
  } (_typeof));

  var _typeofExports = _typeof.exports;

  (function (module) {
  	var _typeof = _typeofExports["default"];
  	function _regeneratorRuntime() {
  	  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
  	    return exports;
  	  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  	  var exports = {},
  	    Op = Object.prototype,
  	    hasOwn = Op.hasOwnProperty,
  	    defineProperty = Object.defineProperty || function (obj, key, desc) {
  	      obj[key] = desc.value;
  	    },
  	    $Symbol = "function" == typeof Symbol ? Symbol : {},
  	    iteratorSymbol = $Symbol.iterator || "@@iterator",
  	    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
  	    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  	  function define(obj, key, value) {
  	    return Object.defineProperty(obj, key, {
  	      value: value,
  	      enumerable: !0,
  	      configurable: !0,
  	      writable: !0
  	    }), obj[key];
  	  }
  	  try {
  	    define({}, "");
  	  } catch (err) {
  	    define = function define(obj, key, value) {
  	      return obj[key] = value;
  	    };
  	  }
  	  function wrap(innerFn, outerFn, self, tryLocsList) {
  	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
  	      generator = Object.create(protoGenerator.prototype),
  	      context = new Context(tryLocsList || []);
  	    return defineProperty(generator, "_invoke", {
  	      value: makeInvokeMethod(innerFn, self, context)
  	    }), generator;
  	  }
  	  function tryCatch(fn, obj, arg) {
  	    try {
  	      return {
  	        type: "normal",
  	        arg: fn.call(obj, arg)
  	      };
  	    } catch (err) {
  	      return {
  	        type: "throw",
  	        arg: err
  	      };
  	    }
  	  }
  	  exports.wrap = wrap;
  	  var ContinueSentinel = {};
  	  function Generator() {}
  	  function GeneratorFunction() {}
  	  function GeneratorFunctionPrototype() {}
  	  var IteratorPrototype = {};
  	  define(IteratorPrototype, iteratorSymbol, function () {
  	    return this;
  	  });
  	  var getProto = Object.getPrototypeOf,
  	    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  	  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  	  function defineIteratorMethods(prototype) {
  	    ["next", "throw", "return"].forEach(function (method) {
  	      define(prototype, method, function (arg) {
  	        return this._invoke(method, arg);
  	      });
  	    });
  	  }
  	  function AsyncIterator(generator, PromiseImpl) {
  	    function invoke(method, arg, resolve, reject) {
  	      var record = tryCatch(generator[method], generator, arg);
  	      if ("throw" !== record.type) {
  	        var result = record.arg,
  	          value = result.value;
  	        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
  	          invoke("next", value, resolve, reject);
  	        }, function (err) {
  	          invoke("throw", err, resolve, reject);
  	        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
  	          result.value = unwrapped, resolve(result);
  	        }, function (error) {
  	          return invoke("throw", error, resolve, reject);
  	        });
  	      }
  	      reject(record.arg);
  	    }
  	    var previousPromise;
  	    defineProperty(this, "_invoke", {
  	      value: function value(method, arg) {
  	        function callInvokeWithMethodAndArg() {
  	          return new PromiseImpl(function (resolve, reject) {
  	            invoke(method, arg, resolve, reject);
  	          });
  	        }
  	        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
  	      }
  	    });
  	  }
  	  function makeInvokeMethod(innerFn, self, context) {
  	    var state = "suspendedStart";
  	    return function (method, arg) {
  	      if ("executing" === state) throw new Error("Generator is already running");
  	      if ("completed" === state) {
  	        if ("throw" === method) throw arg;
  	        return doneResult();
  	      }
  	      for (context.method = method, context.arg = arg;;) {
  	        var delegate = context.delegate;
  	        if (delegate) {
  	          var delegateResult = maybeInvokeDelegate(delegate, context);
  	          if (delegateResult) {
  	            if (delegateResult === ContinueSentinel) continue;
  	            return delegateResult;
  	          }
  	        }
  	        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
  	          if ("suspendedStart" === state) throw state = "completed", context.arg;
  	          context.dispatchException(context.arg);
  	        } else "return" === context.method && context.abrupt("return", context.arg);
  	        state = "executing";
  	        var record = tryCatch(innerFn, self, context);
  	        if ("normal" === record.type) {
  	          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
  	          return {
  	            value: record.arg,
  	            done: context.done
  	          };
  	        }
  	        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
  	      }
  	    };
  	  }
  	  function maybeInvokeDelegate(delegate, context) {
  	    var methodName = context.method,
  	      method = delegate.iterator[methodName];
  	    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
  	    var record = tryCatch(method, delegate.iterator, context.arg);
  	    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
  	    var info = record.arg;
  	    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  	  }
  	  function pushTryEntry(locs) {
  	    var entry = {
  	      tryLoc: locs[0]
  	    };
  	    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  	  }
  	  function resetTryEntry(entry) {
  	    var record = entry.completion || {};
  	    record.type = "normal", delete record.arg, entry.completion = record;
  	  }
  	  function Context(tryLocsList) {
  	    this.tryEntries = [{
  	      tryLoc: "root"
  	    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  	  }
  	  function values(iterable) {
  	    if (iterable) {
  	      var iteratorMethod = iterable[iteratorSymbol];
  	      if (iteratorMethod) return iteratorMethod.call(iterable);
  	      if ("function" == typeof iterable.next) return iterable;
  	      if (!isNaN(iterable.length)) {
  	        var i = -1,
  	          next = function next() {
  	            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
  	            return next.value = undefined, next.done = !0, next;
  	          };
  	        return next.next = next;
  	      }
  	    }
  	    return {
  	      next: doneResult
  	    };
  	  }
  	  function doneResult() {
  	    return {
  	      value: undefined,
  	      done: !0
  	    };
  	  }
  	  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
  	    value: GeneratorFunctionPrototype,
  	    configurable: !0
  	  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
  	    value: GeneratorFunction,
  	    configurable: !0
  	  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
  	    var ctor = "function" == typeof genFun && genFun.constructor;
  	    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  	  }, exports.mark = function (genFun) {
  	    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  	  }, exports.awrap = function (arg) {
  	    return {
  	      __await: arg
  	    };
  	  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
  	    return this;
  	  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
  	    void 0 === PromiseImpl && (PromiseImpl = Promise);
  	    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
  	    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
  	      return result.done ? result.value : iter.next();
  	    });
  	  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
  	    return this;
  	  }), define(Gp, "toString", function () {
  	    return "[object Generator]";
  	  }), exports.keys = function (val) {
  	    var object = Object(val),
  	      keys = [];
  	    for (var key in object) keys.push(key);
  	    return keys.reverse(), function next() {
  	      for (; keys.length;) {
  	        var key = keys.pop();
  	        if (key in object) return next.value = key, next.done = !1, next;
  	      }
  	      return next.done = !0, next;
  	    };
  	  }, exports.values = values, Context.prototype = {
  	    constructor: Context,
  	    reset: function reset(skipTempReset) {
  	      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
  	    },
  	    stop: function stop() {
  	      this.done = !0;
  	      var rootRecord = this.tryEntries[0].completion;
  	      if ("throw" === rootRecord.type) throw rootRecord.arg;
  	      return this.rval;
  	    },
  	    dispatchException: function dispatchException(exception) {
  	      if (this.done) throw exception;
  	      var context = this;
  	      function handle(loc, caught) {
  	        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
  	      }
  	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
  	        var entry = this.tryEntries[i],
  	          record = entry.completion;
  	        if ("root" === entry.tryLoc) return handle("end");
  	        if (entry.tryLoc <= this.prev) {
  	          var hasCatch = hasOwn.call(entry, "catchLoc"),
  	            hasFinally = hasOwn.call(entry, "finallyLoc");
  	          if (hasCatch && hasFinally) {
  	            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
  	            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
  	          } else if (hasCatch) {
  	            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
  	          } else {
  	            if (!hasFinally) throw new Error("try statement without catch or finally");
  	            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
  	          }
  	        }
  	      }
  	    },
  	    abrupt: function abrupt(type, arg) {
  	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
  	        var entry = this.tryEntries[i];
  	        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
  	          var finallyEntry = entry;
  	          break;
  	        }
  	      }
  	      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
  	      var record = finallyEntry ? finallyEntry.completion : {};
  	      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
  	    },
  	    complete: function complete(record, afterLoc) {
  	      if ("throw" === record.type) throw record.arg;
  	      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
  	    },
  	    finish: function finish(finallyLoc) {
  	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
  	        var entry = this.tryEntries[i];
  	        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
  	      }
  	    },
  	    "catch": function _catch(tryLoc) {
  	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
  	        var entry = this.tryEntries[i];
  	        if (entry.tryLoc === tryLoc) {
  	          var record = entry.completion;
  	          if ("throw" === record.type) {
  	            var thrown = record.arg;
  	            resetTryEntry(entry);
  	          }
  	          return thrown;
  	        }
  	      }
  	      throw new Error("illegal catch attempt");
  	    },
  	    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
  	      return this.delegate = {
  	        iterator: values(iterable),
  	        resultName: resultName,
  	        nextLoc: nextLoc
  	      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
  	    }
  	  }, exports;
  	}
  	module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports; 
  } (regeneratorRuntime$1));

  var regeneratorRuntimeExports = regeneratorRuntime$1.exports;

  // TODO(Babel 8): Remove this file.

  var runtime = regeneratorRuntimeExports();
  var regenerator = runtime;

  // Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }

  var _regeneratorRuntime = /*@__PURE__*/getDefaultExportFromCjs(regenerator);

  var levelsParams = [
  	{
  		id: 0,
  		color: "#FFCC00",
  		zIndex: 11,
  		markerIcon: "https://www1.djicdn.com/dps/6734f5340f66c7be37db48c8889392bf.png",
  		markerCircle: "https://www2.djicdn.com/assets/images/flysafe/geo-system/warning-98a8a2c8d6768e22957488ce962d77c3.png?from=cdnMap"
  	},
  	{
  		id: 1,
  		color: "#1088F2",
  		zIndex: 13,
  		markerIcon: "https://www1.djicdn.com/dps/fbbea9e33581907cac182adb4bcd0c94.png",
  		markerCircle: "https://www4.djicdn.com/assets/images/flysafe/geo-system/authorization-878e879982c9555bcaab7bb6bce3c6ca.png?from=cdnMap"
  	},
  	{
  		id: 2,
  		color: "#DE4329",
  		zIndex: 15,
  		markerIcon: "https://www1.djicdn.com/dps/d47dfe9f089f259631fbed99610b8b5a.png",
  		markerCircle: "https://www5.djicdn.com/assets/images/flysafe/geo-system/restricted-e0ce1467a8df2d07ec6a33cf11f4279e.png?from=cdnMap"
  	},
  	{
  		id: 3,
  		color: "#EE8815",
  		zIndex: 12,
  		markerIcon: "https://www1.djicdn.com/dps/df822149e1e6e9e804e177813e044238.png",
  		markerCircle: "https://www4.djicdn.com/assets/images/flysafe/geo-system/enhanced_warning-623fea05bff2f83f3c0ff5a65a41a1df.png?from=cdnMap"
  	},
  	{
  		id: 4,
  		color: "#37C4DB",
  		zIndex: 11,
  		markerIcon: "https://www1.djicdn.com/dps/53b33783709b6ed06bc3afdd21ac2a81.png",
  		markerCircle: "https://www4.djicdn.com/assets/images/flysafe/geo-system/recommended-e92f991d039ae145c9b1c72ad62b26b2.png?from=cdnMap"
  	},
  	{
  		id: 5,
  		color: "#00BE00",
  		zIndex: 11,
  		markerIcon: "https://www1.djicdn.com/dps/53b33783709b6ed06bc3afdd21ac2a81.png",
  		markerCircle: "https://www4.djicdn.com/assets/images/flysafe/geo-system/recommended-e92f991d039ae145c9b1c72ad62b26b2.png?from=cdnMap"
  	},
  	{
  		id: 6,
  		color: "#979797",
  		zIndex: 10,
  		markerIcon: "https://www1.djicdn.com/dps/f5961991d664e130fcf9ad01b1f28043.png",
  		markerCircle: "https://www1.djicdn.com/assets/images/flysafe/geo-system/Oval-34907c1071d63a3f1fffdc739b0943d9.png?from=cdnMap"
  	},
  	{
  		id: 7,
  		color: "#00BE00",
  		zIndex: 11,
  		markerIcon: "https://www1.djicdn.com/dps/9d922ae5fbd80d3166a844a9e249ceb3.png",
  		markerCircle: "https://www1.djicdn.com/assets/images/flysafe/geo-system/regulations-2dfeef5b11017811dcaa720c86c49406.png?from=cdnMap"
  	},
  	{
  		id: 8,
  		color: "#00BE00",
  		zIndex: 11,
  		markerIcon: "https://www1.djicdn.com/dps/53b33783709b6ed06bc3afdd21ac2a81.png",
  		markerCircle: "https://www1.djicdn.com/dps/a968914208241c3f6a5a3c64c221b8ff.png"
  	},
  	{
  		id: 9,
  		color: "#DE4329",
  		zIndex: 15,
  		markerIcon: "https://www1.djicdn.com/dps/d47dfe9f089f259631fbed99610b8b5a.png",
  		markerCircle: "https://www5.djicdn.com/assets/images/flysafe/geo-system/restricted-e0ce1467a8df2d07ec6a33cf11f4279e.png?from=cdnMap"
  	}
  ];

  var dronesList = [
  	{
  		id: "dji-mini-3",
  		label: "DJI Mini 3"
  	},
  	{
  		id: "dji-mavic-3-classic",
  		label: "DJI Mini 3 Classic"
  	},
  	{
  		id: "industry-260",
  		label: "Mavic 3E/3T"
  	},
  	{
  		id: "dji-avata",
  		label: "Avata"
  	},
  	{
  		id: "dji-mini-3-pro",
  		label: "Mini 3 Pro"
  	},
  	{
  		id: "dji-mavic-3",
  		label: "Mavic 3"
  	},
  	{
  		id: "dji-mini-se",
  		label: "Mavic Mini SE"
  	},
  	{
  		id: "dji-air-2s",
  		label: "Air 2s"
  	},
  	{
  		id: "dji-fpv",
  		label: "FPV"
  	},
  	{
  		id: "mavic-mini-2",
  		label: "Mavic Mini 2"
  	},
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
    en: en,
    es: es
  });

  var img$2 = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 280.18 280.18'%3e%3cdefs%3e%3cstyle%3e.cls-1%7bfill:%23ffce00%3bfill-opacity:0.68%3bstroke:%23ffce00%3b%7d.cls-1%2c.cls-3%2c.cls-5%2c.cls-6%7bstroke-miterlimit:10%3bstroke-width:0.75px%3b%7d.cls-2%7bfill:%23ff7900%3bfill-opacity:0.46%3b%7d.cls-3%7bfill:%231072d6%3bfill-opacity:0.57%3bstroke:%231072d6%3b%7d.cls-4%7bopacity:0.63%3b%7d.cls-5%7bfill:%23bcbcbc%3bstroke:%23666%3b%7d.cls-6%7bfill:%23fc3424%3bfill-opacity:0.4%3bstroke:%23fc3424%3b%7d%3c/style%3e%3c/defs%3e%3cpath class='cls-1' d='M109.79%2c109.23c-44.68%2c44.68-40.36%2c121.45%2c9.66%2c171.47S246.24%2c335%2c290.92%2c290.36s40.36-121.46-9.65-171.48S154.48%2c64.54%2c109.79%2c109.23ZM270.56%2c270c-34.64%2c34.64-94.15%2c31.29-132.92-7.48s-42.12-98.28-7.48-132.92%2c94.14-31.29%2c132.92%2c7.48S305.2%2c235.36%2c270.56%2c270Z' transform='translate(-59.88 -59.29)'/%3e%3cpath class='cls-2' d='M130.16%2c129.59c-34.64%2c34.64-31.29%2c94.15%2c7.48%2c132.92s98.28%2c42.12%2c132.92%2c7.48%2c31.29-94.14-7.48-132.92S164.79%2c95%2c130.16%2c129.59Zm118%2c118c-24%2c24-64.91%2c22.14-91.29-4.23S128.56%2c176.07%2c152.6%2c152s64.91-22.14%2c91.28%2c4.24S272.15%2c223.51%2c248.12%2c247.55Z' transform='translate(-59.88 -59.29)'/%3e%3cellipse class='cls-3' cx='200.36' cy='199.79' rx='61.55' ry='67.54' transform='translate(-142.47 140.9) rotate(-45)'/%3e%3cg id='Layer_3' data-name='Layer 3'%3e%3cg class='cls-4'%3e%3cpolygon class='cls-5' points='166.25 180 236.66 279.6 236.75 279.51 279.51 236.75 279.6 236.66 180 166.25 166.25 180'/%3e%3cpolygon class='cls-5' points='113.92 100.18 43.51 0.58 43.43 0.67 0.67 43.43 0.58 43.51 100.18 113.92 113.92 100.18'/%3e%3c/g%3e%3cpolygon class='cls-6' points='180 113.92 166.25 100.18 140.09 126.34 113.92 100.18 100.18 113.92 126.34 140.09 100.18 166.25 113.92 180 140.09 153.84 166.25 180 180 166.25 153.84 140.09 180 113.92'/%3e%3c/g%3e%3cg id='Layer_3_copy' data-name='Layer 3 copy'%3e%3cg class='cls-4'%3e%3cpolygon class='cls-5' points='100.18 166.25 0.58 236.66 0.67 236.75 43.43 279.51 43.51 279.6 113.92 180 100.18 166.25'/%3e%3cpolygon class='cls-5' points='180 113.92 279.6 43.51 279.51 43.43 236.75 0.67 236.66 0.58 166.25 100.18 180 113.92'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";

  var img$1 = "data:image/svg+xml,%3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='768' height='768' viewBox='0 0 768 768'%3e%3ctitle%3e%3c/title%3e%3cpath d='M352.5 288v-64.5h63v64.5h-63zM384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM352.5 544.5v-192h63v192h-63z'%3e%3c/path%3e%3c/svg%3e";

  var img = "data:image/svg+xml,%3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='768' height='768' viewBox='0 0 768 768'%3e%3cpath d='M384 288q39 0 67.5 28.5t28.5 67.5-28.5 67.5-67.5 28.5-67.5-28.5-28.5-67.5 28.5-67.5 67.5-28.5zM384 544.5q66 0 113.25-47.25t47.25-113.25-47.25-113.25-113.25-47.25-113.25 47.25-47.25 113.25 47.25 113.25 113.25 47.25zM384 144q118.5 0 214.5 66t138 174q-42 108-138 174t-214.5 66-214.5-66-138-174q42-108 138-174t214.5-66z'%3e%3c/path%3e%3c/svg%3e";

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  /**
   * @protected
   */
  var API_AREAS_ENDPOINT = 'https://www-api.dji.com/api/geo/areas';
  var API_INFO_ENDPOINT = 'https://www-api.dji.com/api/geo/point-info';
  var API_LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // request all the levels, we filter later to avoid some api problems
  var MIN_ZOOM = 9; // < 9 breaks the API
  var HIDDEN_CLASS = 'ol-dji-geozones--ctrl-toggle-hidden';
  var DEFAULT_LANGUAGE = 'en';
  var controlElement = document.createElement('div');
  /**
   * OpenLayers Dji Geozones, creates multiples VectorLayers to
   * display interactives DJI Geo Zones on the map, requesting the
   * data on the fly to an DJI API.
   *
   * Also, add a Control to select levels of interest and drone to filter the results.
   * @fires init
   * @fires error
   * @constructor
   * @extends {ol/control/Control~Control}
   * @param opt_options DjiGeozones options, see [DjiGeozones Options](#options) for more details.
   */
  var DjiGeozones = /*#__PURE__*/function (_Control) {
    _inherits(DjiGeozones, _Control);
    var _super = _createSuper(DjiGeozones);
    function DjiGeozones(opt_options) {
      var _this;
      _classCallCheck(this, DjiGeozones);
      _this = _super.call(this, {
        target: opt_options.target,
        element: controlElement
      });
      // Default options
      _defineProperty(_assertThisInitialized(_this), "_options", void 0);
      _defineProperty(_assertThisInitialized(_this), "_i18n", void 0);
      _defineProperty(_assertThisInitialized(_this), "_paramsLevels", void 0);
      _defineProperty(_assertThisInitialized(_this), "_useApiForPopUp", void 0);
      _defineProperty(_assertThisInitialized(_this), "_isVisible", void 0);
      _defineProperty(_assertThisInitialized(_this), "_hideGeozones", void 0);
      _defineProperty(_assertThisInitialized(_this), "_currentZoom", void 0);
      _defineProperty(_assertThisInitialized(_this), "_lastZoom", void 0);
      _defineProperty(_assertThisInitialized(_this), "_initialized", void 0);
      _defineProperty(_assertThisInitialized(_this), "_moveendEvtKey", void 0);
      _defineProperty(_assertThisInitialized(_this), "_clickEvtKey", void 0);
      _defineProperty(_assertThisInitialized(_this), "_layers", void 0);
      _defineProperty(_assertThisInitialized(_this), "_areaDownloaded", void 0);
      _defineProperty(_assertThisInitialized(_this), "divControl", void 0);
      _defineProperty(_assertThisInitialized(_this), "popupContent", void 0);
      // Ol
      _defineProperty(_assertThisInitialized(_this), "_map", void 0);
      _defineProperty(_assertThisInitialized(_this), "_view", void 0);
      _defineProperty(_assertThisInitialized(_this), "_projection", void 0);
      _defineProperty(_assertThisInitialized(_this), "overlay", void 0);
      var defaults = {
        urlProxy: '',
        drone: 'spark',
        zonesMode: 'total',
        country: 'US',
        displayLevels: [2, 6, 1, 0, 3, 4, 7],
        activeLevels: [2, 6, 1, 0, 3, 4, 7],
        createPanel: 'full',
        target: null,
        startCollapsed: false,
        startActive: true,
        dronesToDisplay: dronesList,
        extent: null,
        loadingElement: '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
        clickEvent: 'singleclick',
        language: DEFAULT_LANGUAGE,
        alert: null
      };
      _this._options = deepObjectAssign(defaults, opt_options);
      // If language selector is provided and translation exists...
      _this._i18n = languages[_this._options.language in languages ? _this._options.language : DEFAULT_LANGUAGE];
      // Merge custom translations
      _this._i18n = deepObjectAssign(_this._i18n, opt_options.i18n || {});
      _this._paramsLevels = levelsParams;
      // By default, we use the properties features to show in the popup.
      // The official DJI map, makes an extra request to another API to get the data. I don't understand why.
      // It's more slow and requieres extra requests to an already downloaded data...
      // Either way, this extra API calls are supported if you want.
      _this._useApiForPopUp = false;
      _this._hideGeozones = true;
      _this._isVisible = false;
      _this._layers = [];
      _this.divControl = null;
      _this._areaDownloaded = null;
      return _this;
    }
    /**
     * Remove the control from its current map and attach it to the new map.
     * Pass null to just remove the control from the current map.
     * @param map
     * @public
     */
    _createClass(DjiGeozones, [{
      key: "setMap",
      value: function setMap(map) {
        _get(_getPrototypeOf(DjiGeozones.prototype), "setMap", this).call(this, map);
        if (map) {
          if (this._options.createPanel) {
            this._createPanel(this._options.createPanel, this._options.startCollapsed);
          }
          if (this._options.startActive) {
            this.show();
          }
        } else {
          controlElement.remove();
          this.destroy();
        }
      }
      /**
       * Initialize the layers and events.
       * This function is called once only if the control is activated.
       *
       * @fires init
       * @private
       */
    }, {
      key: "_initialize",
      value: function _initialize() {
        var _this2 = this;
        this._map = _get(_getPrototypeOf(DjiGeozones.prototype), "getMap", this).call(this);
        this._view = this._map.getView();
        this._projection = this._view.getProjection();
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
            var geom = feature.getGeometry();
            var level = feature.get('level');
            var levelParams = _this2._getLevelParamsById(level);
            var style;
            if (geom instanceof Polygon || geom instanceof Circle) {
              var color = feature.get('color');
              style = new Style({
                fill: new Fill({
                  color: DjiGeozones.colorWithAlpha(color, 0.3)
                }),
                stroke: new Stroke({
                  color: color,
                  width: 1
                }),
                zIndex: levelParams.zIndex
              });
            } else if (geom instanceof Point) {
              style = new Style({
                image: new Icon({
                  src: levelParams.markerIcon,
                  scale: 0.35,
                  anchor: [0.5, 0.9],
                  crossOrigin: 'anonymous'
                }),
                zIndex: levelParams.zIndex * 2
              });
            }
            return style;
          };
          API_LEVELS.forEach(function (level) {
            var props = {
              name: 'ol-dji-geozones',
              level: level,
              zIndex: _this2._getLevelParamsById(level).zIndex * 2,
              visible: _this2._hideGeozones ? false : _this2.activeLevels.includes(level) ? true : false,
              source: new VectorSource({
                attributions: '<a href="https://www.dji.com/flysafe/geo-map" rel="nofollow noopener noreferrer" target="_blank">DJI GeoZoneMap</a>'
              }),
              style: styleFunction
            };
            if (_this2._options.extent) props['extent'] = _this2._options.extent;
            var layer = new VectorLayer(props);
            _this2._map.addLayer(layer);
            _this2._layers.push(layer);
          });
        };
        /**
         * Create the PopUp element and add it to an Overlay
         * @protected
         */
        var createPopUpOverlay = function createPopUpOverlay() {
          var popupContainer = document.createElement('div');
          popupContainer.id = 'ol-dji-geozones--popup';
          popupContainer.className = "ol-dji-geozones--ol-popup ol-dji-geozones--".concat(_this2._options.theme);
          _this2.popupContent = document.createElement('div');
          _this2.popupContent.id = 'ol-dji-geozones--popup-content';
          _this2.popupContent.className = 'ol-dji-geozones--ol-popup-content';
          var popupCloser = document.createElement('a');
          popupCloser.id = 'ol-dji-geozones--popup-closer';
          popupCloser.className = 'ol-dji-geozones--ol-popup-closer';
          popupCloser.href = '#';
          popupCloser.onclick = function () {
            _this2.overlay.setPosition(undefined);
            popupCloser.blur();
            return false;
          };
          popupContainer.append(popupCloser);
          popupContainer.append(_this2.popupContent);
          _this2.overlay = new Overlay({
            element: popupContainer,
            autoPan: {
              animation: {
                duration: 250
              }
            }
          });
          _this2._map.addOverlay(_this2.overlay);
        };
        /**
         * @protected
         */
        var addMapEvents = function addMapEvents() {
          var handleZoomEnd = function handleZoomEnd() {
            if (_this2._currentZoom < MIN_ZOOM) {
              // Hide the layer and disable the control
              if (_this2._isVisible) {
                _this2._setLayersVisible(false);
                _this2._isVisible = false;
                _this2._setControlEnabled(false);
              }
            } else {
              // Show the layers and enable the control
              if (!_this2._isVisible) {
                _this2._setLayersVisible(true);
                _this2._isVisible = true;
                _this2._setControlEnabled(true);
                if (_this2.divControl) {
                  _this2.divControl.classList.remove(HIDDEN_CLASS);
                }
              } else {
                // If the view is closer, don't do anything, we already had the features
                if (!_this2._lastZoom || _this2._currentZoom > _this2._lastZoom) return;
              }
              _this2._getInfoFromView();
            }
          };
          var handleDragEnd = function handleDragEnd() {
            if (!_this2._isVisible || _this2._hideGeozones) return;
            _this2._getInfoFromView();
          };
          var clickHandler = function clickHandler(evt) {
            var type = _this2._useApiForPopUp ? 'useApiForPopUp' : 'useFeaturesForPopUp';
            _this2._getPointInfoFromClick(evt, type);
          };
          _this2._moveendEvtKey = _this2._map.on('moveend', function () {
            _this2._currentZoom = _this2._view.getZoom();
            if (_this2._currentZoom !== _this2._lastZoom) handleZoomEnd();else handleDragEnd();
            _this2._lastZoom = _this2._currentZoom;
          });
          _this2._clickEvtKey = _this2._map.on(_this2._options.clickEvent, clickHandler);
        };
        createVectorLayers();
        createPopUpOverlay();
        addMapEvents();
        this._initialized = true;
        _get(_getPrototypeOf(DjiGeozones.prototype), "dispatchEvent", this).call(this, 'init');
      }
      /**
       * Create a control panel in the map
       *
       * @param createPanel
       * @param startCollapsed
       * @private
       */
    }, {
      key: "_createPanel",
      value: function _createPanel(createPanel, startCollapsed) {
        var _this3 = this;
        /**
         * Add the 'full' control panel to the viewport map or custom target.
         * This displays each level as a layer, with the possibility to activate or deactivate each one,
         * color legends and a drone switcher.
         *
         * @protected
         */
        var addMapControlFull = function addMapControlFull() {
          var createDroneSelector = function createDroneSelector() {
            var handleChange = function handleChange(_ref) {
              var target = _ref.target;
              _this3.drone = target.value || target.options[target.selectedIndex].value;
              _this3._getInfoFromView( /* clear = */true);
            };
            var droneSelector = document.createElement('div');
            droneSelector.className = 'ol-dji-geozones--drone-selector';
            var select = document.createElement('select');
            select.onchange = handleChange;
            if (!_this3._isVisible) select.setAttribute('disabled', 'disabled');
            var options = '';
            _this3.dronesToDisplay.forEach(function (drone) {
              var selected = _this3.drone === drone.id ? 'selected' : '';
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
                _this3.addLevels(level);
              } else {
                _this3.removeLevels(level);
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
              if (_this3.activeLevels.indexOf(value) !== -1) checkbox.checked = true;
              if (disabled) checkbox.disabled = true;
              return checkbox;
            };
            var createLevelItem = function createLevelItem(value, _ref3) {
              var name = _ref3.name,
                desc = _ref3.desc,
                color = _ref3.color;
              var disabled = !_this3._isVisible;
              var id = 'level' + value;
              var divContainer = document.createElement('div');
              divContainer.className = "ol-dji-geozones--item-ctl ol-dji-geozones--item-ctl-".concat(value);
              divContainer.title = desc;
              // divContainer.setAttribute('style', `--level-color: ${color}`);
              // divContainer.setAttribute('data-geotooltip', desc);
              divContainer.setAttribute('data-level', String(value));
              divContainer.append(createCheckbox(id, value, disabled));
              divContainer.append(createLabel(name, id, color));
              return divContainer;
            };
            var levelSelector = document.createElement('div');
            levelSelector.className = 'ol-dji-geozones--level-selector';
            _this3._options.displayLevels.forEach(function (lev) {
              var level = createLevelItem(lev, _this3.getLevelById(lev));
              levelSelector.append(level);
            });
            return levelSelector;
          };
          var createButtonCollapser = function createButtonCollapser() {
            var button = document.createElement('button');
            button.className = 'ol-dji-geozones--collapse ol-dji-geozones--btn-sm';
            button.title = _this3._i18n.labels.collapse;
            button.onclick = function () {
              return _this3.setPanelCollapsed(true);
            };
            return button;
          };
          var createButtonVisibility = function createButtonVisibility() {
            var button = document.createElement('button');
            button.className = 'ol-dji-geozones--visibility ol-dji-geozones--btn-sm';
            button.title = _this3._i18n.labels.hideGeozones;
            button.innerHTML = "<img src=\"".concat(img, "\"/>");
            button.onclick = function () {
              _this3.hide();
            };
            return button;
          };
          _this3.divControl.classList.add('ol-dji-geozones--ctrl-full');
          _this3.divControl.innerHTML = "\n            <header>\n                <h3>".concat(_this3._i18n.labels.djiGeoZones, "</h3>\n                <span class=\"ol-dji-geozones--loading\">\n                    ").concat(_this3._options.loadingElement, "\n                </span>\n            </header>\n            <main>\n                <section class=\"ol-dji-geozones--selectors\"></section>\n                <section>\n                    <div class=\"ol-dji-geozones--logo\" title=\"").concat(_this3._i18n.labels.expand, "\"><img src=\"").concat(img$2, "\"/></div>\n                    <span class=\"ol-dji-geozones--advice\">").concat(_this3._i18n.labels.helperZoom, "</span>\n                </section>\n            </main>\n            ");
          var droneSelector = createDroneSelector();
          _this3.divControl.querySelector('.ol-dji-geozones--selectors').append(droneSelector);
          var levelSelector = createLevelSelector();
          _this3.divControl.querySelector('.ol-dji-geozones--selectors').append(levelSelector);
          var buttonCollapse = createButtonCollapser();
          _this3.divControl.querySelector('header').append(buttonCollapse);
          var buttonVisibility = createButtonVisibility();
          _this3.divControl.querySelector('header').append(buttonVisibility);
          var logo = _this3.divControl.querySelector('.ol-dji-geozones--logo');
          logo.onclick = function () {
            if (_this3.divControl.classList.contains(HIDDEN_CLASS)) {
              _this3.show();
            }
            _this3.setPanelCollapsed(false);
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
          _this3.divControl.classList.add('ol-dji-geozones--ctrl-compact');
          _this3.divControl.innerHTML = "\n            <header>\n                <span class=\"ol-dji-geozones--loading\">\n                    ".concat(_this3._options.loadingElement, "\n                </span>\n            </header>\n            <main>\n                <section>\n                    <div class=\"ol-dji-geozones--logo\" title=\"").concat(_this3._i18n.labels.showHide, "\"><img src=\"").concat(img$2, "\"/></div>\n                </section>\n            </main>\n            ");
          var logo = _this3.divControl.querySelector('.ol-dji-geozones--logo');
          logo.onclick = function () {
            var hiddenClass = 'ol-dji-geozones--ctrl-toggle-hidden';
            if (_this3.divControl.classList.contains(hiddenClass)) {
              _this3.show();
            } else {
              _this3.hide();
            }
          };
        };
        this.divControl = controlElement;
        this.divControl.className = "ol-dji-geozones ol-control ol-dji-geozones--".concat(this._options.theme);
        if (this._hideGeozones) {
          this.divControl.classList.add('ol-dji-geozones--ctrl-toggle-hidden');
        } else {
          if (!this._isVisible) {
            this.divControl.classList.add('ol-dji-geozones--ctrl-disabled');
          }
        }
        if (startCollapsed) {
          this.divControl.classList.add('ol-dji-geozones--ctrl-collapsed');
        }
        if (createPanel === true || createPanel === 'full') {
          addMapControlFull();
        } else if (createPanel === 'compact') {
          addMapControlCompact();
        } else {
          return;
        }
      }
      /**
       * @private
       */
    }, {
      key: "_setLayersVisible",
      value: function _setLayersVisible(bool) {
        var _this4 = this;
        this.layers.forEach(function (layer) {
          if (!bool) {
            layer.setVisible(bool);
          } else if (bool && _this4.activeLevels.includes(layer.get('level'))) {
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
      key: "_getPointInfoFromClick",
      value: function () {
        var _getPointInfoFromClick2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(evt, type) {
          var _this5 = this;
          var infoKeys, idInfoRequest, getInfoFromApiLatLng, getInfoFromFeatures, showGeozoneDataInPopUp, opt_options, data, features;
          return _regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                infoKeys = ['name', 'level', 'type', 'height', 'shape', 'start_at', 'end_at', 'url', 'address', 'description'];
                idInfoRequest = 0;
                getInfoFromApiLatLng = /*#__PURE__*/function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(coordinate) {
                    var request;
                    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) switch (_context2.prev = _context2.next) {
                        case 0:
                          // Prevent multiples requests
                          idInfoRequest += 1;
                          request = idInfoRequest;
                          return _context2.abrupt("return", new Promise(function (resolve) {
                            setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                              var center4326, clickLatLng, apiJson, areas, featuresProps, _iterator, _step, area;
                              return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) switch (_context.prev = _context.next) {
                                  case 0:
                                    if (!(request !== idInfoRequest)) {
                                      _context.next = 2;
                                      break;
                                    }
                                    return _context.abrupt("return");
                                  case 2:
                                    center4326 = proj.transform(coordinate, _this5._projection, 'EPSG:4326');
                                    clickLatLng = {
                                      lat: center4326[1],
                                      lng: center4326[0]
                                    };
                                    _context.next = 6;
                                    return _this5._getApiGeoData('info', clickLatLng);
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
                              }, _callee);
                            })), 100);
                          }));
                        case 3:
                        case "end":
                          return _context2.stop();
                      }
                    }, _callee2);
                  }));
                  return function getInfoFromApiLatLng(_x3) {
                    return _ref4.apply(this, arguments);
                  };
                }();
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
                      evtKey = _this5._map.once('movestart', function () {
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
                    infoTooltip.className = "ol-dji-geozones--info ol-dji-geozones--".concat(_this5._options.theme);
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
                    var levelValues = _this5.getLevelById(level);
                    var lbl = _this5._i18n.labels;
                    var html = "\n                    <div class=\"ol-dji-geozones--marker\">\n                        <img src=\"".concat(levelValues.markerCircle, "\">\n                    </div>\n                    <div class=\"ol-dji-geozones--main\">\n                        <h3 class=\"ol-dji-geozones--title\">").concat(name, "</h3>\n                        <p class=\"ol-dji-geozones--level\">").concat(lbl.level, ": ").concat(levelValues.name, " </p>\n                        <p class=\"ol-dji-geozones--type\">").concat(lbl.type, ": ").concat(_this5._getGeozoneTypeById(type).name, "</p>\n                        ").concat(begin_at ? "<p class=\"ol-dji-geozones--start_time\">".concat(lbl.startTime, ": ").concat(begin_at, "</p>") : '', "\n                        ").concat(end_at ? "<p class=\"ol-dji-geozones--end_time\">".concat(lbl.endTime, ": ").concat(end_at, "</p><p class=\"ol-dji-geozones--time_tips\">").concat(lbl.timeTips, "</p>") : '', "         \n                        ").concat(height ? "<p class=\"ol-dji-geozones--height\">".concat(lbl.maxAltitude, " (m): ").concat(height, "</p>") : '', " \n                        ").concat(address ? "<p class=\"ol-dji-geozones--address\">".concat(lbl.address, ": ").concat(address, "</p>") : '', "\n                        ").concat(description ? "<p class=\"ol-dji-geozones--desc\">".concat(lbl.tips, ": ").concat(description, "</p>") : '', "\n                        ").concat(url ? "<p class=\"ol-dji-geozones--url\">".concat(lbl.link, ": <a href=\"").concat(url, "\">").concat(lbl.learnMore, "</a></p>") : '', "\n                </div>");
                    var item = document.createElement('div');
                    item.className = 'ol-dji-geozones--item';
                    item.innerHTML = html;
                    item.querySelector('.ol-dji-geozones--level').append(createTooltip(levelValues));
                    return item;
                  };
                  var preventDuplicates = [];
                  var arrGeozonesData = Array.isArray(geozonesData) ? geozonesData : [geozonesData];
                  _this5.popupContent.innerHTML = '';
                  arrGeozonesData.forEach(function (geozoneProps) {
                    var element = parseDataToHtml(geozoneProps);
                    // The oficial DJI map show duplicates, but we don't want that
                    if (preventDuplicates.indexOf(element.innerHTML) === -1) {
                      preventDuplicates.push(element.innerHTML);
                      _this5.popupContent.append(element);
                      _this5.popupContent.append(document.createElement('HR'));
                    }
                  });
                  _this5.overlay.setPosition(coordinates);
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
                if (!this._map.hasFeatureAtPixel(evt.pixel, opt_options)) {
                  _context3.next = 17;
                  break;
                }
                this.popupContent.innerHTML = this._options.loadingElement.toString();
                this.overlay.setPosition(evt.coordinate);
                _context3.next = 16;
                return getInfoFromApiLatLng(evt.coordinate);
              case 16:
                data = _context3.sent;
              case 17:
                _context3.next = 21;
                break;
              case 19:
                features = this._map.getFeaturesAtPixel(evt.pixel, opt_options);
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
          }, _callee3, this, [[5, 24]]);
        }));
        function _getPointInfoFromClick(_x, _x2) {
          return _getPointInfoFromClick2.apply(this, arguments);
        }
        return _getPointInfoFromClick;
      }()
      /**
       *
       * @param clear
       * @protected
       */
    }, {
      key: "_getInfoFromView",
      value: function _getInfoFromView() {
        var _this6 = this;
        var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var idAreasRequest = 0;
        /**
         * The level parameter returned by the API is sometimes wrong (2 != 6),
         * so wee need to fixed using the color.
         * Last checked: 2023-04-16
         * @param feature
         * @protected
         */
        var fixLevelValue = function fixLevelValue(feature) {
          var color = feature.get('color');
          var level = Object.keys(_this6._paramsLevels).find(function (key) {
            return _this6._paramsLevels[key].color === color;
          });
          feature.set('level', level, /* silent */true);
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
              };
              // Only a few of "areas" come with polygons
              if (area.polygon_points) {
                var featureExtra = new Feature(_objectSpread(_objectSpread({}, featureProps), {}, {
                  geometry: new Polygon(area.polygon_points).transform('EPSG:4326', _this6._projection)
                }));
                featureExtra.setId(area.area_id + '_poly');
                features.push(fixLevelValue(featureExtra));
              }
              var feature = new Feature(_objectSpread(_objectSpread({}, featureProps), {}, {
                geometry: new Point([area.lng, area.lat]).transform('EPSG:4326', _this6._projection)
              }));
              // Store the id to avoid duplicates
              feature.setId(area.area_id);
              features.push(fixLevelValue(feature));
              if (area.sub_areas) {
                area.sub_areas.forEach(function (sub_area) {
                  var subFeature;
                  if (sub_area.polygon_points) {
                    subFeature = new Feature({
                      color: sub_area.color,
                      height: sub_area.height,
                      level: sub_area.level,
                      name: area.name,
                      radius: sub_area.radius,
                      shape: sub_area.shape,
                      type: area.type,
                      lng: sub_area.lng,
                      lat: sub_area.lat,
                      geometry: new Polygon(sub_area.polygon_points).transform('EPSG:4326', _this6._projection)
                    });
                  } else {
                    subFeature = new Feature({
                      color: sub_area.color,
                      height: sub_area.height,
                      level: sub_area.level,
                      name: area.name,
                      radius: sub_area.radius,
                      shape: sub_area.shape,
                      type: area.type,
                      lng: sub_area.lng,
                      lat: sub_area.lat,
                      geometry: new Circle([sub_area.lng, sub_area.lat], sub_area.radius / 100000).transform('EPSG:4326', _this6._projection)
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
        };
        // Prevent multiples requests
        idAreasRequest += 1;
        var request = idAreasRequest;
        // Original DJI map same behavior to prevent multiples requests
        setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
          var center, center4326, viewLatLng, data, features;
          return _regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                if (!(request !== idAreasRequest)) {
                  _context4.next = 2;
                  break;
                }
                return _context4.abrupt("return");
              case 2:
                _context4.prev = 2;
                _this6._showLoading(true);
                center = _this6._view.getCenter();
                center4326 = proj.transform(center, _this6._projection, 'EPSG:4326');
                viewLatLng = {
                  lat: center4326[1],
                  lng: center4326[0]
                };
                if (clear) {
                  _this6._areaDownloaded = null; // Remove area already downloaded
                }
                _context4.next = 10;
                return _this6._getApiGeoData('areas', viewLatLng);
              case 10:
                data = _context4.sent;
                if (data) {
                  _context4.next = 13;
                  break;
                }
                return _context4.abrupt("return");
              case 13:
                if (clear) clearFeatures();
                features = apiResponseToFeatures(data);
                if (features) addFeaturesToEachLevel(features);
                _this6._showLoading(false);
                // console.log(data);
                _context4.next = 24;
                break;
              case 19:
                _context4.prev = 19;
                _context4.t0 = _context4["catch"](2);
                _this6.dispatchEvent(new ErrorEvent(_context4.t0));
                if (_context4.t0.message) console.error(_context4.t0);
                _this6._showLoading(false);
              case 24:
              case "end":
                return _context4.stop();
            }
          }, _callee4, null, [[2, 19]]);
        })), 300);
      }
      /**
       * Controller for the API rquests.
       * @param typeApiRequest
       * @param latLng
       * @protected
       */
    }, {
      key: "_getApiGeoData",
      value: function () {
        var _getApiGeoData2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(typeApiRequest, latLng) {
          var _this7 = this;
          var apiRequest, getPointInfo, getAreas, getMapRadius, searchRadius, data;
          return _regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) switch (_context8.prev = _context8.next) {
              case 0:
                apiRequest = /*#__PURE__*/function () {
                  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(typeApiRequest, _ref7, searchRadius) {
                    var lng, lat, api_endpoint, url, queryObj, finalUrl, response;
                    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                      while (1) switch (_context5.prev = _context5.next) {
                        case 0:
                          lng = _ref7.lng, lat = _ref7.lat;
                          api_endpoint = typeApiRequest === 'areas' ? API_AREAS_ENDPOINT : API_INFO_ENDPOINT; // If not proxy is passed, make a direct request
                          // Maybe in the future the api will has updated CORS restrictions
                          url = new URL(api_endpoint);
                          queryObj = {
                            drone: _this7.drone,
                            zones_mode: _this7.zonesMode,
                            country: _this7.country,
                            level: API_LEVELS,
                            lng: lng,
                            lat: lat,
                            search_radius: searchRadius
                          };
                          Object.keys(queryObj).forEach(function (key) {
                            return url.searchParams.append(key, queryObj[key]);
                          });
                          finalUrl = _this7._options.urlProxy ? _this7._options.urlProxy + encodeURIComponent(url.toString()) : url.toString();
                          _context5.next = 8;
                          return fetch(finalUrl);
                        case 8:
                          response = _context5.sent;
                          if (response.ok) {
                            _context5.next = 11;
                            break;
                          }
                          throw new Error('HTTP-Error: ' + response.status);
                        case 11:
                          _context5.next = 13;
                          return response.json();
                        case 13:
                          return _context5.abrupt("return", _context5.sent);
                        case 14:
                        case "end":
                          return _context5.stop();
                      }
                    }, _callee5);
                  }));
                  return function apiRequest(_x6, _x7, _x8) {
                    return _ref8.apply(this, arguments);
                  };
                }();
                getPointInfo = /*#__PURE__*/function () {
                  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(latLng, searchRadius) {
                    var data;
                    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                      while (1) switch (_context6.prev = _context6.next) {
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
                    }, _callee6);
                  }));
                  return function getPointInfo(_x9, _x10) {
                    return _ref9.apply(this, arguments);
                  };
                }();
                getAreas = /*#__PURE__*/function () {
                  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(centerLatLng, searchRadius) {
                    var extent$1, polygon, data;
                    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                      while (1) switch (_context7.prev = _context7.next) {
                        case 0:
                          extent$1 = _this7._view.calculateExtent();
                          polygon = Polygon.fromExtent(extent$1);
                          if (!_this7._areaDownloaded) {
                            _context7.next = 8;
                            break;
                          }
                          if (!(_this7._areaDownloaded.intersectsCoordinate(extent.getCenter(extent$1)) && _this7._areaDownloaded.intersectsCoordinate(extent.getBottomLeft(extent$1)) && _this7._areaDownloaded.intersectsCoordinate(extent.getTopRight(extent$1)) && _this7._areaDownloaded.intersectsCoordinate(extent.getBottomRight(extent$1)) && _this7._areaDownloaded.intersectsCoordinate(extent.getTopLeft(extent$1)))) {
                            _context7.next = 5;
                            break;
                          }
                          return _context7.abrupt("return");
                        case 5:
                          _this7._areaDownloaded.appendPolygon(polygon);
                          _context7.next = 9;
                          break;
                        case 8:
                          _this7._areaDownloaded = new MultiPolygon([polygon.getCoordinates()]);
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
                    }, _callee7);
                  }));
                  return function getAreas(_x11, _x12) {
                    return _ref10.apply(this, arguments);
                  };
                }();
                getMapRadius = function getMapRadius(_ref11) {
                  var lng = _ref11.lng,
                    lat = _ref11.lat;
                  var center = [lng, lat];
                  var size = _this7._map.getSize();
                  var extent = _this7._view.calculateExtent(size);
                  extent = proj.transformExtent(extent, _this7._projection, 'EPSG:4326');
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
          }, _callee8, this);
        }));
        function _getApiGeoData(_x4, _x5) {
          return _getApiGeoData2.apply(this, arguments);
        }
        return _getApiGeoData;
      }()
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
      /**
       * Show or hides the control panel
       * @param visible
       * @public
       */
    }, {
      key: "setPanelVisible",
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
       * @public
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
       * @public
       */
    }, {
      key: "layers",
      get: function get() {
        return this._layers;
      }
      /**
       * Get the layer acordding the level
       * @param level
       * @public
       */
    }, {
      key: "getLayerByLevel",
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
      key: "_getGeozoneTypeById",
      value: function _getGeozoneTypeById() {
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
      key: "dronesToDisplay",
      get: function get() {
        return this._options.dronesToDisplay;
      }
      /**
       * Setter for API parameter `drone`. Triggers an API request
       * @param drone
       */
    }, {
      key: "drone",
      get:
      /**
       * Getter for Api parameter drone
       * @public
       */
      function get() {
        return this._options.drone;
      }
      /**
       * Setter for API parameter `zonesMode`. Triggers an API request
       * @param zonesMode
       * @public
       */,
      set: function set(drone) {
        this._options.drone = drone;
        this._getInfoFromView();
      }
    }, {
      key: "zonesMode",
      get:
      /**
       * Getter for API parameter `zonesMode`
       * @public
       */
      function get() {
        return this._options.zonesMode;
      }
      /**
       * Setter for API parameter `country`. Triggers an API request
       * @param country
       * @public
       */,
      set: function set(zonesMode) {
        this._options.zonesMode = zonesMode;
        this._getInfoFromView();
      }
    }, {
      key: "country",
      get:
      /**
       * Getter for API parameter `country`
       * @public
       */
      function get() {
        return this._options.country;
      }
      /**
       * Get the level parameters, like color, icon, and description
       * @param id
       * @protected
       */,
      set: function set(country) {
        this._options.country = country;
        this._getInfoFromView();
      }
    }, {
      key: "_getLevelParamsById",
      value: function _getLevelParamsById() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        return this._paramsLevels.find(function (lev) {
          return lev.id == id;
        });
      }
      /**
       * Get all the parameters from a level and the i18n texts
       * @param id
       * @public
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
        return _objectSpread(_objectSpread({}, params), texts);
      }
      /**
       * Replace the active levels with this values and refresh the view
       * @param levels
       * @public
       */
    }, {
      key: "activeLevels",
      get: function get() {
        return this._options.activeLevels;
      }
      /**
       * Add the level/s to the view
       * @param levels
       * @param refresh If true, refresh the view and show the active levels
       * @public
       */,
      set: function set(levels) {
        var _this8 = this;
        this._options.activeLevels = levels;
        this._options.displayLevels.forEach(function (lev) {
          var layer = _this8.getLayerByLevel(lev);
          if (levels.includes(lev)) {
            layer.setVisible(true);
          } else {
            layer.setVisible(false);
          }
        });
      }
    }, {
      key: "addLevels",
      value: function addLevels(levels) {
        var _this9 = this;
        var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var arrLevels = !Array.isArray(levels) ? [levels] : levels;
        this.activeLevels = [].concat(_toConsumableArray(this.activeLevels), _toConsumableArray(arrLevels));
        if (refresh) {
          arrLevels.forEach(function (lev) {
            var layer = _this9.getLayerByLevel(lev);
            layer.setVisible(true);
          });
        }
      }
      /**
       * Remove the level/s from the view
       *
       * @param levels
       * @param refresh If true, refresh the view and show the actived levels
       * @public
       */
    }, {
      key: "removeLevels",
      value: function removeLevels(levels) {
        var _this10 = this;
        var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var arrLevels = !Array.isArray(levels) ? [levels] : levels;
        this.activeLevels = this.activeLevels.filter(function (x) {
          return !arrLevels.includes(x);
        });
        if (refresh) {
          arrLevels.forEach(function (lev) {
            var layer = _this10.getLayerByLevel(lev);
            layer.setVisible(false);
          });
        }
      }
      /**
       * Removes the control, layers and events from the map
       * @public
       */
    }, {
      key: "destroy",
      value: function destroy() {
        var _this11 = this;
        this.layers.forEach(function (layer) {
          _this11._map.removeLayer(layer);
        });
        Observable.unByKey(this._clickEvtKey);
        Observable.unByKey(this._moveendEvtKey);
      }
      /**
       * Hide the geoZones and the Control
       * @public
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
       * Show the geoZones and the Control
       * @public
       */
    }, {
      key: "show",
      value: function show() {
        if (!this._initialized) {
          this._initialize();
        }
        this._hideGeozones = false;
        this._isVisible = this._view.getZoom() >= MIN_ZOOM;
        this._showLoading(true);
        if (this._isVisible) {
          this._setControlEnabled(true);
          this._getInfoFromView();
          this._setLayersVisible(true);
          if (this.divControl) {
            this.divControl.classList.remove(HIDDEN_CLASS);
          }
        } else {
          this._alert(this._i18n.labels.helperZoom);
          this._showLoading(false);
        }
      }
      /**
       * Function to display messages to the user
       *
       * @param msg
       * @private
       */
    }, {
      key: "_alert",
      value: function _alert(msg) {
        if (typeof this._options.alert === 'function') {
          this._options.alert(msg);
        } else {
          // Default and ugly alert message
          alert(msg);
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
    }], [{
      key: "colorWithAlpha",
      value: function colorWithAlpha(color$1) {
        var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var _Array$from = Array.from(color.asArray(color$1)),
          _Array$from2 = _slicedToArray(_Array$from, 3),
          r = _Array$from2[0],
          g = _Array$from2[1],
          b = _Array$from2[2];
        return color.asString([r, g, b, alpha]);
      }
    }]);
    return DjiGeozones;
  }(Control);
  var ErrorEvent = /*#__PURE__*/function (_BaseEvent) {
    _inherits(ErrorEvent, _BaseEvent);
    var _super2 = _createSuper(ErrorEvent);
    function ErrorEvent(error) {
      var _this12;
      _classCallCheck(this, ErrorEvent);
      _this12 = _super2.call(this, 'error');
      _defineProperty(_assertThisInitialized(_this12), "message", void 0);
      _defineProperty(_assertThisInitialized(_this12), "stack", void 0);
      _this12.message = error.message;
      _this12.stack = error.stack;
      return _this12;
    }
    return _createClass(ErrorEvent);
  }(BaseEvent);
  /**
   *
   * @param target
   * @param sources
   * @returns
   */
  var deepObjectAssign = function deepObjectAssign(target) {
    for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }
    sources.forEach(function (source) {
      Object.keys(source).forEach(function (key) {
        var s_val = source[key];
        var t_val = target[key];
        target[key] = t_val && s_val && _typeof$1(t_val) === 'object' && _typeof$1(s_val) === 'object' && !Array.isArray(t_val) // Don't merge arrays
        ? deepObjectAssign(t_val, s_val) : s_val;
      });
    });
    return target;
  };

  return DjiGeozones;

}));
//# sourceMappingURL=ol-dji-geozones.js.map
