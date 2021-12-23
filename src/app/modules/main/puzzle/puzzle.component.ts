import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/core/auth/token-storage.service';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css'],
})
export class PuzzleComponent implements OnInit {
  user: User;
  @ViewChild('winModal') editModal: TemplateRef<any>;
  regiune: string = 'angular';
  assets_regiune : string;
  matrix: string[][] = [];
  winmatrix: string[][] = [];

  start: boolean = false;
  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //this.regiune = this.route.snapshot.paramMap.get('regiune');
    this.assets_regiune = '../../../../assets/' + this.regiune;
    this.userService.getUser(this.tokenStorage.getUser()).subscribe((data) => {
      this.user = data;
    });

    this.matrix = [
      [
        `${this.assets_regiune}/image_part_001.jpg`,
        `${this.assets_regiune}/image_part_002.jpg`,
        `${this.assets_regiune}/image_part_003.jpg`,
      ],
      [
        `${this.assets_regiune}/image_part_004.jpg`,
        `${this.assets_regiune}/image_part_005.jpg`,
        `${this.assets_regiune}/image_part_006.jpg`,
      ],
      [
        `${this.assets_regiune}/image_part_007.jpg`,
        `${this.assets_regiune}/image_part_008.jpg`,
        '',
      ],
    ];
    this.winmatrix = [
      [
        `${this.assets_regiune}/image_part_001.jpg`,
        `${this.assets_regiune}/image_part_002.jpg`,
        `${this.assets_regiune}/image_part_003.jpg`,
      ],
      [
        `${this.assets_regiune}/image_part_004.jpg`,
        `${this.assets_regiune}/image_part_005.jpg`,
        `${this.assets_regiune}/image_part_006.jpg`,
      ],
      [
        `${this.assets_regiune}/image_part_007.jpg`,
        `${this.assets_regiune}/image_part_008.jpg`,
        '',
      ],
    ];
  }

  checkForCompletion() {
    let didNotWin;
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[0].length; j++) {
        if (this.winmatrix[i][j] != this.matrix[i][j]) {
          didNotWin = true;
          break;
        }
      }
    }
    if (!didNotWin && this.start) {
      console.log('You Won');
      this.start = false;
      this.modalService.open(this.editModal);
      this.addPoints();
    }
  }

  // move the tile to the empty space
  moveTile(i: number, j: number) {
    this.swapTile(i, j);
    this.checkForCompletion();
  }

  // check the four sides of the tile to which it can be swapped
  swapTile(i: number, j: number) {
    if (i + 1 < this.matrix.length && this.matrix[i + 1][j] == '') {
      this.matrix[i + 1][j] = this.matrix[i][j];
      this.matrix[i][j] = '';
    } else if (j + 1 < this.matrix[0].length && this.matrix[i][j + 1] == '') {
      this.matrix[i][j + 1] = this.matrix[i][j];
      this.matrix[i][j] = '';
    } else if (i - 1 >= 0 && this.matrix[i - 1][j] == '') {
      this.matrix[i - 1][j] = this.matrix[i][j];
      this.matrix[i][j] = '';
    } else if (j - 1 >= 0 && this.matrix[i][j - 1] == '') {
      this.matrix[i][j - 1] = this.matrix[i][j];
      this.matrix[i][j] = '';
    }
  }

  shuffleMatrix() {
    this.start = true;
    let k, j, tempk, tempj;
    for (let i = 0; i < this.matrix.length; i++) {
      k = this.matrix[i].length;
      while (k--) {
        j = Math.floor(Math.random() * (this.matrix.length - 1));
        tempk = this.matrix[i][k];
        tempj = this.matrix[i][j];
        this.matrix[i][k] = tempj;
        this.matrix[i][j] = tempk;
      }
    }
  }

  addPoints() {
    this.user.usablePoints += 10;
    this.userService.update(this.user).subscribe((data) => {
      this.user = data;
    });
  }
}
