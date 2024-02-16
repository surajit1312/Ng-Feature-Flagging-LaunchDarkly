import { Injectable } from '@angular/core';
import {
  LDClient,
  LDContext,
  LDFlagSet,
  initialize,
} from 'launchdarkly-js-client-sdk';
import { UserDomainService } from './user-domain.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../environments/environment.development';

const API_KEY = '65c472f7818a91109c83e281';

const context: LDContext = {
  kind: 'user',
  key: environment.sdkKey,
  anonymous: true,
};

const LD_API = {
  baseURL: 'https://app.launchdarkly.com/api/v2',
  flags: 'flags',
  project: 'default',
  auth: environment.apiKey,
};

const httpOptions = {
  headers: new HttpHeaders().set('Authorization', environment.apiKey),
};

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private featureFlags: LDFlagSet = {};

  private static ldClient: LDClient;

  constructor(
    private http: HttpClient,
    private userDomainService: UserDomainService
  ) {}

  static async initializeLDClient() {
    AppConfigService.ldClient = initialize(API_KEY, context);
    await AppConfigService.ldClient.waitForInitialization();
  }

  private static featureFlags: any;

  initializeClient(): Promise<any> {
    AppConfigService.initializeLDClient();
    const featurePromise = new Promise((resolve, reject) => {
      AppConfigService.ldClient.waitUntilReady().then(() => {
        const flags = AppConfigService.ldClient.allFlags();
        AppConfigService.featureFlags = flags;
        resolve(flags);
      });
    });
    return featurePromise;
  }

  setFeaturesFlag(features: any) {
    AppConfigService.featureFlags = features;
  }

  getFeatures(): any {
    return AppConfigService.featureFlags;
  }

  static getFeatureAttribute(key: string) {
    console.log(AppConfigService.featureFlags[key]);
    return AppConfigService.featureFlags[key];
  }

  isDomainFeatured(): boolean {
    const ffDomain = AppConfigService.getFeatureAttribute('ff_domain');
    return ffDomain.includes(this.userDomainService.getUserDomain());
  }

  isAccessible(): boolean {
    const ffConfig = AppConfigService.getFeatureAttribute('ff_config');
    const role = this.userDomainService.getUserRole();
    let isValidAdmin = false;
    for (let key of ffConfig) {
      if (key[role]) {
        isValidAdmin = key[role];
        break;
      }
    }
    return this.isDomainFeatured() && isValidAdmin;
  }

  isAdminRole(): boolean {
    return this.userDomainService.getUserRole() === 'admin';
  }

  public validateUser(): boolean {
    return this.isDomainFeatured() && this.isAccessible();
  }

  getFeatureFlagDetails(): Observable<any> {
    const REQUEST_URL = `${LD_API.baseURL}/${LD_API.flags}/${LD_API.project}`;
    return this.http.get(REQUEST_URL, httpOptions);
  }

  getFeatureByKey(key: string): Observable<any> {
    const REQUEST_URL = `${LD_API.baseURL}/${LD_API.flags}/${LD_API.project}/${key}`;
    return this.http.get(REQUEST_URL, httpOptions);
  }

  updateFeatureFlagByKey(key: string, payload: any): Observable<any> {
    const REQUEST_URL = `${LD_API.baseURL}/${LD_API.flags}/${LD_API.project}/${key}`;
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', environment.apiKey)
        .set(
          'Content-Type',
          'application/json;domain-model=launchdarkly.semanticpatch'
        ),
    };
    return this.http.patch(REQUEST_URL, payload, httpOptions);
  }
}
