import { Artifact, Pipeline, StageProps } from 'aws-cdk-lib/aws-codepipeline';
import { CodeBuildAction, GitHubSourceAction, ElasticBeanstalkDeployAction } from 'aws-cdk-lib/aws-codepipeline-actions';
import { Project, BuildSpec, LinuxBuildImage, PipelineProject } from 'aws-cdk-lib/aws-codebuild';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Stack, StackProps, SecretValue, Stage } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodeBuildStep } from 'aws-cdk-lib/pipelines';
import path from 'path';

export interface CIProps extends StackProps {
  /**
   * Full URL of database
   */
  dbUrl: string;
}

export class CI extends Stack {
  constructor(scope: Construct, id: string, props: CIProps) {
    super(scope, id, props);

    // Create an S3 bucket to store the source code artifact
    const artifactBucket = new Bucket(this, 'ArtifactBucket');

    // Create an IAM role for CodeBuild to use
    const codeBuildRole = new Role(this, 'CodeBuildRole', {
      assumedBy: new ServicePrincipal('codebuild.amazonaws.com')
    });

    // Grant the CodeBuild role permissions to access the S3 artifact bucket
    artifactBucket.grantRead(codeBuildRole);

    const sourceOutput = new Artifact('SourceArtifact');

    const pipeline = new Pipeline(this, 'BackendV3Pipeline', {
      pipelineName: 'backend-v3',
      crossAccountKeys: false,
    });

    const sourceStage = pipeline.addStage({
      stageName: 'Source',
      actions: [
        new GitHubSourceAction({
          actionName: 'Source',
          owner: 'timjrobinson',
          repo: 'beethovenx-backend',
          branch: 'v3-canary',
          oauthToken: SecretValue.secretsManager('githubToken'),
          output: sourceOutput
        })
      ]
    })

    const buildOutput = new Artifact('BuildArtifact');

    // Create a build stage with a CodeBuild project
    const buildStage = pipeline.addStage({
      stageName: 'Build',
      actions: [
        new CodeBuildAction({
          actionName: 'Build',
          input: sourceOutput,
          project: new PipelineProject(this, 'CodeBuildProject', {
            role: codeBuildRole,
            environment: {
              buildImage: LinuxBuildImage.STANDARD_6_0,
            },
            environmentVariables: {
              AWS_DEFAULT_REGION: { value:  process.env.AWS_REGION },
              AWS_ACCOUNT_ID: { value: process.env.AWS_ACCOUNT_ID },
              DATABASE_URL: { value: props.dbUrl }
            }
          }),
          outputs: [buildOutput]
        })
      ]
    });

    // Create a deploy stage with three Elastic Beanstalk environments
    const deployStage = pipeline.addStage({
      stageName: 'Deploy',
      actions: [
        new ElasticBeanstalkDeployAction({
            actionName: 'Deploy',
            input: buildOutput,
            environmentName: 'Backend-v3',
            applicationName: 'backend',
        }),
        new ElasticBeanstalkDeployAction({
            actionName: 'deploy-worker',
            input: buildOutput,
            environmentName: 'Backend-crons-v3',
            applicationName: 'backend-crons',
        }),
        new ElasticBeanstalkDeployAction({
            actionName: 'deploy-beets-api',
            input: buildOutput,
            environmentName: 'Backend-env-beets',
            applicationName: 'backend',
        })
      ]
    });
  }
}
