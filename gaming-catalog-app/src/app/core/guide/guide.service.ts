import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable, catchError, throwError } from 'rxjs';
import { Guide } from 'src/app/interfaces/guide.interface';
import { VALIDATION_MESSAGES } from 'src/app/shared/constants/validation.errors';

@Injectable({
  providedIn: 'root',
})
export class GuideService {
  constructor(private firestore: AngularFirestore) {}

  getAllGuides(): Observable<Guide[]> {
    return this.firestore
      .collection<Guide>('guides')
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error(VALIDATION_MESSAGES.GUIDE.GET_ALL_ERROR, error);
          return throwError(
            () => new Error(VALIDATION_MESSAGES.GUIDE.GET_ALL_ERROR)
          );
        })
      );
  }

  getGuideDetailsById(GuideId: string): Observable<Guide | undefined> {
    return this.firestore
      .collection<Guide>('guides')
      .doc<Guide>(GuideId)
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error(
            VALIDATION_MESSAGES.GUIDE.GET_DETAILS_BY_ID_ERROR.replace(
              '%s',
              GuideId
            ),
            error
          );
          return throwError(
            () =>
              new Error(
                VALIDATION_MESSAGES.GUIDE.GET_DETAILS_BY_ID_ERROR.replace(
                  '%s',
                  GuideId
                )
              )
          );
        })
      );
  }

  createNewGuide(Guide: Guide): Promise<DocumentReference<Guide>> {
    return this.firestore
      .collection<Guide>('guides')
      .add(Guide)
      .catch((error) => {
        console.error(VALIDATION_MESSAGES.GUIDE.CREATE_NEW_ERROR, error);
        throw new Error(VALIDATION_MESSAGES.GUIDE.CREATE_NEW_ERROR);
      });
  }

  editGuideById(
    GuideId: string,
    updatedGuideData: Partial<Guide>
  ): Promise<void> {
    return this.firestore
      .collection<Guide>('guides')
      .doc(GuideId)
      .update(updatedGuideData)
      .catch((error) => {
        console.error(
          VALIDATION_MESSAGES.GUIDE.EDIT_BY_ID_ERROR.replace('%s', GuideId),
          error
        );
        throw new Error(VALIDATION_MESSAGES.GUIDE.EDIT_BY_ID_ERROR);
      });
  }
}
