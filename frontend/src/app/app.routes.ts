import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventCrudComponent } from './events/event-crud/event-crud.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/role.guard';

function redirectBasedOnAuth(): string {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return token ? '/events' : '/login';
}


export const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'events', component: EventCrudComponent, canActivate: [authGuard] },
  { path: 'create-event', component: CreateEventComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [adminGuard] }

];
