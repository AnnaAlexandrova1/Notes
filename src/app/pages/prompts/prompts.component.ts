import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IPrompt } from '../../interfaces/prompt.interface';
import { NoteModalComponent } from '../notes/components/note-modal/note-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { PromptModalComponent } from './propmt-modal/propmt-modal.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-prompts',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    DatePipe,
  ],
  providers: [DialogService],
  templateUrl: './prompts.component.html',
  styleUrl: './prompts.component.scss'
})
export class PromptsComponent {
  public prompts$: IPrompt[] = [
    {
      id: 'kjkj',
      content: 'Prompt1',
      date: new Date(),
    },
    {
      id: 'kjkj',
      content: 'Prompt1',
      date: new Date(),
    },
  ];

  constructor(private dialogService: DialogService) {}

  public createPrompt(){
    console.log(new Date())
    const ref = this.dialogService.open(PromptModalComponent, {
      width: '50%',
      height: '70%',
    });
  }
}
