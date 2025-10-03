import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  menuItems: NavItem[] = [
    { icon: 'home', label: 'Dashboard', route: '/dashboard' }, // Item ativo
    { icon: 'folder', label: 'Projects', route: '/projects' },
    { icon: 'assignment', label: 'Tasks', route: '/tasks' },
    { icon: 'bar_chart', label: 'Reports', route: '/reports' },
    { icon: 'group', label: 'Users', route: '/users' },
  ];

  // Itens de navegação secundários (Rodapé/Ajustes)
  secondaryItems: NavItem[] = [
    { icon: 'settings', label: 'Settings', route: '/settings' },
    { icon: 'help_outline', label: 'Help', route: '/help' },
  ];

  // Dados do usuário para o rodapé
  user = {
    name: 'Jane Doe',
    title: 'Product Designer',
    avatarUrl: 'https://via.placeholder.com/150/00FFFF/FFFFFF?text=JD',
  };
}
