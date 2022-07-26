import axios from "axios";
import { Function } from "../models";
import { mockFunctionsData } from "./functions-data-mock";

interface IFunctionsService {
    getAllFunctions(): Promise<Function[]>;
}

class MockFunctionsService implements IFunctionsService {
    getAllFunctions(): Promise<Function[]> {
        return Promise.resolve(mockFunctionsData);
    }
}

class FunctionsService implements IFunctionsService {
    getAllFunctions(): Promise<Function[]> {
        return axios.get("http://localhost:8080/v1/functions");
    }
}

export default new MockFunctionsService();