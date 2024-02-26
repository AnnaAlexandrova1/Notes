import { Component, Signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IPrompt } from '../../interfaces/prompt.interface';
import { NoteModalComponent } from '../notes/components/note-modal/note-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { PromptModalComponent } from './propmt-modal/propmt-modal.component';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../../services/api.service';

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
  public prompts$ = toSignal(this.apiService.getPropmts()) as Signal<IPrompt[]>

  constructor(private dialogService: DialogService, public apiService: ApiService) {}

  public createPrompt(){
    console.log(new Date())
    const ref = this.dialogService.open(PromptModalComponent, {
      width: '50%',
      height: '70%',
    });
  }
}
