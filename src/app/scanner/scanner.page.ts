import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  contenido = ""
  constructor(private toast: ToastController) { }

  ngOnInit() {
  }
  async scan(){
    CapacitorBarcodeScanner.scanBarcode(
      {hint: CapacitorBarcodeScannerTypeHint.ALL}
    ).then((data)=>{
      this.showToast(data.ScanResult)
    })
  }


  async showToast(texto: string) {
    const toast = await this.toast.create({
      message: texto,
      duration: 3000,
      positionAnchor: 'footer2',
      cssClass:'rounded-toast'
    });
    await toast.present();
  }



}
