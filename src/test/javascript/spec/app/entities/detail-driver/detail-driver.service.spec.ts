import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DetailDriverService } from 'app/entities/detail-driver/detail-driver.service';
import { IDetailDriver, DetailDriver } from 'app/shared/model/detail-driver.model';
import { TipoTrans } from 'app/shared/model/enumerations/tipo-trans.model';

describe('Service Tests', () => {
  describe('DetailDriver Service', () => {
    let injector: TestBed;
    let service: DetailDriverService;
    let httpMock: HttpTestingController;
    let elemDefault: IDetailDriver;
    let expectedResult: IDetailDriver | IDetailDriver[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DetailDriverService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new DetailDriver(0, 'AAAAAAA', 'AAAAAAA', TipoTrans.AUTO);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a DetailDriver', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new DetailDriver()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DetailDriver', () => {
        const returnedFromService = Object.assign(
          {
            availabilityday: 'BBBBBB',
            availabilitytime: 'BBBBBB',
            transportation: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DetailDriver', () => {
        const returnedFromService = Object.assign(
          {
            availabilityday: 'BBBBBB',
            availabilitytime: 'BBBBBB',
            transportation: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a DetailDriver', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
