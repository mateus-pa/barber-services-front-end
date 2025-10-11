import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Expert } from '../models/expert.model';

@Injectable({
  providedIn: 'root',
})
export class expertService {
  constructor(private http: HttpClient) {}

  createExpert(payload: Expert): Observable<Expert> {
    return this.http.post<Expert>(environment.apiUrl + '/experts', payload);
  }
}
