import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoEmpresasComponent } from './components/listado-empresas/listado-empresas.component';
import { DetalleEmpresaComponent } from './components/detalle-empresa/detalle-empresa.component';
import { TablaDecisionEmpresaComponent } from './components/tabla-decision-empresa/tabla-decision-empresa.component';
const routes: Routes = [
  { path: 'empresas', component: ListadoEmpresasComponent},
  { path: 'empresas/detalle', component: DetalleEmpresaComponent},
  { path: 'empresas/decision', component: TablaDecisionEmpresaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
