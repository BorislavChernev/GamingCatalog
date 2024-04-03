import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscussionDetailsComponent } from './discussion-details/discussion-details.component';
import { DiscussionAllComponent } from './discussion-all/discussion-all.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DiscussionCreateComponent } from './discussion-create/discussion-create.component';
import { DiscussionItemComponent } from './discussion-item/discussion-item.component';

@NgModule({
  declarations: [DiscussionAllComponent, DiscussionDetailsComponent, DiscussionCreateComponent, DiscussionItemComponent],
  imports: [CommonModule, SharedModule, RouterModule, FormsModule],
  exports: [DiscussionAllComponent, DiscussionDetailsComponent],
})
export class DiscussionModule {}
