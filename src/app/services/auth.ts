import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: Pick<User, 'email' | 'password'>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, usuario).pipe(
      tap((response) => {
        sessionStorage.setItem(USER_KEY, JSON.stringify(response));
      })
    );
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
