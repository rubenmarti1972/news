/* import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '@shared/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private storageKey = 'categories';
  private categories: Category[] = this.loadCategories();
  private categoriesSubject = new BehaviorSubject<Category[]>(this.categories);

  private loadCategories(): Category[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveCategories(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.categories));
  }

  getCategories(): Observable<Category[]> {
    return this.categoriesSubject.asObservable();
  }

  addCategory(category: Category): void {
    if (!this.categories.find(c => c.slug === category.slug)) {
      this.categories.push(category);
      this.categoriesSubject.next(this.categories);
      this.saveCategories();
    }
  }
} */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '@shared/models/category.model';
@Injectable({ providedIn: 'root' })
export class CategoryService {
  private storageKey = 'categories';
  private categories: Category[] = this.loadCategories();
  private categoriesSubject = new BehaviorSubject<Category[]>(this.categories);

  private loadCategories(): Category[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveCategories(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.categories));
  }

  getCategories(): Observable<Category[]> {
    return this.categoriesSubject.asObservable();
  }

  addCategory(category: Category): void {
    // 🔑 Generamos un id incremental
    const newId = this.categories.length
      ? Math.max(...this.categories.map(c => c.id)) + 1
      : 1;
    const newCat: Category = { ...category, id: newId };

    if (!this.categories.find(c => c.slug === newCat.slug)) {
      this.categories.push(newCat);
      this.categoriesSubject.next(this.categories);
      this.saveCategories();
    }
  }
}

