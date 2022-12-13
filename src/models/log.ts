
export interface Log {
    executionId?: string;
    level: string;
    message: string;
    time: string;
    data: LogData;
};

export interface LogData {
    [key: string]: string
}
