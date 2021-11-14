import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  quiz = 
    {
      text: 'Ce se afla pe linia Oravita-Anina?',
      hint: 'Este administrata de infrastructura nationala feroviara',
      points: 30,
    };

  answers = [
    { text: 'Primul muzeu al satului din Romania', isCorect: false },
    { text: 'Pestera Comarnic', isCorect: false },
    { text: 'Morile de apa de la Rudaria', isCorect: false },
    { text: 'Prima cale ferata de munte din Romania', isCorect: true }
  ];

  selectedAnswer = false;
  seeHint = false;
  showCard = 1;

  constructor() {}

  ngOnInit(): void {}

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
}
