import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrlDrugsconvfactComponent } from './ctrl-drugsconvfact.component';

describe('CtrlDrugsconvfactComponent', () => {
  let component: CtrlDrugsconvfactComponent;
  let fixture: ComponentFixture<CtrlDrugsconvfactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtrlDrugsconvfactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CtrlDrugsconvfactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
