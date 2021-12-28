import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { levelBaseUrl } from '../constants/constants';
import { LevelModel } from '../models/level.model';
import { HttpUtils } from '../utils/http.utils';

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

  getLevelByRegion(region: string): Observable<LevelModel> {
    const url = `${this.baseUrl}`;
    const params = HttpUtils.setParams({ regiune: region }, {});
    return this.http.get<LevelModel>(url, { params });
  }
}
