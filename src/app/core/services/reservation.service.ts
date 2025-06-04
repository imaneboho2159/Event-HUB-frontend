import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReservationDto {
  id: number;
  userId: number;
  eventId: number;
  reservationDate: string; // ISO date string, e.g., '2025-06-04'
  numberOfSeats: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = `http://localhost:8080/api/reservations`; // Proxied to http://localhost:8080/api/reservations

  constructor(private http: HttpClient) {}

  createReservation(reservation: ReservationDto): Observable<ReservationDto> {
    return this.http.post<ReservationDto>(this.apiUrl, reservation);
  }

  getUserReservations(): Observable<ReservationDto[]> {
    return this.http.get<ReservationDto[]>(`${this.apiUrl}/user`);
  }
}