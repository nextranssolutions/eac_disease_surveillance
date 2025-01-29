import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilingualConfigurationsComponent } from './multilingual-configurations.component';

describe('MultilingualConfigurationsComponent', () => {
  let component: MultilingualConfigurationsComponent;
  let fixture: ComponentFixture<MultilingualConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultilingualConfigurationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultilingualConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
