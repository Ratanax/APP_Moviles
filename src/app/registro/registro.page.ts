import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { Router } from '@angular/router';
import { AnimationController, IonCard } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  Usuario: string = '';
  correo: string = '';
  password: string = '';

  constructor(
    private storage: Storage,
    private router: Router,
    private anim: AnimationController,
    private loadingController: LoadingController
  ) {
    this.storage.create();
  }

  icono = 'oscuro';
  ngOnInit() {
    this.animarLogo();
  }

  async guardarDatos() {
    if (this.Usuario && this.correo && this.password) {
      // Leer los usuarios existentes en el LocalStorage
      const usuariosExistentes = JSON.parse(
        localStorage.getItem('usuarios') || '[]'
      );

      // Crear un nuevo objeto de usuario
      const nuevoUsuario = {
        Usuario: this.Usuario,
        correo: this.correo,
        password: this.password,
      };

      // Agregar el nuevo usuario al array
      usuariosExistentes.push(nuevoUsuario);
      // Dentro de guardarDatos() después de guardar el nuevo usuario
      console.log(
        'Usuarios guardados:',
        JSON.parse(localStorage.getItem('usuarios') || '[]')
      );

      // Guardar el array actualizado en el LocalStorage
      localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes));

      // Guardar el nombre del usuario en LocalStorage para usarlo en otras vistas
      localStorage.setItem('nombreUsuario', this.Usuario);

      console.log('Usuario guardado:', nuevoUsuario);
      console.log('Todos los usuarios:', usuariosExistentes);
      this.router.navigate(['inicio-sesion']);
    } else {
      console.log('Por favor completa todos los campos');
    }
  }

  ionViewWillEnter() {
    this.icono = localStorage.getItem('tema')! == 'oscuro' ? 'claro' : 'oscuro';
    this.cambiarTema();
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
    document.documentElement.style.setProperty(
      '--item-bg',
      this.icono == 'oscuro' ? 'white' : 'black'
    );
    this.icono = this.icono == 'oscuro' ? 'claro' : 'oscuro';
    localStorage.setItem('tema', this.icono);
  }
}
