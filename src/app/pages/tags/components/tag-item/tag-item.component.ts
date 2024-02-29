import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { ITag } from '../../../../interfaces/tag.interface';
import { ApiStateService } from '../../../../services/api-state.service';

@Component({
  selector: 'app-tag-item',
  standalone: true,
  imports: [TagModule, CardModule, ButtonModule],
  templateUrl: './tag-item.component.html',
  styleUrl: './tag-item.component.scss',
})
export class TagItemComponent {
  @Input({ required: true }) tag!: ITag;
  @Output() deleteTag = new EventEmitter();

  constructor(public apiService: ApiStateService) {}

  public delete(id: string): void {
    this.deleteTag.emit(id);
  }
}
