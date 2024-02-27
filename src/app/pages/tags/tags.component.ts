import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AsyncPipe } from '@angular/common';

import { NoteItemComponent } from '../notes/components/note-item/note-item.component';
import { TagItemComponent } from './components/tag-item/tag-item.component';
import { TagModalComponent } from './components/tag-modal/tag-modal.component';
import { ApiService } from '../../services/api.service';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [ButtonModule, NoteItemComponent, TagItemComponent, AsyncPipe, LoaderComponent],
  providers: [DialogService],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent implements OnInit, OnDestroy {
  public ref: DynamicDialogRef | undefined;
  constructor(
    private dialogService: DialogService,
    public apiService: ApiService,
    private destroyRef: DestroyRef,
  ) {}

  public ngOnInit() {
    this.apiService.getTags(this.destroyRef);
  }

  public createTag() {
    this.ref = this.dialogService.open(TagModalComponent, {
      header: 'Новый тег',
      width: '50%',
      height: 'auto',
      data: this.destroyRef,
    });
  }

  public deleteTag(id: string) {
    this.apiService.deleteTag(id, this.destroyRef);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
