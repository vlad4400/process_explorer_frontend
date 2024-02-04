// src/app/websocket.service.ts

import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

export interface Process {
  pid: number;
  command: string;
  cpu: number;
  mem: number;
}

export interface MemoryUsage {
  totalMemory: number;
  freeMemory: number;
  usedMemory: number;
}

interface Error {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('/');
  }

  public requestAllProcesses() {
    this.socket.emit('requestAllProcesses');
  }

  public onProcessUpdate(
    callback: (data: Process[]) => void,
    errorCallback: (error: Error) => void
  ) {
    this.socket.on('processesUpdate', callback);
    this.socket.on('error', errorCallback);

    return () => {
      this.socket.off('processesUpdate', callback);
      this.socket.off('error', errorCallback);
    };
  }

  public requestMemoryAnalysis() {
    this.socket.emit('requestMemoryUsage');
  }

  public onMemoryUsageUpdate(
    callback: (data: MemoryUsage) => void,
    errorCallback: (error: Error) => void
  ) {
    this.socket.on('memoryUsageUpdate', callback);
    this.socket.on('error', errorCallback);

    return () => {
      this.socket.off('memoryUsageUpdate', callback);
      this.socket.off('error', errorCallback);
    };
  }
}
