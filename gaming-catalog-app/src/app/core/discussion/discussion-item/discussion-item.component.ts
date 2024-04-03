import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Discussion } from 'src/app/interfaces/discussion.interface';
import { DiscussionService } from '../discussion.service';

@Component({
  selector: 'app-discussion-item',
  templateUrl: './discussion-item.component.html',
  styleUrls: ['./discussion-item.component.css'],
})
export class DiscussionItemComponent {
  @Input() discussion!: Discussion;
  constructor(
    private router: Router,
    private discussionService: DiscussionService
  ) {}

  deleteDiscussion(id: string) {
    if (id) {
      this.discussionService.deleteDiscussionById(id).subscribe({
        next: () => {
          console.log('discussion deleted successfully');
          // Optionally, navigate to another route after deletion
          this.router.navigate(['/Discussion/All']);
        },
        error: (error) => {
          console.error('Error deleting discussion:', error);
        },
      });
    }
  }

  getDiscussionDetails(id: string) {
    console.log(id);

    this.router.navigate(['Discussion', 'Details', id]);
  }
}
