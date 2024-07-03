import { NgModule } from '@angular/core';
import {
  NoPreloading,
  PreloadAllModules,
  RouterModule,
  Routes,
} from '@angular/router';
import { HomeComponent } from './ui-components/home/home.component';
import { LoginComponent } from './ui-components/login/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { CustomPreloadingStrategy } from './app-preloading';

const routes: Routes = [
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },

  {
    path: 'new-investment',
    loadChildren: () =>
      import(
        './ui-components/new-investment-module/new-investment-module.module'
      ).then((m) => m.NewInvestmentModuleModule),
    canActivate: [AuthGuard],
    data: { preload: true },
  },
  {
    path: 'auth',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategy,
    }), //PreloadAllModules , NoPreloading
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
