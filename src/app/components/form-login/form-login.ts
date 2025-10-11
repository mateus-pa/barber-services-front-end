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
import { Router, RouterLink } from '@angular/router';
import { merge } from 'rxjs';
import { AuthService, LoginPayload } from '../../services/auth';
import { ErroModalLogin } from '../erro-modal-login/erro-modal-login';

@Component({
  selector: 'app-form-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink, ErroModalLogin],
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

  constructor(private authService: AuthService, private router: Router) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageEmail());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessagePassword());
  }

  errorMessageEmail = signal('');
  updateErrorMessageEmail() {
    const emailControl = this.loginFormGroup.get('email');
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
    const passwordControl = this.loginFormGroup.get('password');
    if (passwordControl?.hasError('required')) {
      this.errorMessagePassword.set(' Vocé precisa digitar uma senha');
    } else if (passwordControl?.hasError('minlength')) {
      this.errorMessagePassword.set('A senha precisa ter pelo menos 6 caracteres');
    } else {
      this.errorMessagePassword.set('');
    }
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  errorMessageLogin = signal('');
  showLoginError = signal(false);
  isLoading = signal(false);
  onSubmit(): void {
    if (this.loginFormGroup.valid) {
      this.isLoading.set(true);
      const dados: LoginPayload = this.loginFormGroup.value;
      console.log(dados);
      this.authService.login(dados).subscribe({
        next: (user) => {
          console.log('Login bem-sucedido:', user);
          this.showLoginError.set(false);
          const token = user.token;
          sessionStorage.setItem('authToken', token);
          this.isLoading.set(false);
          this.router.navigate(['/dashboard/home']);
        },
        error: (err) => {
          console.error('Erro ao fazer login:', err);
          this.errorMessageLogin.set('Email ou senha inválidos');
          this.showLoginError.set(true);
          this.isLoading.set(false);
        },
      });
    } else {
      this.errorMessageLogin.set('Email ou senha inválidos');
      this.showLoginError.set(true);
    }
  }
}
