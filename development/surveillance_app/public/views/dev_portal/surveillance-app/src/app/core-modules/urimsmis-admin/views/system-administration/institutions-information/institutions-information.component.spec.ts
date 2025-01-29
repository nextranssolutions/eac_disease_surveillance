import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsInformationComponent } from './institutions-information.component';

describe('InstitutionsInformationComponent', () => {
  let component: InstitutionsInformationComponent;
  let fixture: ComponentFixture<InstitutionsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutionsInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstitutionsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
