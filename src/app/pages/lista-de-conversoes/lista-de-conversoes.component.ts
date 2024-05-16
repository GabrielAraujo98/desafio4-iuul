import { DialogComponent } from './../../components/dialog/dialog.component';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, EventEmitter, Output } from '@angular/core';
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
import { MatInputModule } from '@angular/material/input';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-lista-de-conversoes',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, ScrollingModule, MatBadgeModule, MatDialogModule, MatTableModule, MatPaginator, MatPaginatorModule, MatIconModule, CommonModule, DialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  templateUrl: './lista-de-conversoes.component.html',
  styleUrl: './lista-de-conversoes.component.css'
})
export class ListaDeConversoesComponent {
  
  private _conversao: HistoricoConversao[] = this.storage.get('Conversoes');

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

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(id: number) {
    var dialog = this.dialog.open(DialogComponent);
    dialog.componentInstance.yesClicked.subscribe(() => this.removerConversao(id));
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

  abrirDialogLimparTudo(){
    var dialog = this.dialog.open(DialogComponent);
    dialog.componentInstance.yesClicked.subscribe(() => this.limparHistorico());
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