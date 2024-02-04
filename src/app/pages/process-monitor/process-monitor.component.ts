import { Component, OnInit } from '@angular/core';
import { Process, WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-process-monitor',
  templateUrl: './process-monitor.component.html',
  styleUrls: ['./process-monitor.component.scss'],
})
export class ProcessMonitorComponent implements OnInit {
  processes: Process[] = [];

  constructor(private websocketService: WebsocketService) {}

  ngOnInit() {
    this.websocketService.requestAllProcesses();

    this.websocketService.onProcessUpdate((data) => {
      this.processes = data;
    });
  }
}
