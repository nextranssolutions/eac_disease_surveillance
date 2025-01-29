import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSysAdministrationComponent } from './shared-sys-administration.component';

describe('SharedSysAdministrationComponent', () => {
  let component: SharedSysAdministrationComponent;
  let fixture: ComponentFixture<SharedSysAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedSysAdministrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedSysAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
