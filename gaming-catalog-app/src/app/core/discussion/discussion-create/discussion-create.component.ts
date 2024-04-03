import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DiscussionService } from '../discussion.service';
import { Discussion } from 'src/app/interfaces/discussion.interface';
import { VALIDATION_MESSAGES } from 'src/app/shared/constants/validation.errors';

@Component({
  selector: 'app-discussion-create',
  templateUrl: './discussion-create.component.html',
  styleUrls: ['./discussion-create.component.css'],
})
export class DiscussionCreateComponent {
  @ViewChild('discussionCreateForm', { static: false })
  discussionCreateForm!: NgForm;

  _id: string = '';
  topic: string = '';
  description: string = '';
  datePosted: Date = new Date();
  author: string = '';
  messages: string[] = [];

  constructor(
    private discussionService: DiscussionService,
    private router: Router
  ) {}

  submitForm() {
    if (this.discussionCreateForm.valid) {
      const newDiscussion: Discussion = {
        _id: '',
        topic: this.topic,
        description: this.description,
        datePosted: this.datePosted,
        author: 'user',
        messages: this.messages,
      };

      this.discussionService.createNewDiscussion(newDiscussion).subscribe({
        next: (response) => {
          console.log(VALIDATION_MESSAGES.DISCUSSION.CREATE_NEW_SUCCESS);
          // this.gameCreateForm.reset();
          const redirectUrl = response.redirectUrl;
          // Navigate to the URL
          this.router.navigate([redirectUrl]);
        },
        error: (error) => {
          console.error(error);
          console.error(VALIDATION_MESSAGES.DISCUSSION.CREATE_NEW_ERROR, error);
        },
      });
    } else {
      console.error(VALIDATION_MESSAGES.FORM.INVALID_ERROR);
    }
  }
}
