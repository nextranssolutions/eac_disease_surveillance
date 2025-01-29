import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySitesComponent } from './study-sites.component';

describe('StudySitesComponent', () => {
  let component: StudySitesComponent;
  let fixture: ComponentFixture<StudySitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudySitesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudySitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
