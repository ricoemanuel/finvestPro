import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { ListadoEmpresasComponent } from './components/listado-empresas/listado-empresas.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { DetalleEmpresaComponent } from './components/detalle-empresa/detalle-empresa.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuLateralComponent,
    ListadoEmpresasComponent,
    DetalleEmpresaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
