/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_LoQ_image_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_LoQ_image_jpg__WEBPACK_IMPORTED_MODULE_3__.default);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  margin: 0;\n}\n\nhtml {\n  height: 100%;\n}\n\nbody {\n  /* margin: 0; */\n  background: rgba(187, 174, 165, 0.40);\n  font-family: \"karla\", sans-serif;\n  height: 100%;\n}\n\nnav {\n  background-color: white;\n  height: 6.6875rem;\n  width: 100%;\n  color: black;\n  font-size: .75rem;\n}\n\n.user-container {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n}\n\n.nav-wrapper {\n  display: flex;\n  padding-bottom: 2rem;\n  margin-top: -1.5rem;\n  justify-content: space-between;\n  align-items: center;\n  padding-left: 4rem;\n  padding-right: 4rem;\n}\n\n\nh1 {\nfont-size: 2.3em;\ntext-align: center;\npadding-top: 2rem;\n}\n\n.user-logo {\n  height: auto;\n}\n\n.new-booking-container {\n  display: flex;\n  width: 11rem;\n  justify-content: space-between;\n}\n\nmain {\n  display: flex;\n  justify-content: center;\n  width: 100vw;\n}\n\n/* Login View */\n.login-container {\n  display: flex;\n  height: 88vh;\n  width: 100vw;\n  justify-content: center;\n  align-items: flex-end;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ")\n}\n\n.login {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 33.75rem;\n  height: 7.25rem;\n  border-radius: 10px;\n  background:  rgba(187, 174, 165, 0.40);\n}\n\n\n.bookings-display {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-evenly;\n  align-items: stretch;\n  margin: 10px;\n  height: 450px;\n}\n\n.room-card {\n  display: flex;\n  flex-direction: column;\n  background-color: #ffffff;\n  border-style: solid;\n  padding: 2rem;\n  padding-top: 5rem;\n  margin: 10px;\n  max-width: 200px;\n  min-width: 200px;\n  height: 200px;\n}\n\n.current-bookings-container,\n.available-rooms-container {\n  display: flex;\n  width: 100%;\n  height: 60%;\n}\n\n.scroll-bar {\n  display: flex;\n  flex-wrap: nowrap;\n  width: 60vw;\n  height: 80%;\n  overflow-x: scroll;\n  white-space: nowrap;\n}\n\n#dashboard-view,\n#new-bookings-view {\n  margin: 5%;\n  height: 100%;\n}\n\nli {\n  list-style: none;\n}\n\n\n.hidden {\n  display: none;\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,SAAS;AACX;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,eAAe;EACf,qCAAqC;EACrC,gCAAgC;EAChC,YAAY;AACd;;AAEA;EACE,uBAAuB;EACvB,iBAAiB;EACjB,WAAW;EACX,YAAY;EACZ,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,2BAA2B;EAC3B,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,oBAAoB;EACpB,mBAAmB;EACnB,8BAA8B;EAC9B,mBAAmB;EACnB,kBAAkB;EAClB,mBAAmB;AACrB;;;AAGA;AACA,gBAAgB;AAChB,kBAAkB;AAClB,iBAAiB;AACjB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,8BAA8B;AAChC;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,YAAY;AACd;;AAEA,eAAe;AACf;EACE,aAAa;EACb,YAAY;EACZ,YAAY;EACZ,uBAAuB;EACvB,qBAAqB;EACrB,sBAAsB;EACtB,4BAA4B;EAC5B,2BAA2B;EAC3B;AACF;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,eAAe;EACf,eAAe;EACf,mBAAmB;EACnB,sCAAsC;AACxC;;;AAGA;EACE,aAAa;EACb,eAAe;EACf,6BAA6B;EAC7B,oBAAoB;EACpB,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,yBAAyB;EACzB,mBAAmB;EACnB,aAAa;EACb,iBAAiB;EACjB,YAAY;EACZ,gBAAgB;EAChB,gBAAgB;EAChB,aAAa;AACf;;AAEA;;EAEE,aAAa;EACb,WAAW;EACX,WAAW;AACb;;AAEA;EACE,aAAa;EACb,iBAAiB;EACjB,WAAW;EACX,WAAW;EACX,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;;EAEE,UAAU;EACV,YAAY;AACd;;AAEA;EACE,gBAAgB;AAClB;;;AAGA;EACE,aAAa;AACf","sourcesContent":["* {\n  margin: 0;\n}\n\nhtml {\n  height: 100%;\n}\n\nbody {\n  /* margin: 0; */\n  background: rgba(187, 174, 165, 0.40);\n  font-family: \"karla\", sans-serif;\n  height: 100%;\n}\n\nnav {\n  background-color: white;\n  height: 6.6875rem;\n  width: 100%;\n  color: black;\n  font-size: .75rem;\n}\n\n.user-container {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n}\n\n.nav-wrapper {\n  display: flex;\n  padding-bottom: 2rem;\n  margin-top: -1.5rem;\n  justify-content: space-between;\n  align-items: center;\n  padding-left: 4rem;\n  padding-right: 4rem;\n}\n\n\nh1 {\nfont-size: 2.3em;\ntext-align: center;\npadding-top: 2rem;\n}\n\n.user-logo {\n  height: auto;\n}\n\n.new-booking-container {\n  display: flex;\n  width: 11rem;\n  justify-content: space-between;\n}\n\nmain {\n  display: flex;\n  justify-content: center;\n  width: 100vw;\n}\n\n/* Login View */\n.login-container {\n  display: flex;\n  height: 88vh;\n  width: 100vw;\n  justify-content: center;\n  align-items: flex-end;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-image: url(/Users/devinaltobello/turing_work/2mod/projects/overlook-project/overlook/src/images/LoQ_image.jpg)\n}\n\n.login {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 33.75rem;\n  height: 7.25rem;\n  border-radius: 10px;\n  background:  rgba(187, 174, 165, 0.40);\n}\n\n\n.bookings-display {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-evenly;\n  align-items: stretch;\n  margin: 10px;\n  height: 450px;\n}\n\n.room-card {\n  display: flex;\n  flex-direction: column;\n  background-color: #ffffff;\n  border-style: solid;\n  padding: 2rem;\n  padding-top: 5rem;\n  margin: 10px;\n  max-width: 200px;\n  min-width: 200px;\n  height: 200px;\n}\n\n.current-bookings-container,\n.available-rooms-container {\n  display: flex;\n  width: 100%;\n  height: 60%;\n}\n\n.scroll-bar {\n  display: flex;\n  flex-wrap: nowrap;\n  width: 60vw;\n  height: 80%;\n  overflow-x: scroll;\n  white-space: nowrap;\n}\n\n#dashboard-view,\n#new-bookings-view {\n  margin: 5%;\n  height: 100%;\n}\n\nli {\n  list-style: none;\n}\n\n\n.hidden {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/LoQ_image.jpg");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCustomers": () => (/* binding */ getCustomers),
/* harmony export */   "getBookings": () => (/* binding */ getBookings),
/* harmony export */   "getRooms": () => (/* binding */ getRooms),
/* harmony export */   "generatePostData": () => (/* binding */ generatePostData),
/* harmony export */   "postNewBookedRoom": () => (/* binding */ postNewBookedRoom)
/* harmony export */ });
const getCustomers = () => {
  return fetch("http://localhost:3001/api/v1/customers")
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("error"));
};

