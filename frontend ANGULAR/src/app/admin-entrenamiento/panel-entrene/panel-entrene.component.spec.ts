import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEntreneComponent } from './panel-entrene.component';

describe('PanelEntreneComponent', () => {
  let component: PanelEntreneComponent;
  let fixture: ComponentFixture<PanelEntreneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelEntreneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelEntreneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
