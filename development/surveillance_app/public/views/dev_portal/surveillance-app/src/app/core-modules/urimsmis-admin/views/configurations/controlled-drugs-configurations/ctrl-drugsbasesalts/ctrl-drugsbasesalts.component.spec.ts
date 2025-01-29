import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrlDrugsbasesaltsComponent } from './ctrl-drugsbasesalts.component';

describe('CtrlDrugsbasesaltsComponent', () => {
  let component: CtrlDrugsbasesaltsComponent;
  let fixture: ComponentFixture<CtrlDrugsbasesaltsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtrlDrugsbasesaltsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CtrlDrugsbasesaltsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
