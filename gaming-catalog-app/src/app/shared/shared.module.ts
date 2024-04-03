import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameItemComponent } from './components/game-item/game-item.component';
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { EditGameModalComponent } from './components/edit-game-modal/edit-game-modal.component';
import { DiscussionItemComponent } from './components/discussion-item/discussion-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GameItemComponent,
    TitlebarComponent,
    NavbarComponent,
    EditGameModalComponent,
    DiscussionItemComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    GameItemComponent,
    TitlebarComponent,
    NavbarComponent,
    EditGameModalComponent,
    DiscussionItemComponent,
    FormsModule,
  ],
})
export class SharedModule {}
