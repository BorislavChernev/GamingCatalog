import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Game } from 'src/app/interfaces/game.interface';
import { VALIDATION_MESSAGES } from 'src/app/shared/constants/validation.errors';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly baseUrl = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) {}

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/games`).pipe(
      catchError((error) => {
        console.error(VALIDATION_MESSAGES.GAME.GET_ALL_ERROR, error);
        return throwError(
          () => new Error(VALIDATION_MESSAGES.GAME.GET_ALL_ERROR)
        );
      })
    );
  }

  getGameDetailsById(gameId: string): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/games/${gameId}`).pipe(
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

  createNewGame(game: Game): Observable<any> {
    return this.http.post<Game>(`${this.baseUrl}/games`, game).pipe(
      catchError((error) => {
        console.error('Error adding game:', error);
        return throwError(() => error);
      })
    );
  }

  editGameById(
    gameId: string,
    updatedGameData: Partial<Game>
  ): Observable<void> {
    return this.http
      .put<void>(`${this.baseUrl}/games/${gameId}`, updatedGameData)
      .pipe(
        catchError((error) => {
          console.error(
            VALIDATION_MESSAGES.GAME.EDIT_BY_ID_ERROR.replace('%s', gameId),
            error
          );
          return throwError(
            () =>
              new Error(
                VALIDATION_MESSAGES.GAME.EDIT_BY_ID_ERROR.replace('%s', gameId)
              )
          );
        })
      );
  }
}
