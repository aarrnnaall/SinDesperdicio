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
import { RoleService } from 'app/entities/role_user/role.service_user';
import { AccountService } from 'app/core/auth/account.service';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { IRole, Role } from 'app/shared/model/role.model';

@Component({
  selector: 'jhi-organization-update',
  templateUrl: './organization-update.component_admin.html'
})
export class OrganizationUpdateComponent implements OnInit {
  isSaving = false;
  eventSubscriber?: Subscription;
  authSubscription?: Subscription;
  roles?: IRole[];
  account: any;
  tempdirection: any;
  tempsucursal: any;
  editForm = this.fb.group({
    id: [],
    razonSocial: [null, [Validators.required]],
    tipo: [],
    description: [null, [Validators.required]],
    cuit: [],
    desription: [],
    latitud: [],
    longitud: [],
    direction: []
  });

  constructor(
    protected organizationService: OrganizationService,
    protected branchService: BranchService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private accountService: AccountService,
    protected eventManager: JhiEventManager,
    protected roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ organization }) => {
      this.updateForm(organization);
    });
    this.loadAllrole();
    this.registerChangeInRoles();
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }
  loadAllrole(): void {
    this.roleService.query().subscribe((res: HttpResponse<IRole[]>) => (this.roles = res.body || []));
  }
  registerChangeInRoles(): void {
    this.eventSubscriber = this.eventManager.subscribe('roleListModification', () => this.loadAllrole());
  }
  filter(): any {
    return this.roles?.filter(x => x.user?.login === this.account.login);
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
    const branchupdate = this.updateFromFormBranch();
    if (organization.id !== undefined) {
      this.subscribeToSaveResponse(this.organizationService.update(organization));
      this.subscribeToSaveResponseBrach(this.branchService.update(branchupdate));
    } else {
      const role = this.createFromFormRole(branch);
      this.subscribeToSaveResponseRole(this.roleService.update(role));
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
  private updateFromFormBranch(): IBranch {
    if (this.editForm.get(['direction'])!.value === null) {
      this.tempdirection = this.filter()[0].branch?.direction;
    } else {
      this.tempdirection = this.editForm.get(['direction'])!.value;
    }
    if (this.editForm.get(['desription'])!.value === null) {
      this.tempsucursal = this.filter()[0].branch?.desription;
    } else {
      this.tempsucursal = this.editForm.get(['desription'])!.value;
    }
    return {
      ...new Branch(),
      id: this.filter()[0].branch?.id,
      desription: this.tempsucursal,
      latitud: this.editForm.get(['latitud'])!.value,
      longitud: this.editForm.get(['longitud'])!.value,
      direction: this.tempdirection,
      organization: this.filter()[0].branch?.organization
    };
  }
  private createFromFormRole(branch: IBranch): IRole {
    return {
      ...new Role(),
      id: this.filter()[0].id,
      admin: this.filter()[0].admin,
      user: this.filter()[0].user,
      branch
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrganization>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }
  protected subscribeToSaveResponseRole(result: Observable<HttpResponse<IRole>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError(),
      () => {
        this.eventManager.broadcast('roleListModification');
      }
    );
  }
  protected subscribeToSaveResponseBrach(result: Observable<HttpResponse<IBranch>>): void {
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
