import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SinDesperdicioTestModule } from '../../../test.module';
import { DetailDriverUpdateComponent } from 'app/entities/detail-driver/detail-driver-update.component';
import { DetailDriverService } from 'app/entities/detail-driver/detail-driver.service';
import { DetailDriver } from 'app/shared/model/detail-driver.model';

describe('Component Tests', () => {
  describe('DetailDriver Management Update Component', () => {
    let comp: DetailDriverUpdateComponent;
    let fixture: ComponentFixture<DetailDriverUpdateComponent>;
    let service: DetailDriverService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SinDesperdicioTestModule],
        declarations: [DetailDriverUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DetailDriverUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetailDriverUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetailDriverService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DetailDriver(123);
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
        const entity = new DetailDriver();
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
