import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.model';
import { UserManagementDeleteDialogComponent } from './user-management-delete-dialog.component_org';
import { RoleService } from 'app/entities/role_user/role.service_user';
import { IRole } from 'app/shared/model/role.model';

@Component({
  selector: 'jhi-user-mgmt',
  templateUrl: './user-management.component_org.html'
})
export class UserManagementComponent implements OnInit, OnDestroy {
  currentAccount: Account | null = null;
  users: User[] | null = null;
  userListSubscription?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  previousPage!: number;
  ascending!: boolean;
  authSubscription?: Subscription;
  roles?: IRole[];
  eventSubscriber?: Subscription;
  account: any;

  constructor(
    private accountService: AccountService,
    protected roleService: RoleService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventManager: JhiEventManager,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        flatMap(
          () => this.accountService.identity(),
          (data, account) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.ascending = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
            this.currentAccount = account;
            this.loadAll();
            this.userListSubscription = this.eventManager.subscribe('userListModification', () => this.loadAll());
          }
        )
      )
      .subscribe();
    this.loadAllRole();
    this.registerChangeInRoles();
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }
  registerChangeInRoles(): void {
    this.eventSubscriber = this.eventManager.subscribe('roleListModification', () => this.loadAll());
  }

  loadAllRole(): void {
    this.roleService.query().subscribe((res: HttpResponse<IRole[]>) => (this.roles = res.body || []));
  }

  ngOnDestroy(): void {
    if (this.userListSubscription) {
      this.eventManager.destroy(this.userListSubscription);
    }
  }

  filter(): any {
    return this.roles?.filter(x => x.user?.login === this.account.login);
  }
  filteruser(): any {
    return this.roles?.filter(x => x.branch?.id === this.filter()[0].branch.id);
  }
  filterusers(id: number): any {
    return this.users?.filter(x => x.id === id);
  }
  setActive(user: User, isActivated: boolean): void {
    this.userService.update({ ...user, activated: isActivated }).subscribe(() => this.loadAll());
  }

  trackIdentity(index: number, item: User): any {
    return item.id;
  }

  loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  deleteUser(user: User): void {
    const modalRef = this.modalService.open(UserManagementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.user = user;
  }

  private loadAll(): void {
    this.userService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<User[]>) => this.onSuccess(res.body, res.headers));
  }

  private sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }
  trackId(index: number, item: IRole): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }
  private onSuccess(users: User[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.users = users;
  }
}
