import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface EventDto {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  availableSeats: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = '/api/events'; // Update to '/api/events' if using proxy

  constructor(private http: HttpClient) {}

  getEvents(): Observable<EventDto[]> {
    console.log('Fetching events from:', this.apiUrl);
    return this.http.get<EventDto[]>(this.apiUrl).pipe(
      catchError(err => {
        console.error('HTTP Error Details:', err);
        return throwError(() => err);
      })
    );
  }

  getEventById(id: number): Observable<EventDto> {
    console.log('Fetching event by ID:', id);
    return this.http.get<EventDto>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error('HTTP Error Details:', err);
        return throwError(() => err);
      })
    );
  }
}