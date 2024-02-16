import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDomainService {
  private userConfig!: any;

  constructor(private httpClient: HttpClient) {}

  userDomainAPI(): Observable<any> {
    return this.httpClient.get('assets/api/logged-user.json');
  }

  setUserConfig(userConfig: any) {
    this.userConfig = userConfig;
  }

  getUserDomain(): string {
    return this.userConfig.domain;
  }

  getUserRole(): string {
    return this.userConfig.role;
  }
}
