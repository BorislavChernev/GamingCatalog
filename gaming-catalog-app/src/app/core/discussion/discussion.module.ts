import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscussionDetailsComponent } from './discussion-details/discussion-details.component';
import { DiscussionAllComponent } from './discussion-all/discussion-all.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    DiscussionAllComponent,
    DiscussionDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    DiscussionAllComponent,
    DiscussionDetailsComponent
  ]
})
export class DiscussionModule { }
