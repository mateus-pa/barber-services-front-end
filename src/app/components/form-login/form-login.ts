import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './form-login.html',
  styleUrl: './form-login.css',
})
export class FormLogin {
  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const { email, senha } = form.value;

    console.log('Dados prontos para o back-end:', form.value);
    // Chamar a API aqui...
  }
}
