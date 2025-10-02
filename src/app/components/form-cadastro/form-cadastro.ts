import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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

  ngOnInit(): void {}
  cadastroFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    aceiteTermos: new FormControl(false, [Validators.requiredTrue]),
  });

  email = this.cadastroFormGroup.get('email') as FormControl;
  senha = this.cadastroFormGroup.get('senha') as FormControl;
  nome = this.cadastroFormGroup.get('nome') as FormControl;
  aceiteTermos = this.cadastroFormGroup.get('aceiteTermos') as FormControl;

  toggleButton(): void {
    // console.log('Termos de aceite mudou para:' + this.aceiteTermos.value);
  }

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  errorMessage = signal('');
  updateErrorMessage() {
    const emailControl = this.cadastroFormGroup.get('email');
    if (emailControl?.hasError('required')) {
      this.errorMessage.set('Você precisa digitar um email');
    } else if (emailControl?.hasError('email')) {
      this.errorMessage.set('Não é um email válido');
    } else {
      this.errorMessage.set('');
    }
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit(): void {
    if (this.cadastroFormGroup.valid) {
      const dados = this.cadastroFormGroup.value;
      console.log(dados);
    }
  }
}
