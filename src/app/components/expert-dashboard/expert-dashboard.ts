import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
// 1. Importar o ExpertService
import { ExpertFull } from '../../models/expert.model';
import { ExpertService } from '../../services/expert';
import { FormAtualizarExpert } from '../form-atualizar-expert/form-atualizar-expert';
import { FormCadastroExpert } from '../form-cadastro-expert/form-cadastro-expert';

// 2. Componente Standalone
@Component({
  selector: 'app-expert-dashboard',
  imports: [CommonModule, FormCadastroExpert, FormAtualizarExpert],
  standalone: true,
  templateUrl: './expert-dashboard.html',
  styleUrl: './expert-dashboard.css',
})
export class ExpertDashboard implements OnInit {
  experts = signal<ExpertFull[]>([]);
  isLoading = signal(true);

  modalAberto: boolean = false;

  constructor(private router: Router, private expertService: ExpertService) {
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

  modalCadastroAberto = signal(false);

  modalAtualizarAberto = signal(false);

  expertParaAtualizar = signal<ExpertFull | null>(null);

  updateExpert(expertId: string): void {
    const expert = this.experts().find((e) => e.id === expertId);

    if (expert) {
      this.expertParaAtualizar.set(expert);
      this.modalAtualizarAberto.set(true);
    } else {
      console.error(`Funcionário com ID ${expertId} não encontrado.`);
    }
  }

  lidarComFechamentoAtualizacao(updatedExpert: ExpertFull | null): void {
    this.modalAtualizarAberto.set(false);
    this.expertParaAtualizar.set(null);

    if (updatedExpert) {
      this.experts.update((experts) =>
        experts.map((e) => (e.id === updatedExpert.id ? updatedExpert : e))
      );
      alert(`Funcionário ${updatedExpert.name} atualizado com sucesso!`);
    }
  }

  viewQueue(expertId: string): void {
    console.log(`Navegar para a fila do Funcionário ID: ${expertId}`);
    this.router.navigate(['/dashboard/expert/queue', expertId]);
  }

  removeExpert(expertId: string): void {
    if (confirm(`Tem certeza que deseja remover o funcionário ID ${expertId}?`)) {
      console.log(`Chamando API para remover Funcionário ID: ${expertId}`);
      this.expertService.removeExpert(expertId.toString()).subscribe({
        next: () => {
          this.fetchExperts();
        },
        error: (err) => {
          console.error('Erro ao remover expert:', err);
        },
      });
    }
  }
}
