import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  WebsocketService,
  SystemService,
} from 'src/app/services/websocket.service';

@Component({
  selector: 'app-system-services-monitor',
  templateUrl: './system-services-monitor.component.html',
  styleUrls: ['./system-services-monitor.component.scss'],
})
export class SystemServicesMonitorComponent implements OnInit, OnDestroy {
  private _unsubscribe: () => void = () => {};
  public systemServices: SystemService[] = [];
  public loading: boolean = true;

  constructor(
    private messageService: MessageService,
    private websocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.requestSystemServices();

    this._unsubscribe = this.websocketService.onSystemServicesUpdate(
      (services: SystemService[]) => {
        console.log('System services received:', services);
        
        this.systemServices = services;
        this.loading = false;
      },
      (error: any) => {
        console.error('Error while fetching system services:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error while fetching system services',
          detail: error.message || 'Unknown error',
        });
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this._unsubscribe();
  }

  private requestSystemServices(): void {
    this.websocketService.requestSystemServices();
  }
}
