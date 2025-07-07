import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { AutoScrollComponent } from '../auto-scroll-component/auto-scroll-component';
import { ChatUsersComponent } from '../chat-users/chat-users.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, AutoScrollComponent, ChatUsersComponent],
  templateUrl: './chat-component.html', 
  styleUrl: './chat-component.css'
})

export class ChatComponent implements OnInit {
  sender = '';
  message = '';
  messages: { sender: string; content: string }[] = [];
  connectedUsers: string[] = [];

  constructor(private chatService: ChatService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.chatService.connect();
    this.chatService.messages$.subscribe(msg => {
      if (msg) {
        this.messages.push(msg);
        this.addUser(msg.sender);
      }
      this.cdr.detectChanges();
    });
    
  }

  send(): void {
    if (this.sender && this.message) {
      this.chatService.send(this.sender, this.message);
      this.cdr.detectChanges();
      this.message = '';
    }
  }
  private addUser(user: string): void {
    const currentUsers = this.chatService.users$.value;
    if (!currentUsers.includes(user)) {
      this.chatService.users$.next([...currentUsers, user]);
      this.connectedUsers.push(user);
    }
  }
}
