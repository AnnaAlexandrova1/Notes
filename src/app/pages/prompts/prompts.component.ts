import { Component, DestroyRef, OnInit, Signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { IPrompt } from '../../interfaces/prompt.interface';
import { NoteModalComponent } from '../notes/components/note-modal/note-modal.component';
import { PromptModalComponent } from './propmt-modal/propmt-modal.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-prompts',
  standalone: true,
  imports: [TableModule, ButtonModule, DatePipe],
  providers: [DialogService],
  templateUrl: './prompts.component.html',
  styleUrl: './prompts.component.scss',
})
export class PromptsComponent implements OnInit {
  constructor(
    private dialogService: DialogService,
    public apiService: ApiService,
    private destroyRef: DestroyRef,
  ) {}

  public ngOnInit() {
    this.apiService.getPropmts(this.destroyRef);
  }

  public createPrompt() {
    this.dialogService.open(PromptModalComponent, {
      width: '50%',
      height: '70%',
    });
  }
}
