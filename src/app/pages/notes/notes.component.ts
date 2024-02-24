import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NoteItemComponent } from './components/note-item/note-item.component';
import { INote } from '../../interfaces/note.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { NoteModalComponent } from './components/note-modal/note-modal.component';

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
   public $notes: INote[] = [
     {
       id: '14lj',
       header: 'Заголовок 1',
       content:  'Тут будет размещен текст под Заголовком 1 и мы посмотрим что получится. Сегодня хорошая погода',
     },
     {
       id: '14lsa',
       header: 'Заголовок 2',
       content:  'Тут будет размещен текст под Заголовком 1 и мы посмотрим что получится. Сегодня хорошая погода',
     },
     {
       id: '1124lj',
       header: 'Заголовок 3',
       content:  'Тут будет размещен текст под Заголовком 1 и мы посмотрим что получится. Сегодня хорошая погода',
     },
     {
       id: '14l321j',
       header: 'Заголовок 4',
       content:  'Тут будет размещен текст под Заголовком 1 и мы посмотрим что получится. Сегодня хорошая погода',
     },
   ]

  constructor(private dialogService: DialogService) {}

  createNote() {
    const ref = this.dialogService.open(NoteModalComponent, {
      width: '50%',
      height: 'auto',
    });
  }
}
