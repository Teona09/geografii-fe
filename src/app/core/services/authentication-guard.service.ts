import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuardService implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate() {
    console.log(this.authenticationService.getToken());
    if (this.authenticationService.getToken()) return true;
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
