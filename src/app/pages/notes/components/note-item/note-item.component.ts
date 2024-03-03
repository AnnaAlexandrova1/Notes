import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogService } from 'primeng/dynamicdialog';
import { TagModule } from 'primeng/tag';

import { NoteModalComponent } from '../note-modal/note-modal.component';
import { INote } from '../../../../interfaces/note.interface';
import { ApiStateService } from '../../../../services/api-state.service';

@Component({
  selector: 'app-note-item',
  standalone: true,
  imports: [ButtonModule, CardModule, TagModule],
  providers: [DialogService],
  templateUrl: './note-item.component.html',
  styleUrl: './note-item.component.scss',
})
export class NoteItemComponent {
  @Input({ required: true }) note!: INote;
  constructor(
    private dialogService: DialogService,
    public apiService: ApiStateService,
  ) {}

  showModal() {
    this.dialogService.open(NoteModalComponent, {
      width: '50%',
      height: 'auto',
      data: {
        note: this.note,
        isNewNote: false,
      },
    });
  }

  public deleteNote(id: string): void {
    this.apiService.deleteNote(id);
  }
}
