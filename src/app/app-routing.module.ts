import { Input, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessMonitorComponent } from './pages/process-monitor/process-monitor.component';
import { MemoryAnalysisComponent } from './pages/memory-analysis/memory-analysis.component';
import { FileSystemExplorerComponent } from './pages/file-system-explorer/file-system-explorer.component';
import { InputOutputMonitorComponent } from './pages/input-output-monitor/input-output-monitor.component';
import { NetworkActivityAnalysisComponent } from './pages/network-activity-analysis/network-activity-analysis.component';
import { UserAccountsComponent } from './pages/user-accounts/user-accounts.component';
import { SystemServicesMonitorComponent } from './pages/system-services-monitor/system-services-monitor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'process-monitor',
    pathMatch: 'full',
  },
  {
    path: 'process-monitor',
    component: ProcessMonitorComponent,
  },
  {
    path: 'memory-analysis',
    component: MemoryAnalysisComponent,
  },
  {
    path: 'file-system-explorer',
    component: FileSystemExplorerComponent,
  },
  {
    path: 'input-output-monitor',
    component: InputOutputMonitorComponent,
  },
  {
    path: 'network-activity-analysis',
    component: NetworkActivityAnalysisComponent,
  },
  {
    path: 'user-accounts',
    component: UserAccountsComponent,
  },
  {
    path: 'system-services-monitor',
    component: SystemServicesMonitorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
