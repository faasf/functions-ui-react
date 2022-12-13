import { FunctionSourceCode } from "../function";
import { FunctionRuntime } from "../function-runtime";
import { FunctionStatus } from "../FunctionStatus";
import { EventTrigger, HttpTrigger } from "../trigger";

export interface FunctionDto {
    name: string;
    description: string;
    runtime: FunctionRuntime;
    sourceCode: FunctionSourceCode;
    httpTriggers: HttpTrigger[];
    eventTriggers: EventTrigger[];
    status: FunctionStatus;
    timeout: number;
    etag: string;
};