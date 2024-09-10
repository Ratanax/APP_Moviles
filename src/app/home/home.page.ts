import { Component } from '@angular/core';
import { AlertController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  icono = 'oscuro';
  
  constructor(private alert: AlertController, private anim: AnimationController) {}
  ngOnInit() {
    this.animarLogo();
  }
  async presentAlert() {
    const alert = await this.alert.create({
      header: 'RegistrAPP',
      subHeader: '',
      message: 'Esta app esta diseñada para simplificar el proceso de asistencia al ingresar a la sala de clases, tras ingresar con tu cuenta, solo escanea el QR de la clase y listo!. no mas perdida de tiempo al pasar la lista',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Preciono aceptar');
          },
        },
      ],
    });

    await alert.present();
  }
  cambiarTema() {
    if (this.icono == 'oscuro') {
      document.documentElement.style.setProperty('--fondo', '#2e2d2d');
      document.documentElement.style.setProperty('--fondo-input', '#1f3d59');
      document.documentElement.style.setProperty('--fondo-borde', '#1f1f1f');
      document.documentElement.style.setProperty('--textos', 'white');
      document.documentElement.style.setProperty('--icono-tema', '#f0cc00');
      this.icono = 'claro';
    } else {
      document.documentElement.style.setProperty('--fondo', '#e8e6e6');
      document.documentElement.style.setProperty('--fondo-input', '#1f3d59');
      document.documentElement.style.setProperty('--fondo-borde', '#cfcfcf');
      document.documentElement.style.setProperty('--textos', 'black');
      document.documentElement.style.setProperty('--icono-tema', '#8c8c8c');
      this.icono = 'oscuro';
    }
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
  animarBoton(botones: number) {
    const inputElement = document.querySelectorAll('ion-button')[botones];
    this.anim
      .create()
      .addElement(inputElement)
      .duration(1000) // Duración del parpadeo en milisegundos
      .iterations(Infinity) // Repetir infinitamente
      .easing('linear') // Efecto de interpolación lineal
      .keyframes([
        { offset: 0, opacity: 1 }, // Totalmente visible
        { offset: 0.5, opacity: 0.8 }, // Totalmente invisible
        { offset: 0.5, opacity: 0.6 }, // Totalmente invisible
        { offset: 0.5, opacity: 0.8 }, // Totalmente invisible
        { offset: 1, opacity: 1 }, // Vuelve a ser visible
      ])
      .play();
  }
}