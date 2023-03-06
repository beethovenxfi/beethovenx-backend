import { App, Stack, StackProps } from 'aws-cdk-lib'
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Cluster } from 'aws-cdk-lib/aws-ecs';
import { ContainerImage } from 'aws-cdk-lib/aws-ecs';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';
import path = require('path');

export class BeethovenXWorker extends Stack {
    constructor(scope: App, id: string, props?: StackProps) {
      super(scope, id, props);

      // Create VPC and Fargate Cluster
      // NOTE: Limit AZs to avoid reaching resource quotas
      const vpc = new Vpc(this, 'WorkerVpc', { maxAzs: 2 });
      const cluster = new Cluster(this, 'WorkerCluster', { vpc });

      // Instantiate Fargate Service with a cluster and a local image that gets
      // uploaded to an S3 staging bucket prior to being uploaded to ECR.
      // A new repository is created in ECR and the Fargate service is created
      // with the image from ECR.
      new ApplicationLoadBalancedFargateService(this, 'FargateService', {
          cluster,
          taskImageOptions: {
              image: ContainerImage.fromAsset(path.resolve(__dirname, 'local-image')),
          },
      });
    }
}
