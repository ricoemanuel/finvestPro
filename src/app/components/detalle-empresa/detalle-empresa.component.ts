import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, ChartOptions, LinearScale, BarController, CategoryScale, BarElement, LineController, LineElement, PointElement } from 'chart.js';
@Component({
  selector: 'app-detalle-empresa',
  templateUrl: './detalle-empresa.component.html',
  styleUrls: ['./detalle-empresa.component.css']
})
export class DetalleEmpresaComponent implements OnInit {
  detalle: any
  min: number = 0
  max: number = 50
  nums: any[] = []
  datos: any[] = []
  chart: any;
  limite: boolean = false
  mostrar: number = 50
  pagina: number = 1
  dinero: number | undefined
  inversion: any;
  ganancia: number | undefined;
  constructor(private route: ActivatedRoute, private router: Router) { }
  async ngOnInit() {
    this.detalle = this.route.snapshot.params;
    let response = await fetch(`https://emanuelrico.pythonanywhere.com/company/${this.detalle["symbol"]}/${this.detalle["ipoDate"]}`)
    let historico: any = await response.text();
    historico = JSON.parse(historico)
    const fechaInicial = new Date(this.detalle["ipoDate"]);
    let fechas: any[] = this.obtenerFechas(fechaInicial, historico.length)



    let i = 0;
    historico.forEach((element: any) => {
      this.datos.push(element["Close"])
      this.nums.push(`${i + 1}`)
      i++
    });

    if (this.detalle["accepted"]) {
      this.graficar()

    } else {
      this.router.navigate(['/empresas']);
    }

  }
  obtenerFechas(desde: Date, numeroDias: number): any[] {
    const fechas: any[] = [];

    for (let i = 0; i < numeroDias; i++) {
      const fecha = new Date(desde.getTime() + (i * 24 * 60 * 60 * 1000));
      fechas.push(fecha.toString());
    }

    return fechas;
  }
  previous() {

    if (this.min > 0) {
      this.pagina -= 1
      if (this.limite) {
        this.max = this.min
        this.limite = false
      } else {
        this.max -= this.mostrar;
      }
      this.min -= this.mostrar;


      // Asegurarse de que el número mínimo sea 0
      if (this.min < 0) {
        this.min = 0;
      }

      // Asegurarse de que el número máximo sea el tamaño de this.nums
      if (this.max > this.nums.length) {
        this.max = this.nums.length;
      }
      if (this.chart) {

        this.chart.options = {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              display: true,
            },
            x: {
              display: true,
              min: this.min,  // Posición inicial
              max: this.max   // Posición final
            }
          }

        }
        this.chart.update()
      }
    }
  }
  next() {

    if (this.max < this.nums.length) {
      this.pagina += 1

      this.min += this.mostrar;
      this.max += this.mostrar;

      // Asegurarse de que el número mínimo sea 0
      if (this.min < 0) {
        this.min = 0;
      }

      // Asegurarse de que el número máximo sea el tamaño de this.nums
      if (this.max > this.nums.length) {
        this.limite = true
        this.max = this.nums.length;
      }
      if (this.chart) {
        this.chart.options = {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              display: true,
            },
            x: {
              display: true,
              min: this.min,  // Posición inicial
              max: this.max   // Posición final
            }
          }

        }
        this.chart.update()

      }
    }
  }
  graficar() {
    Chart.register(BarElement, LinearScale, CategoryScale, BarController, LineController, LineElement, PointElement);
    this.nums = this.nums.reverse();

    const data = {
      labels: this.nums,
      datasets: [
        {
          label: 'Valores estadísticos',
          data: this.datos,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };

    const options: ChartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          display: true,
        },
        x: {
          display: true,
          min: this.min,  // Posición inicial
          max: this.max   // Posición final
        }
      },
    };
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });
  }
  async invertir() {
    if (this.dinero != undefined) {
      let response = await fetch(`https://emanuelrico.pythonanywhere.com/investor/${this.detalle["symbol"]}/${this.detalle["ipoDate"]}/${this.dinero}`)
      this.inversion= await response.text();
      this.inversion = parseFloat(this.inversion)
      this.ganancia = this.inversion-this.dinero

    }

  }
}
