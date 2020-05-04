import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SinDesperdicioTestModule } from '../../../test.module';
import { LocationDriverComponent } from 'app/entities/location-driver/location-driver.component';
import { LocationDriverService } from 'app/entities/location-driver/location-driver.service';
import { LocationDriver } from 'app/shared/model/location-driver.model';

describe('Component Tests', () => {
  describe('LocationDriver Management Component', () => {
    let comp: LocationDriverComponent;
    let fixture: ComponentFixture<LocationDriverComponent>;
    let service: LocationDriverService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SinDesperdicioTestModule],
        declarations: [LocationDriverComponent]
      })
        .overrideTemplate(LocationDriverComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocationDriverComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocationDriverService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LocationDriver(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.locationDrivers && comp.locationDrivers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
