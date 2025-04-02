import { Injectable } from '@angular/core';
import axios from 'axios';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:5000/api/events';

  constructor(private authService: AuthService) {}

  private getAuthHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    };
  }

  async getAllEvents() {
    const res = await axios.get(this.baseUrl);
    return res.data;
  }

  async createEvent(eventData: any) {
    const res = await axios.post(this.baseUrl, eventData, this.getAuthHeaders());
    return res.data;
  }

  async registerToEvent(eventId: string) {
    const res = await axios.post(`${this.baseUrl}/${eventId}/register`, {}, this.getAuthHeaders());
    return res.data;
  }

  async deleteEvent(eventId: string) {
    const res = await axios.delete(`${this.baseUrl}/${eventId}`, this.getAuthHeaders());
    return res.data;
  }
}
