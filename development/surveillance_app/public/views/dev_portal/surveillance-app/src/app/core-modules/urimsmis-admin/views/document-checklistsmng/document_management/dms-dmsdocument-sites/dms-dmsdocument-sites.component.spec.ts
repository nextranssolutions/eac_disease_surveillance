import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsDmsdocumentSitesComponent } from './dms-dmsdocument-sites.component';

describe('DmsDmsdocumentSitesComponent', () => {
  let component: DmsDmsdocumentSitesComponent;
  let fixture: ComponentFixture<DmsDmsdocumentSitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmsDmsdocumentSitesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DmsDmsdocumentSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
