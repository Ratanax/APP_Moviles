import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerTypeHint,
} from '@capacitor/barcode-scanner';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  icono = 'oscuro';
  items: string[];
  showInfo: boolean[];
  contenido = '';
  constructor(
    private anim: AnimationController,
    private toast: ToastController
  ) {
    this.items = [];
    this.showInfo = [];
  }

  ngOnInit() {
    this.items = ['Base de datos', 'Programación web', 'Inglés', 'Ética'];

    this.showInfo = new Array(this.items.length).fill(false);
    this.animarPag();
  }
  async scan() {
    CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL,
    }).then((data) => {
      this.showToast(data.ScanResult);
    });
  }

  async showToast(texto: string) {
    const toast = await this.toast.create({
      message: texto,
      duration: 3000,
      positionAnchor: 'footer2',
      cssClass: 'rounded-toast',
    });
    await toast.present();
  }
  animarPag() {
    this.anim
      .create()
      .addElement(document.querySelector('#contenedor')!)
      .duration(2000)
      .iterations(1)

      .easing('ease-out')

      .keyframes([
        { offset: 0, transform: 'scale(1) translateY(300px)', opacity: '0' },
        {
          offset: 0.5,
          transform: 'scale(1) translateY(150px)',
          opacity: '0.1',
        },
        { offset: 1, transform: 'scale(1) translateY(0px)', opacity: '1' },
      ])
      .play();
  }
  toggleInfo(index: number) {
    this.showInfo[index] = !this.showInfo[index];
  }

  cambiarTema() {
    document.documentElement.style.setProperty(
      '--fondo',
      this.icono == 'oscuro' ? '#2e2d2d' : '#e8e6e6'
    );
    document.documentElement.style.setProperty(
      '--fondo-input',
      this.icono == 'oscuro' ? '#2e2d2d' : '#e8e6e6'
    );
    document.documentElement.style.setProperty(
      '--icono-tema',
      this.icono == 'oscuro' ? '#f0cc00' : '#8c8c8c'
    );
    document.documentElement.style.setProperty(
      '--seccion',
      this.icono == 'oscuro' ? '#1f1f1f' : '#cfcfcf'
    );
    document.documentElement.style.setProperty(
      '--texto-input',
      this.icono == 'oscuro' ? 'white' : 'black'
    );
    document.documentElement.style.setProperty(
      '--ion-color-success',
      this.icono == 'oscuro' ? 'white' : 'black'
    );
    document.documentElement.style.setProperty(
      '--fondo-borde',
      this.icono == 'oscuro' ? '#1f1f1f' : '#cfcfcf'
    );
    document.documentElement.style.setProperty(
      '--color-list',
      this.icono == 'oscuro' ? '#1f1f1f' : '#cfcfcf'
    );
    document.documentElement.style.setProperty(
      '--item-bg',
      this.icono == 'oscuro' ? '#1f1f1f' : 'white'
    );
    document.documentElement.style.setProperty(
      '--item-text-color',
      this.icono == 'oscuro' ? 'white' : 'black'
    ); // Color del texto en la lista

    this.icono = this.icono == 'oscuro' ? 'claro' : 'oscuro';
    localStorage.setItem('tema', this.icono);
    console.log(this.icono);
  }
}
