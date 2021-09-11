interface AnyObject {
  [key: string]: any;
}

interface TheObjectOfArrays {
  [key: string]: any[];
}

type TheArrayOfObjects = AnyObject[];

export type { AnyObject, TheObjectOfArrays, TheArrayOfObjects };
