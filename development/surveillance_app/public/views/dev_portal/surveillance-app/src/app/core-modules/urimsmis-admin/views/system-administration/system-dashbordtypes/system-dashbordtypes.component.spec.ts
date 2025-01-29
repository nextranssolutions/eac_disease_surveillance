import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemDashbordtypesComponent } from './system-dashbordtypes.component';

describe('SystemDashbordtypesComponent', () => {
  let component: SystemDashbordtypesComponent;
  let fixture: ComponentFixture<SystemDashbordtypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemDashbordtypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemDashbordtypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
