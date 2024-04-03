import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from 'src/app/interfaces/game.interface';

@Component({
  selector: 'app-game-all',
  templateUrl: './game-all.component.html',
  styleUrls: ['./game-all.component.css'],
})
export class GameAllComponent implements OnInit {
  constructor(private gameService: GameService) {}

  games: Game[] = [];

  ngOnInit(): void {
    this.getAllGames();
  }

  getAllGames(): void {
    this.gameService.getAllGames().subscribe({
      next: (games) => {
        this.games = games;
      },
      error: (error) => {
        console.error('Error getting this game:', error);
      },
    });
  }
}
