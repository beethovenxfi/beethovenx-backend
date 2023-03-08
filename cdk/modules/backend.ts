import { App, CfnOutput, Fn, SecretValue, Stack, StackProps } from 'aws-cdk-lib'
import { SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Cluster } from 'aws-cdk-lib/aws-ecs';
import { ContainerImage, Secret as EcsSecret } from 'aws-cdk-lib/aws-ecs';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';
import path = require('path');

export interface BackendProps extends StackProps {
  /**
   * VPC Id
   */
  vpc: Vpc;

  /**
   * Full URL of database
   */
  dbUrl: string;

  /**
   * Pre-created security groups to add to this worker so that
   * it can access other resources
   */
  securityGroups?: SecurityGroup[];
}

export class Backend extends Stack {
    constructor(scope: Construct, id: string, props: BackendProps) {
      super(scope, id, props);
      
      // Create Fargate Cluster
      const cluster = new Cluster(this, 'BackendCluster', { vpc: props.vpc });

      // Instantiate Fargate Service with a cluster and a local image that gets
      // uploaded to an S3 staging bucket prior to being uploaded to ECR.
      // A new repository is created in ECR and the Fargate service is created
      // with the image from ECR.
      new ApplicationLoadBalancedFargateService(this, 'BackendFargateService', {
          cluster,
          // securityGroups,
          taskImageOptions: {
              image: ContainerImage.fromAsset(path.resolve(__dirname, '..', '..')),
              environment: {
                ...process.env,
                'DATABASE_URL': props.dbUrl
              },
              containerName: 'Backend',
              containerPort: 4000,
          },
      });
    }
}
