import { Injectable } from '@angular/core';
import { RxStomp, RxStompConfig } from '@stomp/rx-stomp';
import SockJS from 'sockjs-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserContextService } from './chat-user-context-service';

export type MessageType = 'CHAT' | 'JOIN' | 'LEAVE';
export interface ChatMessage {
  sender: string;
  content: string;
  messageType: MessageType;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private rxStomp: RxStomp;
  private messageSubject = new BehaviorSubject<ChatMessage | null>(null);
  private userContextService: UserContextService;

  messages$: Observable<ChatMessage | null> = this.messageSubject.asObservable();
  users$ = new BehaviorSubject<string[]>([]);

  constructor() {
    this.rxStomp = new RxStomp();
    this.userContextService = new UserContextService;
  }
  
  connect(): void {
    const config: RxStompConfig = {
      webSocketFactory: () => new SockJS('http://localhost:8080/ws-chat'),
      connectHeaders: {},
      debug: (msg: string) => console.log('[WS DEBUG]', msg),
      heartbeatIncoming: 0,
      heartbeatOutgoing: 20000,
      reconnectDelay: 200,
    };

    this.rxStomp.configure(config);

    this.rxStomp.activate();

    // Subscription ai messaggi generali
    this.rxStomp.connected$.subscribe(() => {
      console.log('Connected to WebSocket');
      this.rxStomp.watch('/topic/messages').subscribe((message) => {
        try {
          const body = JSON.parse(message.body) as ChatMessage;
          this.messageSubject.next(body);
        } catch (e) {
          console.error('Error parsing message', e);
        }
      });
    });

    // Subscription alla lista utenti attivi
    this.rxStomp.watch('/topic/users').subscribe((message) => {
      try {
        // Il backend manda un array di stringhe
        const users = JSON.parse(message.body) as string[];
        this.users$.next(users);
      } catch (e) {
        console.error('Error parsing users list', e);
      }
    });
  }

  send(sender: string, content: string): void {
    if (this.rxStomp.connected()) {
      const payload = JSON.stringify({ sender: sender, content: content, messageType:'CHAT'});
      this.rxStomp.publish({ destination: '/app/chat.send', body: payload });
    } else {
      console.warn('WebSocket non connesso, impossibile inviare messaggio');
    }
  }

  joinChat(sender: string): void {
    if (this.rxStomp.connected()) {
      this.userContextService.setSender(sender);
      const content = 'join the chat';
      const payload = JSON.stringify({ sender: sender, content: content, messageType: 'JOIN'});
      this.rxStomp.publish({ destination: '/app/chat.join', body: payload });
    } else {
      console.warn('WebSocket non connesso, impossibile inviare messaggio');
    }
  }

  disconnect(): void {
    this.rxStomp.deactivate();
  }
}
