import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterModule]
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  role: string | null = null;
  constructor(
    public authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef // 👈 Injecte le service
  ) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(status => {
      setTimeout(() => {
        this.isLoggedIn = status;
      });
    });
    this.authService.loggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      if (status) {
        this.role = localStorage.getItem('role');
      }
    });
  }
 



  
  logout() {
    this.authService.logout();
  }
}
