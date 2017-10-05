/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var tables = __webpack_require__(1);

	tables();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	$(document).ready(function () {
	  var api = "https://fierce-savannah-17132.herokuapp.com/api/v1/foods";

	  $.getJSON(api, function (data) {
	    var foods = [];

	    $.each(data, function (key, val) {
	      foods.push("<tr><td id='tbl-name " + key + "'>" + val['name'] + "</td><td id='tbl-cal " + key + "'>" + val['calories'] + "</td></tr>");
	    });

	    foods.forEach(function (food) {
	      $(".table-body").append(food);
	    });
	  });
	});

/***/ })
/******/ ]);