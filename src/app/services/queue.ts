import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  constructor(private http: HttpClient) {}

  getExpertQueueToday(expertId: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/queues/today/${expertId}`);
  }

  marcarAtendido(customerId: number): Observable<void> {
    return this.http.patch<void>(`${environment.apiUrl}/queuecustomers/${customerId}/attended`, {});
  }

  removerDaFila(customerId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/queuecustomers/${customerId}`);
  }

  adicionarCliente(expertId: string, cliente: any): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/queues/${expertId}/add-customer`, cliente);
  }
}
