import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tabla-decision-empresa',
  templateUrl: './tabla-decision-empresa.component.html',
  styleUrls: ['./tabla-decision-empresa.component.css']
})
export class TablaDecisionEmpresaComponent implements OnInit {
  detalle:any
  empresas:any[]=[]
  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.detalle = this.route.snapshot.params;
    this.detalle=JSON.parse(this.detalle["datos"])
    this.empresas=this.detalle["accepted"]["analytics"]
    console.log(this.detalle)
  }

}
