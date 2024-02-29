import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';

import { INote } from '../../../../interfaces/note.interface';

@Component({
  selector: 'app-note-modal',
  standalone: true,
  imports: [DividerModule, InputTextareaModule, ButtonModule, InputTextModule, MultiSelectModule],
  templateUrl: './note-modal.component.html',
  styleUrl: './note-modal.component.scss',
})
export class NoteModalComponent {
  public note: INote;
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
    this.note = this.config.data;
  }
}
