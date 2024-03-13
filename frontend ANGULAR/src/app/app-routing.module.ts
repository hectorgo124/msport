import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministradorComponent } from './administrador/administrador.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { AdminEntrenamientoComponent } from './admin-entrenamiento/admin-entrenamiento.component';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [LoggedGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'administrador', component: AdministradorComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [LoggedGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'entrenamiento', component: EntrenamientoComponent, canActivate: [LoggedGuard] },
  { path: 'galeria', component: GaleriaComponent, canActivate: [LoggedGuard] },
  { path: 'entrenador', component: AdminEntrenamientoComponent },


  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
