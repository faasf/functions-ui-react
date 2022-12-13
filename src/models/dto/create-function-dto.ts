import { FunctionRuntime } from "../function-runtime";
import { Trigger } from "../trigger";

export interface CreateFunctionDto {
    name: string,
    runtime: FunctionRuntime,
    triggers: Trigger[],
    description: string
}