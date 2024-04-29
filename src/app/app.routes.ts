import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListaDeMoedasComponent } from './pages/lista-de-moedas/lista-de-moedas.component';
import { ConversorMonetarioComponent } from './pages/conversor-monetario/conversor-monetario.component';
import { ListaDeConversoesComponent } from './pages/lista-de-conversoes/lista-de-conversoes.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'lista-de-moedas', component: ListaDeMoedasComponent },
    { path: 'conversor-monetario', component: ConversorMonetarioComponent },
    { path: 'lista-de-conversoes', component: ListaDeConversoesComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
