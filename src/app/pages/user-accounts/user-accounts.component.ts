import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  UserAccount,
  WebsocketService,
} from 'src/app/services/websocket.service';

@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.scss'],
})
export class UserAccountsComponent implements OnInit, OnDestroy {
  private _unsubscribe: () => void = () => {};
  public userAccounts: UserAccount[] = [];
  public loading: boolean = true;

  constructor(
    private messageService: MessageService,
    private websocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.websocketService.requestUserAccounts();

    this._unsubscribe = this.websocketService.onUserAccountsUpdate(
      (accounts: UserAccount[]) => {
        this.userAccounts = accounts;
        this.loading = false;
      },
      (error: any) => {
        console.error('Error while fetching user accounts:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error while fetching user accounts',
          detail: error.message || 'Unknown error',
        });
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this._unsubscribe();
  }
}
