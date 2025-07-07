import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatComponent } from './chat-component/chat-component';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [ ChatComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'FE-chat-web-socket';
}
