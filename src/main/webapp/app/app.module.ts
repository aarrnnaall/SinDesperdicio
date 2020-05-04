import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { SinDesperdicioSharedModule } from 'app/shared/shared.module';
import { SinDesperdicioCoreModule } from 'app/core/core.module';
import { SinDesperdicioAppRoutingModule } from './app-routing.module';
import { SinDesperdicioHomeModule } from './home/home.module';
import { SinDesperdicioEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    SinDesperdicioSharedModule,
    SinDesperdicioCoreModule,
    SinDesperdicioHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    SinDesperdicioEntityModule,
    SinDesperdicioAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class SinDesperdicioAppModule {}
