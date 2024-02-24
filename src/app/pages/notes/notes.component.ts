import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NoteItemComponent } from './components/note-item/note-item.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    ButtonModule,
    NoteItemComponent,
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {

}
