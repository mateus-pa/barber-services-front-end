import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings-modal.html',
  styleUrl: './settings-modal.css',
})
export class SettingsModal {
  @Input() visible: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() openProfile = new EventEmitter<void>();

  showDeleteConfirm: boolean = false;
  isDeleting: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  closeModal(): void {
    this.showDeleteConfirm = false;
    this.isDeleting = false;
    this.close.emit();
  }

  goToProfile(): void {
    this.closeModal();
    this.openProfile.emit();
  }

  confirmDelete(): void {
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
  }

  async handleDeleteAccount(): Promise<void> {
    const userId = this.authService.getUserData()?.id;

    if (!userId || this.isDeleting) {
      console.error('Nenhum usuário logado ou exclusão já em progresso.');
      return;
    }

    this.isDeleting = true;

    try {
      await lastValueFrom(this.userService.deleteAccount(userId));

      this.authService.logout();

      this.closeModal();
    } catch (error) {
      console.error('Ocorreu um erro ao excluir a conta:', error);
      this.isDeleting = false;
      alert('Erro ao excluir a conta. Tente novamente.');
    }
  }
}
