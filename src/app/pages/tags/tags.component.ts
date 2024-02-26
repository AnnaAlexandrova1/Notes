import { Component, Signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NoteItemComponent } from '../notes/components/note-item/note-item.component';
import { ITag } from '../../interfaces/tag.interface';
import { TagItemComponent } from './components/tag-item/tag-item.component';
import { DialogService } from 'primeng/dynamicdialog';
import { TagModalComponent } from './components/tag-modal/tag-modal.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../../services/api.service';

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
  public tags$ = toSignal(this.apiService.getTags()) as Signal<ITag[]>

  constructor(private dialogService: DialogService, private apiService: ApiService) {}

  public createTag(){
    const ref = this.dialogService.open(TagModalComponent, {
      width: '50%',
      height: 'auto',
    });
  }
}
