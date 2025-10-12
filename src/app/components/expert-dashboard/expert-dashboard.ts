import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ExpertFull } from '../../models/expert.model';
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

  // Variável de estado para controlar a visibilidade do modal
  modalAberto: boolean = false;

  // Exemplo de Injeção
  constructor(private router: Router) {
    effect(() => {
      console.log(`Lista de Funcionários atualizada. Total: ${this.experts().length}`);
    });
  }

  ngOnInit(): void {
    this.fetchExperts();
  }

  // Função que simula ou realiza a requisição à API para buscar a lista
  fetchExperts(): void {
    this.isLoading.set(true);
    // Exemplo simulado com setTimeout
    setTimeout(() => {
      const mockData: ExpertFull[] = [
        // Seus dados reais da API virão aqui
        // Exemplo: { id: 10, name: 'João Silva', email: 'joao@barber.com', phone: '11988887777', isActive: true }
      ];

      this.experts.set(mockData); // Defina com os dados da sua API real
      this.isLoading.set(false);
    }, 1000); // Simula o tempo de carregamento da API
  }

  // MÉTODO PARA ABRIR O MODAL (chamado pelo botão)
  abrirCadastroExpert(): void {
    this.modalAberto = true;
  }

  // MÉTODO PARA FECHAR E TRATAR O RESULTADO DO MODAL
  lidarComFechamento(resultado: any): void {
    this.modalAberto = false; // Fecha o modal (esconde o componente)

    if (resultado) {
      // Se 'resultado' não for nulo, significa que um Expert foi cadastrado com sucesso
      console.log('Cadastro realizado com sucesso, dados:', resultado);

      // Ação Crucial: Recarregar a lista para exibir o novo funcionário
      this.fetchExperts();
    } else {
      console.log('Cadastro cancelado ou modal fechado sem salvar.');
    }
  }

  // Métodos de Ação
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
      console.log(`Chamando API para remover Funcionário ID: ${expertId}`);
      // **AQUI VOCÊ CHAMARIA O MÉTODO DO SERVICE PARA REMOVER**
      // Após a remoção bem-sucedida, chame this.fetchExperts();
      alert(`Ação: Remover Funcionário ID ${expertId}`);
    }
  }
}
