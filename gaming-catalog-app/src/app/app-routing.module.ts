import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 //The imports below are for GAME model
import { GameAllComponent } from './core/game/game-all/game-all.component';
import { GameDetailsComponent } from './core/game/game-details/game-details.component';
 //The imports below are for DISCUSSION model
import { DiscussionAllComponent } from './core/discussion/discussion-all/discussion-all.component';
 //The imports below are for GUIDE model
import { GuideAllComponent } from './core/guide/guide-all/guide-all.component';
import { GuideDetailsComponent } from './core/guide/guide-details/guide-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'test', component: GameAllComponent },
  //The route paths below are for GAME model
  { path: 'Game/All', component: GameAllComponent },
  { path: 'Game/Details/1', component: GameDetailsComponent },
  { path: 'Game/Delete/1', component: GameAllComponent },
  { path: 'Game/Create', component: GameAllComponent },
  { path: 'Game/Liked', component: GameAllComponent },
  { path: 'Game/Rated', component: GameAllComponent },
  { path: 'Game/Wished', component: GameAllComponent },
  //The route paths below are for DISCUSSION model
  { path: 'Discussion/All', component: DiscussionAllComponent },
  { path: 'Discussion/Details/1', component: DiscussionAllComponent },
  { path: 'Discussion/Delete/1', component: DiscussionAllComponent },
  { path: 'Discussion/Create', component: DiscussionAllComponent }, 
  //The route paths below are for GUIDE model
  { path: 'Guide/All', component: GuideAllComponent },
  { path: 'Guide/Details/1', component: GuideDetailsComponent },
  { path: 'Guide/Delete/1', component: GuideAllComponent },
  { path: 'Guide/Create', component: GuideAllComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
