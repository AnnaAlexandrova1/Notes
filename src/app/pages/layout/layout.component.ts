import { Component } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { NotesComponent } from '../notes/notes.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    TabMenuModule,
    NotesComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  public menuItems: MenuItem[] = [
    {
      label: 'Заметки',
      icon: 'pi pi-fw pi-book'
    },
    {
      label: 'Напоминания',
      icon: 'pi pi-fw pi-bell'
    },
    {
      label: 'Теги',
      icon: 'pi pi-fw pi-tag'
    }];

  public activeItem: MenuItem | undefined = this.menuItems[0];

}
