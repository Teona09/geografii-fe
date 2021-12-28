import { AnswerModel } from './answer.model';

export interface QuestionModel {
  id: number;
  text: string;
  hint: string;
  points: number;
  answerModels: AnswerModel[];
}
