import { v4 as uuidGen } from "uuid";
import isEqual from "lodash.isequal";

export const generateRandomID = (): string => uuidGen();

export { isEqual };
