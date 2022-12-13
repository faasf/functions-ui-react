import { FunctionLanguage } from "./function-language";
import { FunctionRuntime } from "./function-runtime";
import { FunctionStatus } from "./FunctionStatus";
import { SourceCodeType } from "./source-code-type";
import { Trigger } from "./trigger";

export interface Function {
    name: string;
    description: string;
    runtime: FunctionRuntime;
    sourceCode: FunctionSourceCode;
    triggers: Trigger[];
    status: FunctionStatus;
    timeout: number;
    initialCode: string;
    etag: string;
};

export interface FunctionSourceCode {
    language: FunctionLanguage;
    type: SourceCodeType;
    content: string;
};
