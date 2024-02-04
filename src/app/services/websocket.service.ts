// src/app/websocket.service.ts

import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

export interface Process {
  pid: number;
  command: string;
  cpu: number;
  mem: number;
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('/'); // Zmień URL na odpowiedni adres serwera
  }

  public requestAllProcesses() {
    this.socket.emit('requestAllProcesses');
  }

  public onProcessUpdate(callback: (data: Process[]) => void) {
    this.socket.on('processesUpdate', callback);
  }

  
}
