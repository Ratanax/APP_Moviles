import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.page.html',
  styleUrls: ['./foto.page.scss'],
})
export class FotoPage implements OnInit {
ngOnInit() {
  }
  
  imagen:string = "https://assets.entrepreneur.com/content/3x2/2000/20150406145944-dos-donts-taking-perfect-linkedin-profile-picture-selfie-mobile-camera-2.jpeg"
  efecto:string = "none"
  minimo:number = 0
  maximo:number = 100
  valor:number = 0

  constructor() {}

  pinFormatter(value: number) {
    return `${value/100}`;
  }

  poneEfecto(efecto:string){
    this.efecto = efecto
    switch(efecto){
      case "blur":
        this.minimo = 0
        this.maximo = 2000
        break
      default:
        this.minimo = 0
        this.maximo = 100
    }
    this.aplica()
  }

  aplica(){
    //grayscale(0.5)
    document.querySelector("img")!.style.filter = `${this.efecto}(${this.valor})`
  }

  onSlide(event:any){
    this.valor = event.detail.value / 100
    this.aplica()
  }

}
