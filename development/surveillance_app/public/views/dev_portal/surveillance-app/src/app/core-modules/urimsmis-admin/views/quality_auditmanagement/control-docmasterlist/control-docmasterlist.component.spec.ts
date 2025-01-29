import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlDocmasterlistComponent } from './control-docmasterlist.component';

describe('ControlDocmasterlistComponent', () => {
  let component: ControlDocmasterlistComponent;
  let fixture: ComponentFixture<ControlDocmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlDocmasterlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlDocmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
