import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { HelpComponent } from './help/help.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MyAccountComponent } from './my-account/my-account.component';


@NgModule({
  declarations: [
    AppLayoutComponent,
    HelpComponent,
    HomepageComponent,
    MyAccountComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule
  ]
})
export class ApplicationModule { }
