import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatJoinComponent } from './chat-join/chat-join.component';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [ ChatJoinComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'FE-chat-web-socket';
}