const getBookings = () => {
  return fetch("http://localhost:3001/api/v1/bookings")
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("error"));
};

const getRooms = () => {
  return fetch("http://localhost:3001/api/v1/rooms")
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("error"));
};

const generatePostData = (userID, bookingDate, roomNumber) => {
  return {
    "userID": userID,
    "date": bookingDate,
    "roomNumber": roomNumber,
  };
};

const postNewBookedRoom = (data) => {
  return fetch("http://localhost:3001/api/v1/bookings", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data => console.log(data)))
    .catch((error) => console.log(error));
};


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "usernameInput": () => (/* binding */ usernameInput),
/* harmony export */   "passwordInput": () => (/* binding */ passwordInput),
/* harmony export */   "loginSubmitBtn": () => (/* binding */ loginSubmitBtn),
/* harmony export */   "availableRoomsContainer": () => (/* binding */ availableRoomsContainer),
/* harmony export */   "bookingBtn": () => (/* binding */ bookingBtn),
/* harmony export */   "dashboardBtn": () => (/* binding */ dashboardBtn),
/* harmony export */   "searchDateBtn": () => (/* binding */ searchDateBtn),
/* harmony export */   "selectedDate": () => (/* binding */ selectedDate),
/* harmony export */   "roomTypeDropdown": () => (/* binding */ roomTypeDropdown),
/* harmony export */   "roomTypeSelection": () => (/* binding */ roomTypeSelection),
/* harmony export */   "bookingErrorMessage": () => (/* binding */ bookingErrorMessage),
/* harmony export */   "errorMessage": () => (/* binding */ errorMessage),
/* harmony export */   "bookingConfirmMessage": () => (/* binding */ bookingConfirmMessage),
/* harmony export */   "removeHiddenClass": () => (/* binding */ removeHiddenClass),
/* harmony export */   "addHiddenClass": () => (/* binding */ addHiddenClass),
/* harmony export */   "displayLoginView": () => (/* binding */ displayLoginView),
/* harmony export */   "displayDashboardView": () => (/* binding */ displayDashboardView),
/* harmony export */   "displayBookingsView": () => (/* binding */ displayBookingsView),
/* harmony export */   "handleLogin": () => (/* binding */ handleLogin),
/* harmony export */   "renderBookingCards": () => (/* binding */ renderBookingCards),
/* harmony export */   "renderBookingsTotal": () => (/* binding */ renderBookingsTotal),
/* harmony export */   "displayAvailableRooms": () => (/* binding */ displayAvailableRooms),
/* harmony export */   "updateAvailableRooms": () => (/* binding */ updateAvailableRooms),
/* harmony export */   "displayErrorMessage": () => (/* binding */ displayErrorMessage),
/* harmony export */   "displayConfirmationMessage": () => (/* binding */ displayConfirmationMessage)
/* harmony export */ });
/* harmony import */ var _available_rooms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _booked_rooms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);



