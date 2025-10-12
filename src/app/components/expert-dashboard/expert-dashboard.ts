import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
// 1. Importar o ExpertService
import { ExpertFull } from '../../models/expert.model';
import { expertService } from '../../services/expert';
import { FormCadastroExpert } from '../form-cadastro-expert/form-cadastro-expert';

// 2. Componente Standalone
@Component({
  selector: 'app-expert-dashboard',
  imports: [CommonModule, FormCadastroExpert],
  standalone: true,
  templateUrl: './expert-dashboard.html',
  styleUrl: './expert-dashboard.css',
})
export class ExpertDashboard implements OnInit {
  experts = signal<ExpertFull[]>([]);
  isLoading = signal(true);

  modalAberto: boolean = false;

  constructor(private router: Router, private expertService: expertService) {
    effect(() => {
      console.log(`Lista de Funcionários atualizada. Total: ${this.experts().length}`);
    });
  }

  ngOnInit(): void {
    this.fetchExperts();
  }

  fetchExperts(): void {
    this.isLoading.set(true);

    this.expertService.getExperts().subscribe({
      next: (expertsData) => {
        this.experts.set(expertsData);
        this.experts.set(expertsData as ExpertFull[]);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar experts:', err);
        this.isLoading.set(false);
      },
    });
  }

  abrirCadastroExpert(): void {
    this.modalAberto = true;
  }

  lidarComFechamento(resultado: any): void {
    this.modalAberto = false;

    if (resultado) {
      this.fetchExperts();
    } else {
      console.log('Cadastro cancelado ou modal fechado sem salvar.');
    }
  }

  viewQueue(expertId: number): void {
    console.log(`Navegar para a fila do Funcionário ID: ${expertId}`);
    this.router.navigate(['/dashboard/expert/queue', expertId]);
  }

  updateExpert(expertId: number): void {
    console.log(`Abrir modal/página para atualizar Funcionário ID: ${expertId}`);
    alert(`Ação: Atualizar Funcionário ID ${expertId}`);
  }

  removeExpert(expertId: number): void {
    if (confirm(`Tem certeza que deseja remover o funcionário ID ${expertId}?`)) {
      console.log(`Chamando API para remover Funcionário ID: ${expertId}`); // **AQUI VOCÊ CHAMARIA O MÉTODO DO SERVICE PARA REMOVER** // Após a remoção bem-sucedida, chame this.fetchExperts();
      alert(`Ação: Remover Funcionário ID ${expertId}`);
    }
  }
}
