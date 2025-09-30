import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { merge } from 'rxjs';

@Component({
  selector: 'app-form-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-login.html',
  styleUrl: './form-login.css',
})
export class FormLogin implements OnInit {
  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {}

  readonly email = new FormControl('', [Validators.required, Validators.email]);
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

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const { email, senha } = form.value;

    console.log('Dados prontos para o back-end:', form.value);
    // Chamar a API aqui...
  }
}
