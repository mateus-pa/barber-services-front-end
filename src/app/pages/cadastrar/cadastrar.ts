import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { FormCadastro } from '../../components/form-cadastro/form-cadastro';

@Component({
  selector: 'app-cadastrar',
  imports: [Header, Footer, FormCadastro],
  templateUrl: './cadastrar.html',
  styleUrl: './cadastrar.css',
})
export class Cadastrar {}
