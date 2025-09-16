import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/User';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = environment.API_URL;

  // List
  users = signal<User[]>([]);
  currentPage = signal(1);
  isLoading = signal(false);
  searchTerm = signal('');
  // Detail
  selectedUser = signal<User | null>(null);

  // Search
  recentSearches = signal<string[]>(JSON.parse(localStorage.getItem('recentSearches') || '[]'));

  private fetchUsers(page: number, name?: string) {
    this.isLoading.set(true);
    const params: any = { page };
    if (name) params.name = name;

    this.http
      .get<User[]>(this.apiUrl, { params })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (data) => {
          this.users.set(data);
          this.currentPage.set(page);
        },
      });
  }

  loadUsers(page: number = 1, name?: string) {
    this.searchTerm.set(name ?? '');
    this.fetchUsers(page, name);
  }

  nextPage() {
    this.fetchUsers(this.currentPage() + 1, this.searchTerm());
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.fetchUsers(this.currentPage() - 1, this.searchTerm());
    }
  }

  getUserById(id: number) {
    this.isLoading.set(true);

    this.http
      .get<User>(`${this.apiUrl}/${id}`)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (user) => this.selectedUser.set(user),
        error: (err) => {
          console.error(err);
          this.selectedUser.set(null);
        },
      });
  }

  addSearchTerm(term: string) {
    if (!term) return;

    const updated = [term, ...this.recentSearches()]
      .filter((v, i, a) => a.indexOf(v) === i)
      .slice(0, 5);
    this.recentSearches.set(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  }
}
