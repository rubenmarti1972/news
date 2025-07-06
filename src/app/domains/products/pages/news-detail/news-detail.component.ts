import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '@shared/services/news.service';// Si se usa en tu caso
import type { News } from '@shared/models/news.model';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NewsDetailComponent implements OnInit {
  news = signal<News | null>(null);
  cover = signal<string>('');

  private route = inject(ActivatedRoute);
  private newsService = inject(NewsService);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (!slug) return;
      this.newsService.getOneSlug(slug).subscribe({
        next: newsItem => {
          this.news.set(newsItem);
          if (newsItem.urlToImage) {
            this.cover.set(newsItem.urlToImage);
          }
        },
      });
    });
  }
}
