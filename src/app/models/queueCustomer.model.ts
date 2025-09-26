import { Queue } from './queue.model';

export interface QueueCustomer {
  id: number;
  queue: Queue;
  queueId: string;
  name: string;
  service: string;
  isAwaiting: boolean;
}
