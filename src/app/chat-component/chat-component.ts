import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-component.html', 
  styleUrl: './chat-component.css'
})
export class ChatComponent implements OnInit {
  sender = '';
  message = '';
  messages: { sender: string; content: string }[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.connect();
    this.chatService.messages$.subscribe(msg => {
      if (msg) this.messages.push(msg);
    });
  }

  send(): void {
    if (this.sender && this.message) {
      this.chatService.send(this.sender, this.message);
      this.message = '';
    }
  }
}
