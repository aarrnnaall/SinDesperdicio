import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SinDesperdicioSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [SinDesperdicioSharedModule, RouterModule.forChild([HOME_ROUTE]), BrowserModule],
  declarations: [HomeComponent]
})
export class SinDesperdicioHomeModule {}
