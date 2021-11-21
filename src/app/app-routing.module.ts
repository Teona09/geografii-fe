import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './modules/application/app-layout/app-layout.component';
import { HelpComponent } from './modules/application/help/help.component';
import { HomepageComponent } from './modules/main/homepage/homepage.component';
import { MyAccountComponent } from './modules/application/my-account/my-account.component';
import { WelcomePageComponent } from './modules/application/welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: WelcomePageComponent,
      },
      {
        path: 'help',
        component: HelpComponent,
      },
      {
        path: 'my-account',
        component: MyAccountComponent,
      },
      {
        path: 'main',
        loadChildren: () =>
          import('./modules/main/main.module').then(
            (m) => m.MainModule
          ),
      }
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
