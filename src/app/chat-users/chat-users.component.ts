import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../service/chat-service';
import { Observable } from 'rxjs';
import { UserContextService } from '../service/chat-user-context-service';

@Component({
  selector: 'app-chat-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-users.component.html',
  styleUrl: './chat-users.component.css'
})
export class ChatUsersComponent {
  users$: Observable<string[]>;
  currentSender: string = '';
  // usa il chat service per recuperare la lista di sender attivi
  constructor(private chatService: ChatService, private userContextService:UserContextService) {
    this.users$ = this.chatService.users$;
  }
  ngOnInit(): void {
      this.currentSender = this.userContextService.getSender();
  }
}
