"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
function modeArray(array) {
    if (array.length == 0)
        return [];
    var modeMap = {}, maxCount = 1, modes = [];
    for (var i = 0; i < array.length; i++) {
        var el = array[i];
        if (modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if (modeMap[el] > maxCount) {
            modes = [el];
            maxCount = modeMap[el];
        }
        else if (modeMap[el] == maxCount) {
            modes.push(el);
            maxCount = modeMap[el];
        }
    }
    return modes;
}
exports.default = modeArray;
//# sourceMappingURL=modeArray.js.map