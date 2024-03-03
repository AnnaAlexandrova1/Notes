import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { AsyncPipe } from '@angular/common';

import { NoteItemComponent } from './components/note-item/note-item.component';
import { ApiStateService } from '../../services/api-state.service';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { NoteModalComponent } from './components/note-modal/note-modal.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [ButtonModule, NoteItemComponent, LoaderComponent, AsyncPipe],
  providers: [DialogService],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnInit, OnDestroy {
  private subscription$ = this.apiService.isNeeedUpdateNotes$.subscribe((value) => {
    if (value) {
      this.apiService.getNotes(this.destroyRef);
      this.apiService.setIsNeeedUpdateNotes(false);
    }
  });

  constructor(
    private dialogService: DialogService,
    public apiService: ApiStateService,
    private destroyRef: DestroyRef,
  ) {}

  public ngOnInit() {
    this.apiService.getNotes(this.destroyRef);
  }

  createNote() {
    this.dialogService.open(NoteModalComponent, {
      width: '50%',
      height: 'auto',
      data: {
        note: {
          id: '',
          content: '',
          header: '',
        },
        isNewNote: true,
      },
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
