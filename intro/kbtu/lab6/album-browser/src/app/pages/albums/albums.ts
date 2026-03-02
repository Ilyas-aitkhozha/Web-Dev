import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AlbumService } from '../../services/album';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './albums.html',
  styleUrl: './albums.css',
})
export class AlbumsComponent implements OnInit {
  albums = signal<Album[]>([]);
  loading = signal(true);
  error = signal('');

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.loading.set(true);
    this.error.set('');

    this.albumService.getAlbums().subscribe({
      next: (data) => {
        this.albums.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load albums');
        this.loading.set(false);
      },
    });
  }

  deleteAlbum(id: number, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.albumService.deleteAlbum(id).subscribe({
      next: () => {
        this.albums.set(this.albums().filter(a => a.id !== id));
      },
      error: () => {
        this.error.set('Failed to delete album');
      },
    });
  }
}
