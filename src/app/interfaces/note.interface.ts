import { ITag } from './tag.interface';

export interface INote {
  id: string;
  header: string;
  content: string;
  tags?: ITag[];
}
