import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly apiUrl = 'http://localhost:62629/api/register';//

  constructor(private http: HttpClient) {}

  register(userData: any, locationData: any): Observable<any> {
    const combinedData = { ...userData, ...locationData };
    return this.http.post(this.apiUrl, combinedData);
  }
}
