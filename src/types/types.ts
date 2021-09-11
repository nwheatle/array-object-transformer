interface AnyObject {
  [key: string]: any;
}

interface TheObjectOfArrays {
  [key: string]: any[];
}

type TheArrayOfObjects = AnyObject[];

type nullValues = string[];

export type { AnyObject, TheObjectOfArrays, TheArrayOfObjects };
