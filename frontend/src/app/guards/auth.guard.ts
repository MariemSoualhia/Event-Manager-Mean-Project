import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (token) {
    return true; // ✅ accès autorisé
  } else {
    const router = inject(Router);
    router.navigate(['/login']);
    return false; // ❌ accès refusé
  }
};
