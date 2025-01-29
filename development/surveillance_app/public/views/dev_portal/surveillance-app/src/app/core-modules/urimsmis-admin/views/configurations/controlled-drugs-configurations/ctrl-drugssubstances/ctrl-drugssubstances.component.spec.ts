import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrlDrugssubstancesComponent } from './ctrl-drugssubstances.component';

describe('CtrlDrugssubstancesComponent', () => {
  let component: CtrlDrugssubstancesComponent;
  let fixture: ComponentFixture<CtrlDrugssubstancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtrlDrugssubstancesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CtrlDrugssubstancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
