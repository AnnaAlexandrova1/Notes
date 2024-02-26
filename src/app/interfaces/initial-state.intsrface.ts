import { IPrompt } from './prompt.interface';
import { ITag } from './tag.interface';
import { INote } from './note.interface';

export interface IInitialState {
  notes: INote[];
  prompts: IPrompt[];
  tags: ITag[];
}
