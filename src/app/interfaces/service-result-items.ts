import {MetaResult} from "./meta-result";
import {Item} from "./item";

export interface ServiceResultItems {
  meta:MetaResult;
  payload:Item[];

}