import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsFunctionalitiesComponent } from './systems-functionalities.component';

describe('SystemsFunctionalitiesComponent', () => {
  let component: SystemsFunctionalitiesComponent;
  let fixture: ComponentFixture<SystemsFunctionalitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemsFunctionalitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemsFunctionalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
