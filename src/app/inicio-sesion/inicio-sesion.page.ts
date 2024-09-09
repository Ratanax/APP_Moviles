import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  icono = 'oscuro';
  usuario: string = '';
  clave: string = '';
  sw: boolean = false;

  constructor(
    private alert: AlertController,
    private router: Router,
    private anim: AnimationController
  ) {}

  // Función para animar los errores
  animarError(index: number) {
    const inputElement = document.querySelectorAll('ion-input')[index];

    this.anim
      .create()
      .addElement(inputElement)
      .duration(300)
      .direction('alternate')
      .iterations(5)
      .keyframes([
        {
          offset: 0,
          transform: 'translateX(0px)',
          border: '1px transparent solid',
        },
        {
          offset: 0.25,
          transform: 'translateX(-5px)',
          border: '1px red solid',
        },
        { offset: 0.5, transform: 'translateX(0px)', border: '1px transparent solid' },
        {
          offset: 0.75,
          transform: 'translateX(5px)',
          border: '1px red solid',
        },
        { offset: 1, transform: 'translateX(0px)', border: '1px transparent solid' },
      ]) 
      .play() 
  }

  // Función de inicio de sesión
  login() {
    if (this.usuario.trim() === '' || !this.usuario.includes('@')) {
      // Animar el campo de usuario si está vacío o el correo no es válido
      this.animarError(0);
      this.alerta(
        'Por favor, ingresa un correo válido y completa todos los campos',
        () => {
          console.log('Error en la validación');
        }
      );
    } else if (this.clave.trim() === '') {
      // Animar el campo de clave si está vacío
      this.animarError(1);
      this.alerta('Por favor, ingresa una contraseña', () => {
        console.log('Error en la validación');
      });
    } else if (this.clave.length < 8) {
      // Animar el campo de clave si es menor a 8 caracteres
      this.animarError(1);
      this.alerta('La contraseña debe tener mínimo 8 caracteres', () => {
        console.log('Error en la validación');
      });
    } else {
      // Si pasa todas las validaciones, redirigir a la página de inicio
      this.router.navigate(['home']);
    }
  }

  // Función que muestra una alerta
  alerta(texto: string, accion: () => void) {
    this.alert
      .create({
        header: 'Error',
        message: texto,
        buttons: [
          {
            text: 'Aceptar',
            handler: accion,
          },
        ],
      })
      .then((alert) => alert.present());
  }

  // Función para cambiar el tema
  cambiarTema() {
    if (this.icono == 'oscuro') {
      document.documentElement.style.setProperty('--fondo', '#fff1122');
      document.documentElement.style.setProperty('--fondo-input', '#1f3d59');
      this.icono = 'claro';
    } else {
      document.documentElement.style.setProperty('--fondo', '#d7d7d7');
      document.documentElement.style.setProperty('--fondo-input', '#1f3d59');
      this.icono = 'oscuro';
    }
  }

  ngOnInit() {}
}
