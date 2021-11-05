import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  form!: FormGroup;
  points = 200;
  
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      userId: [0],
      firstName: ["Ana", Validators.required],
      lastName: ["Pop", Validators.required],
      email: ["pop.ana@mail.com", Validators.required]
    })
   }

  ngOnInit(): void {
  }

}
