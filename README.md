# object-array-transformer

## :star2: Convert object of arrays into an array of objects and vice versa:star2:

Two useful functions for data wrangling in javascript- allows for easy transformation between row-wise (array of objects) and column-wise (object of arrays) dataset structure.

## Install

```bash
$ npm install object-array-transformer
```

## Usage

### Transform an array of objects into an object of arrays

```js
import { arrayToObject } from "object-array-transformer";

let arr = [
  { col1: 1, col2: "a", col3: true },
  { col1: 2, col2: "b", col3: true },
  { col1: 3, col2: "c", col3: false },
];

const obj = arrayToObject(arr);

console.log(obj);
```

```bash
#obj
{
    col1: [1,2,3],
    col2: ['a','b','c'],
    col3: [true, true, false]
}
```

### Transform an object of arrays into an array of objects

```js
import { objectToArray } from "object-array-transformer";

let obj = {
  col1: [1, 2, 3],
  col2: ["a", "b", "c"],
  col3: [true, true, false],
};

const arr = objectToArray(obj);

console.log(arr);
```

```bash
#arr
[
  { col1: 1, col2: "a", col3: true },
  { col1: 2, col2: "b", col3: true },
  { col1: 3, col2: "c", col3: false },
]
```

## CheckError parameter

if `checkError` is `true` (default) in `arrayToObject`, verbose error message is generated if any arrays are not the same length.

if `checkError` is `true` (default) in `objectToArray`, verbose error message is generated if any objects contain extra keys, or are missing keys, compared to the first object's keys in the array. If `checkError` is set to `false`, then keys of new objects in array will be the same as the first object's keys. Novel keys in subsequent objects will be lost, and missing keys in subsequent objects will be introduced with the value `undefined`.

`checkError` can be set to false to save computation time if you are confident in your input data structures.

`const obj = arrayToObject(arr, false)`

`const arr = objectToArray(obj, false)`

For Browser and NodeJS
Zero Dependencies
