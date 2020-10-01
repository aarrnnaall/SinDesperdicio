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
import { Chart } from 'chart.js';

@Component({
  selector: 'jhi-organization',
  templateUrl: './organization.component_datos.html'
})
export class OrganizationDatosComponent implements OnInit, OnDestroy {
  organizations?: IOrganization[];
  eventSubscriber?: Subscription;
  roles?: IRole[];
  account: any;
  authSubscription?: Subscription;
  graftview: any;
  rolesuser?: IRole[];

  constructor(
    private accountService: AccountService,
    protected roleService: RoleService,
    protected organizationService: OrganizationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
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
    this.filteruser();
    this.graft();
  }

  graft(): void {
    this.graftview = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
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
  filteruser(): void {
    this.rolesuser = this.roles?.filter(x => x.branch?.id === this.filter()[0].branch.id).filter(s => s.donor === true);
  }

  filterorg(): any {
    return this.organizations?.filter(x => x.id === this.filter()[0].branch.organization.id);
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
}
