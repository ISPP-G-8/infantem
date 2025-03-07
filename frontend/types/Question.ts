type QuestionType = "boolean" | "options" | "text";

export type Question = {
  id: number;
  question: string;
  type: QuestionType;
  options?: string[];
};


