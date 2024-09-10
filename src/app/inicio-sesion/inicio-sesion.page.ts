import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController  } from '@ionic/angular';
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
  cargando = false; 
  constructor(
    private alert: AlertController,
    private router: Router,
    private anim: AnimationController,
    private loadingController: LoadingController,
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

  // Función de inicio de sesión
  async login() {
    // Validar el campo de usuario
    if (this.usuario.trim() === '' || !this.usuario.includes('@')) {
      this.animarError(0);
      this.alerta('Por favor, ingresa un correo válido y completa todos los campos', () => {
        console.log('Error en la validación');
      });
    } else if (this.clave.trim() === '') {
      // Validar el campo de contraseña
      this.animarError(1);
      this.alerta('Por favor, ingresa una contraseña', () => {
        console.log('Error en la validación');
      });
    } else if (this.clave.length < 8) {
      // Validar la longitud de la contraseña
      this.animarError(1);
      this.alerta('La contraseña debe tener mínimo 8 caracteres', () => {
        console.log('Error en la validación');
      });
    } else {
      // Mostrar la animación de carga
      const loading = await this.loadingController.create({
        message: 'Iniciando sesión...',
        spinner: 'circles',
        duration: 2000, // La duración del spinner en ms
      });
  
      await loading.present(); // Mostrar el loading
  
      // Simular proceso de autenticación
      setTimeout(() => {
        // Cerrar el loading cuando termine la carga
        loading.dismiss();
  
        // Redirigir a la página de asistencia
        this.router.navigate(['asistencia']);
      }, 2000); // El tiempo debe coincidir con el del ion-loading
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

  ngOnInit() {}
}
