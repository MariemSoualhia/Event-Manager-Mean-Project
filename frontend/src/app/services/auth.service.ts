import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';

  async register(name: string, email: string, password: string) {
    const res = await axios.post(`${this.baseUrl}/register`, { name, email, password });
    localStorage.setItem('token', res.data.token);
    return res.data;
  }

  async login(email: string, password: string) {
    const res = await axios.post(`${this.baseUrl}/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    return res.data;
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
