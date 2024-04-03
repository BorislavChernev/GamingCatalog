import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Discussion } from 'src/app/interfaces/discussion.interface';
import { VALIDATION_MESSAGES } from 'src/app/shared/constants/validation.errors';
import { Message } from 'src/app/interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class DiscussionService {
  private readonly baseUrl = 'http://127.0.0.1:3000';
  constructor(private http: HttpClient) {}

  // getAllDiscussions(): Observable<Discussion[]> {
  //   return this.firestore
  //     .collection<Discussion>('discussions')
  //     .valueChanges()
  //     .pipe(
  //       catchError((error) => {
  //         console.error(VALIDATION_MESSAGES.DISCUSSION.GET_ALL_ERROR, error);
  //         return throwError(
  //           () => new Error(VALIDATION_MESSAGES.DISCUSSION.GET_ALL_ERROR)
  //         );
  //       })
  //     );
  // }

  // getDiscussionDetailsById(
  //   DiscussionId: string
  // ): Observable<Discussion | undefined> {
  //   return this.firestore
  //     .collection<Discussion>('discussions')
  //     .doc<Discussion>(DiscussionId)
  //     .valueChanges()
  //     .pipe(
  //       catchError((error) => {
  //         console.error(
  //           VALIDATION_MESSAGES.DISCUSSION.GET_DETAILS_BY_ID_ERROR.replace(
  //             '%s',
  //             DiscussionId
  //           ),
  //           error
  //         );
  //         return throwError(
  //           () =>
  //             new Error(
  //               VALIDATION_MESSAGES.DISCUSSION.GET_DETAILS_BY_ID_ERROR.replace(
  //                 '%s',
  //                 DiscussionId
  //               )
  //             )
  //         );
  //       })
  //     );
  // }
  deleteDiscussionById(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/Discussion/Delete/${id}`)
      .pipe(
        catchError((error) => {
          console.error(
            VALIDATION_MESSAGES.DISCUSSION.DELETE_ERROR.replace('%s', id),
            error
          );
          return throwError(
            () =>
              new Error(
                VALIDATION_MESSAGES.DISCUSSION.DELETE_ERROR.replace('%s', id)
              )
          );
        })
      );
  }

  getAllDiscussions(): Observable<Discussion[]> {
    console.log('koi kaza ko');

    return this.http.get<Discussion[]>(`${this.baseUrl}/discussions`).pipe(
      catchError((error) => {
        console.error(VALIDATION_MESSAGES.DISCUSSION.GET_ALL_ERROR, error);
        return throwError(
          () => new Error(VALIDATION_MESSAGES.DISCUSSION.GET_ALL_ERROR)
        );
      })
    );
  }

  createNewDiscussion(discussion: Discussion): Observable<any> {
    return this.http
      .post<Discussion>(`${this.baseUrl}/Discussion/Create`, discussion)
      .pipe(
        catchError((error) => {
          console.error('Error adding discussion:', error);
          return throwError(() => error);
        })
      );
  }

  sendMessage(discussionId: string, messageContent: string): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/api/discussions/${discussionId}/messages`,
      { content: messageContent }
    );
  }

  loadMessages(discussionId: string): Observable<Message[]> {
    return this.http.get<Message[]>(
      `${this.baseUrl}/api/discussions/${discussionId}/messages`
    );
  }
}
