import { NativeDateAdapter } from '@angular/material/core';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  // CAMBIAR EL PRIMER DIA DE LA SEMANA PER QUE SIGA DILLUNS
  override getFirstDayOfWeek(): number {
    return 1;
  }
}
