require('dotenv').config();
import { App, Fn, Stack, StackProps } from 'aws-cdk-lib'
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Port, SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Worker } from './modules/worker';
import { PostgresDb } from './modules/db';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

export class BeethovenXApi extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const dbPort = 5432;

    const vpc = new Vpc(this, 'Vpc', { maxAzs: 2 });

    const db = new PostgresDb(this, 'Database', {
      vpc,
      dbName: 'beetsdb',
      port: dbPort,
    });

 

    const worker = new Worker(this, 'Worker', {
      vpc,
    });

    worker.addDependency(db);

    // const dbSecurityGroup = new SecurityGroup(db, 'DatabaseSecurityGroup', {
    //   vpc: vpc,
    //   description: id + 'Database',
    //   securityGroupName: id + 'Database',
    // })

    // const workerSecurityGroup = new SecurityGroup(worker, 'WorkerSecurityGroup', {
    //   vpc: vpc,
    //   description: id + 'Worker',
    //   securityGroupName: id + 'Worker',
    // });

    // dbSecurityGroup.connections.allowFrom(workerSecurityGroup, Port.tcp(5432))
  }
}

const app = new App();
new BeethovenXApi(app, 'BeethovenXApi');
app.synth();
