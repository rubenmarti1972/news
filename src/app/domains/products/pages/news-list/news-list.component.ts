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
 // news = signal<News[]>([]); //
  //  Usamos signal para almacenar las noticias
  news: News[] = [];

  private newsService = inject(NewsService); // Cambiado a NewsService

  ngOnInit() {
    // Aquí estamos suscribiéndonos al servicio para obtener las noticias
     this.newsService.fetchNews().subscribe(newsList => {
      this.news = newsList; // Asignamos las noticias al componente
    });
  }

  // Función trackBy para mejorar el rendimiento de *ngFor
  trackNews(index: number, newsItem: News): string {
    return newsItem.id.toString();  // Usamos 'id' o cualquier identificador único de cada noticia como string
  }
}


