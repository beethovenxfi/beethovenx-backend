export enum Duration {
    Miliseconds = 'MILISECOND',
    Seconds = 'SECOND',
    Minutes = 'MINUTE',
    Hours = 'HOUR',
    Days = 'DAY',
}

export function every(times: number, duration: Duration): number {
    switch (duration) {
        case Duration.Miliseconds:
            return times;
        case Duration.Seconds:
            const msInSecond = 1000;
            return msInSecond * times;
        case Duration.Minutes:
            const msInMinute = 60_000;
            return msInMinute * times;
        case Duration.Hours:
            const msInHour = 3_600_000;
            return msInHour * times;
        case Duration.Days:
            const msInDay = 86_400_000;
            return msInDay * times;
        default:
            throw new Error(`Unknown duration: ${duration}`);
    }
}
