import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { GuideComponent } from './guide/guide.component';
import { ReviewComponent } from './review/review.component';



@NgModule({
  declarations: [
    GameComponent,
    DiscussionComponent,
    GuideComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
