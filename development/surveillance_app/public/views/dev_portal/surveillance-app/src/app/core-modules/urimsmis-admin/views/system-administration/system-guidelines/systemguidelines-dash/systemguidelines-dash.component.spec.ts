import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemguidelinesDashComponent } from './systemguidelines-dash.component';

describe('SystemguidelinesDashComponent', () => {
  let component: SystemguidelinesDashComponent;
  let fixture: ComponentFixture<SystemguidelinesDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemguidelinesDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemguidelinesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
