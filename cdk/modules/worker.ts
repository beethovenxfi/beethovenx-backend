import { App, Stack, StackProps } from 'aws-cdk-lib'
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Cluster } from 'aws-cdk-lib/aws-ecs';
import { ContainerImage } from 'aws-cdk-lib/aws-ecs';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';
import path = require('path');

export interface WorkerProps extends StackProps {
  /**
   * VPC Id
   */
  vpc: Vpc;

  /**
   * URL of the Postgres database. Should be in format:
   * postgresql://USER:PASSWORD@HOST:POST/DB_NAME
   */
  databaseUrl: string
}

export class Worker extends Stack {
    constructor(scope: App, id: string, props: WorkerProps) {
      super(scope, id, props);

      // Create Fargate Cluster
      // NOTE: Limit AZs to avoid reaching resource quotas
      const cluster = new Cluster(this, 'WorkerCluster', { vpc: props.vpc });

      // Instantiate Fargate Service with a cluster and a local image that gets
      // uploaded to an S3 staging bucket prior to being uploaded to ECR.
      // A new repository is created in ECR and the Fargate service is created
      // with the image from ECR.
      new ApplicationLoadBalancedFargateService(this, 'FargateService', {
          cluster,
          assignPublicIp: true,
          taskImageOptions: {
              image: ContainerImage.fromAsset(path.resolve(__dirname, '..', '..')),
              environment: {
                ...process.env,
                'WORKER': 'true',
                'DATABASE_URL': props.databaseUrl, 
              },
              containerName: 'Worker',
              containerPort: 4000,
          },
      });
    }
}
