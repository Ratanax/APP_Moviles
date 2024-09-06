import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  usuario: string = '';
  clave: string = '';
  sw: boolean = false;

  constructor(private alert: AlertController, private router: Router) {}

  // Función que se ejecuta al presionar el botón "Iniciar sesión"
  login() {
    // Mostrar la alerta con un mensaje y una acción vacía
    this.alerta(`Usuario: ${this.usuario} - Contraseña: ${this.clave}`, () => {
      console.log('Alerta aceptada');
    });
  }

  // Función que muestra una alerta
  alerta(texto: string, accion: () => void) {
    this.alert.create({
      header: 'Información',
      message: texto,
      buttons: [
        {
          text: 'Aceptar',
          handler: accion,
        },
      ],
    }).then(alert => alert.present());  // Mostrar la alerta
  }

  ngOnInit() {}
}
