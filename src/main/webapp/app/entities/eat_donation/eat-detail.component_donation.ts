import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEat } from 'app/shared/model/eat.model';

@Component({
  selector: 'jhi-eat-detail',
  templateUrl: './eat-detail.component_donation.html'
})
export class EatDetailComponent implements OnInit {
  eat: IEat | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ eat }) => (this.eat = eat));
  }

  previousState(): void {
    window.history.back();
  }
}
