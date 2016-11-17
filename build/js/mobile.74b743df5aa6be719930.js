webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../css/main.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../css/main.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _jquery = __webpack_require__(3);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _moment = __webpack_require__(4);
	
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
//# sourceMappingURL=mobile.74b743df5aa6be719930.js.map