// QUERY SELECTORS
const usernameInput = document.querySelector("#username-input");
const passwordInput = document.querySelector("#password-input");
const loginSubmitBtn = document.querySelector("#login-submit-btn");
const loginView = document.querySelector("#login-view");
const usernameDisplay = document.querySelector("#username-display");
const currentBookingContainer = document.querySelector(".current-bookings-container");
const availableRoomsContainer = document.querySelector(".available-rooms-container");
const bookingsTotal = document.querySelector(".total-spent");
const bookingBtn = document.querySelector("#new-booking");
const dashboardBtn = document.querySelector("#dashboard-btn");
const searchDateBtn = document.querySelector("#search-btn");
const selectedDate = document.querySelector("#selected-date-input");
const dashboardView = document.querySelector("#dashboard-view");
const newBookingView = document.querySelector("#new-bookings-view");
const roomTypeDropdown = document.querySelector("#room-type-dropdown");
const roomTypeSelection = document.querySelector("#room-type");
const bookingErrorMessage = document.querySelector("#booking-error-message")
const errorMessage = document.querySelector(".error-message")
const bookingConfirmMessage = document.querySelector("#booking-confirm-message")

//HELPER FUNCTIONS👇
const removeHiddenClass = (elements) => {
  elements.forEach((element) => {
    element.classList.remove("hidden");
  });
  return elements;
};

const addHiddenClass = (elements) => {
  elements.forEach((element) => {
    element.classList.add("hidden");
  });
  return elements;
};

// CHANGE VIEWS
const displayLoginView = () => {
  removeHiddenClass([dashboardView, bookingBtn, dashboardBtn]);
  addHiddenClass([loginView, newBookingView]);
};

const displayDashboardView = () => {
  removeHiddenClass([dashboardView]);
  addHiddenClass([newBookingView]);
};

const displayBookingsView = () => {
  addHiddenClass([dashboardView]);
  removeHiddenClass([newBookingView]);
};

