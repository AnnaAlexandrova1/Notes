import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-tag-modal',
  standalone: true,
  imports: [ButtonModule, InputTextModule, InputTextareaModule],
  templateUrl: './tag-modal.component.html',
  styleUrl: './tag-modal.component.scss',
})
export class TagModalComponent {}
