import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { merge } from 'rxjs';
import { AuthService, LoginPayload } from '../../services/auth';

@Component({
  selector: 'app-form-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-login.html',
  styleUrl: './form-login.css',
})
export class FormLogin implements OnInit {
  ngOnInit(): void {}
  loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  email = this.loginFormGroup.get('email') as FormControl;
  password = this.loginFormGroup.get('password') as FormControl;

  constructor(private authService: AuthService) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  errorMessage = signal('');
  updateErrorMessage() {
    const emailControl = this.loginFormGroup.get('email');
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
    if (this.loginFormGroup.valid) {
      const dados: LoginPayload = this.loginFormGroup.value;
      console.log(dados);
      this.authService.login(dados).subscribe({
        next: (user) => {
          console.log('Login bem-sucedido:', user);
          // redirecionar ou salvar token, etc.
        },
        error: (err) => {
          console.error('Erro ao fazer login:', err);
          this.errorMessage.set('Email ou senha inválidos');
        },
      });
    }
  }
}
