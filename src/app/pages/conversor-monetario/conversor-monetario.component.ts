import { Component, OnInit } from '@angular/core';
import { ConversorMoedasService } from "../../services/conversor-moedas/conversor-moedas.service";
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-conversor-monetario',
  standalone: true,
  imports: [HttpClientModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './conversor-monetario.component.html',
  styleUrl: './conversor-monetario.component.css'
})
export class ConversorMonetarioComponent implements OnInit{
  
   ngOnInit() {
    this.conversorMoedasService.getConversaoMoedas("USD", "BRL", 20).subscribe(dados => console.log(dados))
   }

  constructor(private conversorMoedasService: ConversorMoedasService){}

}
