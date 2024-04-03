import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Review } from 'src/app/interfaces/review.interface';
import { VALIDATION_MESSAGES } from 'src/app/shared/constants/validation.errors';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly baseUrl = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) {}

  getAllGameReviews(id: string): Observable<Review[]> {
    return this.http
      .get<Review[]>(`${this.baseUrl}/api/reviews/game/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching reviews:', error);
          return throwError(
            () =>
              new Error(
                VALIDATION_MESSAGES.REVIEW.GET_ALL_ERROR.replace('%s', id)
              )
          );
        })
      );
  }

  createGameReview(review: Review): Observable<Review> {
    console.log('vai vai');

    console.log(review);
    const id = review.gameId;
    console.log(id);
    return this.http
      .post<Review>(`${this.baseUrl}/api/review/game/${id}/create`, review)
      .pipe(
        catchError((error) => {
          console.log('e sq si eba mamata');

          console.error('Error creating review:', id);
          return throwError(
            () =>
              new Error(
                VALIDATION_MESSAGES.REVIEW.CREATE_NEW_ERROR.replace(
                  '%s',
                  review.gameId
                )
              )
          );
        })
      );
  }
}
