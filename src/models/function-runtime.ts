import { FunctionLanguage } from "./function-language";

export enum FunctionRuntime {
    NodeJS ='nodejs',
    NodeJS14 ='nodejs14',
    Java = 'java',
    Go = 'go'
}

export const RuntimeForLanguage = {
    [FunctionLanguage.Javascript]: [
        { runtime: FunctionRuntime.NodeJS, name: 'NodeJS latest' },
        { runtime: FunctionRuntime.NodeJS14, name: 'NodeJS v14' }
    ],

    [FunctionLanguage.Typescript]: [
        { runtime: FunctionRuntime.NodeJS, name: 'NodeJS latest' },
        { runtime: FunctionRuntime.NodeJS14, name: 'NodeJS v14' }
    ],

    [FunctionLanguage.Go]: [
        { runtime: FunctionRuntime.Go, name: 'Go latest' }
    ],

    [FunctionLanguage.Java]: [
        { runtime: FunctionRuntime.Java, name: 'Java latest' }
    ]
};