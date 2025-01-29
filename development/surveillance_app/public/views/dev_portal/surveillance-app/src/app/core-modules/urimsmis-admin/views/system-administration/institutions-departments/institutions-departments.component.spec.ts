import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsDepartmentsComponent } from './institutions-departments.component';

describe('InstitutionsDepartmentsComponent', () => {
  let component: InstitutionsDepartmentsComponent;
  let fixture: ComponentFixture<InstitutionsDepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutionsDepartmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstitutionsDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
