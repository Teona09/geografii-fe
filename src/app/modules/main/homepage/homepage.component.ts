import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  selectedPrincipat = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    window.document.body.style.backgroundColor = '#000000'
  }

  selectPrincipat(principat: string) {
    this.selectedPrincipat = principat.toUpperCase();
  }

  ngOnDestroy(){
    window.document.body.style.backgroundColor = "#ffffff"
  }


}
