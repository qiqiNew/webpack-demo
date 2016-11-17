webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	__webpack_require__(5);
	
	var _jquery = __webpack_require__(8);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _moment = __webpack_require__(9);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _jquery2.default)(function () {
	  var app = document.createElement('div');
	  app.innerHTML = '<h1>hello：another mobile page</h1>';
	  document.body.appendChild(app);
	  (0, _jquery2.default)('body').append('<p>look at me! now is ' + (0, _moment2.default)().format() + '</p>');
	});

/***/ }
]);
//# sourceMappingURL=mobile.44b404a639c25aac8496.js.map