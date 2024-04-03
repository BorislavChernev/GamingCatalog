import { Component, OnInit } from '@angular/core';
import { Guide } from 'src/app/interfaces/guide.interface';
import { GuideService } from '../guide.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guide-details',
  templateUrl: './guide-details.component.html',
  styleUrls: ['./guide-details.component.css'],
})
export class GuideDetailsComponent implements OnInit {
  guide: Guide | undefined; // Adjust according to your data model

  constructor(
    private route: ActivatedRoute,
    private gameService: GuideService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.gameService.getGuideDetailsById(id).subscribe({
        next: (guide: Guide) => {
          console.log(guide);

          this.guide = guide; // Assuming `getGameDetailsById` fetches the game data based on `id`
        },
        error: (error) => {
          console.error('Error fetching game details:', error);
        },
      });
    }
  }
}
