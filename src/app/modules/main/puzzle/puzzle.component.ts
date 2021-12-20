import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {

  matrix: string[][] = [
    ["../../../../assets/angular/image_part_001.jpg", "../../../../assets/angular/image_part_002.jpg", "../../../../assets/angular/image_part_003.jpg"],
    ["../../../../assets/angular/image_part_004.jpg", "../../../../assets/angular/image_part_005.jpg", "../../../../assets/angular/image_part_006.jpg"],
    ["../../../../assets/angular/image_part_007.jpg", "../../../../assets/angular/image_part_008.jpg", ""],
  ];
  winmatrix: string[][] = [
    ["../../../../assets/angular/image_part_001.jpg", "../../../../assets/angular/image_part_002.jpg", "../../../../assets/angular/image_part_003.jpg"],
    ["../../../../assets/angular/image_part_004.jpg", "../../../../assets/angular/image_part_005.jpg", "../../../../assets/angular/image_part_006.jpg"],
    ["../../../../assets/angular/image_part_007.jpg", "../../../../assets/angular/image_part_008.jpg", ""],
  ];

  start: boolean = false;
  constructor() {
  }
  ngOnInit(): void {
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
    if(!didNotWin && this.start) {
      console.log('You Won');
      this.start = false;
    }
  }

  // move the tile to the empty space
  moveTile(i: number, j: number) {
    this.swapTile(i, j);
    this.checkForCompletion();
  }

  // check the four sides of the tile to which it can be swapped
  swapTile(i: number, j: number) {
    if (i + 1 < this.matrix.length && this.matrix[i + 1][j] == "") {
      this.matrix[i + 1][j] = this.matrix[i][j];
      this.matrix[i][j] = "";
    } else if (j + 1 < this.matrix[0].length && this.matrix[i][j + 1] == "") {
      this.matrix[i][j + 1] = this.matrix[i][j];
      this.matrix[i][j] = "";
    } else if (i - 1 >= 0 && this.matrix[i - 1][j] == "") {
      this.matrix[i - 1][j] = this.matrix[i][j];
      this.matrix[i][j] = "";
    } else if (j - 1 >= 0 && this.matrix[i][j - 1] == "") {
      this.matrix[i][j - 1] = this.matrix[i][j];
      this.matrix[i][j] = "";
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
}
