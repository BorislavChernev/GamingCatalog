import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/interfaces/review.interface';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.css'],
})
export class ReviewItemComponent implements OnInit {
  @Input() review!: Review;

  constructor() {}

  ngOnInit(): void {
    console.log('this is the review', this.review);
  }
}
