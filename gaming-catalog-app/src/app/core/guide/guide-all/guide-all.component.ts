import { Component } from '@angular/core';
import { Guide } from 'src/app/interfaces/guide.interface';
import { GuideService } from '../guide.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guide-all',
  templateUrl: './guide-all.component.html',
  styleUrls: ['./guide-all.component.css'],
})
export class GuideAllComponent {
  guides: Guide[] = [];
  newReview: Guide = {
    _id: '',
    title: '',
    description: '',
    language: '',
    category: '',
    gameId: '',
    author: 'user',
  };
  constructor(
    private route: ActivatedRoute,
    private guideService: GuideService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.loadGuides();
    });
  }

  loadGuides(): void {
    console.log('dali?');

    this.guideService.getAllGameGuides().subscribe((guides) => {
      this.guides = guides;
      console.log('svurshihme');

      console.log(this.guides);
    });
  }
}
