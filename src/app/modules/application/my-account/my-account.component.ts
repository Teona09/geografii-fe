import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  form = {} as FormGroup;
  points = 200;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form  =this.fb.group({
      userId: [0],
      firstName: ["ana", Validators.required],
      lastName: ["popescu", Validators.required],
      email: ["ana.popescu@ubb.ro", Validators.required]
    })
  }

}
