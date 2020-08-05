import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { IRole, Role } from 'app/shared/model/role.model';
import { RoleService } from 'app/entities/role_user/role.service_user';
import { IBranch, Branch } from 'app/shared/model/branch.model';
import { BranchService } from 'app/entities/branch_admin/branch.service_admin';
import { IOrganization } from 'app/shared/model/organization.model';
import { OrganizationService } from 'app/entities/organization_admin/organization.service_admin';
import { JhiEventManager } from 'ng-jhipster';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-branch-update',
  templateUrl: './branch-update.component_admin.html'
})
export class BranchUpdateComponent implements OnInit, OnDestroy {
  isSaving = false;
  roles?: IRole[];
  organizations: IOrganization[] = [];
  eventSubscriber?: Subscription;
  authSubscription?: Subscription;
  account: any;
  editForm = this.fb.group({
    id: [],
    desription: [null, [Validators.required]],
    latitud: [],
    longitud: [],
    direction: [],
    organization: []
  });

  constructor(
    private accountService: AccountService,
    protected branchService: BranchService,
    protected organizationService: OrganizationService,
    protected activatedRoute: ActivatedRoute,
    protected roleService: RoleService,
    private fb: FormBuilder,
    protected eventManager: JhiEventManager
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ branch }) => {
      this.updateForm(branch);

      this.organizationService.query().subscribe((res: HttpResponse<IOrganization[]>) => (this.organizations = res.body || []));
    });
    this.loadAllrole();
    this.registerChangeInRoles();
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }
  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
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
      const role = this.createFromFormRole(branch);
      this.subscribeToSaveResponseRole(this.roleService.update(role));
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
  private createFromFormRole(branch: IBranch): IRole {
    return {
      ...new Role(),
      id: this.filter()[0].id,
      admin: this.filter()[0].admin,
      user: this.filter()[0].user,
      branch
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBranch>>): void {
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
  trackId(index: number, item: IRole): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }
}
