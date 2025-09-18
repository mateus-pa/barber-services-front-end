import { Component } from '@angular/core';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { FormLogin } from '../../components/form-login/form-login';

@Component({
  selector: 'app-login',
  imports: [Header, Footer, FormLogin],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
