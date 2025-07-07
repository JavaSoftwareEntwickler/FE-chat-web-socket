import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-users.component.html',
  styleUrl: './chat-users.component.css'
})
export class ChatUsersComponent {
  @Input() users: string[] = [];
}
