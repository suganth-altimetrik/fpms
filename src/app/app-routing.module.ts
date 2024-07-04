import { NgModule } from '@angular/core';
import {
  NoPreloading,
  PreloadAllModules,
  RouterModule,
  Routes,
} from '@angular/router';
// import { LoginComponent } from './ui-components/login/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { CustomPreloadingStrategy } from './app-preloading';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RegisterComponent } from './features/register/register.component';
import { LoginComponent } from './features/login/login.component';
import { NewInvestmentComponent } from './features/new-investment/new-investment.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'new-investment',
  //   loadChildren: () =>
  //     import(
  //       './ui-components/new-investment-module/new-investment-module.module'
  //     ).then((m) => m.NewInvestmentModuleModule),
  //   canActivate: [AuthGuard],
  //   data: { preload: true },
  //   pathMatch: 'full',
  // },
  {
    path: 'new-investment',
    component: NewInvestmentComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  // {
  //   path: '',
  //   component: LoginComponent,
  //   pathMatch: 'full',
  // },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: CustomPreloadingStrategy,
    }), //PreloadAllModules , NoPreloading
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
