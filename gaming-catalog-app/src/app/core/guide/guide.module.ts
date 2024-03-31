import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuideAllComponent } from './guide-all/guide-all.component';
import { GuideDetailsComponent } from './guide-details/guide-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    GuideAllComponent,
    GuideDetailsComponent
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
