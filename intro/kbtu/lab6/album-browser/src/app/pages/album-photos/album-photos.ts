import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AlbumService } from '../../services/album';
import { Photo } from '../../models/photo.model';

@Component({
  standalone: true,
  selector: 'app-album-photos',
  templateUrl: './album-photos.html',
  styleUrl: './album-photos.css',
})
export class AlbumPhotosComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private albumService = inject(AlbumService);

  albumId = signal<number>(0);
  photos = signal<Photo[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.albumId.set(id);

    this.loading.set(true);
    this.error.set('');

    this.albumService.getAlbumPhotos(id).subscribe({
      next: (data) => {
        this.photos.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load photos');
        this.loading.set(false);
      },
    });
  }

  back(): void {
    this.router.navigate(['/albums', this.albumId()]);
  }
}
