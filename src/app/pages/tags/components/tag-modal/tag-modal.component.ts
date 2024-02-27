import { Component, DestroyRef, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-tag-modal',
  standalone: true,
  imports: [ButtonModule, InputTextModule, InputTextareaModule, FormsModule],
  templateUrl: './tag-modal.component.html',
  styleUrl: './tag-modal.component.scss',
})
export class TagModalComponent {
  @Input() tagName!: string;
  private destroyRef: DestroyRef;

  constructor(
    public apiService: ApiService,
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
    this.destroyRef = this.config.data;
  }

  public createTag(): void {
    if (!this.tagName || this.tagName.length < 1) {
      alert('Длина тега не может быть меньше одного символа');
    }

    this.apiService.createTag(this.tagName.toString(), this.destroyRef);
    this.dialogRef.close(this.tagName.toString());
  }
}
