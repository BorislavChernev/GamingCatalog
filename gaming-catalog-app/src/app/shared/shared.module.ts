import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameItemComponent } from './components/game-item/game-item.component';
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { EditGameModalComponent } from './components/edit-game-modal/edit-game-modal.component';
import { DiscussionItemComponent } from './components/discussion-item/discussion-item.component';
import { GuideItemComponent } from './components/guide-item/guide-item.component';
import { VALIDATION_MESSAGES } from './constants/validation.errors';

@NgModule({
  declarations: [
    GameItemComponent,
    TitlebarComponent,
    NavbarComponent,
    EditGameModalComponent,
    DiscussionItemComponent,
    GuideItemComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    GameItemComponent,
    TitlebarComponent,
    NavbarComponent,
    EditGameModalComponent,
    DiscussionItemComponent,
    GuideItemComponent,
  ],
})
export class SharedModule {}
