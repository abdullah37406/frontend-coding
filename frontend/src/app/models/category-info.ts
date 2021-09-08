import { ItemInfo } from "./item-info";

export class CategoryInfo {
    id:number;
    name: string;
    parentCategory: string;
    updatedName: string;
    subOrMain:string;
    itemOrTable:string;
    itemInfo:ItemInfo;
  }
  