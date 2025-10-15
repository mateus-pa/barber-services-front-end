import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { merge } from 'rxjs';
import { UserFull } from '../../models/user.model';
import { AuthService } from '../../services/auth';
import { UpdateAccountPayload, UserService } from '../../services/user';
import { ErroModalUpdateAccount } from '../erro-modal-update-account/erro-modal-update-account';

@Component({
  selector: 'app-form-atualizar-user',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, ErroModalUpdateAccount],
  templateUrl: './form-atualizar-user.html',
  styleUrl: './form-atualizar-user.css',
})
export class FormAtualizarUser implements OnInit {
  @Input() visible: boolean = false;
  @Input() userData: UserFull | null = null;
  @Output() close = new EventEmitter<UserFull | null>();

  protected readonly value = signal('');

  private userService = inject(UserService);
  private authService = inject(AuthService);

  updateUserFormGroup: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  email = this.updateUserFormGroup.get('email') as FormControl;
  nome = this.updateUserFormGroup.get('nome') as FormControl;

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageEmail());

    merge(this.nome.statusChanges, this.nome.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageNome());
  }

  ngOnInit(): void {
    if (!this.userData) {
      const loggedUser = this.authService.getUserData();
      if (loggedUser) {
        this.userData = loggedUser;
      }
    }

    if (this.userData) {
      this.updateUserFormGroup.patchValue({
        nome: this.userData.name,
        email: this.userData.email,
      });
      this.updateUserFormGroup.markAsPristine();
      this.updateUserFormGroup.markAsUntouched();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userData'] && this.userData) {
      this.updateUserFormGroup.patchValue({
        nome: this.userData.name,
        email: this.userData.email,
      });
      this.updateUserFormGroup.markAsPristine();
      this.updateUserFormGroup.markAsUntouched();
    }
  }

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  fecharModal(result: UserFull | null = null): void {
    this.updateUserFormGroup.reset();
    this.close.emit(result);
  }

  errorMessageNome = signal('');
  updateErrorMessageNome() {
    if (this.nome.hasError('required')) {
      this.errorMessageNome.set('Nome é obrigatório.');
    } else if (this.nome.hasError('minlength')) {
      this.errorMessageNome.set('Nome deve ter no mínimo 3 caracteres.');
    } else {
      this.errorMessageNome.set('');
    }
  }

  errorMessageEmail = signal('');
  updateErrorMessageEmail() {
    if (this.email.hasError('required')) {
      this.errorMessageEmail.set('Email é obrigatório.');
    } else if (this.email.hasError('email')) {
      this.errorMessageEmail.set('Email inválido.');
    } else {
      this.errorMessageEmail.set('');
    }
  }

  showUpdateError = signal(false);
  errorMessageUpdate = signal('');
  isLoading = signal(false);

  onSubmit(): void {
    if (this.updateUserFormGroup.valid && this.userData?.id) {
      this.isLoading.set(true);
      this.showUpdateError.set(false);

      const id = this.userData.id;

      const dados: UpdateAccountPayload = {
        name: this.updateUserFormGroup.get('nome')?.value,
        email: this.updateUserFormGroup.get('email')?.value,
      };

      this.userService.updateAccount(id, dados).subscribe({
        next: (response) => {
          this.isLoading.set(false);

          const updatedUser: UserFull = {
            ...this.userData!,
            ...(response as UpdateAccountPayload),
          };

          this.fecharModal(updatedUser);
        },
        error: (err) => {
          console.error('Erro ao atualizar usuário:', err);
          this.errorMessageUpdate.set(err.error?.message || 'Falha na comunicação com o servidor');
          this.showUpdateError.set(true);
          this.isLoading.set(false);
        },
      });
    } else {
      this.errorMessageUpdate.set('Preencha os campos corretamente');
      this.showUpdateError.set(true);
    }
  }
}
