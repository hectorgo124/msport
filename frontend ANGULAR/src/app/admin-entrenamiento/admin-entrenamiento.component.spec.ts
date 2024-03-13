import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEntrenamientoComponent } from './admin-entrenamiento.component';

describe('AdminEntrenamientoComponent', () => {
  let component: AdminEntrenamientoComponent;
  let fixture: ComponentFixture<AdminEntrenamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEntrenamientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEntrenamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
