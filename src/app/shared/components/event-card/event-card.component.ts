import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ReservationService, ReservationDto } from '../../../core/services/reservation.service';
import { EventDto } from '../../../core/services/event.service';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {
  @Input() event!: EventDto;
  numberOfSeats: number = 1;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  reserveEvent(): void {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return;
    }

    if (this.numberOfSeats > this.event.availableSeats) {
      this.errorMessage = `Only ${this.event.availableSeats} seats available`;
      return;
    }

    const reservation: ReservationDto = {
      eventId: this.event.id,
      numberOfSeats: this.numberOfSeats
    };

    this.reservationService.createReservation(reservation).subscribe({
      next: (response) => {
        this.event.availableSeats -= this.numberOfSeats;
        this.successMessage = 'Reservation successful!';
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = err.error || 'Reservation failed';
        this.successMessage = null;
        console.error('Reservation error:', err);
      }
    });
  }
}

export { EventDto };
