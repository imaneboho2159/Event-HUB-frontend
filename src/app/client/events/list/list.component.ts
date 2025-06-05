import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent, EventDto } from '../../../shared/components/event-card/event-card.component';
import { EventService } from '../../../core/services/event.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, EventCardComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  events: EventDto[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: (events) => this.events = events,
      error: (err) => console.error('Error fetching events:', err)
    });
  }
}