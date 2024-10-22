import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  icono = 'oscuro';

  usuarios = [
    { usuario: 'juan@juan.cl', clave: 'juan123123' },
    { usuario: 'dav.walker@duocuc.cl', clave: '123123123' },
    { usuario: 'hu.romerog@duocuc.cl', clave: '123123123' },
  ];
  usuario = '';
  clave = '';

  sw: boolean = false;
  cargando = false;
  constructor(
    private http: HttpClient,
    private alert: AlertController,
    private router: Router,
    private anim: AnimationController,
    private loadingController: LoadingController
  ) {}
  resetPass() {
    for (let u of this.usuarios) {
      if (u.usuario == this.usuario) {
        let nueva = Math.random().toString(36).slice(-6);
        u.clave = nueva;
        let body = {
          usuario: u.usuario,
          app: 'registrAPP',
          clave: nueva,
          email: u.usuario,
        };
        this.http
          .post('https://myths.cl/api/reset_password.php', body)
          .subscribe((data) => {
            console.log(data);
            this.showSuccessAlert();
          });
        return;
      }
    }
    // Si no se encuentra el usuario, puedes agregar un mensaje de error o animación
    this.alerta('El usuario no fue encontrado.', () => {});
  }
  async showSuccessAlert() {
    const alert = await this.alert.create({
      header: 'Éxito',
      message:
        'La contraseña ha sido cambiada con éxito. Porfavor ingresa a tu correo',
      buttons: ['OK'],
    });

    await alert.present();
  }

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
        {
          offset: 0.5,
          transform: 'translateX(0px)',
          border: '1px transparent solid',
        },
        {
          offset: 0.75,
          transform: 'translateX(5px)',
          border: '1px red solid',
        },
        {
          offset: 1,
          transform: 'translateX(0px)',
          border: '1px transparent solid',
        },
      ])
      .play();
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
  async login() {
    let usuarioValido = false; // Variable para verificar si el usuario es válido
    for (let u of this.usuarios) {
      if (u.usuario === this.usuario && u.clave === this.clave) {
        console.log(`Has ingresado con ${u.usuario}`);
        // Redirigir a la página de asistencia
        this.router.navigate(['asistencia']);
        usuarioValido = true; // Marcamos que el usuario es válido
        return;
      }
    }

    // Si las credenciales son incorrectas, ejecutamos la animación de error
    console.log('Datos incorrectos!');
    this.animarError(0); // Animar el campo del usuario
    this.animarError(1); // Animar el campo de la clave
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
  ionViewWillEnter() {
    this.icono = localStorage.getItem('tema')! == 'oscuro' ? 'claro' : 'oscuro';
    this.cambiarTema();
  }
  // Función para cambiar el tema
  cambiarTema() {
    document.documentElement.style.setProperty(
      '--textos',
      this.icono == 'oscuro' ? 'white' : 'black'
    );
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
      '--fondo-borde',
      this.icono == 'oscuro' ? '#1f1f1f' : '#cfcfcf'
    );
    document.documentElement.style.setProperty(
      '--ion-color-success',
      this.icono == 'oscuro' ? 'white' : 'black'
    );
    this.icono = this.icono == 'oscuro' ? 'claro' : 'oscuro';
    localStorage.setItem('tema', this.icono);
  }

  ngOnInit() {
    this.animarLogo();
  }
}
