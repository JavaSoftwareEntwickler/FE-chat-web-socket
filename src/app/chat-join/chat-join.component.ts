import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ChatService } from '../service/chat-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from '../chat-component/chat-component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-join',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatComponent],
  templateUrl: './chat-join.component.html', 
  styleUrl: './chat-join.component.css'
})

export class ChatJoinComponent implements OnInit {
  sender = '';
  submittedJoin: boolean = false;
  users$: Observable<string[]>;
  // usa il chat service per recuperare la lista di sender attivi
  constructor(private chatService: ChatService) {
    this.users$ = this.chatService.users$;
  }

  ngOnInit(): void {
    this.chatService.connect();
  }

  join(): void {
    if (this.sender) {
      this.submittedJoin = true;
      this.chatService.joinChat(this.sender);
    }
  }
}