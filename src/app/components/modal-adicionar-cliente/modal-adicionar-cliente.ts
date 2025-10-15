import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { QueueService } from '../../services/queue';

interface ModalData {
  expertId: string;
  CreatedAt: string;
}

@Component({
  selector: 'app-modal-adicionar-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-adicionar-cliente.html',
  styleUrl: './modal-adicionar-cliente.css',
})
export class ModalAdicionarCliente {
  private dialogRef = inject(MatDialogRef<ModalAdicionarCliente>);
  private data: ModalData = inject(MAT_DIALOG_DATA);
  private queueService = inject(QueueService);

  cliente = {
    name: '',
    service: '',
    time: '',
  };

  private readonly BRAZIL_TIMEZONE_OFFSET = 3 * 60;

  async adicionar() {
    try {
      const queueDate = new Date(this.data.CreatedAt);

      queueDate.setHours(0, 0, 0, 0);

      const [hours, minutes] = this.cliente.time.split(':').map(Number);

      queueDate.setHours(hours, minutes, 0, 0);
      const localOffset = queueDate.getTimezoneOffset();

      const targetOffset = localOffset - this.BRAZIL_TIMEZONE_OFFSET;

      const targetDate = new Date(queueDate.getTime() - targetOffset * 60 * 1000);

      const appointmentTimeISO = targetDate.toISOString();
      const clientPayload = {
        name: this.cliente.name,
        service: this.cliente.service,
        appointmentTime: appointmentTimeISO,
      };

      await firstValueFrom(this.queueService.adicionarCliente(this.data.expertId, clientPayload));
      this.dialogRef.close(true);
    } catch (err) {
      console.error('Erro ao adicionar cliente:', err);
      this.dialogRef.close(false);
    }
  }

  fechar() {
    this.dialogRef.close(false);
  }
}
