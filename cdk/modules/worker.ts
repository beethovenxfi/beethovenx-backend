import { App, CfnOutput, Fn, SecretValue, Stack, StackProps } from 'aws-cdk-lib'
import { SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Cluster } from 'aws-cdk-lib/aws-ecs';
import { ContainerImage, Secret as EcsSecret } from 'aws-cdk-lib/aws-ecs';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';
import path = require('path');

export interface WorkerProps extends StackProps {
  /**
   * VPC Id
   */
  vpc: Vpc;

  /**
   * The ARN of the secretsmanager secret that contains
   * the full url that the worker should connect to
   */
  // dbUrlSecretArn: string;

  /**
   * Pre-created security groups to add to this worker so that
   * it can access other resources
   */
  securityGroups?: SecurityGroup[];
}

export class Worker extends Stack {
    constructor(scope: Construct, id: string, props: WorkerProps) {
      super(scope, id, props);

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

      // Create Fargate Cluster
      // NOTE: Limit AZs to avoid reaching resource quotas
      const cluster = new Cluster(this, 'WorkerCluster', { vpc: props.vpc });

      // Instantiate Fargate Service with a cluster and a local image that gets
      // uploaded to an S3 staging bucket prior to being uploaded to ECR.
      // A new repository is created in ECR and the Fargate service is created
      // with the image from ECR.
      new ApplicationLoadBalancedFargateService(this, 'FargateService', {
          cluster,
          // securityGroups,
          taskImageOptions: {
              image: ContainerImage.fromAsset(path.resolve(__dirname, '..', '..')),
              environment: {
                ...process.env,
                'WORKER': 'true',
                'CRONS': 'true',
                'DATABASE_URL': dbUrl
              },
              containerName: 'Worker',
              containerPort: 4000,
          },
      });
    }
}
