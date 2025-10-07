import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-erro-modal-create-account',
  standalone: true,
  imports: [],
  templateUrl: './erro-modal-create-account.html',
  styleUrl: './erro-modal-create-account.css',
})
export class ErroModalCreateAccount {
  @Input() message = '';
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
