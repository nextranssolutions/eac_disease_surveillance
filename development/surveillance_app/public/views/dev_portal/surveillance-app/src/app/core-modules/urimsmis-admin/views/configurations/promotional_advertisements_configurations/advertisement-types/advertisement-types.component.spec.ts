import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementTypesComponent } from './advertisement-types.component';

describe('AdvertisementTypesComponent', () => {
  let component: AdvertisementTypesComponent;
  let fixture: ComponentFixture<AdvertisementTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertisementTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertisementTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
