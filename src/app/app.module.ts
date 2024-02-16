import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ROUTES } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { ConfigurationModule } from './configuration/configuration.module';
import { UserDomainService } from './user-domain.service';
import { SecretComponent } from './secret/secret.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent, SecretComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    ConfigurationModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (
        userDomainService: UserDomainService,
        appConfig: AppConfigService
      ) => {
        userDomainService.userDomainAPI().subscribe((userConfig) => {
          userDomainService.setUserConfig(userConfig);
        });
        return appConfig.initializeClient;
      },
      deps: [UserDomainService, AppConfigService],
      multi: true,
    },
    {
      provide: ROUTES,
      useFactory: (
        userDomainService: UserDomainService,
        appConfig: AppConfigService
      ) => AppRoutingModule.loadRoutes(userDomainService, appConfig),
      deps: [UserDomainService, AppConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
