import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ExpertFull } from '../../models/expert.model';

// 2. Componente Standalone
@Component({
  selector: 'app-expert-dashboard',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './expert-dashboard.html',
  styleUrl: './expert-dashboard.css',
})
export class ExpertDashboard implements OnInit {
  employees = signal<ExpertFull[]>([]);
  isLoading = signal(true);

  // Exemplo de Injeção
  constructor(private router: Router) {
    effect(() => {
      console.log(`Lista de Funcionários atualizada. Total: ${this.employees().length}`);
    });
  }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  // Função que simula a requisição à API
  fetchEmployees(): void {
    this.isLoading.set(true);
    // Exemplo simulado com setTimeout
    setTimeout(() => {
      const mockData: ExpertFull[] = [
        // Como você não quer dados genéricos, a lista virá vazia
        // A requisição real da sua API preencherá esta lista.
      ];

      // Simulação de erro da API
      // if (Math.random() > 0.8) {
      //   console.error('Falha ao carregar funcionários.');
      //   this.employees.set([]);
      // } else {
      //   this.employees.set(mockData);
      // }

      this.employees.set(mockData); // Defina com os dados da sua API real
      this.isLoading.set(false);
    }, 1000); // Simula o tempo de carregamento da API
  }

  addEmployee(): void {}

  viewQueue(employeeId: number): void {
    console.log(`Navegar para a fila do Funcionário ID: ${employeeId}`);
    this.router.navigate(['/dashboard/expert/queue', employeeId]);
  }

  updateEmployee(employeeId: number): void {
    console.log(`Abrir modal/página para atualizar Funcionário ID: ${employeeId}`);
    alert(`Ação: Atualizar Funcionário ID ${employeeId}`);
  }

  removeEmployee(employeeId: number): void {
    if (confirm(`Tem certeza que deseja remover o funcionário ID ${employeeId}?`)) {
      console.log(`Chamando API para remover Funcionário ID: ${employeeId}`);
      // **AQUI VOCÊ CHAMARIA O MÉTODO DO SERVICE PARA REMOVER**
      // Após a remoção bem-sucedida:
      // this.employees.update(currentEmployees =>
      //   currentEmployees.filter(emp => emp.id !== employeeId)
      // );
      alert(`Ação: Remover Funcionário ID ${employeeId}`);
    }
  }
}
