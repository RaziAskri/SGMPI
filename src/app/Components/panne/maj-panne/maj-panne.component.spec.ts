import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajPanneComponent } from './maj-panne.component';

describe('MajPanneComponent', () => {
  let component: MajPanneComponent;
  let fixture: ComponentFixture<MajPanneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajPanneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajPanneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
