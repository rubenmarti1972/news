import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { News, NewsApiResponse } from '@shared/models/news.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  // URL de la API de noticias (Ejemplo: NewsAPI, CurrentsAPI, etc.)
  private newsUrl = 'https://newsapi.org/v2/top-headlines';  // Cambia esto por la URL correcta de la API que uses
  private apiKey = 'fb1187a2f9ea40668c8799acca43ed3d';  // Debes agregar tu clave API aquí (si la API la requiere)

  private news: News[] = [];
  private newsSubject = new BehaviorSubject<News[]>(this.news);

  constructor(private http: HttpClient) { }

  // Obtener las noticias desde la URL
  fetchNews(): Observable<News[]> {
    const url = `${this.newsUrl}?country=us&apiKey=${this.apiKey}`;
    return this.http.get<NewsApiResponse>(url).pipe(
      map(response => {
        this.news = response.articles;
        this.newsSubject.next(this.news);
        return this.news;
      }),
      catchError(err => {
        console.error('Error al cargar noticias', err);
        return [];
      })
    );
  }

  getOneSlug(slug: string): Observable<News> {
    return this.newsSubject.asObservable().pipe(
      map((news: News[]) => {
        const found = news.find(n => n.slug === slug);
        if (!found) {
          throw new Error(`Noticia con slug "${slug}" no encontrada.`);
        }
        return found;
      })
    );
  }

  getNews(): Observable<News[]> {
    return this.newsSubject.asObservable();
  }
}
