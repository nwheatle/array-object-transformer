import type { ObjectOfArraysType, ArrayOfObjectsType } from "./types";
import modeArray from "./modeArray";

interface MessageType {
  [key: string]: number;
}

interface ErrorMessageType {
  [key: string]: string[];
}
type ArrayLengthUnitType = [string, number];
type ArrayLengthType = ArrayLengthUnitType[];

export function objectToArray(
  theObject: ObjectOfArraysType,
  errorCheck: boolean = true
): ArrayOfObjectsType {
  //errorCheck = false to increase speed, but lose verbose error messages
  let theArray: ArrayOfObjectsType = [];
  const keys = Object.keys(theObject);
  const nfRows = theObject[keys[0]].length;
  if (errorCheck) assertEqualArrayLengths(theObject);
  //throw errors
  for (let i = 0; i < nfRows; i++) {
    theArray.push({});
    keys.forEach((key) => {
      theArray[i][key] = theObject[key][i];
    });
  }
  return theArray;
}

export function arrayToObject(
  theArray: ArrayOfObjectsType,
  errorCheck: boolean = true
): ObjectOfArraysType {
  //errorCheck = false to increase speed, but lose verbose error messages
  let theObject: ObjectOfArraysType = {};
  if (errorCheck) assertIdenticalKeys(theArray);
  const keys = Object.keys(theArray[0]);
  keys.forEach((key) => {
    theObject[key] = theArray.map((obj) => obj[key]);
  });
  return theObject;
}

//helper functions
function assertIdenticalKeys(theArray: ArrayOfObjectsType): void {
  const referenceKeys = Object.keys(theArray[0]);
  const sortedReferenceKeysString = referenceKeys.sort().join(", ");
  const showMaxErrors = 10;
  //assert the keys are identical among all objects
  let arrKeys: any[];
  let arrString: string;
  let missingErrorMessage: ErrorMessageType = {};
  let extraErrorMessage: ErrorMessageType = {};
  let hasError = false;
  let numErrors: number = 0;
  let diffArr_missing: string[];
  let diffArr_extra: string[];
  theArray.forEach((obj, idx) => {
    arrKeys = Object.keys(obj);
    arrString = arrKeys.sort().join(", ");
    if (arrString !== sortedReferenceKeysString && numErrors < showMaxErrors) {
      numErrors += 1;
      hasError = true;
      diffArr_missing = referenceKeys.filter((x) => !arrKeys.includes(x));
      diffArr_extra = arrKeys.filter((x) => !referenceKeys.includes(x));
      if (diffArr_missing.length)
        missingErrorMessage[`${idx}`] = diffArr_missing;
      if (diffArr_extra.length) extraErrorMessage[`${idx}`] = diffArr_extra;
    }
  });
  if (hasError) {
    let stringMessage: string = `ERROR: All objects in array must have same keys as first object in array. Showing errors of maximum ${showMaxErrors} array entries.`;
    Object.entries(missingErrorMessage).forEach((missing_arr) => {
      let missing: string = missing_arr[1].join(", ");
      stringMessage = `${stringMessage}\n\tArray item at index ${missing_arr[0]} is MISSING keys : ${missing}`;
    });
    Object.entries(extraErrorMessage).forEach((extra_arr) => {
      let extra: string = extra_arr[1].join(", ");
      stringMessage = `${stringMessage}\n\tArray item at index ${extra_arr[0]} has EXTRA keys : ${extra}`;
    });
    throw Error(stringMessage);
  }
}

function assertEqualArrayLengths(theObject: ObjectOfArraysType): void {
  //create error message to tell user which keys have unexpected array lengths
  const keys = Object.keys(theObject);
  let arrayLengths: ArrayLengthType = keys.map((key) => [
    key,
    theObject[key].length,
  ]);
  const mostCommonArrayLength = modeArray(arrayLengths.map((arr) => arr[1]))[0];
  const message: MessageType = {};
  let hasError: boolean = false;
  arrayLengths.forEach((arr) => {
    if (arr[1] !== mostCommonArrayLength) {
      hasError = true;
      message[arr[0]] = arr[1];
    }
  });
  if (hasError) {
    let testMessage: string = `ERROR: Object's arrays must be of equal length in this case most common length is ${mostCommonArrayLength}.`;
    Object.entries(message).forEach((arr) => {
      testMessage = `${testMessage}\n\tArray length of property '${arr[0]}' = ${arr[1]}`;
    });
    throw Error(testMessage);
  }
}
