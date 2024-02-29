import { Component, DestroyRef, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { AsyncPipe } from '@angular/common';

import { NoteItemComponent } from './components/note-item/note-item.component';
import { PromptModalComponent } from '../prompts/prompt-modal/propmt-modal.component';
import { ApiStateService } from '../../services/api-state.service';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [ButtonModule, NoteItemComponent, LoaderComponent, AsyncPipe],
  providers: [DialogService],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnInit {
  constructor(
    private dialogService: DialogService,
    public apiService: ApiStateService,
    private destroyRef: DestroyRef,
  ) {}

  createNote() {
    this.dialogService.open(PromptModalComponent, {
      width: '50%',
      height: 'auto',
    });
  }

  public ngOnInit() {
    this.apiService.getNotes(this.destroyRef);
  }
}
