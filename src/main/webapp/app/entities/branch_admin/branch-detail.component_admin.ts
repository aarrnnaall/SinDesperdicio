import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBranch } from 'app/shared/model/branch.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'jhi-branch-detail',
  templateUrl: './branch-detail.component_admin.html'
})
export class BranchDetailComponent implements OnInit {
  branch: IBranch | null = null;

  constructor(protected activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ branch }) => (this.branch = branch));
  }
  replace(text: string): string {
    const direc = text.replace(/[" "]/g, '%');
    const url =
      'https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=' +
      direc +
      '+()&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed';
    return url;
  }
  previousState(): void {
    window.history.back();
  }
}
