import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface EventDto {
  id: number;
  title: string;
  description: string;
  date: string; // ISO date-time string, e.g., '2025-06-04T10:00:00'
  location: string;
  availableSeats: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = `http://localhost:8080/api/events`; // Proxied to http://localhost:8080/api/events

  constructor(private http: HttpClient) {}

  addEvent(event: EventDto): Observable<EventDto> {
    return this.http.post<EventDto>(this.apiUrl, event);
  }

  getAllEvents(): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(this.apiUrl);
  }

  getEventById(id: number): Observable<EventDto> {
    return this.http.get<EventDto>(`${this.apiUrl}/${id}`);
  }

  updateEvent(id: number, event: EventDto): Observable<EventDto> {
    return this.http.put<EventDto>(`${this.apiUrl}/${id}`, event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}