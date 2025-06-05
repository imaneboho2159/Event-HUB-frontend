import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent, EventDto } from '../../shared/components/event-card/event-card.component';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EventCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: EventDto[] = [];
  errorMessage: string | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
  this.eventService.getEvents().subscribe({
    next: (events) => {
      console.log('Events loaded:', events);
      this.events = events;
      this.errorMessage = null;
    },
    error: (err) => {
      this.errorMessage = 'Failed to load events. Please check your connection or try again later.';
      console.error('Error fetching events:', err);
    }
  });
}
}