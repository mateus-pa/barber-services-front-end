import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Expert, ExpertFull } from '../models/expert.model';

@Injectable({
  providedIn: 'root',
})
export class expertService {
  constructor(private http: HttpClient) {}

  createExpert(payload: Expert): Observable<Expert> {
    return this.http.post<Expert>(environment.apiUrl + '/experts', payload);
  }

  getExperts(): Observable<ExpertFull[]> {
    return this.http.get<ExpertFull[]>(environment.apiUrl + '/experts');
  }

  removeExpert(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/experts/${id}`);
  }
}
