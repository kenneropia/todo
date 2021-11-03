"use strict";
exports.__esModule = true;
exports.intro = exports.fetchData = exports.addSettings = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
function addNum(a, b) {
    return a + b;
}
exports["default"] = addNum;
exports.addSettings = function (str1, str2) {
    if (str2 === void 0) { str2 = ''; }
    return str1 + " " + str2;
};
exports.fetchData = function (url) {
    return Promise.resolve('data');
};
exports.intro = function (salu) {
    var name = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        name[_i - 1] = arguments[_i];
    }
    return name;
};
