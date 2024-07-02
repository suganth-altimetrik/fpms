import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('ws://localhost:6077');
  }

  // EMITTER example
  sendMessage(room_id: string) {
    this.socket.emit('join_room', room_id);
  }

  // HANDLER example
  onNewMessage() {
    return new Observable((observer) => {
      this.socket.on('dymaic_table', (msg) => {
        observer.next(msg);
      });
    });
  }
}
