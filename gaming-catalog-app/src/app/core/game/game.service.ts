import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable, catchError, throwError } from 'rxjs';
import { Game } from 'src/app/interfaces/game.interface';
import { VALIDATION_MESSAGES } from 'src/app/shared/constants/validation.errors';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private firestore: AngularFirestore) {}

  getAllGames(): Observable<Game[]> {
    return this.firestore
      .collection<Game>('games')
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error(VALIDATION_MESSAGES.GAME.GET_ALL_ERROR, error);
          return throwError(
            () => new Error(VALIDATION_MESSAGES.GAME.GET_ALL_ERROR)
          );
        })
      );
  }

  getGameDetailsById(gameId: string): Observable<Game | undefined> {
    return this.firestore
      .collection<Game>('games')
      .doc<Game>(gameId)
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error(
            VALIDATION_MESSAGES.GAME.GET_DETAILS_BY_ID_ERROR.replace(
              '%s',
              gameId
            ),
            error
          );
          return throwError(
            () =>
              new Error(
                VALIDATION_MESSAGES.GAME.GET_DETAILS_BY_ID_ERROR.replace(
                  '%s',
                  gameId
                )
              )
          );
        })
      );
  }

  createNewGame(game: Game): Promise<DocumentReference<Game>> {
    return this.firestore
      .collection<Game>('games')
      .add(game)
      .catch((error) => {
        console.error(VALIDATION_MESSAGES.GAME.CREATE_NEW_ERROR, error);
        throw new Error(VALIDATION_MESSAGES.GAME.CREATE_NEW_ERROR);
      });
  }

  editGameById(gameId: string, updatedGameData: Partial<Game>): Promise<void> {
    return this.firestore
      .collection<Game>('games')
      .doc(gameId)
      .update(updatedGameData)
      .catch((error) => {
        console.error(
          VALIDATION_MESSAGES.GAME.EDIT_BY_ID_ERROR.replace('%s', gameId),
          error
        );
        throw new Error(
          VALIDATION_MESSAGES.GAME.EDIT_BY_ID_ERROR.replace('%s', gameId)
        );
      });
  }
}
