export type IngredientCategory = "seafood" | "meat" | "vegetable" | "other";


  export type Ingredient = {
    key: string;
    name: string;
    category: IngredientCategory;
    unit: string;
    unitPrice?: number;
    productSize?:number;
  };
  export type DataIndex = keyof Ingredient;
