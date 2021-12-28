import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/core/auth/token-storage.service';
import { LocalStorageKey } from 'src/app/core/enums/local-storage-key.enum';
import { QuestionModel } from 'src/app/core/models/question.model';
import { User } from 'src/app/core/models/user.model';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  q1 = {
    text: 'Ce se afla pe linia Oravita-Anina?',
    hint: 'Este administrata de infrastructura nationala feroviara',
    answerModels: [
      { text: 'Primul muzeu al satului din Romania', correctAnswer: false },
      { text: 'Pestera Comarnic', correctAnswer: false },
      { text: 'Morile de apa de la Rudaria', correctAnswer: false },
      { text: 'Prima cale ferata de munte din Romania', correctAnswer: true },
    ],
    points: 30,
  };
  q2 = {
    text: 'Care este cea mai veche statiune turistica din tara?',
    hint: 'Numele statiunii vine de la fiul Zeus si al Alcmenei',
    answerModels: [
      { text: 'Baile Felix', correctAnswer: false },
      { text: 'Baile Herculane', correctAnswer: true },
      {
        text: 'Parcul National „Domogled - Valea Cernei”',
        correctAnswer: false,
      },
      { text: 'Cheile Nerei', correctAnswer: false },
    ],
    points: 30,
  };
  q3 = {
    text: 'Ce lucru este adevarat depre Cascada Bigar?',
    hint: 'Este numele unei edituri, dar si a multor companii de turism',
    answerModels: [
      {
        text: 'Paralela de 45 grade trece pe langa cascada',
        correctAnswer: true,
      },
      { text: 'Are o inaltime de peste 70 metri', correctAnswer: false },
      { text: 'Apa izvorului este bogata in magneziu', correctAnswer: false },
      {
        text: 'Se afla la baza celui mai inalt munte din Banat',
        correctAnswer: false,
      },
    ],
    points: 30,
  };
  q4 = {
    text: 'Din ce oras a pornit revolutia care a pus capat comunismului?',
    hint: 'Este municipiul de resedinta al judetului Timis',
    answerModels: [
      { text: 'Bucuresti', correctAnswer: false },
      { text: 'Timisoara', correctAnswer: true },
      { text: 'Arad', correctAnswer: false },
      { text: 'Brasov', correctAnswer: false },
    ],
    points: 30,
  };
  q5 = {
    text: 'Teatrul din Oravita este:',
    hint: 'Nu te-ai fi asteptat sa fie atat de batran',
    answerModels: [
      { text: 'O copie fidela a unui teatru spaniol', correctAnswer: false },
      { text: 'Construit doar din lemn', correctAnswer: false },
      { text: 'Cel mai vechi din Romania', correctAnswer: true },
      { text: 'Construit intr-o stanca', correctAnswer: false },
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
  _questions = [this.q1, this.q2, this.q3, this.q4, this.q5];

  user: User;
  get questions() {
    return this._questions;
  }

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
  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.questions = this.localStorage.getItem(
      LocalStorageKey.questions
    ) as QuestionModel[];
    console.log(this.questions);
    Math.abs(2);
    this.questions.forEach((question) => {
      this.points.push(0);
    });
    this.userService
      .getUser(this.tokenStorage.getUser())
      .pipe(take(1))
      .subscribe((data) => {
        this.user = data;
        console.log(data);
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
    if (answer.correctAnswer) {
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
