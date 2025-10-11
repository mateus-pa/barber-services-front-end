import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';

interface NavItem {
  icon: string;
  label: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-dashboard.html',
  styleUrls: ['./sidebar-dashboard.css'],
})
export class SidebarDashboard {
  constructor(private authService: AuthService) {}

  logoutBtn() {
    this.authService.logout();
  }

  menuItems: NavItem[] = [
    { icon: 'home', label: 'Dashboard', route: '/dashboard/home' },
    { icon: 'folder', label: 'Projects', route: '/projects' },
    { icon: 'assignment', label: 'Tasks', route: '/tasks' },
    { icon: 'bar_chart', label: 'Reports', route: '/reports' },
    { icon: 'group', label: 'Funcionários', route: '/dashboard/expert' },
  ];

  // Itens de navegação secundários (Rodapé/Ajustes)
  secondaryItems: NavItem[] = [
    { icon: 'settings', label: 'Settings', route: '/settings' },
    { icon: 'help_outline', label: 'Help', route: '/help' },
  ];
  user = {
    name: 'Jane Doe',
    title: 'Product Designer',
    avatarUrl: 'https://via.placeholder.com/150/00FFFF/FFFFFF?text=JD',
  };
}
