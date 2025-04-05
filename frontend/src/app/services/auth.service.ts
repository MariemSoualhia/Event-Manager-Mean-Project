import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  loggedIn$ = this.loggedIn.asObservable();
  constructor(private router: Router) {}
  private hasToken(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('token');
  }
  async register(name: string, email: string, password: string) {
    const res = await axios.post(`${this.baseUrl}/register`, { name, email, password });
    localStorage.setItem('token', res.data.token);
    return res.data;
  }

  async login(email: string, password: string) {
    const res = await axios.post(`${this.baseUrl}/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    this.loggedIn.next(true); 
    return res.data;
  }


  getToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }
  
  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false); // 🔥 déclenche aussi
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }
  
}
