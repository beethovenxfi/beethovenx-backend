import {
    CloudWatchClient,
    CloudWatchClientConfig,
    MetricDatum,
    PutMetricDataCommand,
} from '@aws-sdk/client-cloudwatch';
import { env } from '../../app/env';

export interface NotificationsCloudwatchMetric {
    merticData: MetricDatum[];
    nameSpace: string;
}

export abstract class MetricPublisher {
    protected environment: string;
    protected configuration?: CloudWatchClientConfig;
    private client: CloudWatchClient;
    public namespace: string;

    constructor(configuration?: CloudWatchClientConfig) {
        this.namespace = 'default';
        this.environment = env.DEPLOYMENT_ENV;
        this.client = new CloudWatchClient(this.getOrDefaultConfig());
    }

    public async publish(metricName: string, count?: number): Promise<void> {
        try {
            const command = new PutMetricDataCommand({
                MetricData: [
                    {
                        MetricName: metricName,
                        Dimensions: [
                            {
                                Name: 'Environment',
                                Value: this.environment,
                            },
                        ],
                        Unit: 'None',
                        Timestamp: new Date(),
                        Value: count ? count : 1,
                    },
                ],
                Namespace: this.namespace,
            });

            await this.client.send(command);
        } catch (err) {
            console.log('Failed to publish metric ', err);
            return;
        }
    }

    private getOrDefaultConfig(): CloudWatchClientConfig {
        return this.configuration
            ? this.configuration
            : {
                  region: process.env.AWS_REGION,
              };
    }
}
