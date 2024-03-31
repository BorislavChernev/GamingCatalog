import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameAllComponent } from './game-all/game-all.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameDetailsComponent } from './game-details/game-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    GameAllComponent,
    GameDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    GameAllComponent,
    GameDetailsComponent
  ]
})
export class GameModule { }
