import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  templateUrl: './create-event.component.html',
  imports: [CommonModule, FormsModule]
})
export class CreateEventComponent {
  title = '';
  description = '';
  date = '';
  location = '';

  constructor(private eventService: EventService, private router: Router) {}

  async createEvent() {
    const eventData = {
      title: this.title,
      description: this.description,
      date: this.date,
      location: this.location
    };
    await this.eventService.createEvent(eventData);
    alert('Event created!');
    this.router.navigate(['/events']);
  }
}
