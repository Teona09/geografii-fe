import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
//   showError = false;
//   showSuccess = false;
//   validUsers = [ {'username':'chandler@friends.com', 'password':'1234'},
//   {'username':'ross@friends.com', 'password':'1234'},
//   {'username':'joey@friends.com', 'password':'1234'},
//   {'username':'rechal@friends.com', 'password':'1234'}
// ];
  constructor(
    private formBuilder: FormBuilder) { }

  ngOnInit(): void{
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  
  }
 
 

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

  
    

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
  }
  
  // authenticate() {
  //   let flag = false;
  //   for(let i in this.validUsers)
  //   {
  //     {
  //       // let userName = this.loginForm.get(['username'])?.value;
  //       let userName = this.loginForm.controls['username'].value;
  //       let password = this.loginForm.controls['password'].value;
  //       if(userName == this.validUsers[i].username && password == this.validUsers[i].password)
  //       {
  //         flag = true;
  //         break;
  //       }
  //       else{
  //         flag = false;
  //       }
  //     }
  //     if(flag){
  //       this.showError = false;
  //       this.showSuccess = true;
  //     }
  //     else{
  //       this.showError = true;
  //       this.showSuccess = false;
  //     }
      
        
  //   }

  // }
}
