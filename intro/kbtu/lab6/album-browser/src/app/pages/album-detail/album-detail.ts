import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Album } from '../../models/album.model';
import { AlbumService } from '../../services/album';

@Component({
  standalone: true,
  selector: 'app-album-detail',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './album-detail.html',
  styleUrl: './album-detail.css',
})
export class AlbumDetailComponent implements OnInit {
  album: Album | null = null;
  loading = false;
  error = '';
  editedTitle = '';
  saving = false;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAlbum(id);
  }

  loadAlbum(id: number): void {
    this.loading = true;
    this.error = '';

    this.albumService.getAlbum(id).subscribe({
      next: (data) => {
        this.album = data;
        this.editedTitle = data.title;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load album.';
        this.loading = false;
      },
    });
  }

  save(): void {
    if (!this.album) return;

    const title = this.editedTitle.trim();
    if (!title) {
      this.error = 'Title cannot be empty.';
      return;
    }

    const updated: Album = { ...this.album, title };
    this.saving = true;

    this.albumService.updateAlbum(updated).subscribe({
      next: (resp) => {
        this.album = resp;
        this.editedTitle = resp.title;
        this.saving = false;
      },
      error: () => {
        this.error = 'Save failed.';
        this.saving = false;
      },
    });
  }

  backToAlbums(): void {
    this.location.back();
  }
}
