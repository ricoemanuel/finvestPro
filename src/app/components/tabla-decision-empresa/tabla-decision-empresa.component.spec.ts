import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDecisionEmpresaComponent } from './tabla-decision-empresa.component';

describe('TablaDecisionEmpresaComponent', () => {
  let component: TablaDecisionEmpresaComponent;
  let fixture: ComponentFixture<TablaDecisionEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaDecisionEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaDecisionEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