// LOGIN
const handleLogin = (validatedCustomer) => {
  usernameDisplay.innerText = validatedCustomer.name;
};

// DASHBOARD
const renderBookingCards = (customerBookings) => {
  currentBookingContainer.innerHTML = " ";
  customerBookings.forEach((booking) => {
    currentBookingContainer.innerHTML += `
      <article class="room-card" id="${booking.room.number}>
              <ul class="room-card-container">
                <li class="booking-info">Room Number: ${booking.room.number}</li>
                <li class="booking-info">Cost: $${booking.room.costPerNight.toFixed(2)}</li>
                <li class="booking-info">Room Type: ${booking.room.roomType}</li>
                <li class="booking-info">Beds: ${booking.room.bedSize}</li>
                <li class="booking-info">Date: ${booking.date}</li>
                </ul>
            </article>
      `;
  });
};

const renderBookingsTotal = (customerBookings) => {
  bookingsTotal.innerHTML = `Total Spent: $${(0,_booked_rooms__WEBPACK_IMPORTED_MODULE_1__.calculateTotalRoomCost)(customerBookings).toFixed(2)}`;
};

// AVAILABLE BOOKINGS
const displayAvailableRooms = (availableRooms) => {
  if (availableRooms.length === 0) {
    availableRoomsContainer.innerHTML = "";
    displayErrorMessage("We're sorry, there are no rooms available for the selected criteria.")
  } else {
    bookingErrorMessage.innerText = ""
    availableRoomsContainer.innerHTML = "";
    availableRooms.forEach((room) => {
      availableRoomsContainer.innerHTML += `
      <article class="room-card" id="${room.number}">
              <ul class="room-card-container">
                <li class="booking-info">Room Number: ${room.number}</li>
                <li class="booking-info">Cost: $${room.costPerNight.toFixed(2)}</li>
                <li class="booking-info">Room Type: ${room.roomType}</li>
                <li class="booking-info">Beds: ${room.bedSize}</li>
                </ul>
                <button id="book-now-btn" class="book-now">Book Now</button>
            </article>
      `;
    });
  }
}

const updateAvailableRooms = (roomsData, bookingsData, searchDate, selectedRoomType) => {
  const availableRooms = (0,_available_rooms__WEBPACK_IMPORTED_MODULE_0__.getRoomAvailability)(roomsData, bookingsData, searchDate, selectedRoomType);
  displayAvailableRooms(availableRooms);
  
};

const displayErrorMessage = (message) => {
  bookingErrorMessage.innerText = message 
}

const displayConfirmationMessage = () => {
  bookingConfirmMessage.classList.remove("hidden")
  setTimeout(() => {
    bookingConfirmMessage.classList.add("hidden")
  }, 2000)
}

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRoomAvailability": () => (/* binding */ getRoomAvailability)
/* harmony export */ });
/* harmony import */ var _filter_rooms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);


const getRoomAvailability = (roomsData, bookingsData, searchDate, roomType) => {
  const bookingsOnSearchDate = bookingsData.filter((booking) => {
    return booking.date === searchDate
  })
  const availableRooms = roomsData.filter((room) => { 
    const roomIsBooked  = bookingsOnSearchDate.some((booking) => { 
     return  booking.roomNumber === room.number 
    })
    return !roomIsBooked 
  })
  if (roomType === "all") {
    return availableRooms
  } else {
    const filteredByType = (0,_filter_rooms__WEBPACK_IMPORTED_MODULE_0__.filterByRoomType)(availableRooms, roomType)
    return filteredByType
  }
}

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filterByRoomType": () => (/* binding */ filterByRoomType)
/* harmony export */ });
const filterByRoomType = (roomsData, type) => {
  const roomsFilteredByType = roomsData.filter((room) => {
    return room.roomType === type
  })
  return roomsFilteredByType
}


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCustomerBookings": () => (/* binding */ getCustomerBookings),
/* harmony export */   "storeCustomerBookings": () => (/* binding */ storeCustomerBookings),
/* harmony export */   "calculateTotalRoomCost": () => (/* binding */ calculateTotalRoomCost)
/* harmony export */ });
const getCustomerBookings = (currentCustomer, allBookings) =>{
  const filteredBookings = allBookings.filter((booking) => {
    return booking.userID === currentCustomer.id
  })
  return  filteredBookings
}

