import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '@shared/services/news.service'; // Cambiado a NewsService
import { News } from '@shared/models/news.model';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './news-list.component.html',
})
export default class NewsListComponent implements OnInit {
  news: News[] = [];
  private newsService = inject(NewsService);
  ngOnInit() {
     this.newsService.fetchNews().subscribe(newsList => {
      this.news = newsList;
    });
  }

  trackNews(index: number, newsItem: News): string {
    return newsItem.id.toString();
  }
}


