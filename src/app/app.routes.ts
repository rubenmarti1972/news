import { Routes } from '@angular/router';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { NotFoundComponent } from '@info/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./domains/products/pages/news-list/news-list.component'),
      },
      {
        path: 'category/:slug',
        loadComponent: () =>
          import('./domains/products/pages/news-list/news-list.component'),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./domains/info/pages/about/about.component'),
      },
      {
        path: 'product/:slug',
        loadComponent: () =>
          import(
            './domains/products/pages/news-detail/news-detail.component'
          ),
      },
      {
        path: 'carga-categorias',
        loadComponent: () =>
          import(
            './domains/news/components/carga-categorias/carga-categorias.component'
          ).then((m) => m.CargaCategoriasComponent),
      },
      {
        path: 'carga-departamentos',
        loadComponent: () =>
          import(
            './domains/news/components/department/department.component'
          ).then((m) => m.DepartmentComponent),
      },

    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
