import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AlbumService } from '../../services/album';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './album-detail.html',
  styleUrl: './album-detail.css',
})
export class AlbumDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private albumService = inject(AlbumService);

  album = signal<Album | null>(null);
  loading = signal(true);
  error = signal('');

  editedTitle = signal('');   // ✅ отдельно храним title

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.loading.set(true);
    this.error.set('');
    this.album.set(null);

    this.albumService.getAlbum(id).subscribe({
      next: (a) => {
        this.album.set(a);
        this.editedTitle.set(a.title);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load album');
        this.loading.set(false);
      },
    });
  }

  save(): void {
    const current = this.album();
    if (!current) return;

    const title = this.editedTitle().trim();
    if (!title) {
      this.error.set('Title cannot be empty');
      return;
    }

    const updated: Album = { ...current, title };

    this.albumService.updateAlbum(updated).subscribe({
      next: (resp) => {
        this.album.set(resp);
        this.editedTitle.set(resp.title);
      },
      error: () => {
        this.error.set('Failed to update album');
      },
    });
  }

  back(): void {
    this.router.navigate(['/albums']);
  }
}
