import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INeeddonation } from 'app/shared/model/needdonation.model';

@Component({
  selector: 'jhi-needdonation-detail',
  templateUrl: './needdonation-detail.component.html'
})
export class NeeddonationDetailComponent implements OnInit {
  needdonation: INeeddonation | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ needdonation }) => (this.needdonation = needdonation));
  }

  previousState(): void {
    window.history.back();
  }
}
