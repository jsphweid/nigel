import { v4 as uuidGen } from "uuid";
import isEqual from "lodash.isequal";

export const generateRandomID = (): string => uuidGen();
export const deepCopy = <T extends object>(thing: T): T =>
  JSON.parse(JSON.stringify(thing));

export { isEqual };
