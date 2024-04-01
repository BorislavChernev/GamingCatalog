import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable, catchError, throwError } from 'rxjs';
import { Game } from 'src/app/interfaces/game.interface';

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
          console.error('Error fetching all games:', error);
          return throwError(
            () =>
              new Error(
                'Something went wrong while fetching all games. Please try again later.'
              )
          );
        })
      );
  }

  getGameDetails(gameId: string): Observable<Game | undefined> {
    return this.firestore
      .collection<Game>('games')
      .doc<Game>(gameId)
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error(`Error getching game details for ID ${gameId}`, error);
          return throwError(
            () =>
              new Error(
                'Something went wrong while fetching game details. Please try again later.'
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
        console.error('Error creating new game:', error);
        throw new Error('Failed to create new game. Please try again later');
      });
  }

  editGameById(gameId: string, updatedGameData: Partial<Game>): Promise<void> {
    return this.firestore
      .collection<Game>('games')
      .doc(gameId)
      .update(updatedGameData)
      .catch((error) => {
        console.error(`Error editing game with ID ${gameId}`);
        throw new Error('Failed to edit game. Please try again later.');
      });
  }
}
