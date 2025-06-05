import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { JwtService } from '../../../services/jwt.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, MatToolbarModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAuthenticated$ = this.authService.currentUser$;
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router
  ) {
    this.isAuthenticated$.subscribe(token => {
      this.isAdmin = token ? this.jwtService.getRoleFromToken(token) === 'ADMIN' : false;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}