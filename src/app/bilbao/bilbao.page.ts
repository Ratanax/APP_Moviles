import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
@Component({
  selector: 'app-bilbao',
  templateUrl: './bilbao.page.html',
  styleUrls: ['./bilbao.page.scss'],
})
export class BILBAOPage implements OnInit {
  icono = 'oscuro';
  constructor(private anim: AnimationController) {}
  ngOnInit() {
    this.animarLogo();
  }
  animarError(index: number) {
   
    this.anim.create()
      .addElement(document.querySelectorAll('input')[index])
      .duration(200)
      .direction('alternate')
      .iterations(3)
      .keyframes([
        {
          offset: 0,
          transform: 'translateX(0px)',
          border: '1px transpararent  solid',
        },
        {
          offset: 0.25,
          transform: 'translateX(-5px)',
          border: '1px red solid',
        },
        { offset: 0.66, transform: 'translateX(5px)', border: '1px red solid' },
        {
          offset: 0.75,
          transform: 'translateX(0px)',
          border: '1px  transpararent  solid',
        },
        { offset: 1, transform: 'translateX(0px)', border: '1px red solid' },
      ]).play()
  }
  animarLogo() {
    this.anim
      .create()
      .addElement(document.querySelector('#logo')!)
      .duration(200)
      .iterations(Infinity)
      .fromTo('color', 'purple', 'blue')
      .fromTo('transform', 'scale(0.7)', 'scale(1)')
      .direction('alternate')
      .play();
  }
  cambiarTema() {
    if (this.icono == 'oscuro') {
      document.documentElement.style.setProperty('--fondo', '##222222');
      document.documentElement.style.setProperty(' --fondo-input', '#6962ca');
      this.icono = 'claro';
    } else {
      document.documentElement.style.setProperty('--fondo', '#d7d7d7');
      document.documentElement.style.setProperty(' --fondo-input', '#d7d7d7');
      this.icono = 'oscuro';
    }
  }
}
