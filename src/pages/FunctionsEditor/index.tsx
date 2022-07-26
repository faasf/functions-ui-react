import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { useSidebarOpen } from "../../hooks/sidebar-open";
import FuntionEditorSidebar from "./side-bar";
import FuntionEditorTopbar from "./top-bar";
import { Function } from '../../models';
import functionsService from "../../services/functions-service";
import { TopbarFileData } from './topbar-file-data';

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
        language: 'javascript',
        code: '',
        initialCode: '',
    };
}

const FunctionsEditor = () => {
    const { setSidebarOpen } = useSidebarOpen();
    const editorRef = useRef(null);
    const [openedFiles, setOpenedFiles] = useState([] as TopbarFileData[]);
    const [functions, setFunctions] = useState([] as Function[]);

    useEffect(() => {
        setSidebarOpen(false);
        
        const fetchData = async () => {
            const data = await functionsService.getAllFunctions();
            setFunctions(data);
            setOpenedFiles([{ function: data[0], isActive: true }]);
        };

        fetchData();
    }, []);

    useEffect(() => {
        (editorRef.current as any)?.focus();
    }, [openedFiles]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
        }}>
            <FuntionEditorSidebar
                functions={functions}
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
                    defaultLanguage={getActiveFunction(openedFiles).language}
                    defaultValue={getActiveFunction(openedFiles).code}
                    onMount={(editor) => (editorRef.current = editor)}
                    onChange={(data) => { getActiveFunction(openedFiles).code = data as any; }}
                />
            </div>
        </div>
    )
}

export default FunctionsEditor;