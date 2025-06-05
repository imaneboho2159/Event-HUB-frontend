import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtService } from '../../services/jwt.service';
import { map, take } from 'rxjs/operators';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const jwtService = inject(JwtService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    take(1),
    map(token => {
      console.log('AdminGuard: Token:', token); // Debug log
      console.log('AdminGuard: Role:', jwtService.getRoleFromToken(token!)); // Debug log
      if (token && jwtService.getRoleFromToken(token) === 'ADMIN') {
        return true;
      }
      router.navigate(['/client/home']);
      return false;
    })
  );
};