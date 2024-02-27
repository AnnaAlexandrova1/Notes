import { Component, DestroyRef, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { AsyncPipe, DatePipe } from '@angular/common';

import { PromptModalComponent } from './propmt-modal/propmt-modal.component';
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
