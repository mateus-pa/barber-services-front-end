import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-erro-modal-update-account',
  standalone: true,
  imports: [],
  templateUrl: './erro-modal-update-account.html',
  styleUrl: './erro-modal-update-account.css',
})
export class ErroModalUpdateAccount {
  @Input() message = '';
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
