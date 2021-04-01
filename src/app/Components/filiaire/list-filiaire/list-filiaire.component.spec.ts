import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFiliaireComponent } from './list-filiaire.component';

describe('ListFiliaireComponent', () => {
  let component: ListFiliaireComponent;
  let fixture: ComponentFixture<ListFiliaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFiliaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFiliaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
