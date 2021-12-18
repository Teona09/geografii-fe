import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { QuizComponent } from './quiz/quiz.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: 'info',
    component: InfoComponent,
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
