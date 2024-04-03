import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscussionService } from '../discussion.service';
import { Message } from 'src/app/interfaces/message.interface';

@Component({
  selector: 'app-discussion-details',
  templateUrl: './discussion-details.component.html',
  styleUrls: ['./discussion-details.component.css'],
})
export class DiscussionDetailsComponent implements OnInit {
  discussionId!: string;
  messages: Message[] = [];
  newMessageContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private discussionService: DiscussionService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.discussionId = params.get('id')!;
      // Load messages for this discussion
      this.loadMessages();
    });
  }

  loadMessages(): void {
    this.discussionService.loadMessages(this.discussionId).subscribe(
      (messages) => {
        this.messages = messages;
      },
      (error) => {
        console.error('Error loading messages:', error);
        // Handle error
      }
    );
  }

  sendMessage(): void {
    if (this.newMessageContent) {
      this.discussionService
        .sendMessage(this.discussionId, this.newMessageContent)
        .subscribe({
          next: () => {
            // Clear input field after sending message
            this.newMessageContent = '';
            // Reload messages to display the newly sent message
            this.loadMessages();
          },
          error: (error) => {
            console.error('Error sending message:', error);
            // Handle error
          },
        });
    }
  }
}
