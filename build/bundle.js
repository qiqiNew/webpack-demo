webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	__webpack_require__(5);
	
	var _jquery = __webpack_require__(8);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _moment = __webpack_require__(9);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _sub = __webpack_require__(120);
	
	var _sub2 = _interopRequireDefault(_sub);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app = document.createElement('div'); // var sub = require('./sub')
	// var $ = require('jquery')
	// var moment = require('moment')
	
	// require('./main.css')
	// require('./main.scss')
	
	app.innerHTML = '<h1>Hello World</h1>';
	app.appendChild((0, _sub2.default)());
	document.body.appendChild(app);
	
	(0, _jquery2.default)('body').append('<p>look at me! now is ' + (0, _moment2.default)().format() + '</p>');

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "h2 {\n  color: blue; }\n", ""]);
	
	// exports


/***/ },

/***/ 3:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./main.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./main.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "h1 {\n  color: #303030;\n  background: url(" + __webpack_require__(7) + ");\n}\n", ""]);
	
	// exports


/***/ },

/***/ 7:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAoCAMAAABevo0zAAACKFBMVEX4ETH8oK38j577eIr7hJT6UGf4FDP7bYH6XXL6ZXr////+4+f9x8/+3+T6T2b9q7b8nar9sLr+0Nf/9vf8laP/+fr6TWX4IT/9sbv8lqX8pLD7c4b6Tmb+6Ov+29/4EzP6TGT6R2D+5un7doj5QVr9vMX8pbH5MEz9tb/8jZz4GTj7h5f/9/j6RF36YHb5O1X5QFn7cIP/7vD9uML9tsD+2t/+3eL6VWz+19z/9fb+4ub6XHL4Fzb7bID+1tv6U2r6Ynf6W3H+ztX5M078qbX4FTT7eoz/9PX7aHz8k6H5LEj/8fP5JUL/8vT9xMz//v78qLT8lKL+5+r6SWH5LUn9srz8kaD4HDv9vsb+3uP9wsr//f38i5v+6ez5KEX7iJj5NVH9y9L7gpP+6+7+1dv4GDf4EjL+6uz7b4P8iZn8kqD/8PL+0df5JkP5Q136SmL9rbj5Qlv+7O/8lqT5L0v8n6z8ipr7cYT//P37gZL9wMj7a3/9tL77hpb4ID7/8/T9zNP5K0j6RV74Hjz7boL8m6n8l6X8oq75NlH9vcb4Hz35Lkr5Plj4FjX5JEH4IkD5J0T8jJz+ztT7an79wMn+5ej/+/z6UGj6S2P+3OH6VGv+3OD7dIf6Znv5Mk39usP8jp37eYv6XnT7fY/+4eX+7fD/+Pn5MUz6SGH+4OT+z9b+1Nr7eov8prL5Qlz9ytH7hZX9rLf5KUb5OFP6WG77bH/9xs4AAADbneRgAAAC2UlEQVR42u3U61vTZRzH8TdTAT9sMcM5FOZCRyDCJuQBlcCYSjpxyFDBUsE2zIwURJNVpqmo81DmOfN8PqOlf1/8oP0uDpcXv2HP8vXge92P3g/u733dvAdpo9kAJkyclM6AjLRMDJPTMrBAo2UB2CXHBxiyZcPgVDYWTPnXh8pJHp0AUx2Saxq43bma7jbMUK7bjWV5ymK4fI9metFw7xLkI6ngPw0yS7Px+Qr1sc+Qq0Kf712CRcXSHAtLsRgsmVsqDaTK/AEM8/xljK08KVsV5nky8Ik0f4FspEp6y0O0L1yEXTYkU2llOWNyJC2WliTPdmBpFZhB06dYVi3VMEwyuMzYsLHpzypVi1VBScsZZsXKuoFgAHDKBnyuCqxaJcm1miGmVUojgvkKYdGaeq0NqwFM68JqbBwRjFgPOuVqWq9wPia7a8PGwTts7v8vWrSgf26yHJz0hb4kuFibt5C0tRXatA0NZTUY/ErRGJRLtW4wtW/X10g7+p/6WhX2z28sBluXaGcQwCl924HpO6lgPHeYuVN1uzCk75Y8i0gqVkUV0rzUgp3FUleEQd49UrihG0PJXmkf5Oj7lIKbJLV1Y8rskvY3AD0eaeZGiKt+xw/+Zv3o9/t/shCUZuV5GeLAqp8HPwfp4CHgl5zUtrzcX8UIh48cBXqPLfViON57Im4q5r1Rgj5DYnU6cBJIGONUOmuKMJwOnAFigV/htxjQzVjOxmvr4vEyz+9Hzp3fH+PAhYuXIJQgLxvgsudK6Gj7H9uv1p/l4NU/r+XqOmOKRIFQ740TN5Xg1pSM+JBgy23cdw55aui4WxA9Nj8+/V7AarAJUILqSOf9B2awowsg6AD29EQjQFaKwYf3Hz1+YjOD7pAXaGoEnE/HFXzm6OT55tP3LrVntB0GXvSVdL58VX0rVlARGE/wZP1fQPT2tpzQmdpwz999RXGX4zWtb1xXlpEM/u/9A98jpDofnYjnAAAAAElFTkSuQmCC"

/***/ },

/***/ 120:
/***/ function(module, exports) {

	'use strict';
	
	// CommonJS 风格
	function generateText() {
	  var ele = document.createElement('h2');
	  ele.innerHTML = 'hi';
	  return ele;
	}
	module.exports = generateText;

/***/ }

});
//# sourceMappingURL=bundle.js.map