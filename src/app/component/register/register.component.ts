import {Component} from '@angular/core';
import {Step1Component} from './steps/step1/step1.component';
import {Step2Component} from './steps/step2/step2.component';
import {NgIf} from '@angular/common';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {RegisterService} from '../../services/register.service';

@Component({
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    Step1Component,
    Step2Component,
    MatCardActions,
    NgIf
  ],
  selector: 'app-registration',
  templateUrl: './register.component.html',
  standalone: true,
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  constructor(private registerService: RegisterService) {
  }

  form1data: any

  step1submit(f: any) {
    this.form1data = f
    console.log(' step1submit:', f);
    this.currentStep = 2;
  }

  step2submit(f: any) {
    console.log('step2submit:', f);

    this.registerService.register(this.form1data, f).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        alert('Registration successful');
      },
      error: (err) => {

        if (err.status === 0) {
          console.error('Network error:', err);
          alert('Network error: Unable to connect to the server. Please try again later.');
          return;
        }


        if (err.status >= 400 && err.status < 600) {
          console.error(`HTTP error (status ${err.status}):`, err);

          let errorMessage = 'An unknown error occurred.';
          try {

            const errorBody = err.error;
            if (typeof errorBody === 'string') {
              const parsedError = JSON.parse(errorBody);
              errorMessage = parsedError.message || errorMessage;
            } else if (errorBody?.message) {
              errorMessage = errorBody.message;
            }
          } catch (parseError) {
            console.warn('Failed to parse error message:', parseError);
          }

          alert(`Registration failed: ${errorMessage}`);
          return;
        }

        console.error('Unexpected error:', err);
        alert('An unexpected error occurred. Please try again later.');
      },
    });
  }


  currentStep = 1; // Текущий шаг

}

