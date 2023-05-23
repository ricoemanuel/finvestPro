import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { elements } from 'chart.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-empresas',
  templateUrl: './listado-empresas.component.html',
  styleUrls: ['./listado-empresas.component.css']
})
export class ListadoEmpresasComponent implements OnInit {
  empresas: any[] = [];
  currentPage: number = 1;
  @ViewChild('myButton') myButton!: ElementRef;
  selected: any[] = [];
  constructor(private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.empresas = await this.listarEmpresas()
  }
  async listarEmpresas(): Promise<any[]> {
    let ArrayEmpresas: any[] = []
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
  async VerEmpresa(index: number) {
    let symbol = this.empresas[index]
    let response = await fetch(`https://emanuelrico.pythonanywhere.com/statics/${symbol["symbol"]}/${symbol["ipoDate"]}`);
    let detalle: any = await response.text();
    detalle = JSON.parse(detalle)
    const objetoUnido = { ...symbol, ...detalle };
    if (detalle["accepted"]) {
      this.router.navigate(['/empresas/detalle', objetoUnido]);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Esta empresa no tiene historico de datos!',
      })
    }


  }
  seleccionar(index: number) {
    console.log(this.selected.indexOf(index))
    if (this.selected.indexOf(index) !== -1) {
      let indice=this.selected.indexOf(index)
      this.selected.splice(indice,1)
      
    } else {
      
      this.selected.push(index)
    }
    console.log(this.selected)


  }
  async decidir(){
    let symbols: any[]=[]
    let dates: any[]=[]
    this.selected.forEach(index=>{
      symbols.push(this.empresas[index]["symbol"])
      dates.push(this.empresas[index]["ipoDate"])
    })
    let empresas={
      "companies":symbols,
      "dates":dates
    }
    let url="https://emanuelrico.pythonanywhere.com//statics/analytics"
    let response=await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(empresas)
    })
    let decision=await response.text()
    decision=decision.replace(/'/g, '"');
    decision=decision.replace(/True/g, "true")
    console.log(JSON.parse(decision)["accepted"]["analytics"])
    let validacion=JSON.parse(decision)["accepted"]["analytics"]
    let pass=false
    validacion.forEach((element: any)=>{
      if(element["accepted"]){
        pass=true
      }
    })
    if(pass){
      this.router.navigate(['empresas/decision', {"datos":decision}]);
    }
    //this.router.navigate(['empresas/decision', {"datos":decision}]);
  }
}
