import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserService, UserDto } from '../../core/services/user.service';
import { ReservationService, ReservationDto } from '../../core/services/reservation.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserDto | null = null;
  reservations: ReservationDto[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.loadUserData();
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  private loadUserData(): void {
    this.userService.getCurrentUser().pipe(
      catchError(() => {
        this.router.navigate(['/auth/login']);
        return of(null);
      }),
      switchMap(user => {
        if (user) {
          this.user = user;
          return this.reservationService.getUserReservations();
        }
        return of([]);
      }),
      catchError(() => of([]))
    ).subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}