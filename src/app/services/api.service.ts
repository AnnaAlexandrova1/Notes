import { computed, DestroyRef, Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, finalize, Observable, take } from 'rxjs';
import { IObjectLiteral } from '../interfaces/object-literal.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoggerService } from './logger.service';
import { INITIAL_STATE } from './initialostate.config';
import { INote } from '../interfaces/note.interface';
import { IInitialState } from '../interfaces/initial-state.intsrface';
import { IPrompt } from '../interfaces/prompt.interface';
import { ITag } from '../interfaces/tag.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);
  private readonly $state = signal<IInitialState>(INITIAL_STATE);

  public readonly notes$  = computed<INote[]>(() => this.$state().notes);
  public readonly prompts$  = computed<IPrompt[]>(() => this.$state().prompts);
  public readonly tags$  = computed<ITag[]>(() => this.$state().tags);


  constructor(private http: HttpClient, private loggerService: LoggerService) { }

  public getNotes(destroyRef: DestroyRef): void {
    this.setIsLoading(true)
    this.http.get(
      `http://localhost:3000/notes`,
    ).pipe(
      take(1),
      takeUntilDestroyed(destroyRef),
      finalize(() => this.setIsLoading(false)),
    ).subscribe({
      next: (response) => this.noteDataSuccess(response),
      error: (error: Error) => {
        this.loggerService.error(error);
      },
    });
  }

  public getPropmts(destroyRef: DestroyRef): void {
    this.setIsLoading(true)
     this.http.get(
      `http://localhost:3000/prompts`,
    ).pipe(
       take(1),
       takeUntilDestroyed(destroyRef),
       finalize(() => this.setIsLoading(false)),
     ).subscribe({
       next: (response) => this.promptsDataSuccess(response),
       error: (error: Error) => {
         this.loggerService.error(error);
       },
     });
  }


  public getTags(destroyRef: DestroyRef): void {
    this.setIsLoading(true)
    this.http.get(
      `http://localhost:3000/tags`,
    ).pipe(
      take(1),
      takeUntilDestroyed(destroyRef),
      finalize(() => this.setIsLoading(false)),
    ).subscribe({
      next: (response) => this.tagsDataSuccess(response),
      error: (error: Error) => {
        this.loggerService.error(error);
      },
    });
  }

  private setIsLoading(value: boolean): void {
    this.isLoading$.next(value)
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
