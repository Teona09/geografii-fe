import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

  navbarOpen = false;
  loggedUser = false;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }


}
