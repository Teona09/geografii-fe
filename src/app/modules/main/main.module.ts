import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { QuizComponent } from './quiz/quiz.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HomePageMapComponent } from './home-page-map/home-page-map.component';
import { PuzzleComponent } from './puzzle/puzzle.component';


@NgModule({
  declarations: [
    QuizComponent,
    HomepageComponent,
    HomePageMapComponent,
    PuzzleComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
