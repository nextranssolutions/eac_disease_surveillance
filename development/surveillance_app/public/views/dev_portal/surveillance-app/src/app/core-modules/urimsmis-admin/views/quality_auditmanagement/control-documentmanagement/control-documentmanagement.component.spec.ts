import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlDocumentmanagementComponent } from './control-documentmanagement.component';

describe('ControlDocumentmanagementComponent', () => {
  let component: ControlDocumentmanagementComponent;
  let fixture: ComponentFixture<ControlDocumentmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlDocumentmanagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlDocumentmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
