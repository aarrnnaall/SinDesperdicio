import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRole, Role } from 'app/shared/model/role.model';
import { RoleService } from './role.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IBranch } from 'app/shared/model/branch.model';
import { BranchService } from 'app/entities/branch/branch.service';

type SelectableEntity = IUser | IBranch;

@Component({
  selector: 'jhi-role-update',
  templateUrl: './role-update.component.html'
})
export class RoleUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  branches: IBranch[] = [];

  editForm = this.fb.group({
    id: [],
    pointConsumption: [],
    donor: [],
    driver: [],
    admin: [],
    user: [],
    branch: []
  });

  constructor(
    protected roleService: RoleService,
    protected userService: UserService,
    protected branchService: BranchService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ role }) => {
      this.updateForm(role);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.branchService.query().subscribe((res: HttpResponse<IBranch[]>) => (this.branches = res.body || []));
    });
  }

  updateForm(role: IRole): void {
    this.editForm.patchValue({
      id: role.id,
      pointConsumption: role.pointConsumption,
      donor: role.donor,
      driver: role.driver,
      admin: role.admin,
      user: role.user,
      branch: role.branch
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const role = this.createFromForm();
    if (role.id !== undefined) {
      this.subscribeToSaveResponse(this.roleService.update(role));
    } else {
      this.subscribeToSaveResponse(this.roleService.create(role));
    }
  }

  private createFromForm(): IRole {
    return {
      ...new Role(),
      id: this.editForm.get(['id'])!.value,
      pointConsumption: this.editForm.get(['pointConsumption'])!.value,
      donor: this.editForm.get(['donor'])!.value,
      driver: this.editForm.get(['driver'])!.value,
      admin: this.editForm.get(['admin'])!.value,
      user: this.editForm.get(['user'])!.value,
      branch: this.editForm.get(['branch'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRole>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
