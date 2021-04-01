import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditPanneComponent } from './addedit-panne.component';

describe('AddeditPanneComponent', () => {
  let component: AddeditPanneComponent;
  let fixture: ComponentFixture<AddeditPanneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditPanneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditPanneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
