import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SinDesperdicioTestModule } from '../../../test.module';
import { LocationDriverDetailComponent } from 'app/entities/location-driver/location-driver-detail.component';
import { LocationDriver } from 'app/shared/model/location-driver.model';

describe('Component Tests', () => {
  describe('LocationDriver Management Detail Component', () => {
    let comp: LocationDriverDetailComponent;
    let fixture: ComponentFixture<LocationDriverDetailComponent>;
    const route = ({ data: of({ locationDriver: new LocationDriver(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SinDesperdicioTestModule],
        declarations: [LocationDriverDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LocationDriverDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocationDriverDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load locationDriver on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.locationDriver).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
