import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEntryFormSetupComponent } from './data-entry-form-setup.component';

describe('DataEntryFormSetupComponent', () => {
  let component: DataEntryFormSetupComponent;
  let fixture: ComponentFixture<DataEntryFormSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataEntryFormSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataEntryFormSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
