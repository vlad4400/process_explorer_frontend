import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  MemoryUsage,
  WebsocketService,
} from 'src/app/services/websocket.service';

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string[];
}

@Component({
  selector: 'app-memory-analysis',
  templateUrl: './memory-analysis.component.html',
  styleUrls: ['./memory-analysis.component.scss'],
})
export class MemoryAnalysisComponent implements OnInit {
  private _unsubscribe: () => void = () => {};
  public data?: ChartData;
  public resp?: MemoryUsage;
  public loading: boolean = true;
  public options: any = {
    animation: {
      duration: 1000,
      easing: 'easeOutBounce',
    },
  };

  constructor(
    private messageService: MessageService,
    private websocketService: WebsocketService
  ) {}

  ngOnInit() {
    this.websocketService.requestMemoryAnalysis();

    this._unsubscribe = this.websocketService.onMemoryUsageUpdate(
      (resp) => {
        this.resp = resp;
        this.data = {
          labels: ['Used Memory', 'Free Memory'],
          datasets: [
            {
              label: 'Memory Usage',
              data: [
                +this.formatBytesToGB(resp.usedMemory),
                +this.formatBytesToGB(resp.freeMemory),
              ],
              backgroundColor: [
                "#2c3e50",
                "#2c3e5055",
              ],
            },
          ],
        };

        setTimeout(() => {
          this.options = {
            ...this.options,
            animation: false,
          };
        }, 1000);
        this.loading = false;
      },
      (error) => {
        console.error('Error while fetching memory usage', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error while fetching memory usage',
          detail: error.message,
        });
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this._unsubscribe();
  }

  formatBytesToGB(bytes: number): string {
    const gigabytes = bytes / 1024 / 1024 / 1024;
    return gigabytes.toFixed(2);
  }
}
