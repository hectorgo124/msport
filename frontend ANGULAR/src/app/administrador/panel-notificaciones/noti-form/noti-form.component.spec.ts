import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotiFormComponent } from './noti-form.component';

describe('NotiFormComponent', () => {
  let component: NotiFormComponent;
  let fixture: ComponentFixture<NotiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotiFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
