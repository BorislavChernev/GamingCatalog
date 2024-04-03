import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/core/game/game.service';
import { Game } from 'src/app/interfaces/game.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.css'],
})
export class GameItemComponent {
  @Input() game!: Game;

  constructor(
    private router: Router,
    private gameService: GameService,
    protected authService: AuthService
  ) {}

  deleteGame(id: string) {
    console.log(id);

    if (id) {
      this.gameService.deleteGameById(id).subscribe({
        next: () => {
          console.log('Game deleted successfully');
          // Optionally, navigate to another route after deletion
          this.router.navigate(['/Game/All']); // Navigate to home page
        },
        error: (error) => {
          console.error('Error deleting game:', error);
          // Handle error
        },
      });
    }
  }

  getGameDetails(id: string) {
    console.log(id);

    this.router.navigate(['Game', 'Details', id]);
  }
}
