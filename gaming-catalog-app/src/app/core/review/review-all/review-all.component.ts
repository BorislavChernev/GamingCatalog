import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/interfaces/review.interface';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-review-all',
  templateUrl: './review-all.component.html',
  styleUrls: ['./review-all.component.css'],
})
export class ReviewAllComponent implements OnInit {
  gameId: string = '';
  reviews: Review[] = [];
  newReview: Review = { gameId: '', type: '', description: '', author: 'user' };
  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.gameId = params.get('id')!;
      this.loadReviews();
    });
  }

  loadReviews(): void {
    console.log('dali?');

    this.reviewService.getAllGameReviews(this.gameId).subscribe((reviews) => {
      this.reviews = reviews;
    });
  }

  submitReview(): void {
    console.log('submitReview point');
    console.log(this.newReview);

    if (this.newReview.type && this.newReview.description) {
      this.newReview.gameId = this.gameId;
      console.log('submitReviewAssign gameId point');
      console.log(this.newReview);
      this.reviewService.createGameReview(this.newReview).subscribe({
        next: () => {
          this.newReview.type = '';
          this.newReview.description = '';
          this.loadReviews();
        },
        error: (error) => {
          console.error('Error creating review:', error);
        },
      });
    } else {
      console.error('Review type and description are required.');
    }
  }
}
