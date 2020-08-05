import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from 'app/entities/role_user/role.service_user';
import { IOrganization } from 'app/shared/model/organization.model';
import { JhiEventManager } from 'ng-jhipster';
import { AccountService } from 'app/core/auth/account.service';
import { Subscription } from 'rxjs';
import { IRole } from 'app/shared/model/role.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-organization-detail',
  templateUrl: './organization-detail.component_admin.html'
})
export class OrganizationDetailComponent implements OnInit {
  organization: IOrganization | null = null;
  eventSubscriber?: Subscription;
  authSubscription?: Subscription;
  roles?: IRole[];
  account: any;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    protected eventManager: JhiEventManager,
    protected roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ organization }) => (this.organization = organization));
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

  previousState(): void {
    window.history.back();
  }
}
