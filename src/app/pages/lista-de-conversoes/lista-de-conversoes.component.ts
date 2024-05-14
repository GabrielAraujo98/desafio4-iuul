import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MediaMatcher } from '@angular/cdk/layout';
import { HistoricoConversao } from '../../interface/historico-conversao/historico-conversao';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-lista-de-conversoes',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatPaginator, MatPaginatorModule],
  templateUrl: './lista-de-conversoes.component.html',
  styleUrl: './lista-de-conversoes.component.css'
})
export class ListaDeConversoesComponent {
  private _conversao: HistoricoConversao[] = this.storage.get('Conversoes');

  ngOnInit(){
    this.pegarConversao()
  }

  constructor(public storage: StorageService){}

  get conversao(){
    return this._conversao
  }

  pegarConversao(){
    console.log(this.conversao)
  }
}
