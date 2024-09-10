import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  icono = 'oscuro';
  items: string[];
  showInfo: boolean[];

  constructor() { 
    this.items = [];
    this.showInfo = [];
  }

  ngOnInit() {
    
    this.items = ['Base de datos', 'Programación web', 'Inglés', 'Ética'];

    
    this.showInfo = new Array(this.items.length).fill(false);
  }

  toggleInfo(index: number) {
    
    this.showInfo[index] = !this.showInfo[index];
  }

  cambiarTema() {
    if (this.icono == 'oscuro') {
      document.documentElement.style.setProperty('--fondo', '#2e2d2d');
      document.documentElement.style.setProperty('--fondo-input', '#2e2d2d');
      document.documentElement.style.setProperty('--icono-tema', '#f0cc00');
      document.documentElement.style.setProperty('--seccion', '#1f1f1f');
      document.documentElement.style.setProperty('--texto-input', 'white');
      document.documentElement.style.setProperty('--ion-color-success', 'white');

      this.icono = 'claro';
    } else {
      document.documentElement.style.setProperty('--fondo', '#e8e6e6');
      document.documentElement.style.setProperty('--fondo-input', '#e8e6e6');
      document.documentElement.style.setProperty('--icono-tema', '#8c8c8c');
      document.documentElement.style.setProperty('--seccion', '#cfcfcf');
      document.documentElement.style.setProperty('--texto-input', 'black');
      document.documentElement.style.setProperty('--ion-color-success', 'black');
      this.icono = 'oscuro';
    }
  }

}

