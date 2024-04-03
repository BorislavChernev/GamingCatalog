import { Component, OnInit } from '@angular/core';
import { DiscussionService } from '../discussion.service';
import { Discussion } from 'src/app/interfaces/discussion.interface';

@Component({
  selector: 'app-discussion-all',
  templateUrl: './discussion-all.component.html',
  styleUrls: ['./discussion-all.component.css'],
})
export class DiscussionAllComponent implements OnInit {
  constructor(private discussionService: DiscussionService) {}

  discussions: Discussion[] = [];

  ngOnInit(): void {
    this.getAllGames();
  }

  getAllGames(): void {
    this.discussionService.getAllDiscussions().subscribe({
      next: (discussions) => {
        this.discussions = discussions;
        console.log('aide brat mie', discussions);
      },
      error: (error) => {
        console.error('Error getting this game:', error);
      },
    });
  }
}
