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
import { GameCreateComponent } from './core/game/game-create/game-create.component';
import { ReviewAllComponent } from './core/review/review-all/review-all.component';
import { GuideCreateComponent } from './core/guide/guide-create/guide-create.component';
import { DiscussionCreateComponent } from './core/discussion/discussion-create/discussion-create.component';
import { DiscussionDetailsComponent } from './core/discussion/discussion-details/discussion-details.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'test', component: GameAllComponent },
  //The route paths below are for GAME model
  { path: 'Game/All', component: GameAllComponent },
  { path: 'Game/Details/:id', component: GameDetailsComponent },
  { path: 'Game/Delete/:id', component: GameAllComponent },
  { path: 'Game/Edit/:id', component: GameAllComponent },
  { path: 'Game/Create', component: GameCreateComponent },
  { path: 'Game/Liked', component: GameAllComponent },
  { path: 'Game/Rated', component: GameAllComponent },
  { path: 'Game/Wished', component: GameAllComponent },
  //The route paths below are for REVIEW model
  { path: 'Reviews/Game/:id', component: ReviewAllComponent },
  //The route paths below are for DISCUSSION model
  { path: 'Discussion/All', component: DiscussionAllComponent },
  { path: 'Discussion/Details/:id', component: DiscussionDetailsComponent },
  { path: 'Discussion/Delete/:id', component: DiscussionAllComponent },
  { path: 'Discussion/Create', component: DiscussionCreateComponent },
  //The route paths below are for GUIDE model
  { path: 'Guide/All', component: GuideAllComponent },
  { path: 'Guide/Details/:id', component: GuideDetailsComponent },
  { path: 'Guide/Delete/:id', component: GuideAllComponent },
  { path: 'Guide/Create', component: GuideCreateComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
