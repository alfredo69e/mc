import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariosComponent } from './varios.component';

describe('VariosComponent', () => {
  let component: VariosComponent;
  let fixture: ComponentFixture<VariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
