import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ExpertFull } from '../../models/expert.model';
import { ExpertService } from '../../services/expert';
import { QueueService } from '../../services/queue';
import { ModalAdicionarCliente } from '../modal-adicionar-cliente/modal-adicionar-cliente';

@Component({
  selector: 'app-queue-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './queue-dashboard.html',
  styleUrl: './queue-dashboard.css',
})
export class QueueDashboard {
  private expertService = inject(ExpertService);
  private queueService = inject(QueueService);
  private dialog = inject(MatDialog);

  experts = signal<ExpertFull[]>([]);
  selectedExpertId = signal<string | null>(null);
  queueCustomers = signal<any[]>([]);
  createdAt = signal<string>('');

  ngOnInit() {
    this.loadExperts();
  }

  async loadExperts() {
    try {
      const expertsList = await firstValueFrom(this.expertService.getExperts());
      this.experts.set(expertsList);
    } catch (err) {
      console.error('Erro ao carregar experts:', err);
    }
  }

  async onSelectExpert(event: Event) {
    const id = (event.target as HTMLSelectElement).value;
    this.selectedExpertId.set(id);
    if (!id) return;

    try {
      const queue = await firstValueFrom(this.queueService.getExpertQueueToday(id));
      this.createdAt.set(queue?.createdAt || '');
      this.queueCustomers.set(queue?.queuecustomers || []);
    } catch (err) {
      console.error('Erro ao carregar fila:', err);
    }
  }

  async marcarAtendido(customerId: number) {
    try {
      await firstValueFrom(this.queueService.marcarAtendido(customerId));
      this.reloadQueue();
    } catch (err) {
      console.error('Erro ao marcar atendido:', err);
    }
  }

  async removerCliente(customerId: number) {
    try {
      await firstValueFrom(this.queueService.removerDaFila(customerId));
      this.reloadQueue();
    } catch (err) {
      console.error('Erro ao remover cliente:', err);
    }
  }

  private async reloadQueue() {
    if (!this.selectedExpertId()) return;
    try {
      const queue = await firstValueFrom(
        this.queueService.getExpertQueueToday(this.selectedExpertId()!)
      );
      this.queueCustomers.set(queue?.queuecustomers || []);
    } catch (err) {
      console.error('Erro ao recarregar fila:', err);
    }
  }

  abrirModalAdicionarCliente() {
    if (!this.selectedExpertId()) return;

    const dialogRef = this.dialog.open(ModalAdicionarCliente, {
      width: '400px',
      data: { expertId: this.selectedExpertId(), createdAt: this.createdAt() },
    });

    dialogRef.afterClosed().subscribe((added) => {
      if (added) this.reloadQueue();
    });
  }
}
