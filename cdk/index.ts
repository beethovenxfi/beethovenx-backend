require('dotenv').config();
import { App, Stack, StackProps } from 'aws-cdk-lib'
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Worker } from './modules/worker';

export class BeethovenXApi extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'Vpc', { maxAzs: 2 });

    new Worker(scope, 'Worker', {
      vpc: vpc,
      databaseUrl: ''
    });

    new Bucket(this, 'BeethovenXTestBucket', {
      versioned: true
    });
  }
}

const app = new App();
new BeethovenXApi(app, 'BeethovenXApi');
app.synth();
