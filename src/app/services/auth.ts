import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

export interface LoginPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);

  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<User> {
    return this.http.post<User>(environment.apiUrl + '/login', payload);
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
