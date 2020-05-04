import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NutritionService } from 'app/entities/nutrition/nutrition.service';
import { INutrition, Nutrition } from 'app/shared/model/nutrition.model';

describe('Service Tests', () => {
  describe('Nutrition Service', () => {
    let injector: TestBed;
    let service: NutritionService;
    let httpMock: HttpTestingController;
    let elemDefault: INutrition;
    let expectedResult: INutrition | INutrition[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(NutritionService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Nutrition(
        0,
        'AAAAAAA',
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Nutrition', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Nutrition()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Nutrition', () => {
        const returnedFromService = Object.assign(
          {
            description: 'BBBBBB',
            water: 1,
            calorie: 1,
            protein: 1,
            lipidTot: 1,
            ash: 1,
            carbohydrt: 1,
            fiber: 1,
            sugarTot: 1,
            calcium: 1,
            iron: 1,
            magnesium: 1,
            phosphorus: 1,
            potassium: 1,
            sodium: 1,
            zinc: 1,
            manganese: 1,
            vitC: 1,
            thiamin: 1,
            riboflavin: 1,
            niacin: 1,
            pantoAcid: 1,
            vitB6: 1,
            folateTot: 1,
            folicAcid: 1,
            foodFolate: 1,
            folateDFE: 1,
            vholineTot: 1,
            vitB12: 1,
            vitAIU: 1,
            vitARAE: 1,
            vitE: 1,
            vitD: 1,
            vitK: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Nutrition', () => {
        const returnedFromService = Object.assign(
          {
            description: 'BBBBBB',
            water: 1,
            calorie: 1,
            protein: 1,
            lipidTot: 1,
            ash: 1,
            carbohydrt: 1,
            fiber: 1,
            sugarTot: 1,
            calcium: 1,
            iron: 1,
            magnesium: 1,
            phosphorus: 1,
            potassium: 1,
            sodium: 1,
            zinc: 1,
            manganese: 1,
            vitC: 1,
            thiamin: 1,
            riboflavin: 1,
            niacin: 1,
            pantoAcid: 1,
            vitB6: 1,
            folateTot: 1,
            folicAcid: 1,
            foodFolate: 1,
            folateDFE: 1,
            vholineTot: 1,
            vitB12: 1,
            vitAIU: 1,
            vitARAE: 1,
            vitE: 1,
            vitD: 1,
            vitK: 1
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

      it('should delete a Nutrition', () => {
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
