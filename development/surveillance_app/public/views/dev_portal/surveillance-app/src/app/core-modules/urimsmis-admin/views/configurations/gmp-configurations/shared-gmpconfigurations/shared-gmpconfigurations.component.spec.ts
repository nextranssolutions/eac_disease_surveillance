import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedGmpconfigurationsComponent } from './shared-gmpconfigurations.component';

describe('SharedGmpconfigurationsComponent', () => {
  let component: SharedGmpconfigurationsComponent;
  let fixture: ComponentFixture<SharedGmpconfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedGmpconfigurationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedGmpconfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
