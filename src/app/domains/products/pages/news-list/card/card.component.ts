import { Component, Input, OnInit } from '@angular/core';
import { News } from '@shared/models/news.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() news: News = {} as News;  // Valor predeterminado para evitar "undefined"

  ngOnInit() {
    if (!this.news) {
      console.warn('No news data received');
    }
  }
}

