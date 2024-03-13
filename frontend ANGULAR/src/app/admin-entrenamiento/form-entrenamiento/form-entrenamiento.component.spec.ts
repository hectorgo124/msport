import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEntrenamientoComponent } from './form-entrenamiento.component';

describe('FormEntrenamientoComponent', () => {
  let component: FormEntrenamientoComponent;
  let fixture: ComponentFixture<FormEntrenamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEntrenamientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEntrenamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
