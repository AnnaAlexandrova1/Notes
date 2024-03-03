import { computed, DestroyRef, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, finalize, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as uuid from 'uuid';

import { IObjectLiteral } from '../interfaces/object-literal.interface';
import { LoggerService } from './logger.service';
import { INITIAL_STATE } from './initialostate.config';
import { INote } from '../interfaces/note.interface';
import { IInitialState } from '../interfaces/initial-state.intsrface';
import { IPrompt } from '../interfaces/prompt.interface';
import { ITag } from '../interfaces/tag.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiStateService {
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);
  public readonly isNeeedUpdateNotes$ = new BehaviorSubject<boolean>(false);
  public readonly isNeedUpdatePrompts$ = new BehaviorSubject<boolean>(false);
  public readonly isNeedUpdateTags$ = new BehaviorSubject<boolean>(false);
  private readonly $state = signal<IInitialState>(INITIAL_STATE);

  public readonly notes$ = computed<INote[]>(() => this.$state().notes);
  public readonly prompts$ = computed<IPrompt[]>(() => this.$state().prompts);
  public readonly tags$ = computed<ITag[]>(() => this.$state().tags);

  constructor(
    private http: HttpClient,
    private loggerService: LoggerService,
  ) {}

  public getNotes(destroyRef: DestroyRef): void {
    this.setIsLoading(true);
    this.http
      .get(`http://localhost:3000/notes`)
      .pipe(
        take(1),
        takeUntilDestroyed(destroyRef),
        finalize(() => this.setIsLoading(false)),
      )
      .subscribe({
        next: (response) => this.noteDataSuccess(response),
        error: (error: Error) => {
          this.loggerService.error(error);
        },
      });
  }

  public getPropmts(destroyRef: DestroyRef): void {
    this.setIsLoading(true);
    this.http
      .get(`http://localhost:3000/prompts`)
      .pipe(
        take(1),
        takeUntilDestroyed(destroyRef),
        finalize(() => this.setIsLoading(false)),
      )
      .subscribe({
        next: (response) => this.promptsDataSuccess(response),
        error: (error: Error) => {
          this.loggerService.error(error);
        },
      });
  }

  public getTags(destroyRef: DestroyRef): void {
    this.setIsLoading(true);
    this.http
      .get(`http://localhost:3000/tags`)
      .pipe(
        take(1),
        takeUntilDestroyed(destroyRef),
        finalize(() => this.setIsLoading(false)),
      )
      .subscribe({
        next: (response) => this.tagsDataSuccess(response),
        error: (error: Error) => {
          this.loggerService.error(error);
        },
      });
  }

  public createTag(name: string) {
    const tag: ITag = {
      name,
      id: uuid.v4(),
    };

    this.http.post(`http://localhost:3000/tags`, tag).subscribe({
      next: (response) => {
        // в данном случае проверка на успешность удаления
        if (response) {
          this.setIsNeedUpdateTags$(true);
        }
      },
      error: (error: Error) => {
        this.loggerService.error(error);
      },
    });
  }

  public createNote(note: { header: string; content: string; tags?: ITag[] }) {
    const newNote = {
      ...note,
      id: uuid.v4(),
    };

    this.http.post(`http://localhost:3000/notes`, newNote).subscribe({
      next: (response) => {
        // в данном случае проверка на успешность создания
        if (response) {
          this.setIsNeeedUpdateNotes(true);
        }
      },
      error: (error: Error) => {
        this.loggerService.error(error);
      },
    });
  }

  public updateNote(note: INote) {
    this.http.put(`http://localhost:3000/notes/${note.id}`, note).subscribe({
      next: (response) => {
        // в данном случае проверка на успешность создания
        if (response) {
          this.setIsNeeedUpdateNotes(true);
        }
      },
      error: (error: Error) => {
        this.loggerService.error(error);
      },
    });
  }

  public createPrompt(prompt: { content: string; date: Date }) {
    const newPrompt: IPrompt = {
      id: uuid.v4(),
      content: prompt.content,
      date: prompt.date,
    };

    this.http.post(`http://localhost:3000/prompts/`, newPrompt).subscribe({
      next: (response) => {
        // в данном случае проверка на успешность удаления
        if (response) {
          this.setIsNeedUpdatePrompts(true);
        }
      },
      error: (error: Error) => {
        this.loggerService.error(error);
      },
    });
  }

  public deleteNote(id: string) {
    this.http.delete(`http://localhost:3000/notes/${id}`).subscribe({
      next: (response) => {
        // в данном случае проверка на успешность удаления
        if (response) {
          this.setIsNeeedUpdateNotes(true);
        }
      },
      error: (error: Error) => {
        this.loggerService.error(error);
      },
    });
  }

  public deleteTag(id: string) {
    this.http.delete(`http://localhost:3000/tags/${id}`).subscribe({
      next: (response) => {
        // в данном случае проверка на успешность удаления
        if (response) {
          this.setIsNeedUpdateTags$(true);
        }
      },
      error: (error: Error) => {
        this.loggerService.error(error);
      },
    });
  }

  public setIsNeeedUpdateNotes(value: boolean): void {
    this.isNeeedUpdateNotes$.next(value);
  }

  public setIsNeedUpdatePrompts(value: boolean): void {
    this.isNeedUpdatePrompts$.next(value);
  }

  public setIsNeedUpdateTags$(value: boolean): void {
    this.isNeedUpdateTags$.next(value);
  }

  private setIsLoading(value: boolean): void {
    this.isLoading$.next(value);
  }

  private noteDataSuccess(response: IObjectLiteral): void {
    this.$state.update((state) => ({
      ...state,
      notes: response as INote[],
    }));
  }

  private promptsDataSuccess(response: IObjectLiteral): void {
    this.$state.update((state) => ({
      ...state,
      prompts: response as IPrompt[],
    }));
  }

  private tagsDataSuccess(response: IObjectLiteral): void {
    this.$state.update((state) => ({
      ...state,
      tags: response as ITag[],
    }));
  }
}
