import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  register() {
    
  }

  passwordMatchValidator(control: AbstractControl): void {
    if (control.get('password').value === control.get('repeatPassword').value) {
      if (control.get('repeatPassword').hasError('mismatch'))
        control.get('repeatPassword').setErrors(null);
    }
    else {
      control.get('repeatPassword').setErrors({ mismatch: true });
    }
  }
}
