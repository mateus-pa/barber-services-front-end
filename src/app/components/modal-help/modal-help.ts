import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-help',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-help.html',
  styleUrl: './modal-help.css',
})
export class ModalHelp {
  private dialogRef = inject(MatDialogRef<ModalHelp>);

  fechar() {
    this.dialogRef.close();
  }
}
