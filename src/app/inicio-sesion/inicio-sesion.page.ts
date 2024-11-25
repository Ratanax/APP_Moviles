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

  usuarioUser = '';
  correoUser = '';
  passwordUser = '';
  mensaje = '';

  sw: boolean = false;
  cargando = false;
  constructor(
    private http: HttpClient,
    private alert: AlertController,
    private router: Router,
    private anim: AnimationController,
    private loadingController: LoadingController
  ) {}

  verificarDatos() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioEncontrado = usuarios.find(
      (u: { correo: string; password: string }) =>
        u.correo === this.correoUser && u.password === this.passwordUser
    );
  
    if (usuarioEncontrado) {
      // Guardar el nombre de usuario en LocalStorage
      localStorage.setItem('Usuario', usuarioEncontrado.Usuario); // Corregir la propiedad aquí
  
      console.log('Inicio de sesión exitoso');
      this.mensaje = 'Inicio de sesión exitoso';
      this.router.navigate(['asistencia']);
    } else {
      console.log('Correo o contraseña incorrectos');
      this.mensaje = 'Correo o contraseña incorrectos';
    }
  }
  resetPass() {
    // Recuperar usuarios almacenados en localStorage
    const usuariosGuardados = localStorage.getItem('usuarios'); // Supongamos que los usuarios están en una clave 'usuarios'

    // Verificar si hay datos en localStorage
    if (usuariosGuardados) {
      // Parsear los usuarios como un array de objetos
      const usuarios = JSON.parse(usuariosGuardados);

      // Buscar el usuario correspondiente
      for (let u of usuarios) {
        if (u.usuario === this.usuarioUser) {
          // Generar una nueva contraseña aleatoria
          let nueva = Math.random().toString(36).slice(-6);
          u.clave = nueva;

          // Actualizar el almacenamiento local con la nueva clave
          localStorage.setItem('usuarios', JSON.stringify(usuarios));

          // Crear el body del request para la API
          let body = {
            usuario: u.usuario,
            app: 'registrAPP',
            password: nueva,
            email: u.email, // Asegúrate de que el objeto usuario tenga un campo 'email'
          };

          // Enviar los datos a la API
          this.http
            .post('https://myths.cl/api/reset_password.php', body)
            .subscribe((data) => {
              console.log(data);
              this.showSuccessAlert();
            });
          return;
        }
      }

      // Si no se encuentra el usuario, mostrar animación de error o alerta
      this.animarError2(0); // Cambia el índice si necesitas otro input
      this.alerta('El usuario no fue encontrado.', () => {});
    } else {
      // Manejar el caso en que no hay usuarios almacenados
      this.alerta('No hay usuarios registrados.', () => {});
    }
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

  animarError2(index: number) {
    const inputElement = document.querySelectorAll('input')[index];

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
    document.documentElement.style.setProperty(
      '--recuperacion',
      this.icono == 'oscuro' ? 'black' : 'white'
    );
    this.icono = this.icono == 'oscuro' ? 'claro' : 'oscuro';
    localStorage.setItem('tema', this.icono);
  }

  ngOnInit() {
    this.animarLogo();
  }
}
