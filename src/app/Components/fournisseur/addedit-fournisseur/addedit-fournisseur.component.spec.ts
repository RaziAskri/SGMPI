import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditFournisseurComponent } from './addedit-fournisseur.component';

describe('AddeditFournisseurComponent', () => {
  let component: AddeditFournisseurComponent;
  let fixture: ComponentFixture<AddeditFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
