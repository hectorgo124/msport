import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './about/about.component';
import { FormComponent } from './administrador/form/form.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';
import { AdminEntrenamientoComponent } from './admin-entrenamiento/admin-entrenamiento.component';
import { FormAlbumComponent } from './galeria/form-album/form-album.component';
import { FormEntrenamientoComponent } from './admin-entrenamiento/form-entrenamiento/form-entrenamiento.component';
import { PanelEntreneComponent } from './admin-entrenamiento/panel-entrene/panel-entrene.component';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { CustomDateAdapter } from './custom-date-adapter';
import { ParticipantesComponent } from './admin-entrenamiento/participantes/participantes.component';
import { PanelNotificacionesComponent } from './administrador/panel-notificaciones/panel-notificaciones.component';
import { NotiFormComponent } from './administrador/panel-notificaciones/noti-form/noti-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdministradorComponent,
    HomeComponent,
    ProfileComponent,
    NavBarComponent,
    AboutComponent,
    FormComponent,
    GaleriaComponent,
    EntrenamientoComponent,
    AdminEntrenamientoComponent,
    FormAlbumComponent,
    FormEntrenamientoComponent,
    PanelEntreneComponent,
    ParticipantesComponent,
    PanelNotificacionesComponent,
    NotiFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatTooltipModule
  ],
  providers: [
    authInterceptorProviders,
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
