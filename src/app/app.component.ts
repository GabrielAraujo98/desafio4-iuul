import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component'
import { HomeComponent } from "./pages/home/home.component";
import { ListaDeMoedasComponent } from "./pages/lista-de-moedas/lista-de-moedas.component";
import { ConversorMonetarioComponent } from "./pages/conversor-monetario/conversor-monetario.component";
import { ListaDeConversoesComponent } from "./pages/lista-de-conversoes/lista-de-conversoes.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent, ListaDeConversoesComponent, ListaDeMoedasComponent, ConversorMonetarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
