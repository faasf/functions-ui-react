import axios from "axios";
import { Log } from "../models";
import { config } from "../config";

interface ILogsService {
    getLogs(options: GetLogsOptions): Promise<Log[]>;
}

class LogsService implements ILogsService {
    async getLogs(options: GetLogsOptions): Promise<Log[]> {
        for (const key of Object.keys(options)) {
            if (!(options as any)[key]) {
              delete (options as any)[key];
            }
          }

        return (await axios.get<GetLogsResponse>(`${config.logsServiceUrl}/v1/logs`, { params: options })).data.items;
    }
}

interface GetLogsResponse {
    items: Log[];
}

export interface GetLogsOptions {
    executionId?: string;
    functionName?: string;
    logLevel?: string;
}

export const logsService = new LogsService();