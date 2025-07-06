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

  constructor(private http: HttpClient) {}

  // Obtener las noticias desde la URL
  fetchNews(): Observable<News[]> {
    const url = `${this.newsUrl}?country=us&apiKey=${this.apiKey}`; // Aquí puedes personalizar la URL según tus necesidades
    return this.http.get<NewsApiResponse>(url).pipe(
      map(response => {
        this.news = response.articles; // Asumiendo que la respuesta tiene una propiedad 'articles' con las noticias
        this.newsSubject.next(this.news); // Actualizamos el estado de las noticias
        return this.news;
      }),
      catchError(err => {
        console.error('Error al cargar noticias', err);
        return [];
      })
    );
  }

  // Obtener una noticia por su slug
  getOneSlug(slug: string): Observable<News> {
    return this.newsSubject.asObservable().pipe(
      map((news: News[]) => {
        const found = news.find(n => n.slug === slug); // Encontramos la noticia por su 'slug'
        if (!found) {
          throw new Error(`Noticia con slug "${slug}" no encontrada.`);
        }
        return found;
      })
    );
  }

  // Obtener todas las noticias como un observable
  getNews(): Observable<News[]> {
    return this.newsSubject.asObservable(); // Devuelve las noticias como un observable
  }
}

