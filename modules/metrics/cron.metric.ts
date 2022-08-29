import { MetricPublisher } from './metrics.client';

class CronRunsMetric extends MetricPublisher {
    constructor() {
        super();
    }
}

const createCronRunsMetric = (): CronRunsMetric => {
    const publisher = new CronRunsMetric();
    publisher.namespace = 'Backend/CronRuns';
    return publisher;
};

const cronRunMetric: MetricPublisher = createCronRunsMetric();

export default cronRunMetric;
