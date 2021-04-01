import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditFiliaireComponent } from './addedit-filiaire.component';

describe('AddeditFiliaireComponent', () => {
  let component: AddeditFiliaireComponent;
  let fixture: ComponentFixture<AddeditFiliaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditFiliaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditFiliaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
