import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDonations } from 'app/shared/model/donations.model';

@Component({
  selector: 'jhi-donations-detail',
  templateUrl: './donations-detail.component.html'
})
export class DonationsDetailComponent implements OnInit {
  donations: IDonations | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ donations }) => (this.donations = donations));
  }

  previousState(): void {
    window.history.back();
  }
}
