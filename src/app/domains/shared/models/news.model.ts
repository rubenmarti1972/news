export interface News {
  id: number;          // Identificador único para la noticia (puede ser un id generado por la API)
  title: string;       // Título de la noticia
  description: string; // Descripción breve de la noticia
  urlToImage: string;    // URL de la imagen asociada con la noticia
  publishedAt: string; // Fecha de publicación de la noticia
  slug: string;        // Slug de la noticia (para usarlo en URLs)
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: News[];  // La propiedad 'articles' contiene las noticias
}
