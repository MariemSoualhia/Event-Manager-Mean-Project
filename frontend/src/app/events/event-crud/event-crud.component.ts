import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventDetailModalComponent } from '../event-detail-modal/event-detail-modal.component';
import { EventEditModalComponent } from '../event-edit-modal/event-edit-modal.component';

@Component({
  selector: 'app-event-crud',
  standalone: true,
  templateUrl: './event-crud.component.html',
  styleUrls: ['./event-crud.component.css'], // ✅ corrected 'styleUrl' ➜ 'styleUrls'
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    EventDetailModalComponent,
    EventEditModalComponent
  ]
})
export class EventCrudComponent implements OnInit {
  title = '';
  description = '';
  date = '';
  location = '';
  events: any[] = [];
  selectedEvent: any = null;
  editingEvent: any = null;
  currentUserId = '';
  currentUserRole= '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.currentUserId = payload.id;
      this.currentUserRole = payload.role;
    }
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

  onEditEvent(event: any) {
    this.selectedEvent = null; // 👈 Fermer la modale de détails
    this.editingEvent = { ...event }; // clone pour formulaire d'édition
  }

  onSaveEdit(updatedEvent: any) {
    this.eventService.updateEvent(updatedEvent).then(() => {
      this.loadEvents();
      this.editingEvent = null;
    });
  }
}
