import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { QueueService } from '../../services/queue';

@Component({
  selector: 'app-modal-adicionar-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-adicionar-cliente.html',
  styleUrl: './modal-adicionar-cliente.css',
})
export class ModalAdicionarCliente {
  private dialogRef = inject(MatDialogRef<ModalAdicionarCliente>);
  private data = inject(MAT_DIALOG_DATA);
  private queueService = inject(QueueService);

  cliente = {
    name: '',
    service: '',
    appointmentTime: '',
  };

  async adicionar() {
    try {
      await firstValueFrom(this.queueService.adicionarCliente(this.data.expertId, this.cliente));
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
