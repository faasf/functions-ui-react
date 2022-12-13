import { FunctionRuntime } from "../function-runtime";
import { Trigger } from "../trigger";

export interface UpdateFunctionDto {
    runtime: FunctionRuntime;
    triggers: Trigger[];
    description: string;
    code: string;
    etag: string;
}