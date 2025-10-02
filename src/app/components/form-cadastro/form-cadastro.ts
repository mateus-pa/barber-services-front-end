import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-cadastro',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './form-cadastro.html',
  styleUrl: './form-cadastro.css',
})
export class FormCadastro {
  protected readonly value = signal('');
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly senha = new FormControl('', [Validators.required, Validators.minLength(6)]);
  readonly nome = new FormControl('', [Validators.required, Validators.minLength(3)]);
  readonly aceiteTermos = new FormControl(false, [Validators.requiredTrue]);

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {}

  errorMessage = signal('');
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Você precisa digitar um email');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Não é um email válido');
    } else {
      this.errorMessage.set('');
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const { email, senha, nome } = form.value;

    console.log('Dados prontos para o back-end:', form.value);
    // Chamar a API aqui...
  }
}
