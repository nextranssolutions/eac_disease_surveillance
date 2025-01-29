import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedconfigurationsComponent } from './sharedconfigurations.component';

describe('SharedconfigurationsComponent', () => {
  let component: SharedconfigurationsComponent;
  let fixture: ComponentFixture<SharedconfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedconfigurationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedconfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