const storeCustomerBookings = (currentCustomer, allBookings, roomsData) => {
  const customerBookings = getCustomerBookings(currentCustomer, allBookings)
  const bookingsWithRooms = customerBookings.map((booking) => {
    const customerRoom = roomsData.find((room) => {
      return room.number === booking.roomNumber
    });
    return { room: customerRoom, date: booking.date };
  });
  return bookingsWithRooms; 
};

const calculateTotalRoomCost = (customerBookings) => {
  const bookingCost = customerBookings.reduce((total, booking) => {
    total += booking.room.costPerNight
    return total
  }, 0)
  return bookingCost 
}





/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validateUserLogin": () => (/* binding */ validateUserLogin)
/* harmony export */ });
const validateUserLogin = (username, password, customerData) => {
  let userID = parseInt(username.slice(8));
  if (userID >= 0 && userID <= 50 && password === "overlook2021") {
    const validUserCreds = customerData.find((customer) => {
      return customer.id === userID && password === "overlook2021";
    });
    if (validUserCreds) {
      return validUserCreds;
    }
  }
  return "Incorrect login credentials."
};

/***/ }),
/* 14 */
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p="$isDayjsObject",S=function(t){return t instanceof _||!(!t||!t[p])},w=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(g=i),i||!r&&g},O=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},b=v;b.l=w,b.i=S,b.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=w(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[p]=!0}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return b},m.isValid=function(){return!(this.$d.toString()===l)},m.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return O(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<O(t)},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!b.u(e)||e,f=b.p(t),l=function(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=b.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[b.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=b.p(f),y=function(t){var e=O(l);return b.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return b.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return b.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return b.s(e.$y,4,"0");case"M":return a+1;case"MM":return b.s(a+1,2,"0");case"MMM":return h(n.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return b.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(s);case"HH":return b.s(s,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return $(s,u,!0);case"A":return $(s,u,!1);case"m":return String(u);case"mm":return b.s(u,2,"0");case"s":return String(e.$s);case"ss":return b.s(e.$s,2,"0");case"SSS":return b.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=b.p(d),m=O(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return b.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g}return l?$:b.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return b.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),k=_.prototype;return O.prototype=k,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),O.extend=function(t,e){return t.$i||(t(e,_,O),t.$i=!0),O},O.locale=w,O.isDayjs=S,O.unix=function(t){return O(1e3*t)},O.en=D[g],O.Ls=D,O.p={},O}));

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "totalBookings": () => (/* binding */ totalBookings),
/* harmony export */   "fetchAllData": () => (/* binding */ fetchAllData)
/* harmony export */ });
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _booked_rooms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _available_rooms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_6__);
// IMPORT

// API CALLS


// FUNCTIONS
 



// QUERY SELECTORS



// GLOBAL VARIABLES 
let currentCustomer
let totalRooms
let totalBookings


// START FUNCTION
const fetchAllData = () => { 
  return Promise.all([(0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.getCustomers)(), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.getBookings)(), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.getRooms)()])
  .then( data =>{
    currentCustomer = data[0].customers // could have allCustomers
    totalBookings = data[1].bookings
    totalRooms = data[2].rooms
  })
}

