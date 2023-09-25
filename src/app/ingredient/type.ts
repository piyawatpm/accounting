export type IngredientCategory = "seafood" | "meat" | "vegetable" | "other";


  export type Ingredient = {
    key: string;
    name: string;
    category: IngredientCategory;
    unit: string;
    unitPrice: number;
  };
  export type DataIndex = keyof Ingredient;
