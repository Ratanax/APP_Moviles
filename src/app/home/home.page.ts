import { Component } from '@angular/core';
import { AlertController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  icono = 'oscuro'

  constructor(
    private alert: AlertController,
    private anim: AnimationController
  ) {}
  ngOnInit() {
    this.animarLogo();
  }
  async presentAlert() {
    const alert = await this.alert.create({
      header: 'RegistrAPP',
      subHeader: '',
      message:
        'Esta app esta diseñada para simplificar el proceso de asistencia al ingresar a la sala de clases, tras ingresar con tu cuenta, solo escanea el QR de la clase y listo!. no mas perdida de tiempo al pasar la lista',
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
    
      document.documentElement.style.setProperty('--fondo',this.icono=="oscuro"? '#2e2d2d':  '#e8e6e6');
      document.documentElement.style.setProperty('--fondo-input',this.icono=="oscuro"? '#1f3d59' : '#1f3d59');
      document.documentElement.style.setProperty('--fondo-borde',this.icono=="oscuro"? '#1f1f1f' : '#cfcfcf');
      document.documentElement.style.setProperty('--textos',this.icono=="oscuro"? 'white' : 'black');
      document.documentElement.style.setProperty('--icono-tema',this.icono=="oscuro"? '#f0cc00' : '#8c8c8c');
      this.icono = this.icono == 'oscuro' ? 'claro' : 'oscuro';
      localStorage.setItem('tema', this.icono);
      console.log(this.icono)
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
