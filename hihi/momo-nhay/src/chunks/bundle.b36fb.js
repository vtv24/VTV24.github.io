System.register([], function(_export, _context) { return { execute: function () {
System.register("chunks:///_virtual/_rollupPluginModLoBabelHelpers.js", [], function (exports) {
  'use strict';

  return {
    execute: function () {
      exports({
        applyDecoratedDescriptor: _applyDecoratedDescriptor,
        assertThisInitialized: _assertThisInitialized,
        createClass: _createClass,
        defineProperty: _defineProperty,
        inheritsLoose: _inheritsLoose,
        initializerDefineProperty: _initializerDefineProperty,
        setPrototypeOf: _setPrototypeOf
      });

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

      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;

        _setPrototypeOf(subClass, superClass);
      }

      function _setPrototypeOf(o, p) {
        _setPrototypeOf = exports('setPrototypeOf', Object.setPrototypeOf || function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        });
        return _setPrototypeOf(o, p);
      }

      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
      }

      function _initializerDefineProperty(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
          enumerable: descriptor.enumerable,
          configurable: descriptor.configurable,
          writable: descriptor.writable,
          value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
      }

      function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object.keys(descriptor).forEach(function (key) {
          desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
          desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
          return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
          desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
          desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
          Object.defineProperty(target, property, desc);
          desc = null;
        }

        return desc;
      }
    }
  };
});

System.register("chunks:///_virtual/bundle.mjs_cjs=&original=.js", ['./cjs-loader.mjs', './bundle.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './bundle.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./bundle.js', module.meta.url);
      }

      loader.require(__cjsMetaURL);
    }
  };
});

System.register("chunks:///_virtual/cjs-loader.mjs", [], function (exports) {
  'use strict';

  return {
    execute: function () {
      var CjsLoader = /*#__PURE__*/function () {
        function CjsLoader() {
          this._namedWrappers = {};
          this._resolveCache = {};
          this._moduleCache = {};
        }

        var _proto = CjsLoader.prototype;

        _proto.define = function define(id, wrapper) {
          this._namedWrappers[id] = wrapper;
        };

        _proto.require = function require(id) {
          return this._require(id);
        };

        _proto.createRequireWithReqMap = function createRequireWithReqMap(requireMap, originalRequire) {
          return function (specifier) {
            var resolved = requireMap[specifier];

            if (resolved) {
              return originalRequire(resolved);
            } else {
              throw new Error('Unresolved specifier ' + specifier);
            }
          };
        };

        _proto.throwInvalidWrapper = function throwInvalidWrapper(requestTarget, from) {
          throw new Error("Module '" + requestTarget + "' imported from '" + from + "' is expected be an ESM-wrapped CommonJS module but it doesn't.");
        };

        _proto._require = function _require(id, parent) {
          var cachedModule = this._moduleCache[id];

          if (cachedModule) {
            return cachedModule.exports;
          }

          var module = {
            id: id,
            exports: {}
          };
          this._moduleCache[id] = module;

          this._tryModuleLoad(module, id);

          return module.exports;
        };

        _proto._resolve = function _resolve(specifier, parent) {
          return this._resolveFromInfos(specifier, parent) || this._throwUnresolved(specifier, parent);
        };

        _proto._resolveFromInfos = function _resolveFromInfos(specifier, parent) {
          var _cjsInfos$parent$reso, _cjsInfos$parent;

          if (specifier in cjsInfos) {
            return specifier;
          }

          if (!parent) {
            return;
          }

          return (_cjsInfos$parent$reso = (_cjsInfos$parent = cjsInfos[parent]) === null || _cjsInfos$parent === void 0 ? void 0 : _cjsInfos$parent.resolveCache[specifier]) !== null && _cjsInfos$parent$reso !== void 0 ? _cjsInfos$parent$reso : undefined;
        };

        _proto._tryModuleLoad = function _tryModuleLoad(module, id) {
          var threw = true;

          try {
            this._load(module, id);

            threw = false;
          } finally {
            if (threw) {
              delete this._moduleCache[id];
            }
          }
        };

        _proto._load = function _load(module, id) {
          var wrapper = this._loadWrapper(id);

          var require = this._createRequire(module);

          wrapper(module.exports, require, module);
        };

        _proto._loadWrapper = function _loadWrapper(id) {
          if (id in this._namedWrappers) {
            return this._namedWrappers[id];
          } else {
            return this._loadExternalWrapper(id);
          }
        };

        _proto._loadExternalWrapper = function _loadExternalWrapper(id) {
          return function (exports) {
            var path;

            try {
              path = URL.fileURLToPath(id);
            } catch (err) {
              throw new Error(id + " is not a valid file URL");
            }

            var extern = require(path);

            Object.assign(exports, extern);
          };
        };

        _proto._createRequire = function _createRequire(module) {
          var _this = this;

          return function (specifier) {
            return _this._require(specifier, module);
          };
        };

        _proto._throwUnresolved = function _throwUnresolved(specifier, parentUrl) {
          throw new Error("Unable to resolve " + specifier + " from " + parent + ".");
        };

        return CjsLoader;
      }();

      var loader = exports('default', new CjsLoader());
    }
  };
});

} }; });