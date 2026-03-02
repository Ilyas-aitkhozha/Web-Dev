import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Album } from '../models/album.model';
import { Photo } from '../models/photo.model';

@Injectable({ providedIn: 'root' })
export class AlbumService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  private createdAlbums: Album[] = [];
  private deletedIds = new Set<number>();
  private titleOverrides = new Map<number, string>();

  constructor(private http: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.baseUrl}/albums`).pipe(
      map((albums) => {
        const filtered = albums.filter(a => !this.deletedIds.has(a.id));
        const patched = filtered.map(a => ({
          ...a,
          title: this.titleOverrides.get(a.id) ?? a.title
        }));
        const local = this.createdAlbums.filter(a => !this.deletedIds.has(a.id));
        return [...local, ...patched];
      })
    );
  }

  getAlbum(id: number): Observable<Album> {
    const local = this.createdAlbums.find(a => a.id === id);
    if (local) {
      return new Observable<Album>((sub) => { sub.next(local); sub.complete(); });
    }

    return this.http.get<Album>(`${this.baseUrl}/albums/${id}`).pipe(
      map(a => ({
        ...a,
        title: this.titleOverrides.get(a.id) ?? a.title
      }))
    );
  }

  getAlbumPhotos(id: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.baseUrl}/albums/${id}/photos`);
  }

  createAlbum(payload: { userId: number; title: string }): Observable<Album> {
    return this.http.post<Album>(`${this.baseUrl}/albums`, payload).pipe(
      map((created) => ({
        ...created,
        id: created.id ?? 101,
        userId: payload.userId,
        title: payload.title
      })),
      map((created) => {
        this.createdAlbums = [created, ...this.createdAlbums];
        return created;
      })
    );
  }

  updateAlbum(album: Album): Observable<Album> {
    this.titleOverrides.set(album.id, album.title);

    return this.http.put<Album>(`${this.baseUrl}/albums/${album.id}`, album).pipe(
      map((resp) => {
        const idx = this.createdAlbums.findIndex(a => a.id === album.id);
        if (idx !== -1) {
          const copy = [...this.createdAlbums];
          copy[idx] = { ...copy[idx], title: album.title };
          this.createdAlbums = copy;
        }
        return { ...resp, title: album.title };
      })
    );
  }

  deleteAlbum(id: number): Observable<void> {
    this.deletedIds.add(id);
    this.titleOverrides.delete(id);
    this.createdAlbums = this.createdAlbums.filter(a => a.id !== id);

    return this.http.delete<void>(`${this.baseUrl}/albums/${id}`);
  }
}
