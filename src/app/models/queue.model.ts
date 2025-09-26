import { Expert } from './expert.model';
import { QueueCustomer } from './queueCustomer.model';

export interface Queue {
  id: string;
  createdAt: Date;
  expert: Expert;
  expertId: string;
  queuecustomers: QueueCustomer[];
}
