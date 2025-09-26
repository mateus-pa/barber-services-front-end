import { Queue } from './queue.model';

export interface Expert {
  id: string;
  name: string;
  email: string;
  phone?: string;
  queues: Queue[];
}
