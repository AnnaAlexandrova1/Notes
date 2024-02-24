import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogService } from 'primeng/dynamicdialog';
import { NoteModalComponent } from '../note-modal/note-modal.component';
import { INote } from '../../../../interfaces/note.interface';

@Component({
  selector: 'app-note-item',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
  ],
  providers: [ DialogService ],
  templateUrl: './note-item.component.html',
  styleUrl: './note-item.component.scss'
})
export class NoteItemComponent {
  @Input({ required: true }) note!: INote
  constructor(private dialogService: DialogService) {}
  showModal() {
    const ref = this.dialogService.open(NoteModalComponent, {
      width: '50%',
      height: 'auto',
      data: this.note
    });
  }

}
