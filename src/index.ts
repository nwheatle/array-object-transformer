import type { TheObjectOfArrays, TheArrayOfObjects } from "./types/types";
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
  theObject: TheObjectOfArrays,
  verbose: boolean = true
): TheArrayOfObjects {
  let theArray: TheArrayOfObjects = [];
  const keys = Object.keys(theObject);
  const nfRows = theObject[keys[0]].length;
  if (verbose) assertEqualArrayLengths(theObject);
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
  theArray: TheArrayOfObjects,
  verbose: boolean = true
): TheObjectOfArrays {
  let theObject: TheObjectOfArrays = {};
  if (verbose) assertIdenticalKeys(theArray);
  const keys = Object.keys(theArray[0]);
  keys.forEach((key) => {
    theObject[key] = theArray.map((obj) => obj[key]);
  });
  return theObject;
}

//helper functions
function assertIdenticalKeys(theArray: TheArrayOfObjects): void {
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
    let stringMessage: string = `ERROR: All objects in array must have same keys at first object in array. Showing max ${showMaxErrors} array errors.`;
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

function assertEqualArrayLengths(theObject: TheObjectOfArrays): void {
  //create error message to tell user which keys have unexpected entry array lengths
  const keys = Object.keys(theObject);
  let arrayLengths: ArrayLengthType = keys.map((key) => [
    key,
    theObject[key].length,
  ]);
  const mostCommonArrayLength = modeArray(arrayLengths.map((arr) => arr[1]))[0];
  const message: MessageType = {};
  let hasError: boolean = false;
  const arrayLenghtErrors = arrayLengths.map((arr) => {
    if (arr[1] !== mostCommonArrayLength) {
      hasError = true;
      message[arr[0]] = arr[1];
    }
  });
  let testMessage: string = `ERROR: Object entry arrays must be of equal length, in this case expected length is ${mostCommonArrayLength}.`;
  if (hasError) {
    Object.entries(message).forEach((arr) => {
      testMessage = `${testMessage}\n\tArray length of property '${arr[0]}' = ${arr[1]}`;
    });
    throw Error(testMessage);
  }
}
