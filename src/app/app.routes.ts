import { Routes } from '@angular/router';

import { NotesComponent } from './pages/notes/notes.component';
import { PromptsComponent } from './pages/prompts/prompts.component';
import { TagsComponent } from './pages/tags/tags.component';

export const routes: Routes = [
  // {
  //   path:'',
  //   component: LayoutComponent,
  //   children: [
  //     {
  //       path: 'notes',
  //       component: NotesComponent,
  //     },
  //     {
  //       path: 'prompts',
  //       component: PromptsComponent,
  //     },
  //     {
  //       path: 'tags',
  //       component: TagsComponent,
  //     },
  //   ]
  // }

  {
    path: 'notes',
    component: NotesComponent,
  },
  {
    path: 'prompts',
    component: PromptsComponent,
  },
  {
    path: 'tags',
    component: TagsComponent,
  },
];
