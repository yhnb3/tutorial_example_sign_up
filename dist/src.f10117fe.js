// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/app.template.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var template = "\n<div class=\"min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12\">\n  <div class=\"relative py-3 sm:max-w-xl sm:mx-auto\">\n\n    <div class=\"leading-loose\">\n      <form id=\"sign-up-form\" class=\"max-w-xl m-4 p-10 bg-white rounded shadow-xl\">\n        <p class=\"text-gray-800 font-medium mb-5 text-center\">{{title}}</p>\n        <div id=\"required-fields\">\n        \n        </div>\n        \n        <p class=\"mt-8 text-gray-300 text-sm\">Additional information</p>\n\n        <div id=\"optional-fields\">\n        \n        </div>\n\n        <div class=\"mt-4\">\n          <button id=\"btn-join\" class=\"px-4 py-1 text-white font-light tracking-wider bg-gray-300 rounded\" type=\"submit\">\uD68C\uC6D0 \uAC00\uC785</button>\n        </div>    \n      </form>\n    </div>\n\n  </div>\n</div>\n";
exports.default = window.Handlebars.compile(template);
},{}],"src/constants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequireEmailRule = exports.MinimumLengthLimit = exports.CantStartNumber = exports.CantContainWhitespace = exports.RequireRule = void 0;
exports.RequireRule = {
  rule: /.+/,
  match: true,
  message: '필수 입력 항목입니다.'
};
exports.CantContainWhitespace = {
  rule: /\s/,
  match: false,
  message: '공백을 포함할 수 없습니다.'
};
exports.CantStartNumber = {
  rule: /^\d/,
  match: false,
  message: '숫자로 시작하는 아이디는 사용할 수 없습니다.'
};

var MinimumLengthLimit = function MinimumLengthLimit(limit) {
  return {
    rule: new RegExp("(.){" + limit + "}"),
    match: true,
    message: "\uCD5C\uC18C\uD55C " + limit + "\uAE00\uC790 \uC774\uC0C1 \uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4."
  };
};

exports.MinimumLengthLimit = MinimumLengthLimit;
exports.RequireEmailRule = {
  rule: /@/,
  match: true,
  message: '이메일 형식으로 입력하셔야 합니다.'
};
},{}],"src/views/text-field.template.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var template = "\n  <div id=\"field-{{id}}\" class=\"mt-4\">\n    <div class=\"flex items-start mb-1\">\n      <span class=\"flex items-center\">\n        <svg class=\"flex-shrink-0 h-5 w-5 {{#if valid}}{{#if updated}}text-green-500{{else}}text-gray-200{{/if}}{{else}}text-gray-200{{/if}}\" viewBox=\"0 0 20 20\" fill=\"currentColor\">\n          <path fill-rule=\"evenodd\" d=\"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z\" clip-rule=\"evenodd\" />\n        </svg>\n      </span>\n      <label class=\"block text-sm\" for=\"name\">{{label}}</label>\n    </div>\n    <input id=\"{{id}}\" name=\"{{id}}\" type=\"{{type}}\" value=\"{{text}}\" {{#if require}}required{{/if}} \n      placeholder=\"{{placeholder}}\" aria-label=\"Name\" class=\"w-full px-5 py-1 text-gray-700 {{#if valid}}bg-gray-200{{else}}bg-red-200{{/if}} rounded\">\n    {{#unless valid}}\n    <div class=\"flex items-start mb-1\">\n      <label class=\"block text-sm text-red-300\" for=\"cus_email\">{{validateMessage}}</label>\n    </div>\n    {{/unless}}\n  </div>\n";
exports.default = window.Handlebars.compile(template);
},{}],"src/utils/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextTick = void 0;

var nextTick = function nextTick(fn) {
  return setTimeout(fn, 16);
};

exports.nextTick = nextTick;
},{}],"src/views/text-field.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var text_field_template_1 = __importDefault(require("./text-field.template"));

var utils_1 = require("../utils");

var constants_1 = require("../constants");

var DefaultProps = {
  id: '',
  label: 'label',
  type: 'text',
  text: '',
  placeholder: '',
  require: false
};

