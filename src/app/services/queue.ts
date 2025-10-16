import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CustomerPayload } from '../models/queueCustomer.model';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  constructor(private http: HttpClient) {}

  getExpertQueueToday(expertId: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/queues/today/${expertId}`);
  }

  marcarAtendido(customerId: number): Observable<void> {
    return this.http.patch<void>(`${environment.apiUrl}/queuescustomers/${customerId}`, {});
  }

  removerDaFila(customerId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/queuescustomers/${customerId}`);
  }

  adicionarCliente(customerPayload: CustomerPayload): Observable<CustomerPayload> {
    return this.http.post<CustomerPayload>(
      `${environment.apiUrl}/queuescustomers`,
      customerPayload
    );
  }
}
