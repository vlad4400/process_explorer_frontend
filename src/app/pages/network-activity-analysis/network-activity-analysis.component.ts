import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { WebsocketService } from 'src/app/services/websocket.service';

export interface NetworkActivityData {
  localAddress: string;
  localPort: string;
  peerAddress: string;
  peerPort: string;
  pid: number;
  process: string;
  protocol: string;
  state: string;
}

@Component({
  selector: 'app-network-activity-analysis',
  templateUrl: './network-activity-analysis.component.html',
  styleUrls: ['./network-activity-analysis.component.scss'],
})
export class NetworkActivityAnalysisComponent implements OnInit, OnDestroy {
  private _unsubscribe: () => void = () => {};
  public networkActivities: NetworkActivityData[] = [];
  public totalRecords: number = 0;
  public loading: boolean = true;
  public first: number = 0; // Dodano do obsługi paginacji
  public rows: number = 10; // Liczba wierszy na stronę, domyślnie 10

  constructor(
    private messageService: MessageService,
    private websocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.websocketService.requestNetworkActivity();

    this._unsubscribe = this.websocketService.onNetworkActivityUpdate(
      (data) => {
        console.log('data', data);

        this.networkActivities = data;
        this.totalRecords = data.length;
        this.loading = false;
      },
      (error: any) => {
        console.error('Error while fetching network activity data:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error while fetching network activity data',
          detail: error.message || 'Unknown error',
        });
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this._unsubscribe();
  }

  onPageChange(event: { first: number; rows: number }): void {
    this.first = event.first;
    this.rows = event.rows;
  }
}
