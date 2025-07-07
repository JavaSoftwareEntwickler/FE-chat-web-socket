import { Injectable } from '@angular/core';
import { RxStomp, RxStompConfig } from '@stomp/rx-stomp';
import SockJS from 'sockjs-client';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ChatMessage {
  sender: string;
  content: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private rxStomp: RxStomp;
  private messageSubject = new BehaviorSubject<ChatMessage | null>(null);

  messages$: Observable<ChatMessage | null> = this.messageSubject.asObservable();
  users$ = new BehaviorSubject<string[]>([]);

  constructor() {
    this.rxStomp = new RxStomp();
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
  }

  send(sender: string, content: string): void {
    if (this.rxStomp.connected()) {
      const payload = JSON.stringify({ sender, content });
      this.rxStomp.publish({ destination: '/app/chat.send', body: payload });
    } else {
      console.warn('WebSocket non connesso, impossibile inviare messaggio');
    }
  }

  disconnect(): void {
    this.rxStomp.deactivate();
  }
}
