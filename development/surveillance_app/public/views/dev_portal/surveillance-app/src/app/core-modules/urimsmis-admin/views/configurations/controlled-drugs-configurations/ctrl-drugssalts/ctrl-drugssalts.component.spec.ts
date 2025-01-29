import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrlDrugssaltsComponent } from './ctrl-drugssalts.component';

describe('CtrlDrugssaltsComponent', () => {
  let component: CtrlDrugssaltsComponent;
  let fixture: ComponentFixture<CtrlDrugssaltsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtrlDrugssaltsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CtrlDrugssaltsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