// EVENT LISTENERS
const loadLogin = () => {
  fetchAllData()
  .then( () => {
  const username = _domUpdates__WEBPACK_IMPORTED_MODULE_2__.usernameInput.value;
  const password = _domUpdates__WEBPACK_IMPORTED_MODULE_2__.passwordInput.value;
  const validatedCustomer = (0,_login__WEBPACK_IMPORTED_MODULE_5__.validateUserLogin)(username, password, currentCustomer)

  if (validatedCustomer !== "Incorrect login credentials.") {
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.addHiddenClass)([_domUpdates__WEBPACK_IMPORTED_MODULE_2__.errorMessage]);
    currentCustomer = validatedCustomer
    const customerBookings = (0,_booked_rooms__WEBPACK_IMPORTED_MODULE_3__.storeCustomerBookings)(currentCustomer, totalBookings, totalRooms)
    ;(0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.renderBookingCards)(customerBookings)
    ;(0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.renderBookingsTotal)(customerBookings)
    ;(0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayLoginView)()
    ;(0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.handleLogin)(currentCustomer)
    _domUpdates__WEBPACK_IMPORTED_MODULE_2__.selectedDate.min = dayjs__WEBPACK_IMPORTED_MODULE_6___default()().format('YYYY-MM-DD');
  } else {
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.removeHiddenClass)([_domUpdates__WEBPACK_IMPORTED_MODULE_2__.errorMessage]);
  return
  }
});
};

_domUpdates__WEBPACK_IMPORTED_MODULE_2__.loginSubmitBtn.addEventListener("click", (event) => {
  loadLogin()
  event.preventDefault()
});

_domUpdates__WEBPACK_IMPORTED_MODULE_2__.bookingBtn.addEventListener("click", () => {
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayBookingsView)() 
});

_domUpdates__WEBPACK_IMPORTED_MODULE_2__.dashboardBtn.addEventListener("click", () => {
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayDashboardView)()
});

_domUpdates__WEBPACK_IMPORTED_MODULE_2__.selectedDate.addEventListener("change", () => {
  document.querySelector('#search-btn').disabled = false
});

_domUpdates__WEBPACK_IMPORTED_MODULE_2__.searchDateBtn.addEventListener("click", () => {
  const searchDate = _domUpdates__WEBPACK_IMPORTED_MODULE_2__.selectedDate.value.replaceAll("-", "/")
  const selectedRoomType = _domUpdates__WEBPACK_IMPORTED_MODULE_2__.roomTypeSelection.value = "all"; 
  const availableRooms = (0,_available_rooms__WEBPACK_IMPORTED_MODULE_4__.getRoomAvailability)(totalRooms, totalBookings, searchDate, selectedRoomType)
  ;(0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayAvailableRooms)(availableRooms)
});

_domUpdates__WEBPACK_IMPORTED_MODULE_2__.roomTypeSelection.addEventListener("change", () => {
  const selectedRoomType = _domUpdates__WEBPACK_IMPORTED_MODULE_2__.roomTypeSelection.value;
  const searchDate = _domUpdates__WEBPACK_IMPORTED_MODULE_2__.selectedDate.value.replaceAll("-", "/");
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.updateAvailableRooms)(totalRooms, totalBookings, searchDate, selectedRoomType);
});

const handleNewBooking = (event, currentCustomer, allRooms, selectedDate) => {
  if (event.target.classList.contains("book-now")) {
    const roomNumber = parseInt(event.target.parentElement.id);
    const bookingDate = selectedDate.value.replaceAll("-", "/");
    const userID = currentCustomer.id;
    const dataToPost = (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.generatePostData)(userID, bookingDate, roomNumber);
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.postNewBookedRoom)(dataToPost)
      .then(() => {
        return (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.getBookings)();
      })
      .then((bookings) => {
        totalBookings = bookings.bookings;
        const updatedCustomerBookings = (0,_booked_rooms__WEBPACK_IMPORTED_MODULE_3__.storeCustomerBookings)(currentCustomer, totalBookings, allRooms);
        (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.renderBookingsTotal)(updatedCustomerBookings);
        const searchDate = selectedDate.value.replaceAll("-", "/");
        (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.updateAvailableRooms)(totalRooms, totalBookings, searchDate, _domUpdates__WEBPACK_IMPORTED_MODULE_2__.roomTypeSelection.value);
      })
      .catch((error) => console.log(error));
  }
};

_domUpdates__WEBPACK_IMPORTED_MODULE_2__.availableRoomsContainer.addEventListener("click", (event) => {
  const inputDate = document.querySelector("#selected-date-input");
  handleNewBooking(event, currentCustomer, totalRooms, inputDate, totalBookings);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayConfirmationMessage)()
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map