var TextField =
/** @class */
function () {
  function TextField(container, data) {
    var _this = this;

    if (data === void 0) {
      data = {};
    }

    this.template = text_field_template_1.default;
    this.updated = false;
    this.validateRules = [];

    this.attachEventHanlder = function () {
      var _a;

      (_a = document.querySelector(_this.container)) === null || _a === void 0 ? void 0 : _a.addEventListener('change', _this.onChange);
    };

    this.onChange = function (e) {
      var _a = e.target,
          id = _a.id,
          value = _a.value;

      if (id === _this.data.id) {
        _this.updated = true;
        _this.data.text = value;

        _this.update();
      }
    };

    this.data = data;
    this.container = container;
    this.data = __assign(__assign({}, DefaultProps), data);
    this.addValidateRules(constants_1.RequireRule);
    utils_1.nextTick(this.attachEventHanlder);
  }

  TextField.prototype.validate = function () {
    var inputValue = this.data.text ? this.data.text.trim() : '';
    var validatedRules = this.validateRules.filter(function (rule) {
      return rule.rule.test(inputValue) !== rule.match;
    });
    return validatedRules.length > 0 ? validatedRules[0] : null;
  };

  TextField.prototype.buildData = function () {
    var isValid = this.validate();

    if (this.updated) {
      return __assign(__assign({}, this.data), {
        updated: this.updated,
        valid: !isValid,
        validateMessage: isValid ? isValid.message : ''
      });
    } else {
      return __assign(__assign({}, this.data), {
        updated: this.updated,
        valid: true
      });
    }
  };

  TextField.prototype.addValidateRules = function (validateRule) {
    this.validateRules.push(validateRule);
  };

  TextField.prototype.update = function () {
    var container = document.querySelector("#field-" + this.data.id);
    var divFragement = document.createElement('div');
    divFragement.innerHTML = this.template(this.buildData());
    container.innerHTML = divFragement.children[0].innerHTML;
  };

  TextField.prototype.render = function () {
    var _a;

    var divFragement = document.createElement('div');
    divFragement.innerHTML = this.template(this.buildData());
    (_a = document.querySelector(this.container)) === null || _a === void 0 ? void 0 : _a.appendChild(divFragement.children[0]);
  };

  return TextField;
}();

exports.default = TextField;
},{"./text-field.template":"src/views/text-field.template.ts","../utils":"src/utils/index.ts","../constants":"src/constants.ts"}],"src/views/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextField = void 0; // export { default as AddressField } from './address-field';

var text_field_1 = require("./text-field");

Object.defineProperty(exports, "TextField", {
  enumerable: true,
  get: function get() {
    return __importDefault(text_field_1).default;
  }
}); // export { default as PasswordField } from './password-field';
},{"./text-field":"src/views/text-field.ts"}],"src/app.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var app_template_1 = __importDefault(require("./app.template"));

var constants_1 = require("./constants");

var views_1 = require("./views");

var App =
/** @class */
function () {
  function App(container) {
    this.template = app_template_1.default;
    this.container = document.getElementById(container);
    this.container.innerHTML = this.template({
      title: '내가 만드는 회원가입'
    });
    this.textNodes = [];
    var nameField = new views_1.TextField('#required-fields', {
      id: 'name',
      label: '이름',
      type: 'text',
      placeholder: '이름을 입력하세요.',
      require: true
    });
    var idField = new views_1.TextField('#required-fields', {
      id: 'id',
      label: '아이디',
      type: 'text',
      placeholder: '아이디를 입력하세요.',
      require: true
    });
    var emailField = new views_1.TextField('#required-fields', {
      id: 'email',
      label: '이메일',
      type: 'email',
      placeholder: '이메일을 입력하세요.',
      require: true
    });
    idField.addValidateRules(constants_1.CantContainWhitespace);
    idField.addValidateRules(constants_1.CantStartNumber);
    idField.addValidateRules(constants_1.MinimumLengthLimit(3));
    emailField.addValidateRules(constants_1.CantContainWhitespace);
    emailField.addValidateRules(constants_1.RequireEmailRule);
    this.textNodes.push(nameField);
    this.textNodes.push(idField);
    this.textNodes.push(emailField);
  }

  App.prototype.render = function () {
    this.textNodes.forEach(function (node) {
      node.render();
    });
  };

  return App;
}();

exports.default = App;
},{"./app.template":"src/app.template.ts","./constants":"src/constants.ts","./views":"src/views/index.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var app_1 = __importDefault(require("./app"));

var app = new app_1.default('root');
app.render();
},{"./app":"src/app.ts"}],"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59895" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map