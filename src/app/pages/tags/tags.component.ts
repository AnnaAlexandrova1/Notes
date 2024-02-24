import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NoteItemComponent } from '../notes/components/note-item/note-item.component';
import { ITag } from '../../interfaces/tag.interface';
import { TagItemComponent } from './components/tag-item/tag-item.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NoteModalComponent } from '../notes/components/note-modal/note-modal.component';
import { TagModalComponent } from './components/tag-modal/tag-modal.component';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [
    ButtonModule,
    NoteItemComponent,
    TagItemComponent,
  ],
  providers: [DialogService],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent {
   public $tags: ITag[] = [
     {
       id: 'lkjlkjlk',
       name: 'work'
     },
     {
       id: 'ldd',
       name: 'life'
     },
     {
       id: 'bas55e',
       name: 'family'
     },
   ];

  constructor(private dialogService: DialogService) {}

  // closeModal() {
  //   this.ref.close();
  // }
  //
  public createTag(){
    const ref = this.dialogService.open(TagModalComponent, {
      width: '50%',
      height: 'auto',
    });
  }
}
