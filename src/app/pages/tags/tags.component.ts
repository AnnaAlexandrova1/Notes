import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NoteItemComponent } from '../notes/components/note-item/note-item.component';
import { ITag } from '../../interfaces/tag.interface';
import { TagItemComponent } from './components/tag-item/tag-item.component';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [
    ButtonModule,
    NoteItemComponent,
    TagItemComponent,
  ],
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
   ]
}
