import { InformationModel } from './information.model';
import { QuestionModel } from './question.model';

export interface LevelModel {
  id: number;
  region: string;
  maximumPoints: number;
  informations: InformationModel[];
  questions: QuestionModel[];
}
