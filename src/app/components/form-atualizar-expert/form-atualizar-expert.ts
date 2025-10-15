import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
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
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { merge } from 'rxjs';
import { Expert, ExpertFull } from '../../models/expert.model';
import { ExpertService } from '../../services/expert';
import { ErroModalUpdateAccount } from '../erro-modal-update-account/erro-modal-update-account';

@Component({
  selector: 'app-form-atualizar-expert',
  imports: [
    NgxMaskDirective,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ErroModalUpdateAccount,
  ],
  providers: [provideNgxMask()],
  standalone: true,
  templateUrl: './form-atualizar-expert.html',
  styleUrl: './form-atualizar-expert.css',
})
export class FormAtualizarExpert implements OnChanges {
  @Input() visible: boolean = false;

  @Input() expertData: ExpertFull | null = null;
  @Output() close = new EventEmitter<ExpertFull | null>();

  protected readonly value = signal('');

  updateExpertFormGroup: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', []),
  });

  email = this.updateExpertFormGroup.get('email') as FormControl;
  phone = this.updateExpertFormGroup.get('phone') as FormControl;
  nome = this.updateExpertFormGroup.get('nome') as FormControl;

  constructor(private expertService: ExpertService) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageEmail());

    merge(this.nome.statusChanges, this.nome.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageNome());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expertData'] && this.expertData && this.visible) {
      this.updateExpertFormGroup.patchValue({
        nome: this.expertData.name,
        email: this.expertData.email,
        phone: this.expertData.phone,
      });
      this.updateExpertFormGroup.markAsPristine();
      this.updateExpertFormGroup.markAsUntouched();
    }
  }

  fecharModal(result: ExpertFull | null = null): void {
    this.updateExpertFormGroup.reset();
    this.close.emit(result);
  }

  toggleButton(): void {}
  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
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
    if (this.updateExpertFormGroup.valid && this.expertData?.id) {
      this.isLoading.set(true);

      const id = this.expertData.id;

      const dados: Expert = {
        name: this.updateExpertFormGroup.get('nome')?.value,
        email: this.updateExpertFormGroup.get('email')?.value,
        phone: this.updateExpertFormGroup.get('phone')?.value,
      };

      this.expertService.updateExpert(id, dados).subscribe({
        next: () => {
          this.showUpdateError.set(false);
          this.isLoading.set(false);

          const updatedExpert: ExpertFull = {
            ...this.expertData!,
            ...(dados as Expert),
          };
          this.fecharModal(updatedExpert);
        },
        error: (err) => {
          console.error('Erro ao atualizar funcionário:', err);
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
