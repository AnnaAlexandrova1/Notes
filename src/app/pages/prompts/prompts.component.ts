import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AsyncPipe, DatePipe } from '@angular/common';

import { PromptModalComponent } from './prompt-modal/propmt-modal.component';
import { ApiService } from '../../services/api.service';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-prompts',
  standalone: true,
  imports: [TableModule, ButtonModule, DatePipe, AsyncPipe, LoaderComponent],
  providers: [DialogService],
  templateUrl: './prompts.component.html',
  styleUrl: './prompts.component.scss',
})
export class PromptsComponent implements OnInit, OnDestroy {
  public ref: DynamicDialogRef | undefined;
  constructor(
    private dialogService: DialogService,
    public apiService: ApiService,
    private destroyRef: DestroyRef,
  ) {}

  public ngOnInit() {
    this.apiService.getPropmts(this.destroyRef);
  }

  public createPrompt() {
    this.ref = this.dialogService.open(PromptModalComponent, {
      header: 'Создать напоминание',
      width: '50%',
      height: '70%',
      data: this.destroyRef,
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
