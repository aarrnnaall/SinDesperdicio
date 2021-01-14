import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'app/core/auth/account.service';
import { RoleService } from 'app/entities/role_user/role.service_user';
import { IOrganization } from 'app/shared/model/organization.model';
import { OrganizationService } from './organization.service_admin';
import { OrganizationDeleteDialogComponent } from './organization-delete-dialog.component_admin';
import { IRole } from 'app/shared/model/role.model';
import { BranchService } from 'app/entities/branch_admin/branch.service_admin';
import { IBranch } from 'app/shared/model/branch.model';
import { BranchDeleteDialogComponent } from '../branch_admin/branch-delete-dialog.component_admin';

@Component({
  selector: 'jhi-organization',
  templateUrl: './organization.component_admin.html'
})
export class OrganizationComponent implements OnInit, OnDestroy {
  organizations?: IOrganization[];
  eventSubscriber?: Subscription;
  roles?: IRole[];
  account: any;
  authSubscription?: Subscription;
  branches?: IBranch[];

  constructor(
    private accountService: AccountService,
    protected roleService: RoleService,
    protected organizationService: OrganizationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected branchService: BranchService
  ) {}

  loadAll(): void {
    this.organizationService.query().subscribe((res: HttpResponse<IOrganization[]>) => (this.organizations = res.body || []));
  }
  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOrganizations();
    this.loadAllrole();
    this.registerChangeInRoles();
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.branchService.query().subscribe((res: HttpResponse<IBranch[]>) => (this.branches = res.body || []));
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
    return this.roles?.filter(x => x.user?.login === this.account.login)!;
  }
  filterorg(): any {
    return this.organizations?.filter(x => x.id === this.filter()[0].branch.organization.id)!;
  }
  filtersuc(): any {
    return this.branches?.filter(x => x.organization?.id === this.filter()[0].branch.organization.id)!;
  }
  notorg(): any {
    if (this.filter()[0].branch === null) {
      return true;
    } else {
      return false;
    }
  }
  trackId(index: number, item: IOrganization): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInOrganizations(): void {
    this.eventSubscriber = this.eventManager.subscribe('organizationListModification', () => this.loadAll());
  }

  delete(organization: IOrganization): void {
    const modalRef = this.modalService.open(OrganizationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.organization = organization;
  }

  deletebranch(branch: IBranch): void {
    const modalRef = this.modalService.open(BranchDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.branch = branch;
  }
}
