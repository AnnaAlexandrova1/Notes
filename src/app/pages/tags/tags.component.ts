import { Component, DestroyRef, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';

import { NoteItemComponent } from '../notes/components/note-item/note-item.component';
import { TagItemComponent } from './components/tag-item/tag-item.component';
import { TagModalComponent } from './components/tag-modal/tag-modal.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [ButtonModule, NoteItemComponent, TagItemComponent],
  providers: [DialogService],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent implements OnInit {
  constructor(
    private dialogService: DialogService,
    public apiService: ApiService,
    private destroyRef: DestroyRef,
  ) {}

  public ngOnInit() {
    this.apiService.getTags(this.destroyRef);
  }

  public createTag() {
    this.dialogService.open(TagModalComponent, {
      width: '50%',
      height: 'auto',
    });
  }
}
