import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AutheResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `http://localhost:8080/api/auth`;

  constructor(private http: HttpClient) {}

  register(user: RegisterRequest): Observable<AutheResponse> {
    return this.http.post<AutheResponse>(`${this.apiUrl}/register`, user).pipe(
      tap(response => this.saveToken(response.token))
    );
  }

  login(credentials: AuthRequest): Observable<AutheResponse> {
    return this.http.post<AutheResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.saveToken(response.token))
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.authorities[0].authority.replace('ROLE_', ''); // e.g., 'CLIENT' or 'ADMIN'
      } catch (e) {
        console.error('Error decoding JWT', e);
        return null;
      }
    }
    return null;
  }
}