import { Queue } from './queue.model';

export interface QueueCustomer {
  id: number;
  queue: Queue;
  queueId: string;
  name: string;
  service: string;
  isAwaiting: boolean;
}

export interface CustomerPayload {
  expertId: string;
  name: string;
  service: string;
  appointmentTime: String;
}
