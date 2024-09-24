import { Component, OnInit } from '@angular/core';
import { VideoGamesService } from '../../services/video-games.service';

@Component({
  selector: 'app-video-games',
  templateUrl: './video-games.component.html',
  styleUrls: ['./video-games.component.css']
})
export class VideoGamesComponent implements OnInit {
  games: any[] = [];  
  loading = true;
  filters = {
    name: '',
    score: '',
    orderBy: 'releaseDate'
  };
  pagination = {
    page: 1,
    pageSize: 10,
    pageCount: 1,
    total: 0
  };

  constructor(private videoGamesService: VideoGamesService) {}

  ngOnInit(): void {
    this.loadGamesWithDelay();
  }

  loadGamesWithDelay(): void {
    this.loading = true;
    setTimeout(() => {
      this.loadGamesFromApi();  
    }, 2000);
  }

  loadGamesFromApi(): void {
    this.loading = true;
    const { name, score, orderBy } = this.filters;
    const { page, pageSize } = this.pagination;

    this.videoGamesService.getFilteredGames(name, score, orderBy, page, pageSize).subscribe(response => {
      this.games = response.data;  
      this.pagination.total = response.meta.pagination.total;
      this.pagination.pageCount = response.meta.pagination.pageCount; 
      this.loading = false; 
    });
  }

  applyFilters(): void {
    this.pagination.page = 1;
    this.loadGamesFromApi(); 
  }

  clearFilters(): void {
    this.filters = {
      name: '',
      score: '',
      orderBy: 'releaseDate'
    };
    this.pagination.page = 1;
    this.loadGamesFromApi(); 
  }

  onPageChange(newPage: number): void {
    if (newPage > 0 && newPage <= this.pagination.pageCount) {
      this.pagination.page = newPage;
      this.loadGamesFromApi();
    }
  }
}