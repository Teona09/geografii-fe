import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { levelBaseUrl } from '../constants/constants';
import { LevelModel } from '../models/level.model';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  private baseUrl = levelBaseUrl;
  constructor(private http: HttpClient) {}

  getLevelById(id: number): Observable<LevelModel> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<LevelModel>(url);
  }

}
