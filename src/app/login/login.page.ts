import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = '';
  clave: string = '';
  sw: boolean = false;
  constructor(private alert: AlertController, private router: Router) {}
  login() {
    console.log(this.usuario + '  -  ' + this.clave);
  }

  alerta(texto: string, accion: () => void) {
    const nose = this.alert.create({
      header: 'Informacion',
      message: texto,
      buttons: [
        {
          text: 'Aceptar',
          handler: accion,
        },
      ],
    });
  }

  ngOnInit() {}
}
