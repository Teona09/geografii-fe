import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TokenStorageService } from 'src/app/core/auth/token-storage.service';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import Data from '../../../../assets/quizzes.json';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  q1 = {
    text: 'Ce se afla pe linia Oravita-Anina?',
    hint: 'Este administrata de infrastructura nationala feroviara',
    answers: [
      { text: 'Primul muzeu al satului din Romania', isCorrectAnswer: false },
      { text: 'Pestera Comarnic', isCorrectAnswer: false },
      { text: 'Morile de apa de la Rudaria', isCorrectAnswer: false },
      { text: 'Prima cale ferata de munte din Romania', isCorrectAnswer: true },
    ],
    points: 30,
  };
  q2 = {
    text: 'Care este cea mai veche statiune turistica din tara?',
    hint: 'Numele statiunii vine de la fiul Zeus si al Alcmenei',
    answers: [
      { text: 'Baile Felix', isCorrectAnswer: false },
      { text: 'Baile Herculane', isCorrectAnswer: true },
      { text: 'Parcul National „Domogled - Valea Cernei”', isCorrectAnswer: false },
      { text: 'Cheile Nerei', isCorrectAnswer: false },
    ],
    points: 30,
  };
  q3 = {
    text: 'Ce lucru este adevarat depre Cascada Bigar?',
    hint: 'Este numele unei edituri, dar si a multor companii de turism',
    answers: [
      { text: 'Paralela de 45 grade trece pe langa cascada', isCorrectAnswer: true },
      { text: 'Are o inaltime de peste 70 metri', isCorrectAnswer: false },
      { text: 'Apa izvorului este bogata in magneziu', isCorrectAnswer: false },
      { text: 'Se afla la baza celui mai inalt munte din Banat', isCorrectAnswer: false },
    ],
    points: 30,
  };
  q4 = {
    text: 'Din ce oras a pornit revolutia care a pus capat comunismului?',
    hint: 'Este municipiul de resedinta al judetului Timis',
    answers: [
      { text: 'Bucuresti', isCorrectAnswer: false },
      { text: 'Timisoara', isCorrectAnswer: true },
      { text: 'Arad', isCorrectAnswer: false },
      { text: 'Brasov', isCorrectAnswer: false },
    ],
    points: 30,
  };
  q5 = {
    text: 'Teatrul din Oravita este:',
    hint: 'Nu te-ai fi asteptat sa fie atat de batran',
    answers: [
      { text: 'O copie fidela a unui teatru spaniol', isCorrectAnswer: false },
      { text: 'Construit doar din lemn', isCorrectAnswer: false },
      { text: 'Cel mai vechi din Romania', isCorrectAnswer: true },
      { text: 'Construit intr-o stanca', isCorrectAnswer: false },
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
  _questions = [this.q1, this.q2, this.q3, this.q4, this.q5];

  user: User;
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
  constructor( private userService: UserService,
    private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    Math.abs(2);
    this.questions.forEach((question) => {
      this.points.push(0);
    });
    this.userService.getUser(this.tokenStorage.getUser()).subscribe((data) => {
      this.user = data;
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
    //this.finalPoints$.emit(this.finalPoints);
    console.log(this.finalPoints);
    this.user.usablePoints += this.finalPoints;
    this.userService.update(this.user).subscribe((data) => {
      this.user = data;
    });
  }

  increaseIndex() {
    this.index++;
  }

}
