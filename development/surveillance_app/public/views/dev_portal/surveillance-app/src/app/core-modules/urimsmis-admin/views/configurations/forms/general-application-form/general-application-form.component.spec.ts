import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralApplicationFormComponent } from './general-application-form.component';

describe('GeneralApplicationFormComponent', () => {
  let component: GeneralApplicationFormComponent;
  let fixture: ComponentFixture<GeneralApplicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralApplicationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
