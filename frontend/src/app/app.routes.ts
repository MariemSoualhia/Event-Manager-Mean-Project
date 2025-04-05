import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventCrudComponent } from './events/event-crud/event-crud.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
    { path: '', redirectTo: 'events', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'events', component: EventCrudComponent },
    { path: 'create-event', component: CreateEventComponent },
    { path: 'dashboard', component: DashboardComponent }
  ]
