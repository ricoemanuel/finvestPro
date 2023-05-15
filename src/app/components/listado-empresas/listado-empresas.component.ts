import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-empresas',
  templateUrl: './listado-empresas.component.html',
  styleUrls: ['./listado-empresas.component.css']
})
export class ListadoEmpresasComponent implements OnInit {
  empresas: any[] =[];
  currentPage: number = 1;
  @ViewChild('myButton') myButton!: ElementRef;
  constructor(private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.empresas=await this.listarEmpresas()
  }
  async listarEmpresas():Promise<any[]>{
    let ArrayEmpresas: any[]=[]
    let response = await fetch('https://emanuelrico.pythonanywhere.com/companies');
    let empresas = await response.text();
    empresas = empresas.replace(/'/g, '"');
    let NewEmpresas = empresas.split("{");
    NewEmpresas.shift();
    NewEmpresas.pop();
    NewEmpresas.forEach((empresa) => {
      let aux = "{" + empresa;
      aux = aux.substring(0, aux.length - 2);
      try {
        ArrayEmpresas.push(JSON.parse(aux));
      } catch (error) {
      }
    });
    return ArrayEmpresas
  }
  async VerEmpresa(index: number){
    let symbol=this.empresas[index]
    this.router.navigate(['/empresas/detalle', symbol]);

  }
  
}
