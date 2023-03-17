require('dotenv').config();
import { App, Fn, Stack, StackProps } from 'aws-cdk-lib'
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Port, SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Worker } from './modules/worker';
import { PostgresDb } from './modules/db';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Backend } from './modules/backend';
import { CI } from './modules/ci';
import { CfnInstanceProfile, ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';

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

    const ci = new CI(this, 'BuildPipeline');

    const myRole = new Role(this, `aws-elasticbeanstalk-ec2-role`, {
      assumedBy: new ServicePrincipal('ec2.amazonaws.com'),
    });
    
    const managedPolicy = ManagedPolicy.fromAwsManagedPolicyName('AWSElasticBeanstalkWebTier')
    myRole.addManagedPolicy(managedPolicy);
    
    const ebsInstanceProfileName = `BeetsEBSInstanceProfile`
    
    const instanceProfile = new CfnInstanceProfile(this, ebsInstanceProfileName, {
        instanceProfileName: ebsInstanceProfileName,
        roles: [
            myRole.roleName
        ]
    });

    const backend = new Backend(this, 'EBSBackend', {
      vpc,
      dbUrl,
      ebsInstanceProfileName
    })

    const worker = new Worker(this, 'EBSWorker', {
      vpc,
      dbUrl,
      ebsInstanceProfileName
    })
  }
}

const app = new App();
new BeethovenXApi(app, 'BeethovenXApi');
app.synth();
