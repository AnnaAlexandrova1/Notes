import { Component, DestroyRef, EventEmitter, OnInit, Output } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

import { INote } from '../../../../interfaces/note.interface';
import { ApiStateService } from '../../../../services/api-state.service';

@Component({
  selector: 'app-note-modal',
  standalone: true,
  imports: [
    DividerModule,
    InputTextareaModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './note-modal.component.html',
  styleUrl: './note-modal.component.scss',
})
export class NoteModalComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<void>();
  public note: INote;
  public form!: FormGroup;
  public isNewNote: boolean;
  public headerControlValidators = [Validators.required];
  public contentControlValidators = [Validators.required];

  constructor(
    public apiService: ApiStateService,
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private destroyRef: DestroyRef,
  ) {
    this.note = this.config.data.note;
    this.isNewNote = this.config.data.isNewNote;
  }

  public ngOnInit(): void {
    this.apiService.getTags(this.destroyRef);
    this.initForm();
  }

  private initForm() {
    this.form = new FormGroup({
      header: new FormControl(null, this.headerControlValidators),
      content: new FormControl(null, this.contentControlValidators),
      tags: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      // date: new FormControl(null),
    });

    this.form.get('header')?.setValue(this.note?.header);
    this.form.get('content')?.setValue(this.note?.content);
    this.form.get('tags')?.setValue(this.note.tags ?? []);
    // this.form.get('organizationIds')?.setValue(currentUser ? currentUser.organizations : []);
  }

  public async submit(): Promise<void> {
    this.form.disable();

    this.isNewNote ? await this.createNote() : await this.updateNote();
    this.dialogRef.close();
  }

  private async createNote(): Promise<void> {
    const header = this.form.get('header')?.value;
    const content = this.form.get('content')?.value;
    const tags = this.form.get('tags')?.value;
    // const organizationIds = this.getOrganizationIds();

    try {
      this.apiService.createNote({
        header,
        content,
        tags,
      });

      this.closeEvent.emit();
    } catch (e) {
      this.form.enable();
    }
  }

  private async updateNote(): Promise<void> {
    const header = this.form.get('header')?.value;
    const content = this.form.get('content')?.value;
    const tags = this.form.get('tags')?.value;

    try {
      await this.apiService.updateNote({
        id: this.note.id,
        header,
        content,
        tags,
      });

      this.closeEvent.emit();
    } catch (e) {
      this.form.enable();
    }
  }
}
