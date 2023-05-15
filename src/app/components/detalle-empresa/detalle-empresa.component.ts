import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, ChartOptions, LinearScale,BarController, CategoryScale, BarElement  } from 'chart.js';
@Component({
  selector: 'app-detalle-empresa',
  templateUrl: './detalle-empresa.component.html',
  styleUrls: ['./detalle-empresa.component.css']
})
export class DetalleEmpresaComponent implements OnInit {
  empresa: any
  constructor(private route: ActivatedRoute, private router: Router) { }
  async ngOnInit() {

    Chart.register(BarElement, LinearScale, CategoryScale,BarController);
    this.empresa = this.route.snapshot.params;
    let response = await fetch(`https://emanuelrico.pythonanywhere.com/statics/${this.empresa["symbol"]}/${this.empresa["ipoDate"]}`);
    let detalle: any = await response.text();
    detalle = JSON.parse(detalle)
    if(detalle["accepted"]){
      const data = {
        labels: ['Media', 'Mediana', 'Moda', 'Desviación estándar', 'Varianza'],
        datasets: [
          {
            label: 'Valores estadísticos',
            data: [detalle["media"], detalle["mediana"], detalle["moda"], detalle["desviacion"], detalle["varianza"]],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      };
  
      const options: ChartOptions = {
        responsive:true,
        scales: {
          y: {
            beginAtZero: true,
            display: true,
          },
          x: {
            
            display: true,
          }
        },
        
        
      };
      
  
      const chart = new Chart('myChart', {
        type: 'bar',
        data: data,
        options: options
      });
    }else{
      this.router.navigate(['/empresas']);
    }
    
  }
}
