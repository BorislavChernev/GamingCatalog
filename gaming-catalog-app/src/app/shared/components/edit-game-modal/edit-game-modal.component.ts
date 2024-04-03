import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/core/game/game.service';
import { Game } from 'src/app/interfaces/game.interface';

@Component({
  selector: 'app-edit-game-modal',
  templateUrl: './edit-game-modal.component.html',
  styleUrls: ['./edit-game-modal.component.css'],
})
export class EditGameModalComponent implements OnInit {
  modalDisplay = false;
  game: Game | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.gameService.getGameDetailsById(gameId).subscribe({
        next: (gameData) => {
          this.game = gameData;
        },
        error: (error) => {
          console.error('Error fetching game details:', error);
        },
      });
    }
  }
  openModal(): void {
    this.modalDisplay = true;
  }

  closeModal(): void {
    this.modalDisplay = false;
  }

  saveGame(): void {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (this.game) {
      console.log(gameId);
      this.gameService.editGameById(gameId!, this.game).subscribe({
        next: (updatedGame) => {
          console.log('Game updated successfully', updatedGame);
          this.closeModal();

          window.location.reload();
        },
        error: (error) => {
          console.error('Error updating game:', error);
        },
      });
    }
  }
}
