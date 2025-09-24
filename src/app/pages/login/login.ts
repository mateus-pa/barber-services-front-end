import { Component } from '@angular/core';
import { Footer } from '../../components/footer/footer';
import { FormLogin } from '../../components/form-login/form-login';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-login',
  imports: [Header, Footer, FormLogin],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
