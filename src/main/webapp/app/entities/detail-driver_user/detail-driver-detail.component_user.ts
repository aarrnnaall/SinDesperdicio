import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDetailDriver } from 'app/shared/model/detail-driver.model';

@Component({
  selector: 'jhi-detail-driver-detail',
  templateUrl: './detail-driver-detail.component_user.html'
})
export class DetailDriverDetailComponent implements OnInit {
  detailDriver: IDetailDriver | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detailDriver }) => (this.detailDriver = detailDriver));
  }

  previousState(): void {
    window.history.back();
  }
}
