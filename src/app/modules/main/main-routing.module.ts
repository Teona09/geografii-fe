import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  {
    path: 'puzzle/:regiune',
    component: PuzzleComponent,
  },
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: '',
    component: HomepageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
