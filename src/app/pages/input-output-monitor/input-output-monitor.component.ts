import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  DiskIOStat,
  WebsocketService,
} from 'src/app/services/websocket.service';

@Component({
  selector: 'app-input-output-monitor',
  templateUrl: './input-output-monitor.component.html',
  styleUrls: ['./input-output-monitor.component.scss'],
})
export class InputOutputMonitorComponent implements OnInit {
  private _unsubscribe: () => void = () => {};
  public diskStats?: DiskIOStat;
  public loading: boolean = true;

  constructor(
    private messageService: MessageService,
    private websocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.websocketService.onDiskIOStatsUpdate(
      (stats) => {
        this.loading = false;
        this.diskStats = stats;
      },
      (error: any) => {
        this.loading = false;
        console.error('Error while fetching I/O stats:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error while fetching I/O stats',
          detail: error.message,
        });
      }
    );

    this.websocketService.requestDiskIOStats();
  }

  ngOnDestroy(): void {
    this._unsubscribe();
  }

  public approximateNumber(number: number): string {
    if (isNaN(number)) {
      return number.toString(); // or return a default string indicating an error
    }
    return `~${Math.round(number)}`;
  }

  public toPercentage(value: number): string {
    return `${value.toFixed(2)}%`;
  }
  
}
