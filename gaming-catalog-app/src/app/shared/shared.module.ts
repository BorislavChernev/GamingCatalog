import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameItemComponent } from './game-item/game-item.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { EditGameModalComponent } from './edit-game-modal/edit-game-modal.component';
import { DiscussionItemComponent } from './discussion-item/discussion-item.component';
import { GuideItemComponent } from './guide-item/guide-item.component';

@NgModule({
  declarations: [
    GameItemComponent,
    TitlebarComponent,
    NavbarComponent,
    EditGameModalComponent,
    DiscussionItemComponent,
    GuideItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    GameItemComponent,
    TitlebarComponent,
    NavbarComponent,
    EditGameModalComponent,
    DiscussionItemComponent,
    GuideItemComponent
  ]
})
export class SharedModule { }
