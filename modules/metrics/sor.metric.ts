import { CloudwatchMetricsPublisher } from './metrics.client';

const publishers: Record<string, CloudwatchMetricsPublisher> = {};

export function getSorMetricsPublisher(chainId: string): CloudwatchMetricsPublisher {
    if (!publishers[`${chainId}`]) {
        console.log(`Creating new SOR publisher for ${chainId}`);
        publishers[`${chainId}`] = new CloudwatchMetricsPublisher(`Backend-${chainId}/Sor`);
    }
    return publishers[`${chainId}`];
}
