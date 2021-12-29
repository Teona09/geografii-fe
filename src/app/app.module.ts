import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { ModalModule } from 'ngb-modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './modules/application/welcome-page/welcome-page.component';
import { ApplicationModule } from './modules/application/application.module';
import { LoginModule } from './modules/login/login.module';
import { MainModule } from './modules/main/main.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { authInterceptorProviders } from './core/auth/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApplicationModule,
    LoginModule,
    MainModule,
    // ModalModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-left',
    }),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
