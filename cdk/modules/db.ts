import {
  CfnOutput,
  Stack,
  StackProps,
  Tags,
  App,
  Fn,
  Duration,
  RemovalPolicy,
} from 'aws-cdk-lib';
import { IPeer, Peer, Port, SecurityGroup, Subnet, SubnetSelection, Vpc } from 'aws-cdk-lib/aws-ec2';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Credentials, DatabaseInstance, DatabaseInstanceEngine, ParameterGroup, PostgresEngineVersion, SubnetGroup } from 'aws-cdk-lib/aws-rds';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export interface PostgresDbProps extends StackProps {
  vpc: Vpc;
  dbName: string;

  port: number;

  /**
   * username to access the database
   * @default dbadmin
   */
  readonly username?: string;

  /**
   *
   * ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.LARGE)
   * @default m5.large
   */
  readonly instanceType?: any;

  /**
   * provide the version of the database
   * @default PostgresEngineVersion.VER_14_6
   */
  readonly engineVersion?: any;

  /**
   * backup retention days
   * @default 14
   */
  readonly backupRetentionDays?: number;

  /**
   * backup window time
   * @default 00:15-01:15
   */

  readonly backupWindow?: string;

  /**
   * maintenance time 
   * @default Sun:23:45-Mon:00:15
   */
  readonly preferredMaintenanceWindow?: string;

  /**
   * list of ingress sources
   */
  readonly ingressSources?: IPeer[];
}

export class PostgresDb extends Stack {
  constructor(scope: Construct, id: string, props: PostgresDbProps) {
    super(scope, id);

    // default database username
    const username = props.username || "dbadmin";
    const engineVersion: PostgresEngineVersion = props.engineVersion || PostgresEngineVersion.VER_14_6;
    const ingressSources: IPeer[]  = props.ingressSources || [];

    // Subnets
    const subnets: any[] = [];

    for (const subnet of props.vpc.privateSubnets) {
      const subid = subnet.subnetId
        .replace('-', '')
        .replace('_', '')
        .replace(' ', '');
      subnets.push(
        Subnet.fromSubnetAttributes(this, subid, {
          subnetId: subid,
        }),
      );
    }

    const vpcSubnets: SubnetSelection = {
      subnets: subnets,
    };


    const allAll = Port.allTraffic();
    const portRange = Port.tcpRange(props.port, props.port);

    const dbsg = new SecurityGroup(this, 'DatabaseDefaultSecurityGroup', {
      vpc: props.vpc,
      allowAllOutbound: true,
      description: id + 'DatabaseDefaultSG',
      securityGroupName: id + 'DatabaseDefaultSG',
    });

    dbsg.addIngressRule(dbsg, allAll, 'all from self');
    dbsg.addIngressRule(Peer.anyIpv4(), Port.tcp(5432), 'Ingress 5432');
    dbsg.addEgressRule(Peer.ipv4('0.0.0.0/0'), allAll, 'all out');

    const connectionPorts = [
      { port: portRange, description: '' },
    ];

    for (let ingressSource of ingressSources!) {
      for (let c of connectionPorts) {
        dbsg.addIngressRule(ingressSource, c.port, c.description);
      }
    }




    const dbSubnetGroup = new SubnetGroup(this, 'DatabaseSubnetGroup', {
      vpc: props.vpc,
      description: id + 'subnet group',
      vpcSubnets: vpcSubnets,
      subnetGroupName: id + 'subnet group',
    });

    const dbSecret = new secretsmanager.Secret(this, 'DbPassword', {
      secretName: props.dbName + 'DbPassword',
      description: props.dbName + ' Database Password',
      generateSecretString: {
        excludeCharacters: "\"@/\\ '",
        generateStringKey: 'password',
        passwordLength: 30,
        secretStringTemplate: JSON.stringify({username}),
      },
    });

    const dbCredentials = Credentials.fromSecret(
      dbSecret,
      username,
    );

    const dbInstance = new DatabaseInstance(this, 'Database', {
      databaseName: props.dbName,
      instanceIdentifier: props.dbName,
      credentials: dbCredentials,
      engine: DatabaseInstanceEngine.postgres({
        version: engineVersion,
      }),
      backupRetention: Duration.days(7),
      allocatedStorage: 20,
      securityGroups: [dbsg],
      allowMajorVersionUpgrade: true,
      autoMinorVersionUpgrade: true,
      instanceType: props.instanceType,
      vpcSubnets: vpcSubnets,
      vpc: props.vpc,
      removalPolicy: RemovalPolicy.DESTROY,
      storageEncrypted: true,
      monitoringInterval: Duration.seconds(60),
      enablePerformanceInsights: true,
      subnetGroup: dbSubnetGroup,
      preferredBackupWindow: props.backupWindow,
      preferredMaintenanceWindow: props.preferredMaintenanceWindow,
      publiclyAccessible: false,
    });

    dbInstance.addRotationSingleUser();

    // Tags
    Tags.of(dbInstance).add('Name', 'Database', {
      priority: 300,
    });


    new CfnOutput(this, 'DbEndpoint', {
      exportName: 'DbEndpoint',
      value: dbInstance.dbInstanceEndpointAddress,
    });

    new CfnOutput(this, 'DbUsername', {
      exportName: 'DbUsername',
      value: username,
    });

    new CfnOutput(this, 'DbName', {
      exportName: 'DbName',
      value: props.dbName!,
    });
  }
}