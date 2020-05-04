import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SinDesperdicioTestModule } from '../../../test.module';
import { EatUpdateComponent } from 'app/entities/eat/eat-update.component';
import { EatService } from 'app/entities/eat/eat.service';
import { Eat } from 'app/shared/model/eat.model';

describe('Component Tests', () => {
  describe('Eat Management Update Component', () => {
    let comp: EatUpdateComponent;
    let fixture: ComponentFixture<EatUpdateComponent>;
    let service: EatService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SinDesperdicioTestModule],
        declarations: [EatUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EatUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EatUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EatService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Eat(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Eat();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
