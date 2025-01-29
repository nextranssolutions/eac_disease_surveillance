import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentchecklistSetupComponent } from './documentchecklist-setup.component';

describe('DocumentchecklistSetupComponent', () => {
  let component: DocumentchecklistSetupComponent;
  let fixture: ComponentFixture<DocumentchecklistSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentchecklistSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentchecklistSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
