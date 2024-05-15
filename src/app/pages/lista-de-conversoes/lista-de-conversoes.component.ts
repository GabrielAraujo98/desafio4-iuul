import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MediaMatcher } from '@angular/cdk/layout';
import { HistoricoConversao } from '../../interface/historico-conversao/historico-conversao';
import { StorageService } from '../../services/storage/storage.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from "../../components/dialog/dialog.component";



@Component({
  selector: 'app-lista-de-conversoes',
  standalone: true,
  imports: [MatButtonModule, MatBadgeModule, MatDialogModule, MatTableModule, MatPaginator, MatPaginatorModule, MatIconModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  templateUrl: './lista-de-conversoes.component.html',
  styleUrl: './lista-de-conversoes.component.css'
})
export class ListaDeConversoesComponent {
  private _conversao: HistoricoConversao[] = this.storage.get('Conversoes');
  //numero: number = 23;

  ngOnInit(){
    this.dataSource = new MatTableDataSource<HistoricoConversao>(this._conversao);
  }

  constructor(public storage: StorageService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  displayedColumns: string[] = ["data", "hora", "valor_informado", "base", "alvo", "resultado", "taxa", "acoes"];
  dataSource: MatTableDataSource<HistoricoConversao>;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  get conversao(){
    return this._conversao
  }

  openDialog(id: number) {
    this.dialog.open(DialogComponent);
    console.log(this.conversao[id].id);
    //console.log(this.numero)
    // this.numero = id
    // console.log(this.numero)
  }

  removerConversao(idAlvo: number){
    
    if(this.conversao.length == 1){
      this.storage.clear()
      this.dataSource = new MatTableDataSource<HistoricoConversao>(undefined);
      var botaoAbilitado = document.getElementById('enabled');
      botaoAbilitado?.setAttribute("disabled", "true");
    }else{
      this.conversao.splice(idAlvo, 1)
      this.storage.set('Conversoes', this.conversao)
      this.dataSource = new MatTableDataSource<HistoricoConversao>(this._conversao);
    }
  }

  limparHistorico(){
    var botaoAbilitado = document.getElementById('enabled');
    this.storage.clear()
    this.dataSource = new MatTableDataSource<HistoricoConversao>(undefined);
    botaoAbilitado?.setAttribute("disabled", "true");
  }

  definirVisibilidadeDestaque(){
    var valorParaDestacar = document.querySelector(".resultado");
    valorParaDestacar?.setAttribute("mat-badge", "1");
  }
}