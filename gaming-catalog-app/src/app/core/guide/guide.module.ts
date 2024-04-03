import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuideAllComponent } from './guide-all/guide-all.component';
import { GuideDetailsComponent } from './guide-details/guide-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { GuideItemComponent } from './guide-item/guide-item.component';
import { GuideCreateComponent } from './guide-create/guide-create.component';

@NgModule({
  declarations: [
    GuideAllComponent,
    GuideDetailsComponent,
    GuideItemComponent,
    GuideCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    GuideAllComponent,
    GuideDetailsComponent,
  ]
})
export class GuideModule { }
