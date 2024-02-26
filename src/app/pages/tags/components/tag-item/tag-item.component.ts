import { Component, Input, OnInit } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { ITag } from '../../../../interfaces/tag.interface';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tag-item',
  standalone: true,
  imports: [
    TagModule,
    CardModule,
    ButtonModule,
  ],
  templateUrl: './tag-item.component.html',
  styleUrl: './tag-item.component.scss'
})
export class TagItemComponent{
  @Input({ required: true }) tag!: ITag;
}
