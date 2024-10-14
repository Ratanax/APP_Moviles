import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'material-angular',
    loadChildren: () => import('./material-angular/material-angular.module').then( m => m.MaterialAngularPageModule)
  },
  {
    path: 'bilbao',
    loadChildren: () => import('./bilbao/bilbao.module').then( m => m.BILBAOPageModule)
  },
  {
    path: 'foto',
    loadChildren: () => import('./foto/foto.module').then( m => m.FotoPageModule)
  },
 
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  { path: 'lista', loadChildren: () => import('./asistencia/asistencia.module').then(m => m.AsistenciaPageModule) },
  {
    path: 'fondo-qr',
    loadChildren: () => import('./fondo-qr/fondo-qr.module').then( m => m.FondoQRPageModule)
  }, 
  { path: 'lista', loadChildren: () => import('./asistencia/asistencia.module').then(m => m.AsistenciaPageModule) },
  {
    path: 'scanner',
    loadChildren: () => import('./scanner/scanner.module').then( m => m.ScannerPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
