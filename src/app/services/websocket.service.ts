import { Injectable, isDevMode } from '@angular/core';
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

export interface DirectoryItem {
  name: string;
  isDirectory: boolean;
  size?: number;
  children?: DirectoryItem[];
}

export interface DiskIOStat {
  rIO: number; // Liczba operacji odczytu z dysku
  wIO: number; // Liczba operacji zapisu na dysk
  tIO: number; // Całkowita liczba operacji I/O (odczyt plus zapis)
  rIO_sec: number; // Liczba operacji odczytu z dysku na sekundę
  wIO_sec: number; // Liczba operacji zapisu na dysk na sekundę
  tIO_sec: number; // Całkowita liczba operacji I/O na sekundę
  rWaitTime: number; // Całkowity czas oczekiwania na operacje odczytu (w milisekundach)
  wWaitTime: number; // Całkowity czas oczekiwania na operacje zapisu (w milisekundach)
  tWaitTime: number; // Całkowity czas oczekiwania na wszystkie operacje I/O (w milisekundach)
  rWaitPercent: number; // Procent czasu oczekiwania spędzony na odczycie
  wWaitPercent: number; // Procent czasu oczekiwania spędzony na zapisie
  tWaitPercent: number; // Procent czasu oczekiwania spędzony na wszystkich operacjach I/O
  ms: number; // Czas, w którym zebrane zostały dane (w milisekundach)
}

export interface UserAccount {
  username: string;
  terminal: string;
  loginTime: string;
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

  public requestFileSystemExplorer(path: string) {
    this.socket.emit('requestDirectoryContents', { path });
  }

  public requestDirectoryContentsLazy(path: string) {
    this.socket.emit('requestDirectoryContents', { path });
  }

  public onFileSystemExplorerUpdate(
    callback: (data: DirectoryItem[]) => void,
    errorCallback: (error: Error) => void
  ) {
    this.socket.on('directoryContentsResponse', callback);
    this.socket.on('error', errorCallback);

    return () => {
      this.socket.off('directoryContentsResponse', callback);
      this.socket.off('error', errorCallback);
    };
  }

  public requestDiskIOStats(): void {
    this.socket.emit('requestDiskIOData');
  }

  public onDiskIOStatsUpdate(
    callback: (stats: DiskIOStat) => void,
    errorCallback: (error: any) => void
  ): () => void {
    this.socket.on('diskIOStatsResponse', callback);
    this.socket.on('error', errorCallback);

    return () => {
      this.socket.off('diskIOStatsResponse', callback);
      this.socket.off('error', errorCallback);
    };
  }

  public requestNetworkActivity(): void {
    this.socket.emit('requestNetworkActivity');
  }

  public onNetworkActivityUpdate(
    callback: (data: any) => void,
    errorCallback: (error: any) => void
  ): () => void {
    this.socket.on('networkActivityResponse', callback);
    this.socket.on('error', errorCallback);

    return () => {
      this.socket.off('networkActivityResponse', callback);
      this.socket.off('error', errorCallback);
    };
  }

  public requestUserAccounts(): void {
    this.socket.emit('requestUserAccounts');
  }

  public onUserAccountsUpdate(
    callback: (accounts: UserAccount[]) => void,
    errorCallback: (error: any) => void
  ): () => void {
    this.socket.on('userAccountsResponse', callback);
    this.socket.on('error', errorCallback);

    return () => {
      this.socket.off('userAccountsResponse', callback);
      this.socket.off('error', errorCallback);
    };
  }
}
