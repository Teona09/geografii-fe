import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home-page-map',
  templateUrl: './home-page-map.component.html',
  styleUrls: ['./home-page-map.component.css']
})
export class HomePageMapComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
  }

  selectPrincipat(principat: string) {
    this.eventEmitter.emit(principat);
  }

}
