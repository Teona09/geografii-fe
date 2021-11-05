import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { HelpComponent } from './help/help.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { CompassComponent } from './compass/compass.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppLayoutComponent,
    HelpComponent,
    MyAccountComponent,
    WelcomePageComponent,
    CompassComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    ReactiveFormsModule
  ]
})
export class ApplicationModule { }
