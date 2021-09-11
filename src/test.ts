import { arrayToObject, objectToArray } from "./index";
import { TheArrayOfObjects, TheObjectOfArrays } from "./types/types";

// const testObject1: TheObjectOfArrays = {
//   col1: [1, 2, 3, 4, 5],
//   col2: ["hi", null, "bye", "good day", undefined],
//   col3: [true, false, true, true, false],
// };

// const newObject1 = objectToArray(testObject1);

// console.log(newObject1);

// const testObject2: TheObjectOfArrays = {
//   col1: [1, 2, 3, 4, 5],
//   col2: ["hi", null, "bye", "good day", undefined, "asd"],
//   col3: [true, false, true, true],
// };

// const newObject2 = objectToArray(testObject2);

// console.log(newObject2);

// const testArray1: TheArrayOfObjects = [
//   { col1: 1, col2: "hi", col3: true },
//   { col1: 2, col2: null, col3: false },
//   { col1: 3, col2: "bye", col3: true },
//   { col1: 4, col2: "good day", col3: true },
//   { col1: 5, col2: undefined, col3: false },
// ];

// const newArray1 = arrayToObject(testArray1);

// console.log(newArray1);

const testArray2: TheArrayOfObjects = [
  { col1: 1, col2: "hi", col3: true },
  { col1: 2, col2: null },
  { col01: 3, col2: "bye", col3: true, col4: "what", col5: "huh" },
  { col1: 4, col2: "good day", col3: true },
  { col1: 5, col2: undefined, col3: false },
];

const newArray2 = arrayToObject(testArray2);

console.log(newArray2);
