import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INote } from '../interfaces/note.interface';
import { IObjectLiteral } from '../interfaces/object-literal.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public getNotes(): Observable<IObjectLiteral> {
    return this.http.get(
      `http://localhost:3000/notes`,
    );
  }

  public getPropmts(): Observable<IObjectLiteral> {
    return this.http.get(
      `http://localhost:3000/prompts`,
    );
  }

  public getTags(): Observable<IObjectLiteral> {
    return this.http.get(
      `http://localhost:3000/tags`,
    );
  }
}
