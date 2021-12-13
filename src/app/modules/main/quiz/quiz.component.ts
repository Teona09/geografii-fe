import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Data from '../../../../assets/quizzes.json';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  q1 = {
    text: 'q1',
    hint: 'a1 e corect',
    answers: [
      { text: 'a1', isCorrectAnswer: true },
      { text: 'a2', isCorrectAnswer: false },
      { text: 'a3', isCorrectAnswer: false },
    ],
    points: 30,
  };
  q2 = {
    text: 'q2',
    hint: 'a2 e corect',
    answers: [
      { text: 'a1', isCorrectAnswer: false },
      { text: 'a2', isCorrectAnswer: true },
      { text: 'a3', isCorrectAnswer: false },
    ],
    points: 30,
  };
  colors = [
    '#c1ac95',
    '#b5cda3',
    '#795735',
    '#628547',
    '#98cb90',
    '#c9e4c5',
    '#b7dbb1',
    '#a7d3a1',
    '#90c688',
  ];
  //questions = Data.quizzes;
  _questions = [this.q1, this.q2];

  get questions() {
    return this._questions;
  }

  @Input()
  set questions(questions) {
    this._questions = questions;
  }
  points: Array<number> = [];
  finalPoints = 0;
  index = 0;
  selectedAnswer = false;
  seeHint = false;
  showCard = 1;
  submitted = false;

  @Output()
  finalPoints$ = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {
    Math.abs(2);
    this.questions.forEach((question) => {
      this.points.push(0);
    });
  }

  getColor() {
    //return this.colors[Math.floor(Math.random() * this.colors.length)];
    return this.colors[Math.abs(this.index % 2)];
  }

  nextQuestion() {
    this.index += 1;
    this.showCard += 1;
    this.selectedAnswer = false;
    this.seeHint = false;
  }

  previousQuestion() {
    this.index -= 1;
    this.showCard -= 1;
    this.seeHint = false;
    this.selectedAnswer = false;
  }

  select(answer: any) {
    if (answer.isCorrectAnswer) {
      this.points[this.index] = this.questions[this.index].points;
    } else {
      this.points[this.index] = 0;
    }
    this.selectedAnswer = true;
  }

  showHint() {
    this.seeHint = true;
  }

  submitAnswer() {
    this.points.forEach((point) => {
      this.finalPoints += point;
    });
    this.index = 0;
    this.submitted = true;
    this.finalPoints$.emit(this.finalPoints);
    console.log(this.finalPoints);
  }

  increaseIndex() {
    this.index++;
  }
}
