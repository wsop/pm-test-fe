import {Component, EventEmitter, Output} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-step1',
  imports: [MatError, MatLabel, MatFormField, ReactiveFormsModule, NgIf, MatInput, MatCheckbox, MatButton],
  templateUrl: './step1.component.html',
  standalone: true,
  styleUrls: ['./step1.component.scss']
})

export class Step1Component {

  @Output() submit = new EventEmitter<any>();

  step1Form: FormGroup;

  hasErrors: boolean = false;
  passNotMatch: boolean = false;

  constructor(private fb: FormBuilder) {
    this.step1Form = this.fb.group({
      username: ['test@email.ar', [Validators.required, Validators.email]],
      password: ['AA11bb', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)],],
      confirmPassword: ['AA11bb', Validators.required],
      agree: ['', Validators.required],

    }, {validators: this.passwordsMatchValidator});
  }

  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {notMatching: true};
  }

  goToStep2() {

    this.passNotMatch = this.step1Form.errors ? this.step1Form.errors['notMatching'] : false;
    this.hasErrors = this.step1Form.invalid;

    if (this.step1Form.valid) {
      this.submit.emit(this.step1Form.value);
    }

  }
}
