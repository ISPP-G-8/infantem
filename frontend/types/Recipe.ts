export type Recipe = {
  id?: number;
  userId?: number;
  isCustom: boolean;
  name: string;
  description: string;
  minRecommendedAge: number | null;
  maxRecommendedAge: number | null;
  ingredients: string;
  elaboration: string;
};
