import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core'; // <<-- Adicionado Input, Output, EventEmitter
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { merge } from 'rxjs';
import { Expert } from '../../models/expert.model';
import { expertService } from '../../services/expert';
import { ErroModalCreateAccount } from '../erro-modal-create-account/erro-modal-create-account';

@Component({
  selector: 'app-form-cadastro-expert',
  imports: [
    NgxMaskDirective,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ErroModalCreateAccount,
  ],
  providers: [provideNgxMask()],
  standalone: true,
  templateUrl: './form-cadastro-expert.html',
  styleUrl: './form-cadastro-expert.css',
})
export class FormCadastroExpert {
  protected readonly value = signal('');

  ngOnInit(): void {}

  createExpertFormGroup: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', []),
    aceiteTermos: new FormControl(false, [Validators.requiredTrue]),
  });

  email = this.createExpertFormGroup.get('email') as FormControl;
  phone = this.createExpertFormGroup.get('phone') as FormControl;
  nome = this.createExpertFormGroup.get('nome') as FormControl;
  aceiteTermos = this.createExpertFormGroup.get('aceiteTermos') as FormControl;

  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<any>();

  fecharModal(result: any = null): void {
    this.close.emit(result);
  }

  toggleButton(): void {}
  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  constructor(private expertService: expertService) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageEmail());

    merge(this.nome.statusChanges, this.nome.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageNome());

    merge(this.aceiteTermos.statusChanges, this.aceiteTermos.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageAceiteTermos());
  }

  errorMessageNome = signal('');
  updateErrorMessageNome() {
    const nomeControl = this.createExpertFormGroup.get('nome');
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
    const emailControl = this.createExpertFormGroup.get('email');
    if (emailControl?.hasError('required')) {
      this.errorMessageEmail.set('Você precisa digitar um email');
    } else if (emailControl?.hasError('email')) {
      this.errorMessageEmail.set('Não é um email válido');
    } else {
      this.errorMessageEmail.set('');
    }
  }

  errorMessageAceiteTermos = signal('');
  updateErrorMessageAceiteTermos() {
    const aceiteTermosControl = this.createExpertFormGroup.get('aceiteTermos');
    if (aceiteTermosControl?.hasError('required')) {
      this.errorMessageAceiteTermos.set('Você precisa aceitar os termos de serviço');
    } else {
      this.errorMessageAceiteTermos.set('');
    }
  }

  showCreateAccountError = signal(false);
  errorMessageCreateAccount = signal('');
  isLoading = signal(false);
  onSubmit(): void {
    if (this.createExpertFormGroup.valid) {
      this.isLoading.set(true);
      const dados: Expert = {
        name: this.createExpertFormGroup.get('nome')?.value,
        email: this.createExpertFormGroup.get('email')?.value,
        phone: this.createExpertFormGroup.get('phone')?.value,
      };

      console.log(dados);
      this.expertService.createExpert(dados).subscribe({
        next: (user) => {
          console.log('Funcionário cadastrado com sucesso:', user);
          this.showCreateAccountError.set(false);
          this.isLoading.set(false);
          this.fecharModal(user);
        },
        error: (err) => {
          console.error('Erro ao cadastrar funcionário:', err);
          this.errorMessageCreateAccount.set(
            err.error.error ? err.error.error : 'Falha na comunicação com o servidor'
          );
          this.showCreateAccountError.set(true);
          this.isLoading.set(false);
        },
      });
    } else {
      this.errorMessageCreateAccount.set('Preencha os campos corretamente');
      this.showCreateAccountError.set(true);
    }
  }
}
