import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AsyncPipe } from '@angular/common';

import { NoteItemComponent } from '../notes/components/note-item/note-item.component';
import { TagItemComponent } from './components/tag-item/tag-item.component';
import { TagModalComponent } from './components/tag-modal/tag-modal.component';
import { ApiStateService } from '../../services/api-state.service';
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

  private subscription$ = this.apiService.isNeedUpdateTags$.subscribe((value) => {
    if (value) {
      this.apiService.getTags(this.destroyRef);
      this.apiService.setIsNeedUpdateTags$(false);
    }
  });

  constructor(
    private dialogService: DialogService,
    public apiService: ApiStateService,
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
    this.apiService.deleteTag(id);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }

    this.subscription$.unsubscribe();
  }
}
