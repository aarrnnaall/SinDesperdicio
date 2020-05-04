import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'app/core/auth/account.service';
import { Subscription } from 'rxjs';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from './role.service_user';
import { RoleDeleteDialogComponent } from './role-delete-dialog.component_user';

@Component({
  selector: 'jhi-role',
  templateUrl: './role.component_user.html'
})
export class RoleComponent implements OnInit, OnDestroy {
  roles?: IRole[];
  eventSubscriber?: Subscription;
  account: any;
  authSubscription?: Subscription;

  constructor(private accountService: AccountService,protected roleService: RoleService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.roleService.query().subscribe((res: HttpResponse<IRole[]>) => (this.roles = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRoles();
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }
  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }
  trackId(index: number, item: IRole): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }
  filter(login: String): any {
    return this.roles?.filter(x=>x.user?.login===login)
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    
  }
  registerChangeInRoles(): void {
    this.eventSubscriber = this.eventManager.subscribe('roleListModification', () => this.loadAll());
  }

  delete(role: IRole): void {
    const modalRef = this.modalService.open(RoleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.role = role;
  }
}
