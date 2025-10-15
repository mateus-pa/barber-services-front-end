import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CreateAccountPayload {
  name: string;
  email: string;
  password: string;
}

export interface UpdateAccountPayload {
  name?: string;
  email?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createAccount(payload: CreateAccountPayload): Observable<CreateAccountPayload> {
    return this.http.post<CreateAccountPayload>(environment.apiUrl + '/users', payload);
  }

  updateAccount(
    userId: string,
    payload: Partial<UpdateAccountPayload>
  ): Observable<UpdateAccountPayload> {
    return this.http.put<UpdateAccountPayload>(`${environment.apiUrl}/users`, payload);
  }

  deleteAccount(userId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/users`);
  }
}
