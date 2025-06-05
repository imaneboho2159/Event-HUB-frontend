import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './client/home/home.component';
import { ListComponent } from '../app/client/events/list/list.component'; 
//import { ProfileComponent } from './auth/profile/profile.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/client/home', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  //{ path: 'auth/profile', component: ProfileComponent, canActivate: [authGuard] },
  {
    path: 'client',
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'events', component: ListComponent }
    ]
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent }
    ]
  },
  { path: '**', redirectTo: '/client/home' }
];