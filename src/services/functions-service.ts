import axios from "axios";
import { CreateFunctionDto, FunctionDto, PublishFunctionDto, UpdateFunctionDto } from "../models/dto";
import { Function, TriggerType } from "../models";
import { config } from "../config";

interface IFunctionsService {
    getAllFunctions(): Promise<Function[]>;
    createFunction(newFunction: CreateFunctionDto): Promise<void>;
    updateFunction(functionName: string, functionData: UpdateFunctionDto): Promise<Function>;
    publishFunction(functionName: string, publishData: PublishFunctionDto): Promise<Function>;
}

class FunctionsService implements IFunctionsService {
    async getAllFunctions(): Promise<Function[]> {
        const functions = (await axios.get<FunctionDto[]>(`${config.functionServiceUrl}/v1/functions`)).data;

        return functions.map(f => ({ ...f, initialCode: f.sourceCode.content, triggers: [...(f.httpTriggers ?? []), ...(f.eventTriggers ?? [])] }));
    }

    async createFunction(newFunction: CreateFunctionDto): Promise<void> {
        const data: any = {
            ...newFunction,
            httpTriggers: newFunction.triggers?.filter(t => t.type === TriggerType.Http),
            eventTriggers: newFunction.triggers?.filter(t => t.type === TriggerType.Event),
        };
        delete data.triggers;
        
        await axios.post(`${config.functionServiceUrl}/v1/functions`, data);
    }

    async updateFunction(functionName: string, functionData: UpdateFunctionDto): Promise<Function> {
        const data: any = {
            ...functionData,
            httpTriggers: functionData.triggers?.filter(t => t.type === TriggerType.Http),
            eventTriggers: functionData.triggers?.filter(t => t.type === TriggerType.Event),
        };
        delete data.triggers;

        const f = (await axios.put(`${config.functionServiceUrl}/v1/functions/${functionName}`, data)).data;
        
        return { ...f, initialCode: f.sourceCode.content, triggers: [...(f.httpTriggers ?? []), ...(f.eventTriggers ?? [])] };
    }

    async publishFunction(functionName: string, publishData: PublishFunctionDto): Promise<Function> {
        const f = (await axios.post(`${config.functionServiceUrl}/v1/functions/${functionName}/publish`, publishData)).data;
        
        return { ...f, initialCode: f.sourceCode.content };
    }
}

export const functionsService = new FunctionsService();