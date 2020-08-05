import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BranchService } from 'app/entities/branch_admin/branch.service_admin';
import { IOrganization, Organization } from 'app/shared/model/organization.model';
import { OrganizationService } from './organization.service_admin';
import { IBranch, Branch } from 'app/shared/model/branch.model';

@Component({
  selector: 'jhi-organization-update',
  templateUrl: './organization-update.component_admin.html'
})
export class OrganizationUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    razonSocial: [null, [Validators.required]],
    tipo: [],
    description: [null, [Validators.required]],
    cuit: [],
    desription: ['Central'],
    latitud: [],
    longitud: [],
    direction: []
  });

  constructor(
    protected organizationService: OrganizationService,
    protected branchService: BranchService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ organization }) => {
      this.updateForm(organization);
    });
  }

  updateForm(organization: IOrganization): void {
    this.editForm.patchValue({
      id: organization.id,
      razonSocial: organization.razonSocial,
      tipo: organization.tipo,
      description: organization.description,
      cuit: organization.cuit
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const organization = this.createFromForm();
    const branch = this.createFromFormBranch(organization);
    if (organization.id !== undefined) {
      this.subscribeToSaveResponse(this.organizationService.update(organization));
    } else {
      this.subscribeToSaveResponse(this.branchService.create(branch));
    }
  }

  private createFromForm(): IOrganization {
    return {
      ...new Organization(),
      id: this.editForm.get(['id'])!.value,
      razonSocial: this.editForm.get(['razonSocial'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      description: this.editForm.get(['description'])!.value,
      cuit: this.editForm.get(['cuit'])!.value
    };
  }
  private createFromFormBranch(organization: IOrganization): IBranch {
    return {
      ...new Branch(),
      desription: this.editForm.get(['desription'])!.value,
      latitud: this.editForm.get(['latitud'])!.value,
      longitud: this.editForm.get(['longitud'])!.value,
      direction: this.editForm.get(['direction'])!.value,
      organization
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrganization>>): void {
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
}
