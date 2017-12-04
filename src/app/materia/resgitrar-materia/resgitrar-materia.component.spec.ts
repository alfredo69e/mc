import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgitrarMateriaComponent } from './resgitrar-materia.component';

describe('ResgitrarMateriaComponent', () => {
  let component: ResgitrarMateriaComponent;
  let fixture: ComponentFixture<ResgitrarMateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResgitrarMateriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResgitrarMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
