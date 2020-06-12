import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBranch, Branch } from 'app/shared/model/branch.model';
import { BranchService } from './branch.service';
import { IOrganization } from 'app/shared/model/organization.model';
import { OrganizationService } from 'app/entities/organization/organization.service';

@Component({
  selector: 'jhi-branch-update',
  templateUrl: './branch-update.component.html'
})
export class BranchUpdateComponent implements OnInit {
  isSaving = false;
  organizations: IOrganization[] = [];

  editForm = this.fb.group({
    id: [],
    desription: [null, [Validators.required]],
    latitud: [],
    longitud: [],
    direction: [],
    organization: []
  });

  constructor(
    protected branchService: BranchService,
    protected organizationService: OrganizationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ branch }) => {
      this.updateForm(branch);

      this.organizationService.query().subscribe((res: HttpResponse<IOrganization[]>) => (this.organizations = res.body || []));
    });
  }

  updateForm(branch: IBranch): void {
    this.editForm.patchValue({
      id: branch.id,
      desription: branch.desription,
      latitud: branch.latitud,
      longitud: branch.longitud,
      direction: branch.direction,
      organization: branch.organization
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const branch = this.createFromForm();
    if (branch.id !== undefined) {
      this.subscribeToSaveResponse(this.branchService.update(branch));
    } else {
      this.subscribeToSaveResponse(this.branchService.create(branch));
    }
  }

  private createFromForm(): IBranch {
    return {
      ...new Branch(),
      id: this.editForm.get(['id'])!.value,
      desription: this.editForm.get(['desription'])!.value,
      latitud: this.editForm.get(['latitud'])!.value,
      longitud: this.editForm.get(['longitud'])!.value,
      direction: this.editForm.get(['direction'])!.value,
      organization: this.editForm.get(['organization'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBranch>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IOrganization): any {
    return item.id;
  }
}
