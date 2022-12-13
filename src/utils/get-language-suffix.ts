import { FunctionLanguage } from "../models/function-language";

export const getLanguageSuffix = (functionLanguage: FunctionLanguage) => {
    switch (functionLanguage) {
        case FunctionLanguage.Javascript:
            return '.js';
        case FunctionLanguage.Typescript:
            return '.ts';
        case FunctionLanguage.Java:
            return '.java';
        case FunctionLanguage.Go:
            return '.go';
        default:
            throw new Error('Unknown function language');
    }
}