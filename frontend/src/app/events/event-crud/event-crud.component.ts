import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './event-crud.component.html',
  styleUrl: './event-crud.component.css'
})
export class EventCrudComponent implements OnInit {
  title = '';
  description = '';
  date = '';
  location = '';
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

  async createEvent() {
    try {
      const eventData = {
        title: this.title,
        description: this.description,
        date: this.date,
        location: this.location
      };
      await this.eventService.createEvent(eventData);
      alert('Event created!');
      this.clearForm();
      this.loadEvents();
    } catch (error) {
      console.error('Error creating event:', error);
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

  async deleteEvent(eventId: string) {
    try {
      await this.eventService.deleteEvent(eventId);
      this.loadEvents();
    } catch (error) {
      console.error('Delete failed', error);
    }
  }

  clearForm() {
    this.title = '';
    this.description = '';
    this.date = '';
    this.location = '';
  }
}
