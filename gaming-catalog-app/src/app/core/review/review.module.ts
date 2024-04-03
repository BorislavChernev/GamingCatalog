import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReviewAllComponent } from './review-all/review-all.component';
import { ReviewItemComponent } from './review-item/review-item.component';

@NgModule({
  declarations: [ReviewAllComponent, ReviewItemComponent],
  imports: [CommonModule, SharedModule, RouterModule, FormsModule],
  exports: [ReviewAllComponent, ReviewItemComponent],
})
export class ReviewModule {}
