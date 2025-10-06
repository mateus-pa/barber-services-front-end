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
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    aceiteTermos: new FormControl(false, [Validators.requiredTrue]),
  });

  email = this.cadastroFormGroup.get('email') as FormControl;
  password = this.cadastroFormGroup.get('password') as FormControl;
  nome = this.cadastroFormGroup.get('nome') as FormControl;
  aceiteTermos = this.cadastroFormGroup.get('aceiteTermos') as FormControl;

  toggleButton(): void {}

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageEmail());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessagePassword());

    merge(this.aceiteTermos.statusChanges, this.aceiteTermos.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageAceiteTermos());

    merge(this.nome.statusChanges, this.nome.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageNome());
  }

  errorMessageNome = signal('');
  updateErrorMessageNome() {
    const nomeControl = this.cadastroFormGroup.get('nome');
    if (nomeControl?.hasError('required')) {
      this.errorMessageNome.set('Você precisa digitar um nome');
    } else if (nomeControl?.hasError('minlength')) {
      this.errorMessageNome.set('O nome precisa ter pelo menos 3 caracteres');
    } else {
      this.errorMessageNome.set('');
    }
  }

  errorMessageEmail = signal('');
  updateErrorMessageEmail() {
    const emailControl = this.cadastroFormGroup.get('email');
    if (emailControl?.hasError('required')) {
      this.errorMessageEmail.set('Você precisa digitar um email');
    } else if (emailControl?.hasError('email')) {
      this.errorMessageEmail.set('Não é um email válido');
    } else {
      this.errorMessageEmail.set('');
    }
  }

  errorMessagePassword = signal('');
  updateErrorMessagePassword() {
    const passwordControl = this.cadastroFormGroup.get('password');
    if (passwordControl?.hasError('required')) {
      this.errorMessagePassword.set(' Vocé precisa digitar uma senha');
    } else if (passwordControl?.hasError('minlength')) {
      this.errorMessagePassword.set('A senha precisa ter pelo menos 6 caracteres');
    } else {
      this.errorMessagePassword.set('');
    }
  }

  errorMessageAceiteTermos = signal('');
  updateErrorMessageAceiteTermos() {
    const aceiteTermosControl = this.cadastroFormGroup.get('aceiteTermos');
    if (aceiteTermosControl?.hasError('required')) {
      this.errorMessageAceiteTermos.set('Você precisa aceitar os termos de serviço');
    } else {
      this.errorMessageAceiteTermos.set('');
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
