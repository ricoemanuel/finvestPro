import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit{
  isMenuOpen: boolean | undefined;
  active=1
  constructor() { }

  ngOnInit() {
    if (window.innerWidth < 768) {  // Verifica si el ancho de la pantalla es menor a 768px (tamaño de un tablet)
      this.isMenuOpen = false;
    } else {
      this.isMenuOpen = true;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
