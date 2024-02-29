import { Component, DestroyRef, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ApiStateService } from '../../../services/api-state.service';

@Component({
  selector: 'app-prompt-modal',
  standalone: true,
  imports: [ButtonModule, InputTextModule, CalendarModule, FormsModule],
  templateUrl: './propmt-modal.component.html',
  styleUrl: './propmt-modal.component.scss',
})
export class PromptModalComponent {
  @Input() date: Date = new Date();
  @Input() promptContent!: string;

  private destroyRef: DestroyRef;

  constructor(
    public apiService: ApiStateService,
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
    this.destroyRef = this.config.data;
  }

  public createPrompt(): void {
    if (!this.promptContent || this.promptContent.length < 1) {
      alert('Длина напоминания не может быть меньше одного символа');
    }

    if (!this.date) {
      alert('Выберите дату');
    }

    this.apiService.createPrompt({ content: this.promptContent.toString(), date: this.date });
    this.dialogRef.close();
  }
}
