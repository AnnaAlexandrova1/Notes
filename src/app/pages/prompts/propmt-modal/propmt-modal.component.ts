import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-propmt-modal',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    CalendarModule,
    FormsModule,
  ],
  templateUrl: './propmt-modal.component.html',
  styleUrl: './propmt-modal.component.scss'
})
export class PromptModalComponent {
   public date: Date = new Date()
}
