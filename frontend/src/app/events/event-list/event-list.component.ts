import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  templateUrl: './event-list.component.html',
  imports: [CommonModule]
})
export class EventListComponent implements OnInit {
  events: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  async loadEvents() {
    try {
      this.events = await this.eventService.getAllEvents();
    } catch (error) {
      console.error('Error loading events', error);
    }
  }

  async register(eventId: string) {
    try {
      await this.eventService.registerToEvent(eventId);
      alert('Successfully registered!');
    } catch (error) {
      console.error('Registration failed', error);
    }
  }
}
