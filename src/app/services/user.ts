import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface CreateAccountPayload {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private router = inject(Router);
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createAccount(payload: CreateAccountPayload): Observable<CreateAccountPayload> {
    return this.http.post<CreateAccountPayload>(this.apiUrl + '/users', payload);
  }
}
