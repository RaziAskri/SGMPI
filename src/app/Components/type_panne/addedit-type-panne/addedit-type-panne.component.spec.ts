import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditTypePanneComponent } from './addedit-type-panne.component';

describe('AddeditTypePanneComponent', () => {
  let component: AddeditTypePanneComponent;
  let fixture: ComponentFixture<AddeditTypePanneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditTypePanneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditTypePanneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
