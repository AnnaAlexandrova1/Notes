import { Component, OnInit, Signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NoteItemComponent } from './components/note-item/note-item.component';
import { INote } from '../../interfaces/note.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { PromptModalComponent } from '../prompts/propmt-modal/propmt-modal.component';
import { ApiService } from '../../services/api.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    ButtonModule,
    NoteItemComponent,
  ],
  providers: [DialogService],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  public notes$ =  toSignal(this.apiService.getNotes()) as Signal<INote[]>;
  constructor(private dialogService: DialogService, private apiService: ApiService) {}

  createNote() {
    const ref = this.dialogService.open(PromptModalComponent, {
      width: '50%',
      height: 'auto',
    });
  }
}
