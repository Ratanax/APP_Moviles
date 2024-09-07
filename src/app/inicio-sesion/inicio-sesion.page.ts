import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
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

  constructor(private alert: AlertController, private router: Router) {}

  // Función que se ejecuta al presionar el botón "Iniciar sesión"
  login() {
    // Validar si el campo de usuario tiene una "@" y ambos campos están llenos
    if (
      this.usuario.includes('@') &&
      this.usuario.trim() !== '' &&
      this.clave.trim() !== ''
    ) {
      if (this.clave.length !== 8) {
        this.alerta('La contraseña debe tener minimo 8 caracteres', () => {
          console.log('Error en la validación');
        });
      } else {
        this.router.navigate(['bilbao']); // Cambia '/pagina-destino' por la ruta de destino
      }
    } else {
      // Mostrar alerta si no se cumplen las condiciones
      this.alerta(
        'Por favor, ingresa un correo válido y completa todos los campos',
        () => {
          console.log('Error en la validación');
        }
      );
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
      .then((alert) => alert.present()); // Mostrar la alerta
  }
  cambiarTema() {
    if (this.icono == 'oscuro') {
      document.documentElement.style.setProperty('--fondo', '#fff1122');
      document.documentElement.style.setProperty(' --fondo-input', '#1f3d59');
      this.icono = 'claro';
    } else {
      document.documentElement.style.setProperty('--fondo', '#d7d7d7');
      document.documentElement.style.setProperty(' --fondo-input', '#1f3d59');
      this.icono = 'oscuro';
    }
  }
  ngOnInit() {}
}
