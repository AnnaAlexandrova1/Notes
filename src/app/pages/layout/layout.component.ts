import { Component, OnInit } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';

import { NotesComponent } from '../notes/notes.component';
import { NavigateService } from '../../services/navigate.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [TabMenuModule, NotesComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  public menuItems: MenuItem[] = [
    {
      label: 'Заметки',
      icon: 'pi pi-fw pi-book',
      routerLink: '/notes',
    },
    {
      label: 'Напоминания',
      icon: 'pi pi-fw pi-bell',
      routerLink: '/prompts',
    },
    {
      label: 'Теги',
      icon: 'pi pi-fw pi-tag',
      routerLink: '/tags',
    },
  ];

  public activeItem: MenuItem = this.menuItems[0];

  constructor(private navigateService: NavigateService) {}

  public async ngOnInit() {
    await this.navigateService.goToTitle(this.activeItem.routerLink);
  }

  public async onActiveItemChange($event: any) {
    await this.navigateService.goToTitle($event.routerLink);
  }
}
