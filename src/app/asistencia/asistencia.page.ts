import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

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
}

