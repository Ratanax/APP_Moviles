import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private alert: AlertController) {}
  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Error Critical',
      subHeader: 'manco',
      message: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAH.',
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
}
