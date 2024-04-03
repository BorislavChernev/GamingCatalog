import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { Game } from 'src/app/interfaces/game.interface';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent implements OnInit {
  game: Game | undefined; // Adjust according to your data model

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.gameService.getGameDetailsById(gameId).subscribe({
        next: (game: Game) => {
          this.game = game; // Assuming `getGameDetailsById` fetches the game data based on `id`
        },
        error: (error) => {
          console.error('Error fetching game details:', error);
        },
      });
    }
  }
}
