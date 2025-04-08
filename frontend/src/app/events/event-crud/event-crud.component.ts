import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventDetailModalComponent } from '../event-detail-modal/event-detail-modal.component';
import { EventEditModalComponent } from '../event-edit-modal/event-edit-modal.component';
import {  EventFilterPipe} from '../../pipes/event-filter.pipe';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
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
    EventEditModalComponent,
    EventFilterPipe,
    FullCalendarModule

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
  searchText: string = '';
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this)
  };


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
    
      const res = await this.eventService.getAllEvents();
      this.events = res;
  
      // ⏳ événements futurs seulement pour le calendrier
      const now = new Date();
  
      const upcoming = res.filter((e: any) => new Date(e.date) > now);
  
      this.calendarOptions.events = upcoming.map((e: any) => ({
        title: e.title,
        date: e.date,
        id: e._id
      }));
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
      this.loadEvents();
    } catch (error) {
      console.error('Registration failed', error);
    }
  }
  isAlreadyRegistered(event: any): boolean {
    return event.attendees?.some((attendee: any) => attendee._id === this.currentUserId);
  }
  
  async deleteEvent(eventId: string) {
    try {
      await this.eventService.deleteEvent(eventId);
      this.loadEvents();
    } catch (error) {
      console.error('Delete failed', error);
    }
  }
  handleDateClick(arg: any) {
    alert(`Date sélectionnée : ${arg.dateStr}`);
  }

  handleEventClick(arg: any) {
    const event = this.events.find(e => e._id === arg.event.id);
    if (event) this.selectedEvent = event;
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
