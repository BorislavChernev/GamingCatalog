import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameAllComponent } from './game-all/game-all.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameDetailsComponent } from './game-details/game-details.component';
import { RouterModule } from '@angular/router';
import { GameCreateComponent } from './game-create/game-create.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GameAllComponent, GameDetailsComponent, GameCreateComponent],
  imports: [CommonModule, SharedModule, RouterModule, FormsModule],
  exports: [GameAllComponent, GameDetailsComponent, GameCreateComponent],
})
export class GameModule {}
