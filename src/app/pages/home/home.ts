import { Component } from '@angular/core';
import { Acessar } from "../../components/acessar/acessar";
import { Banner } from "../../components/banner/banner";
import { Footer } from "../../components/footer/footer";
import { Funcoes } from "../../components/funcoes/funcoes";
import { Header } from "../../components/header/header";
import { Sobre } from "../../components/sobre/sobre";

@Component({
  selector: 'app-home',
  imports: [Footer, Acessar, Funcoes, Sobre, Banner, Header],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
