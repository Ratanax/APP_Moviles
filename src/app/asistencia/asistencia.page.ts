import { Component, NgZone, OnInit } from '@angular/core';

import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { ToastController } from '@ionic/angular';
import { AlertController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  icono = 'oscuro';
  items: string[] = ['Base de datos', 'Programación web', 'Inglés', 'Ética'];
  showInfo: boolean[] = [];
  asistencias: any[] = [];
  conteoAsistencias: { [key: string]: number } = {};
  NombreUsuario: string = '';



  constructor(
    private anim: AnimationController,
    private toast: ToastController,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.cargarAsistencias(); 
    this.showInfo = new Array(this.items.length).fill(false);
    this.animarPag();
    this.animarLogo();
    this.NombreUsuario = localStorage.getItem('Usuario') || 'Invitado';

  }
  
  animarLogo() {
    this.anim
      .create()
      .addElement(document.querySelector('#logo')!)
      .duration(500)
      .iterations(Infinity)
      .direction('alternate')
      .easing('ease-in-out')
      .keyframes([
        { offset: 0, transform: 'scale(1) rotate(8deg) translateX(10px)' },
        { offset: 0.5, transform: 'scale(1) rotate(0deg)' },
        { offset: 1, transform: 'scale(1) rotate(-8deg) translateX(-10px) ' },
      ])
      .play();
  }
  cargarAsistencias() {
    this.asistencias = JSON.parse(localStorage.getItem('asistencias') || '[]');
    this.contarAsistencias();
  }

  contarAsistencias() {
    this.conteoAsistencias = {};

    // Contar asistencias por ramo
    this.asistencias.forEach(asistencia => {
      const ramo = asistencia.ramo;
      if (this.conteoAsistencias[ramo]) {
        this.conteoAsistencias[ramo]++;
      } else {
        this.conteoAsistencias[ramo] = 1;
      }
    });
  }

  async scan() {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL,
    });

    if (result && result.ScanResult) {
      const qr = result.ScanResult.split("/");
      
      // Crear el objeto de asistencia
      const asistencia = {
        ramo: qr[0],
        docente: qr[1],
        hora: new Date(),
        'hora inicio': qr[2],
        'Asistencia': qr[3],
      };

   
      let asistencias = JSON.parse(localStorage.getItem('asistencias') || '[]');


      asistencias.push(asistencia);

      localStorage.setItem('asistencias', JSON.stringify(asistencias));

    
      this.contarAsistencias();


      this.showToast(`Asistencia registrada: ${asistencia.ramo}, Profesor: ${asistencia.docente}`);
      //location.reload();
    } else {
      this.showToast('No se pudo escanear el código');
    }
  }

  async showToast(texto: string) {
    const toast = await this.toast.create({
      message: texto,
      duration: 5000,
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
        { offset: 0, transform: 'scale(1)', opacity: '0' },
        {
          offset: 0.5,
          transform: 'scale(1)',
          opacity: '0.1',
        },
        { offset: 1, transform: 'scale(1)', opacity: '1' },
      ])
      .play();
  }
  toggleInfo(index: number) {
    this.showInfo[index] = !this.showInfo[index];
  }

  recargar(){
    location.reload();
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
      '--asignaturas',
      this.icono == 'oscuro' ? '#1f1f1f' : 'white'
    );
    document.documentElement.style.setProperty(
      '--color-list',
      this.icono == 'oscuro' ? '#1f1f1f' : '#cfcfcf'
    );
    document.documentElement.style.setProperty(
      '--item-bg',
      this.icono == 'oscuro' ? '#ffc409' : 'ffc409'
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
