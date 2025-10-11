import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class SidebarDashboard implements OnInit {
  user = {
    name: 'Convidado',
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
    }
  }

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

  secondaryItems: NavItem[] = [
    { icon: 'settings', label: 'Settings', route: '/settings' },
    { icon: 'help_outline', label: 'Help', route: '/help' },
  ];
}
