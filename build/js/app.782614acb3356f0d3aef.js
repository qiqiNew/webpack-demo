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

/***/ 5:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

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
//# sourceMappingURL=app.782614acb3356f0d3aef.js.map