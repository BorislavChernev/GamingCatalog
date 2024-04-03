import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Guide } from 'src/app/interfaces/guide.interface';
import { VALIDATION_MESSAGES } from 'src/app/shared/constants/validation.errors';

@Injectable({
  providedIn: 'root',
})
export class GuideService {
  private readonly baseUrl = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) {}

  getAllGameGuides(): Observable<Guide[]> {
    console.log('got mi e na danaya sega kura');

    return this.http.get<Guide[]>(`${this.baseUrl}/api/guides/game`).pipe(
      catchError((error) => {
        console.error('Error fetching Guides:', error);
        return throwError(
          () => new Error(VALIDATION_MESSAGES.GUIDE.GET_ALL_ERROR)
        );
      })
    );
  }

  createGameGuide(Guide: Guide): Observable<Guide> {
    console.log('vai vai');

    console.log(Guide);
    const id = Guide.gameId;
    console.log(id);
    return this.http
      .post<Guide>(`${this.baseUrl}/api/guide/game/${id}/create`, Guide)
      .pipe(
        catchError((error) => {
          console.log('e sq si eba mamata');

          console.error('Error creating Guide:', id);
          return throwError(
            () =>
              new Error(
                VALIDATION_MESSAGES.GUIDE.CREATE_NEW_ERROR.replace(
                  '%s',
                  Guide.gameId
                )
              )
          );
        })
      );
  }

  deleteGuideById(id: string): Observable<void> {
    console.log('basi vasi', id);

    return this.http.delete<void>(`${this.baseUrl}/Guide/Delete/${id}`).pipe(
      catchError((error) => {
        console.error(
          VALIDATION_MESSAGES.GUIDE.DELETE_ERROR.replace('%s', id),
          error
        );
        return throwError(
          () =>
            new Error(VALIDATION_MESSAGES.GUIDE.DELETE_ERROR.replace('%s', id))
        );
      })
    );
  }
}

// getAllGuides(): Observable<Guide[]> {
//   return this.firestore
//     .collection<Guide>('guides')
//     .valueChanges()
//     .pipe(
//       catchError((error) => {
//         console.error(VALIDATION_MESSAGES.GUIDE.GET_ALL_ERROR, error);
//         return throwError(
//           () => new Error(VALIDATION_MESSAGES.GUIDE.GET_ALL_ERROR)
//         );
//       })
//     );
// }

// getGuideDetailsById(GuideId: string): Observable<Guide | undefined> {
//   return this.firestore
//     .collection<Guide>('guides')
//     .doc<Guide>(GuideId)
//     .valueChanges()
//     .pipe(
//       catchError((error) => {
//         console.error(
//           VALIDATION_MESSAGES.GUIDE.GET_DETAILS_BY_ID_ERROR.replace(
//             '%s',
//             GuideId
//           ),
//           error
//         );
//         return throwError(
//           () =>
//             new Error(
//               VALIDATION_MESSAGES.GUIDE.GET_DETAILS_BY_ID_ERROR.replace(
//                 '%s',
//                 GuideId
//               )
//             )
//         );
//       })
//     );
// }

// createNewGuide(Guide: Guide): Promise<DocumentReference<Guide>> {
//   return this.firestore
//     .collection<Guide>('guides')
//     .add(Guide)
//     .catch((error) => {
//       console.error(VALIDATION_MESSAGES.GUIDE.CREATE_NEW_ERROR, error);
//       throw new Error(VALIDATION_MESSAGES.GUIDE.CREATE_NEW_ERROR);
//     });
// }

// editGuideById(
//   GuideId: string,
//   updatedGuideData: Partial<Guide>
// ): Promise<void> {
//   return this.firestore
//     .collection<Guide>('guides')
//     .doc(GuideId)
//     .update(updatedGuideData)
//     .catch((error) => {
//       console.error(
//         VALIDATION_MESSAGES.GUIDE.EDIT_BY_ID_ERROR.replace('%s', GuideId),
//         error
//       );
//       throw new Error(VALIDATION_MESSAGES.GUIDE.EDIT_BY_ID_ERROR);
//     });
// }
