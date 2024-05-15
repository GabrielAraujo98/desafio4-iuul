import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @Output() removerConversao: EventEmitter<any> = new EventEmitter();
  @Input() idAlvo: number;

  ngOnInit(){
    console.log(this.idAlvo);
  }

  onChanges(){
    this.removerConversao.emit(this.idAlvo);
    console.log(this.idAlvo);
  }

  onClick(numero: number){
    this.idAlvo = numero;
    this.removerConversao.emit(this.idAlvo);
    console.log(this.idAlvo);
  }
}
