import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserFull } from '../../models/user.model';
import { AuthService } from '../../services/auth';
import { FormAtualizarUser } from '../form-atualizar-user/form-atualizar-user';
import { ModalHelp } from '../modal-help/modal-help';
import { SettingsModal } from '../settings-modal/settings-modal';

interface NavItem {
  icon: string;
  label: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, SettingsModal, FormAtualizarUser],
  templateUrl: './sidebar-dashboard.html',
  styleUrls: ['./sidebar-dashboard.css'],
})
export class SidebarDashboard implements OnInit {
  user: UserFull & { title: string; avatarUrl: string } = {
    id: '',
    name: 'Convidado',
    email: '',
    title: 'AgendArte Admin',
    avatarUrl: 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png',
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const loggedInUser = this.authService.getUserData();

    if (loggedInUser && loggedInUser.name) {
      this.user.name = loggedInUser.name;
      this.user.email = loggedInUser.email;
      this.user.id = loggedInUser.id;
    }
  }

  logoutBtn() {
    this.authService.logout();
  }

  menuItems: NavItem[] = [
    { icon: 'home', label: 'Dashboard', route: '/dashboard/home' },
    // { icon: 'folder', label: 'Projects', route: '/projects' },
    // { icon: 'assignment', label: 'Tasks', route: '/tasks' },
    // { icon: 'bar_chart', label: 'Reports', route: '/reports' },
    { icon: 'group', label: 'Funcionários', route: '/dashboard/expert' },
  ];

  secondaryItems: NavItem[] = [
    { icon: 'settings', label: 'Settings', route: '' },
    { icon: 'help_outline', label: 'Help', route: '/help' },
  ];

  showSettingsModal: boolean = false;
  showProfileModal: boolean = false;

  openSettingsModal(): void {
    this.showSettingsModal = true;
  }

  closeSettingsModal(): void {
    this.showSettingsModal = false;
  }

  openProfileModalFromSettings(): void {
    this.closeSettingsModal();
    this.showProfileModal = true;
  }

  onProfileModalClose(updatedUser: UserFull | null): void {
    this.showProfileModal = false;

    if (updatedUser) {
      this.user.name = updatedUser.name;
      this.user.email = updatedUser.email;
    }
  }

  private dialog = inject(MatDialog);

  openHelpModal(): void {
    this.dialog.open(ModalHelp, {
      width: '600px',
      maxHeight: '90vh',
    });
  }
}
