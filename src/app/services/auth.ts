import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const USER_KEY = 'auth-user';

export interface LoginPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/login', payload);
  }

  logout(): void {
    sessionStorage.removeItem(USER_KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const user = sessionStorage.getItem(USER_KEY);
    return user ? true : false;
  }
}
