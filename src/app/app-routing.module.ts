import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewInvestmentComponent } from './ui-components/new-investment/new-investment.component';
import { LoginComponent } from './ui-components/login/auth.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'new-investment',
    component: NewInvestmentComponent,
    canActivate: [AuthGuard],
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
