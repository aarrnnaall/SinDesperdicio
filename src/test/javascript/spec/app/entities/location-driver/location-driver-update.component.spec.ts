import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SinDesperdicioTestModule } from '../../../test.module';
import { LocationDriverUpdateComponent } from 'app/entities/location-driver/location-driver-update.component';
import { LocationDriverService } from 'app/entities/location-driver/location-driver.service';
import { LocationDriver } from 'app/shared/model/location-driver.model';

describe('Component Tests', () => {
  describe('LocationDriver Management Update Component', () => {
    let comp: LocationDriverUpdateComponent;
    let fixture: ComponentFixture<LocationDriverUpdateComponent>;
    let service: LocationDriverService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SinDesperdicioTestModule],
        declarations: [LocationDriverUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LocationDriverUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocationDriverUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocationDriverService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LocationDriver(123);
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
        const entity = new LocationDriver();
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
