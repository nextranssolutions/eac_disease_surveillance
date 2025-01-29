import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdministratorsComponent } from './system-administrators.component';

describe('SystemAdministratorsComponent', () => {
  let component: SystemAdministratorsComponent;
  let fixture: ComponentFixture<SystemAdministratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemAdministratorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemAdministratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
