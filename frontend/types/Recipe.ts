export type Recipe = {
  id?: number;
  name: string;
  description: string;
  minRecommendedAge: number | null;
  maxRecommendedAge: number | null;
  ingredients: string;
  elaboration: string;
};
