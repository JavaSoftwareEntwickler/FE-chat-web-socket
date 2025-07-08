import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../service/chat-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { AutoScrollComponent } from '../auto-scroll-component/auto-scroll-component';
import { ChatUsersComponent } from '../chat-users/chat-users.component';
import { UserContextService } from '../service/chat-user-context-service';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, AutoScrollComponent, ChatUsersComponent],
  templateUrl: './chat-component.html', 
  styleUrl: './chat-component.css'
})

export class ChatComponent implements OnInit {
  message = '';
  messages: { sender: string; content: string }[] = [];
  currentSender: string = '';

  constructor(
    private chatService: ChatService, 
    private cdr: ChangeDetectorRef, 
    private userContextService:UserContextService
  ) {}

  ngOnInit(): void {
    this.currentSender = this.userContextService.getSender();
    this.chatService.messages$.subscribe(msg => {
      if (msg) {
        if(this.userContextService.getSender() == msg.sender && msg.messageType =='JOIN'){

        }else{
          this.messages.push(msg);
        }
      }
      this.cdr.detectChanges();
    });
  }

  send(): void {
    if (this.message) {
      this.chatService.send(this.userContextService.getSender() , this.message);
      this.cdr.detectChanges();
      this.message = '';
    }
  }
  handleEnter(event: any) {
    if (event.shiftKey) return; // consente di andare a capo
    event.preventDefault();     // blocca invio normale
    this.send();
  }


}
