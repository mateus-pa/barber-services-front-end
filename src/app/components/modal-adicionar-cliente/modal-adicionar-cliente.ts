import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { CustomerPayload } from '../../models/queueCustomer.model';
import { QueueService } from '../../services/queue';

interface ModalData {
  expertId: string;
  createdAt: string;
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
      const queueDate = new Date(this.data.createdAt);

      if (isNaN(queueDate.getTime())) {
        throw new Error('Data da fila inválida (createdAt). Verifique o dado injetado no modal.');
      }

      const [hours, minutes] = this.cliente.time.split(':').map(Number);

      const year = queueDate.getFullYear();
      const month = queueDate.getMonth();
      const day = queueDate.getDate();

      const localDateTime = new Date(year, month, day, hours, minutes);

      const appointmentTimeISO = localDateTime.toISOString();

      const customerPayload: CustomerPayload = {
        expertId: this.data.expertId,
        name: this.cliente.name,
        service: this.cliente.service,
        appointmentTime: appointmentTimeISO,
      };

      console.log(customerPayload);

      await firstValueFrom(this.queueService.adicionarCliente(customerPayload));
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
