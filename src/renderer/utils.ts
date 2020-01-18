import { v4 as uuidGen } from "uuid";
import isEqual from "lodash.isequal";

export const generateRandomId = (): string => uuidGen();

export { isEqual };
