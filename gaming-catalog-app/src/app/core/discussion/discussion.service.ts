import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable, catchError, throwError } from 'rxjs';
import { Discussion } from 'src/app/interfaces/discussion.interface';
import { VALIDATION_MESSAGES } from 'src/app/shared/constants/validation.errors';

@Injectable({
  providedIn: 'root',
})
export class DiscussionService {
  constructor(private firestore: AngularFirestore) {}

  getAllDiscussions(): Observable<Discussion[]> {
    return this.firestore
      .collection<Discussion>('discussions')
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error(VALIDATION_MESSAGES.DISCUSSION.GET_ALL_ERROR, error);
          return throwError(
            () => new Error(VALIDATION_MESSAGES.DISCUSSION.GET_ALL_ERROR)
          );
        })
      );
  }

  getDiscussionDetailsById(
    DiscussionId: string
  ): Observable<Discussion | undefined> {
    return this.firestore
      .collection<Discussion>('discussions')
      .doc<Discussion>(DiscussionId)
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error(
            VALIDATION_MESSAGES.DISCUSSION.GET_DETAILS_BY_ID_ERROR.replace(
              '%s',
              DiscussionId
            ),
            error
          );
          return throwError(
            () =>
              new Error(
                VALIDATION_MESSAGES.DISCUSSION.GET_DETAILS_BY_ID_ERROR.replace(
                  '%s',
                  DiscussionId
                )
              )
          );
        })
      );
  }

  createNewDiscussion(
    Discussion: Discussion
  ): Promise<DocumentReference<Discussion>> {
    return this.firestore
      .collection<Discussion>('Discussions')
      .add(Discussion)
      .catch((error) => {
        console.error(VALIDATION_MESSAGES.DISCUSSION.CREATE_NEW_ERROR, error);
        throw new Error(VALIDATION_MESSAGES.DISCUSSION.CREATE_NEW_ERROR);
      });
  }

  editDiscussionById(
    DiscussionId: string,
    updatedDiscussionData: Partial<Discussion>
  ): Promise<void> {
    return this.firestore
      .collection<Discussion>('Discussions')
      .doc(DiscussionId)
      .update(updatedDiscussionData)
      .catch((error) => {
        console.error(
          VALIDATION_MESSAGES.DISCUSSION.EDIT_BY_ID_ERROR.replace(
            '%s',
            DiscussionId
          ),
          error
        );
        throw new Error(VALIDATION_MESSAGES.DISCUSSION.EDIT_BY_ID_ERROR);
      });
  }
}
