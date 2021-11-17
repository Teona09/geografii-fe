import { Component, OnInit } from '@angular/core';
import Data from '../../../../assets/quizzes.json';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  quizzes = Data.quizzes;

  selectedAnswer = false;
  seeHint = false;
  showCard = 1;
  objectKeys = Object.keys;
  constructor() {}

  ngOnInit(): void {
  }

  nextQuestion() {
    this.showCard += 1;
    this.selectedAnswer = false;
    this.seeHint = false;
  }

  previousQuestion() {
    this.showCard -= 1;
    this.seeHint = false;
    this.selectedAnswer = false;
  }

  select(answer: any) {
    this.selectedAnswer = true;
  }

  showHint() {
    this.seeHint = true;
  }

  public keepOriginalOrder = (a:any, b:any) => a.key;
}
