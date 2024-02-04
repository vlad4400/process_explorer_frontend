import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Process, WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-process-monitor',
  templateUrl: './process-monitor.component.html',
  styleUrls: ['./process-monitor.component.scss'],
})
export class ProcessMonitorComponent implements OnInit, OnDestroy {
  private _processOriginal: Process[] = [];
  private _unsubscribe: () => void = () => {};

  public processes: Process[] = [];
  public first: number = 0;
  public totalRecords: number = 0;
  public loading: boolean = true;

  constructor(
    private messageService: MessageService,
    private websocketService: WebsocketService
  ) {}

  ngOnInit() {
    this.websocketService.requestAllProcesses();

    this._unsubscribe = this.websocketService.onProcessUpdate(
      (data) => {
        this._processOriginal = data;
        this.totalRecords = data.length;
        this.refreshTablePage();
        this.loading = false;
      },
      (error) => {
        console.error('Error while fetching processes', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error while fetching processes',
          detail: error.message,
        });
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this._unsubscribe();
  }

  private refreshTablePage() {
    this.processes = this._processOriginal.filter(
      (process, index) => index >= this.first
    );
  }

  public onPageChange(event: { first: number; rows: number }) {
    this.first = event.first;
    this.refreshTablePage();
  }
}
