require('dotenv').config();
import { App, Fn, Stack, StackProps } from 'aws-cdk-lib'
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Port, SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Worker } from './modules/worker';
import { PostgresDb } from './modules/db';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Backend } from './modules/backend';

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

    const dbSecretArn = Fn.importValue('DbPasswordSecretArn')
    const dbPasswordSecretJson = Secret.fromSecretCompleteArn(this, 'DbPassword', dbSecretArn)
    const dbPasswordSecret = dbPasswordSecretJson.secretValueFromJson('password');

    const dbUrlTemplate = "postgresql://${DBUSERNAME}:${DBPASSWORD}@${DBHOST}:${DBPORT}/${DBNAME}"

    const dbUrl = Fn.sub(dbUrlTemplate, {
      'DBUSERNAME': Fn.importValue('DbUsername'),
      'DBPASSWORD': dbPasswordSecret.toString(),
      'DBHOST': Fn.importValue('DbHost'),
      'DBPORT': Fn.importValue('DbPort'),
      'DBNAME': Fn.importValue('DbName'),
    })

    const worker = new Worker(this, 'Worker', {
      vpc,
      dbUrl,
    });

    const backend = new Backend(this, 'Backend', {
      vpc,
      dbUrl,
    });

    worker.addDependency(db);
    backend.addDependency(db);
  }
}

const app = new App();
new BeethovenXApi(app, 'BeethovenXApi');
app.synth();
