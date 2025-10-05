import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-erro-modal-login',
  standalone: true,
  imports: [],
  templateUrl: './erro-modal-login.html',
  styleUrl: './erro-modal-login.css',
})
export class ErroModalLogin {
  @Input() message = '';
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
