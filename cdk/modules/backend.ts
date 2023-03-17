import { App, CfnOutput, Fn, SecretValue, Stack, StackProps } from 'aws-cdk-lib'
import { SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Cluster } from 'aws-cdk-lib/aws-ecs';
import { ContainerImage, Secret as EcsSecret } from 'aws-cdk-lib/aws-ecs';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';
import path = require('path');
import { CfnApplication, CfnEnvironment } from 'aws-cdk-lib/aws-elasticbeanstalk';

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
   * Name of the instance profile to give to EBS which has
   * a role that allows it to access EC2
  */
  ebsInstanceProfileName: string;

  /**
   * Pre-created security groups to add to this worker so that
   * it can access other resources
   */
  securityGroups?: SecurityGroup[];
}

export class Backend extends Stack {
  constructor(scope: Construct, id: string, props: BackendProps) {
    super(scope, id, props);

    // Create the Elastic Beanstalk application
    const ebApplication = new CfnApplication(this, 'EBApplication', {
      applicationName: 'backend'
    });

    const defaultOptionSettings = [
      {
        namespace: 'aws:autoscaling:launchconfiguration',
        optionName: 'InstanceType',
        value: 't4g.medium'
      },
      {
        namespace: 'aws:autoscaling:launchconfiguration',
        optionName: 'IamInstanceProfile',
        value: props.ebsInstanceProfileName
      },
      {
        namespace: 'aws:elasticbeanstalk:environment',
        optionName: 'EnvironmentType',
        value: 'LoadBalanced'
      },
      {
        namespace: 'aws:elasticbeanstalk:environment',
        optionName: 'LoadBalancerType',
        value: 'application'
      },
      {
        namespace: 'aws:autoscaling:trigger',
        optionName: 'MeasureName',
        value: 'TargetResponseTime'
      },
      {
        namespace: 'aws:autoscaling:trigger',
        optionName: 'Period',
        value: '1'
      },
      {
        namespace: 'aws:autoscaling:trigger',
        optionName: 'BreachDuration',
        value: '3'
      },
      {
        namespace: 'aws:autoscaling:trigger',
        optionName: 'UpperThreshold',
        value: '700'
      },
      {
        namespace: 'aws:autoscaling:trigger',
        optionName: 'LowerThreshold',
        value: '300'
      },
      {
        namespace: 'aws:elasticbeanstalk:application',
        optionName: 'Application Healthcheck URL',
        value: '/health'
      },
      {
        namespace: 'aws:ec2:vpc',
        optionName: 'VPCId',
        value: props.vpc.vpcId
      },
      {
        namespace: 'aws:ec2:vpc',
        optionName: 'Subnets',
        value: props.vpc.privateSubnets.map(s => s.subnetId).join(',')
      },
      {
        namespace: 'aws:ec2:vpc',
        optionName: 'ELBSubnets',
        value: props.vpc.publicSubnets.map(s => s.subnetId).join(',')
      }
    ];

    const environmentVariables = {
      'ADMIN_API_KEY': process.env.ADMIN_API_KEY,
      'AWS_REGION': process.env.AWS_REGION,
      'DATABASE_URL': props.dbUrl,
      'DEFAULT_CHAIN_ID': '1',
      'DEPLOYMENT_ENV': 'canary',
      'NODE_ENV': 'production',
      'PROTOCOL': 'balancer',
      'SANITY_API_TOKEN': 'none',
      'SENTRY_DSN': process.env.SENTRY_DSN,
      'WORKER_QUEUE_URL': ''
    }

    const environmentVariableOptions: CfnEnvironment.OptionSettingProperty[] = Object.entries(environmentVariables).map(([name, value]) => {
      return {
        namespace: 'aws:elasticbeanstalk:application:environment',
        optionName: name,
        value
      }
    })


    // Create the 'Backend-env-beets' environment
    const ebEnvironmentBeets = new CfnEnvironment(this, 'EBEnvironmentBeets', {
      environmentName: 'Backend-env-beets',
      applicationName: ebApplication.ref,
      solutionStackName: '64bit Amazon Linux 2 v5.7.0 running Node.js 16',
      optionSettings: [
        ...defaultOptionSettings,
        ...environmentVariableOptions,
      ]
    });

    // Create the 'Backend-v3' environment
    const ebEnvironmentV3 = new CfnEnvironment(this, 'EBEnvironmentV3', {
      environmentName: 'Backend-v3',
      applicationName: ebApplication.ref,
      solutionStackName: '64bit Amazon Linux 2 v5.7.0 running Node.js 16',
      optionSettings: [
        ...defaultOptionSettings,
        ...environmentVariableOptions,
      ]
    });
  }
}
