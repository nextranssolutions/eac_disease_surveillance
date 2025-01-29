import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCtrldrugsconfigurationComponent } from './shared-ctrldrugsconfiguration.component';

describe('SharedCtrldrugsconfigurationComponent', () => {
  let component: SharedCtrldrugsconfigurationComponent;
  let fixture: ComponentFixture<SharedCtrldrugsconfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedCtrldrugsconfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedCtrldrugsconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
