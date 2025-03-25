export type Recipe = {
    id: number;
    name: string;
    description: string;
    minRecommendedAge: number;
    maxRecommendedAge: number | null;
    ingredients: string;
    elaboration: string;
}

