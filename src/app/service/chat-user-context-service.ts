import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UserContextService {
  private readonly KEY = 'name_sender';

  setSender(sender: string): void {
    localStorage.setItem(this.KEY, sender);
  }

  getSender(): string {
    return localStorage.getItem(this.KEY) || '';
  }

  clear(): void {
    localStorage.removeItem(this.KEY);
  }
}
