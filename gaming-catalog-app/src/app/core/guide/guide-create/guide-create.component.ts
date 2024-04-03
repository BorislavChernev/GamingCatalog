import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GuideService } from '../guide.service';
import { Router } from '@angular/router';
import { Guide } from 'src/app/interfaces/guide.interface';

@Component({
  selector: 'app-guide-create',
  templateUrl: './guide-create.component.html',
  styleUrls: ['./guide-create.component.css'],
})
export class GuideCreateComponent {
  @ViewChild('guideCreateForm', { static: false }) guideCreateForm!: NgForm;

  title: string = '';
  description: string = '';
  language: string = '';
  category: string = '';
  gameId: string = '';

  constructor(private guideService: GuideService, private router: Router) {}

  submitForm() {
    if (this.guideCreateForm.valid) {
      const newGuide: Guide = {
        _id: '',
        title: this.title,
        description: this.description,
        language: this.language,
        category: this.category,
        gameId: this.gameId,
        author: 'user',
        // Any additional fields
      };
      console.log(newGuide);

      this.guideService.createGameGuide(newGuide).subscribe({
        next: (response) => {
          console.log('Guide created successfully!');
          this.router.navigate(['/Guide/All']);
        },
        error: (error) => {
          console.error('Error creating guide:', error);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
