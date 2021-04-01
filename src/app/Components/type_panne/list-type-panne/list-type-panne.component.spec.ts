import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypePanneComponent } from './list-type-panne.component';

describe('ListTypePanneComponent', () => {
  let component: ListTypePanneComponent;
  let fixture: ComponentFixture<ListTypePanneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypePanneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypePanneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
