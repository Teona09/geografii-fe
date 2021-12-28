import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MainRoutingModule } from './main-routing.module';
import { QuizComponent } from './quiz/quiz.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HomePageMapComponent } from './home-page-map/home-page-map.component';
import { InfoComponent } from './info/info.component';
import { PuzzleComponent } from './puzzle/puzzle.component';


@NgModule({
  declarations: [
    QuizComponent,
    HomepageComponent,
    HomePageMapComponent,
    InfoComponent,
    PuzzleComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgbModule,
  ]
})
export class MainModule { }
