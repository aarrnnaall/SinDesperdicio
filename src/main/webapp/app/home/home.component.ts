import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoleService } from '../entities/role_user/role.service_user';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { HttpResponse } from '@angular/common/http';
import { IRole } from 'app/shared/model/role.model';
import { JhiEventManager } from 'ng-jhipster';
@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: any;
  authSubscription?: Subscription;
  roles?: IRole[];
  eventSubscriber?: Subscription;
  constructor(
    private accountService: AccountService,
    protected roleService: RoleService,
    private loginModalService: LoginModalService,
    protected eventManager: JhiEventManager
  ) {}
  loadAllrole(): void {
    this.roleService.query().subscribe((res: HttpResponse<IRole[]>) => (this.roles = res.body || []));
  }
  registerChangeInRoles(): void {
    this.eventSubscriber = this.eventManager.subscribe('roleListModification', () => this.loadAllrole());
  }
  ngOnInit(): void {
    this.loadAllrole();
    this.registerChangeInRoles();
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }
  filter(): any {
    return this.roles?.filter(x => x.user?.login === this.account.login);
  }
  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
