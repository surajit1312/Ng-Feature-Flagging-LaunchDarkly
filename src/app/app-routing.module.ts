import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AppConfigService } from './app-config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDomainService } from './user-domain.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  public static loadRoutes = (
    userDomainService: UserDomainService,
    appConfig: AppConfigService
  ): Routes => {
    const appRoutes: Routes = routes;
    const isDomainFeatured = appConfig.isDomainFeatured();
    const isAccessible = appConfig.isAccessible();
    if (isDomainFeatured && isAccessible) {
      appRoutes.push({
        path: 'secret',
        loadChildren: () =>
          import('./secret/secret.module').then((m) => m.SecretModule),
      });
    }
    if (appConfig.isAdminRole()) {
      appRoutes.push({
        path: 'configuration',
        loadChildren: () =>
          import('./configuration/configuration.module').then(
            (m) => m.ConfigurationModule
          ),
      });
    }
    return appRoutes;
  };
}
