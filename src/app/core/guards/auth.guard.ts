import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    take(1),
    map(token => {
      console.log('AuthGuard: Token:', token); // Debug log
      if (token) {
        return true;
      }
      router.navigate(['/auth/login']);
      return false;
    })
  );
};