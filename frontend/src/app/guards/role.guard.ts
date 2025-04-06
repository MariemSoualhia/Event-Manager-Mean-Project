import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  if (token && role === 'admin') {
    return true; // ✅ admin autorisé
  } else {
    router.navigate(['/events']); // ❌ redirection user ou non connecté
    return false;
  }
};
