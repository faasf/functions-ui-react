import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { useSidebarOpen } from "../../hooks/sidebar-open";
import FuntionEditorSidebar from "./side-bar";
import FuntionEditorTopbar from "./top-bar";
import { Function, FunctionRuntime, SourceCodeType } from '../../models';
import { functionsService } from "../../services/functions-service";
import { TopbarFileData } from './topbar-file-data';
import { FunctionLanguage } from "../../models/function-language";
import { FunctionStatus } from "../../models/FunctionStatus";

const nodeCommonSource = 
`export declare abstract class Secrets {
    static getSecret(key: string): Promise<string | null>;
}
export interface LogMessage {
    message: string;
    data?: any;
}
export interface Logger {
    debug(msg: LogMessage): void;
    info(msg: LogMessage): void;
    warn(msg: LogMessage): void;
    error(msg: LogMessage): void;
}
export declare abstract class Logging {
    static getLogger(): Logger;
}
export interface HttpRequest {
    method: HttpMethod | null;
    url: string;
    headers: {
        [key: string]: string;
    };
    query: {
        [key: string]: string;
    };
    params: {
        [key: string]: string;
    };
    body?: any;
    files?: {
        [key: string]: FormFile[];
    };
}
export interface HttpResponse {
    headers?: {
        [key: string]: string;
    };
    statusCode: number;
    body: any;
}
`;
const nodeCommon = `declare module '@faasff/nodejs-common' { ${nodeCommonSource} }`;

const openFile = (fn: Function, openedFiles: TopbarFileData[], setOpenedFiles: any, reorder = false): void => {
    const alreadyOpenedFn = openedFiles.find(openedFn => openedFn.function.name === fn.name);
    if (alreadyOpenedFn) {
        if (reorder) {
            alreadyOpenedFn.isActive = true;
            setOpenedFiles([alreadyOpenedFn, ...openedFiles.filter(openedFn => openedFn.function.name !== alreadyOpenedFn.function.name).map((openedFn: TopbarFileData) => ({ ...openedFn, isActive: false }))]);
        } else {
            setOpenedFiles(openedFiles.map((openedFn: TopbarFileData) => ({ ...openedFn, isActive: openedFn.function.name === fn.name })));
        }
    } else {
        setOpenedFiles([{ function: fn, isActive: true }, ...openedFiles.map((openedFn: TopbarFileData) => ({ ...openedFn, isActive: false }))]);
    }
}

const closeFile = (functionName: string, openedFiles: TopbarFileData[], setOpenedFiles: any): void => {
    const fns = openedFiles.filter(openedFn => openedFn.function.name !== functionName);
    if (fns.length > 0) {
        fns[0].isActive = true;
    }
    setOpenedFiles(fns);
}

const getActiveFunction = (openedFiles: TopbarFileData[]): Function => {
    const activeFn = openedFiles.find(openedFn => openedFn.isActive);
    if (activeFn) {
        return activeFn.function;
    }

    return {
        name: '',
        sourceCode: {
            language: FunctionLanguage.Javascript,
            type: SourceCodeType.File,
            content: '',
        },
        runtime: FunctionRuntime.NodeJS,
        description: '',
        status: FunctionStatus.Draft,
        timeout: 30,
        triggers: [],
        initialCode: '',
        etag: "1",
    };
};

const FunctionsEditor = () => {
    const { setSidebarOpen } = useSidebarOpen();
    const editorRef = useRef(null);
    const [openedFiles, setOpenedFiles] = useState([] as TopbarFileData[]);
    const [functions, setFunctions] = useState([] as Function[]);

    const monaco = useMonaco();

    useEffect(() => {
        monaco?.languages.typescript.typescriptDefaults.addExtraLib(nodeCommon);
        monaco?.languages.typescript.javascriptDefaults.addExtraLib(nodeCommon);

        console.log(monaco?.languages.typescript.typescriptDefaults);

    }, [monaco]);

    useEffect(() => {
        setSidebarOpen(false);

        const fetchData = async () => {
            const data = await functionsService.getAllFunctions();
            if (data && data.length > 0) {
                setFunctions(data);
                setOpenedFiles([{ function: data[0], isActive: true }]);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        (editorRef.current as any)?.focus();
    }, [openedFiles]);

    const onFunctionAdd = async (functionName?: string) => {
        const data = await functionsService.getAllFunctions();
        if (data && data.length > 0) {
            setFunctions(data);
            const newFunction = data.find(f => f.name === functionName);
            openFile(newFunction ?? data[0], openedFiles, setOpenedFiles, true)
        }
    };

    const onFunctionSave = async () => {
        const fn = openedFiles.find(f => f.isActive);
        if (!fn) {
            return;
        }

        const res = await functionsService.updateFunction(fn.function.name, { ...fn.function, code: fn.function.sourceCode.content });
        fn.function.initialCode = fn.function.sourceCode.content;
        fn.function.etag = res.etag;

        updateFunctions(fn.function);
    };

    const onFunctionUpdate = async (fn?: Function) => {
        if (!fn) {
            return;
        }

        updateFunctions(fn);
    };

    const updateFunctions = (updatedFn: Function) => {
        const fns: Function[] = functions.map(f => f.name === updatedFn.name ? ({ ...f, ...updatedFn }) : ({ ...f, }));
        const of: TopbarFileData[] = openedFiles.map(f => ({ ...f, function: fns.find(func => func.name === f.function.name) as Function }));

        setFunctions(fns);
        setOpenedFiles(of);
    }

    const onFunctionPublish = async () => {
        const fn = openedFiles.find(f => f.isActive);
        if (!fn) {
            return;
        }

        const res = await functionsService.publishFunction(fn.function.name, { etag: fn.function.etag });
        fn.function.etag = res.etag;
        fn.function.status = res.status;

        updateFunctions(fn.function);
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
        }}>
            <FuntionEditorSidebar
                functions={functions}
                openedFiles={openedFiles}
                onFunctionAdd={onFunctionAdd}
                onFunctionSave={onFunctionSave}
                onFunctionPublish={onFunctionPublish}
                onFunctionUpdate={onFunctionUpdate}
                onFunctionClick={(fn: Function) => openFile(fn, openedFiles, setOpenedFiles, true)} />
            <div style={{
                width: 'calc(100% - 240px)',
                height: '100%'
            }}>
                <FuntionEditorTopbar
                    openedFiles={openedFiles}
                    onOpenFile={(fn: Function) => openFile(fn, openedFiles, setOpenedFiles, false)}
                    onCloseFile={(functionName: string) => closeFile(functionName, openedFiles, setOpenedFiles)} />
                <Editor
                    height="calc(100% - 32px)"
                    path={getActiveFunction(openedFiles).name}
                    language={getActiveFunction(openedFiles).sourceCode.language}
                    defaultValue={getActiveFunction(openedFiles).sourceCode.content}
                    onMount={(editor) => (editorRef.current = editor)}
                    onChange={(data) => { const fn = getActiveFunction(openedFiles); fn.sourceCode.content = data as string; updateFunctions(fn); }}
                />
            </div>
        </div>
    )
}

export default FunctionsEditor;