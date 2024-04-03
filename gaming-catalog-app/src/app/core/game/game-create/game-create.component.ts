import { Component, ViewChild, numberAttribute } from '@angular/core';
import { VALIDATION_CONSTANTS } from 'src/app/shared/constants/validation.constants';
import { GameService } from '../game.service';
import { Game } from 'src/app/interfaces/game.interface';
import { NgForm } from '@angular/forms';
import { VALIDATION_MESSAGES } from 'src/app/shared/constants/validation.errors';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css'],
})
export class GameCreateComponent {
  @ViewChild('gameCreateForm', { static: false }) gameCreateForm!: NgForm;

  name: string = '';
  description: string = '';
  version: string = '';
  releaseDate: Date = new Date();
  ageRestriction: string = '';
  status: string = '';
  supportsPC: boolean = false;
  supportsPS: boolean = false;
  supportsXbox: boolean = false;
  supportsNintendo: boolean = false;
  imageUrl: string = '';

  constructor(private gameService: GameService, private router: Router) {}
  validateName(): string | null {
    if (
      this.name.length < VALIDATION_CONSTANTS.GAME.NAME_MIN_LENGTH ||
      this.name.length > VALIDATION_CONSTANTS.GAME.NAME_MAX_LENGTH
    ) {
      return VALIDATION_CONSTANTS.GAME.NAME_ERROR_MESSAGE;
    }
    return null;
  }

  validateDescription(): string | null {
    if (
      this.description.length <
        VALIDATION_CONSTANTS.GAME.DESCRIPTION_MIN_LENGTH ||
      this.description.length > VALIDATION_CONSTANTS.GAME.DESCRIPTION_MAX_LENGTH
    ) {
      return VALIDATION_CONSTANTS.GAME.DESCRIPTION_ERROR_MESSAGE;
    }
    return null;
  }

  validateImageUrl(): string | null {
    if (true) {
      return VALIDATION_CONSTANTS.GAME.IMAGE_URL_MESSAGE;
    }
  }

  submitForm() {
    if (this.gameCreateForm.valid) {
      const newGame: Game = {
        _id: '',
        id: uuidv4(),
        name: this.name,
        description: this.description,
        version: this.version,
        releaseDate: this.releaseDate,
        ageRestriction: this.ageRestriction,
        releaseStatusType: this.status,
        supportsPC: this.supportsPC,
        supportsPS: this.supportsPS,
        supportsXbox: this.supportsXbox,
        supportsNintendo: this.supportsNintendo,
        imageUrl: this.imageUrl,
      };

      this.gameService.createNewGame(newGame).subscribe({
        next: (response) => {
          console.log(VALIDATION_MESSAGES.GAME.CREATE_NEW_SUCCESS);
          // this.gameCreateForm.reset();
          const redirectUrl = response.redirectUrl;
          // Navigate to the URL
          this.router.navigate([redirectUrl]);
        },
        error: (error) => {
          console.error(error);
          console.error(VALIDATION_MESSAGES.GAME.CREATE_NEW_ERROR, error);
        },
      });
    } else {
      console.error(VALIDATION_MESSAGES.FORM.INVALID_ERROR);
    }
  }
}
