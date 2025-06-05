import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
getRoleFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('JWT Payload:', payload);
    if (payload.authorities && payload.authorities.length > 0) {
      const role = payload.authorities[0].authority.replace('ROLE_', '');
      console.log('Extracted role:', role);
      return role;
    }
    console.log('No authorities found in payload');
    return null;
  } catch (e) {
    console.error('Error decoding JWT:', e);
    return null;
  }
}
}