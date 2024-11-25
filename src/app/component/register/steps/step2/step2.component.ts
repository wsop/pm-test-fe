import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatError, MatFormField, MatLabel} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
  imports: [MatError, MatOption, MatSelect, MatLabel, MatFormField, ReactiveFormsModule, NgIf, NgForOf, MatButton],
  standalone: true
})
export class Step2Component {

  @Output() submit = new EventEmitter<any>();

  step2Form: FormGroup;
  countries: any[] = [];
  cities: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.step2Form = this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
    });
    this.loadCountries();
  }

  loadCountries() {
    this.http.get('http://localhost:62629/api/countries')
      .subscribe((data: any) => {
        this.countries = data;
      });
  }

  loadCities(countryId: string) {
    this.http.get(`http://localhost:62629/api/countries/${countryId}/provinces`)
      .subscribe((data: any) => {
        this.cities = data;
      });
  }

  save() {
    if (this.step2Form.valid) {
      this.submit.emit(this.step2Form.value);
    }
  }
}
