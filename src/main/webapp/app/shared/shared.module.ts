import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SinDesperdicioSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [SinDesperdicioSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [SinDesperdicioSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SinDesperdicioSharedModule {
  static forRoot() {
    return {
      ngModule: SinDesperdicioSharedModule
    };
  }
}
