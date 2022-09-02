import { DataObject } from "../../../types/types";

export type ValidateParams = {
  count: number; 
  page: number; 
  size: number; 
}

export type DataObjects = ValidateParams & {
  dataObjects: DataObject[],
  
}

export type IItemsState = {
  items: DataObjects | null;
  loading: boolean;
  error: null | string;
}