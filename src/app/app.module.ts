import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcessMonitorComponent } from './pages/process-monitor/process-monitor.component';
import { MemoryAnalysisComponent } from './pages/memory-analysis/memory-analysis.component';
import { FileSystemExplorerComponent } from './pages/file-system-explorer/file-system-explorer.component';
import { InputOutputMonitorComponent } from './pages/input-output-monitor/input-output-monitor.component';
import { NetworkActivityAnalysisComponent } from './pages/network-activity-analysis/network-activity-analysis.component';
import { UserAccountsComponent } from './pages/user-accounts/user-accounts.component';
import { SystemServicesMonitorComponent } from './pages/system-services-monitor/system-services-monitor.component';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ChartModule } from 'primeng/chart';

const PRIMENG_MODULES = [TableModule, ToastModule, RippleModule, ChartModule];

@NgModule({
  declarations: [
    AppComponent,
    ProcessMonitorComponent,
    MemoryAnalysisComponent,
    FileSystemExplorerComponent,
    InputOutputMonitorComponent,
    NetworkActivityAnalysisComponent,
    UserAccountsComponent,
    SystemServicesMonitorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ...PRIMENG_MODULES,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
