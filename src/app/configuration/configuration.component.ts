import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppConfigService } from '../app-config.service';

export interface IFeature {
  key: string;
  defaultValue: boolean;
  rules: Array<any>;
}

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  featureFlags!: Record<string, any>;
  panelOpenState = false;
  features: Array<any> = [];
  json = JSON.stringify;

  constructor(
    private appConfig: AppConfigService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.appConfig.getFeatureFlagDetails().subscribe((featureFlags) => {
      this.features = featureFlags.items.map((item: any) => {
        console.log(item);
        return {
          key: item.key,
          name: item.name,
          kind: item.kind,
          rules: {
            variations: item.variations,
            environments: this.getEnvironmentValues(item.environments),
          },
          defaultValue: item.temporary,
        };
      });
    });
  }

  private getEnvironmentValues(environments: any) {
    console.log(environments);
    const envData = [];
    for (let key of Object.keys(environments)) {
      envData.push({
        key,
        name: environments[key]._environmentName,
        kind: environments[key].on,
      });
    }
    return envData;
  }

  toggleFeature(event: any, environment: any, featureKey: string) {
    const checked = event.checked ? 'turnFlagOn' : 'turnFlagOff';
    const status = event.checked ? 'On' : 'Off';
    const payload = {
      environmentKey: environment.key,
      instructions: [
        {
          kind: checked,
        },
      ],
    };
    this.appConfig
      .updateFeatureFlagByKey(featureKey, payload)
      .subscribe((val: any) => {
        if (val) {
          this._snackBar.open(
            `'${featureKey}' has been toggled successfully to '${status}' for '${environment.name}'`,
            '',
            {
              horizontalPosition: 'end',
              verticalPosition: 'top',
            }
          );
        }
      });
  }
}
