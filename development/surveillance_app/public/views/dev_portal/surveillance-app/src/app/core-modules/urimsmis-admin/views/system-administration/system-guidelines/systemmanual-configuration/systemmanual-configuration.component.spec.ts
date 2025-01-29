import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemmanualConfigurationComponent } from './systemmanual-configuration.component';

describe('SystemmanualConfigurationComponent', () => {
  let component: SystemmanualConfigurationComponent;
  let fixture: ComponentFixture<SystemmanualConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemmanualConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemmanualConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
