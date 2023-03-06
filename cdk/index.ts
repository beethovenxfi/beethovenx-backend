import { App, Stack, StackProps } from 'aws-cdk-lib'
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Worker } from './modules/worker';

export class BeethovenXApi extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    new Worker(scope, 'Worker');

    new Bucket(this, 'BeethovenXTestBucket', {
      versioned: true
    });
  }
}

const app = new App();
new BeethovenXApi(app, 'BeethovenXApi');
app.synth();
