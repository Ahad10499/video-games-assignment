import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoGamesService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getGames(page: number, pageSize: number): Observable<any> {
    const query = `${this.apiUrl}?pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    return this.http.get<any>(query);
  }

  getFilteredGames(name: string, score: any, orderBy: string, page: number, pageSize: number): Observable<any> {
    let query = `${this.apiUrl}?pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  
    if (name) {
      query += `&filters[name][$containsi]=${name}`;
    }

    if (score !== undefined) {
      query += `&filters[rating][$gte]=${score}`;
    }

    query += `&sort=${orderBy === 'releaseDate' ? 'firstReleaseDate' : 'rating'}`;

    return this.http.get<any>(query);
  }
}