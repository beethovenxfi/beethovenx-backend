import {
    CloudWatchClient,
    DeleteAlarmsCommand,
    DescribeAlarmsCommand,
    PutMetricAlarmCommand,
} from '@aws-sdk/client-cloudwatch';
import { env } from '../app/env';
import cronRunMetric from '../modules/metrics/cron.metric';
import { WorkerJob } from './manual-jobs';

export async function createAlertsIfNotExist(jobs: WorkerJob[]): Promise<void> {
    const cloudWatchClient = new CloudWatchClient({
        region: process.env.AWS_REGION,
    });

    const currentAlarms = await cloudWatchClient.send(new DescribeAlarmsCommand({}));

    for (const cronJob of jobs) {
        const alarmName = `AUTO CRON ALARM: ${cronJob.name}`;

        // alert if cron has not run once in the double interval (or once in a minute for short intervals)
        const threshold = 1;
        let periodInSeconds = (cronJob.interval / 1000) * 2;
        if (periodInSeconds < 60) {
            periodInSeconds = 60;
        }

        const foundAlarm = currentAlarms.MetricAlarms?.find(
            (alarm) => alarm.AlarmName === `AUTO CRON ALARM: ${cronJob.name}`,
        );
        if (foundAlarm) {
            if (foundAlarm.Period != periodInSeconds) {
                cloudWatchClient.send(new DeleteAlarmsCommand({ AlarmNames: [alarmName] }));
            } else {
                continue;
            }
        }
        //make sure metric is available for alarm
        cronRunMetric.publish(`${cronJob.name}-done`);

        const putAlarmCommand = new PutMetricAlarmCommand({
            AlarmName: alarmName,
            AlarmDescription: `The cron job ${cronJob.name} should run every ${cronJob.interval / 1000} seconds. 
            Trigger alarm if the cron ran less than once in ${periodInSeconds} seconds.`,
            ActionsEnabled: true,
            AlarmActions: ['arn:aws:sns:eu-central-1:837533371577:Default_CloudWatch_Alarms_Topic'],
            MetricName: `${cronJob}-done`,
            Statistic: 'Sum',
            Dimensions: [{ Name: 'Environment', Value: env.DEPLOYMENT_ENV }],
            Period: periodInSeconds,
            EvaluationPeriods: 1,
            DatapointsToAlarm: 1,
            Threshold: threshold,
            ComparisonOperator: 'LessThanOrEqualToThreshold',
            TreatMissingData: 'missing',
            Namespace: cronRunMetric.namespace,
        });

        await cloudWatchClient.send(putAlarmCommand);
    }
}
