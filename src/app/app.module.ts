import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompassComponent } from './welcome-page-utils/compass/compass.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ApplicationModule } from './modules/application/application.module';
import { LoginModule } from './modules/login/login.module';
import { MainModule } from './modules/main/main.module';

@NgModule({
  declarations: [
    AppComponent,
      WelcomePageComponent,
      CompassComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApplicationModule,
    LoginModule,
    MainModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
