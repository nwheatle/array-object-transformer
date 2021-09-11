interface AnyObjectType {
  [key: string]: any;
}

interface ObjectOfArraysType {
  [key: string]: any[];
}

type ArrayOfObjectsType = AnyObjectType[];

export type { ObjectOfArraysType, ArrayOfObjectsType };
