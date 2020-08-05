import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from 'app/entities/role_user/role.service_user';
import { IBranch } from 'app/shared/model/branch.model';
import { BranchService } from './branch.service_admin';
import { BranchDeleteDialogComponent } from './branch-delete-dialog.component_admin';
import { AccountService } from 'app/core/auth/account.service';
import { IRole } from 'app/shared/model/role.model';
@Component({
  selector: 'jhi-branch',
  templateUrl: './branch.component_admin.html'
})
export class BranchComponent implements OnInit, OnDestroy {
  branches?: IBranch[];
  account: any;
  roles?: IRole[];
  eventSubscriber?: Subscription;
  authSubscription?: Subscription;
  constructor(
    protected branchService: BranchService,
    private accountService: AccountService,
    protected roleService: RoleService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.branchService.query().subscribe((res: HttpResponse<IBranch[]>) => (this.branches = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBranches();
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
  trackId(index: number, item: IBranch): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }
  filter(): any {
    return this.roles?.filter(x => x.user?.login === this.account.login);
  }
  filterbranch(): any {
    return this.branches?.filter(x => x.id === this.filter()[0].branch.id);
  }
  registerChangeInBranches(): void {
    this.eventSubscriber = this.eventManager.subscribe('branchListModification', () => this.loadAll());
  }

  delete(branch: IBranch): void {
    const modalRef = this.modalService.open(BranchDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.branch = branch;
  }
}
