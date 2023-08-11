"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToDate = void 0;
var stringToDate = function (time) {
    var _a = time.split(':'), hour = _a[0], min = _a[1];
    var date = new Date();
    date.setHours(Number(hour));
    date.setMinutes(Number(min));
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
};
exports.stringToDate = stringToDate;
//# sourceMappingURL=StringToDate.js.map