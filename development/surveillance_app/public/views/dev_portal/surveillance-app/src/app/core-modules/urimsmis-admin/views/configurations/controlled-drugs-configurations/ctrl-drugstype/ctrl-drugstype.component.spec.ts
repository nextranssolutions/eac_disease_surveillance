import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrlDrugstypeComponent } from './ctrl-drugstype.component';

describe('CtrlDrugstypeComponent', () => {
  let component: CtrlDrugstypeComponent;
  let fixture: ComponentFixture<CtrlDrugstypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtrlDrugstypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CtrlDrugstypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
