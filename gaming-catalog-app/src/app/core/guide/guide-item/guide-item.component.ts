import { Component, Input } from '@angular/core';
import { Guide } from 'src/app/interfaces/guide.interface';
import { GuideService } from '../guide.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-guide-item',
  templateUrl: './guide-item.component.html',
  styleUrls: ['./guide-item.component.css'],
})
export class GuideItemComponent {
  @Input() guide!: Guide;
  constructor(
    private router: Router,
    private guideService: GuideService,
    public authService: AuthService
  ) {}

  deleteGuide(id: string): void {
    console.log(id);
    if (id) {
      this.guideService.deleteGuideById(id).subscribe({
        next: () => {
          console.log('Game deleted successfully');
          // Optionally, navigate to another route after deletion
          this.router.navigate(['/Guide/All']); // Navigate to home page
        },
        error: (error) => {
          console.error('Error deleting guide:', error);
          // Handle error
        },
      });
    }
  }

  getGameDetails(id: string) {
    console.log(id);

    this.router.navigate(['Guide', 'Details', id]);
  }
}
