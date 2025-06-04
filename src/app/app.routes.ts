import { NgModule } from '@angular/core';
 import { Routes } from '@angular/router';import { RouterModule} from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { DashboardComponent } from '../app/admin/dashboard/dashboard.component';
import { UsersManagementComponent } from './admin/users-management/users-management.component';
import { EventsManagementComponent } from './admin/events-management/events-management.component';
import { ReservationsComponent } from '../app/admin/reservations/reservations.component';
import { AdminGuard } from './core/guards/admin.guard';
import { HomeComponent } from '../app/client/home/home.component';
import { AboutComponent } from '../app/client/about/about.component';
import { ListComponent } from '../app/client/events/list/list.component';
import { ReservationComponent } from '../app/client/reservation/reservation.component';
import { EventCardComponent } from './shared/components/event-card/event-card.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: EventCardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/profile', component: ProfileComponent },
  { path: 'client/home', component: HomeComponent },
  { path: 'client/events/list', component: ListComponent }, // Placeholder
  { path: 'client/reservation', component: ReservationComponent }, // Placeholder
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users-management', component: UsersManagementComponent },
      { path: 'events-management', component: EventsManagementComponent },
      { path: 'reservations-management', component: ReservationsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting {}