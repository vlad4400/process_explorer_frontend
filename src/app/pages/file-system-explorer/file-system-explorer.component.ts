import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  DirectoryItem,
  WebsocketService,
} from 'src/app/services/websocket.service';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-file-system-explorer',
  templateUrl: './file-system-explorer.component.html',
  styleUrls: ['./file-system-explorer.component.scss'],
})
export class FileSystemExplorerComponent implements OnInit {
  private _unsubscribe: () => void = () => {};

  public resp?: DirectoryItem[];
  public first: number = 0;
  public totalRecords: number = 0;
  public loading: boolean = true;

  public currentPath: string = '/';

  constructor(
    private messageService: MessageService,
    private websocketService: WebsocketService
  ) {}

  public filesTree: TreeNode[] = [];

  ngOnInit() {
    this.websocketService.requestFileSystemExplorer(this.currentPath);

    this._unsubscribe = this.websocketService.onFileSystemExplorerUpdate(
      (resp: DirectoryItem[]) => {
        console.log('Directory contents received:', resp);
        this.filesTree = this.mapToTreeNode(resp);
        this.loading = false;
      },
      (error) => {
        this.currentPath = this.currentPath.substring(
          0,
          this.currentPath.lastIndexOf('/')
        );

        if (this.currentPath === '') {
          this.currentPath = '/';
        }

        this.handleError(error);
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this._unsubscribe();
  }

  mapToTreeNode(contents: DirectoryItem[]): TreeNode[] {
    return contents.map((item): TreeNode => {
      return {
        label: item.name,
        data: item,
        leaf: !item.isDirectory,
        type: item.isDirectory ? 'folder' : 'file',
        children:
          item.isDirectory && item.children
            ? this.mapToTreeNode(item.children)
            : [],
      };
    });
  }

  handleError(error: any) {
    console.error('Error while fetching directory contents', error);
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load directory contents',
    });
  }

  public onNodeSelect(node: TreeNode) {
    if (!node.data.isDirectory) {
      return;
    }
    this.loading = true;
    this.currentPath += node.data.name + '/';

    this.websocketService.requestFileSystemExplorer(this.currentPath);
  }

  public onBack(): void {
    const pathParts = this.currentPath.split('/').filter(Boolean);
    pathParts.pop();
    this.currentPath = '/' + pathParts.join('/');
    console.log('Current path:', this.currentPath);
    this.loading = true;

    this.websocketService.requestFileSystemExplorer(this.currentPath);
  }

  public convertBytesToMB(bytes: number): number {
    return parseFloat((bytes / (1024 * 1024)).toFixed(2)); // Zaokrąglenie do dwóch miejsc po przecinku
  }
}
