import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { News } from '@shared/models/news.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() news: News = {} as News;
  @Output() delete = new EventEmitter<number>();
  ngOnInit() {
    if (!this.news) {
      console.warn('No news data received');
    }
  }

  confirmDelete(newsId: number) {
    const confirmed = window.confirm('¿Estás seguro de eliminar esta noticia?');
    if (confirmed) {
      this.delete.emit(newsId);
    }
  }
  deleteNews(newsId: number) {
    const confirmed = window.confirm('¿Estás seguro de eliminar permanentemente esta noticia?');
    if (confirmed) {
      this.delete.emit(newsId);
    }
  }
}




