import { Ingredient } from "../ingredient/type";

export type MenuTableData = {
    key: string;
    name: string;
    cost: number;
    costPercent: number;
    yieldPercent: number;
    ingredients:Ingredient[]
  };
export type DataIndex = keyof MenuTableData;