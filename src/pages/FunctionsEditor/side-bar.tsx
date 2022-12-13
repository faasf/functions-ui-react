import { useState } from 'react';
import { IconButton, List, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import { getLanguageIcon } from "../../utils/get-language-icon";
import { Function } from '../../models';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import PublishIcon from '@mui/icons-material/Publish';
import SaveIcon from '@mui/icons-material/Save';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { AddFunctionDialog } from './add-function-dialog';
import { EditFunctionDialog } from './edit-function-dialog';
import { TopbarFileData } from './topbar-file-data';
import { FunctionStatus } from '../../models/FunctionStatus';

const FuntionEditorSidebar = (props: { functions: Function[], onFunctionClick: any, onFunctionAdd: any, onFunctionSave: any, onFunctionUpdate:any, onFunctionPublish: any, openedFiles: TopbarFileData[] }) => {
    const { functions, onFunctionClick, onFunctionAdd, openedFiles, onFunctionSave, onFunctionPublish, onFunctionUpdate } = props;
    const [addFunctionOpen, setAddFunctionOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const handleAddFunctionOpen = () => {
        setAddFunctionOpen(true);
    };

    const handleAddFunctionClose = (functionName?: string) => {
        onFunctionAdd(functionName);
        setAddFunctionOpen(false);
    };

    const handleSettingsOpen = () => setSettingsOpen(true);
    const handleSettingsClose = (fn?: Function) => {
        onFunctionUpdate(fn);
        setSettingsOpen(false);
    };
    const handleSave = () => onFunctionSave();
    const handlePublish = () => onFunctionPublish();

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-start', maxHeight: '32px' }}>
                    <Tooltip title="Settings"><IconButton onClick={handleSettingsOpen}><SettingsIcon fontSize="small" /></IconButton></Tooltip>
                    {openedFiles.find(f => f.isActive)?.function.status !== FunctionStatus.Published && <Tooltip title="Publish"><IconButton onClick={handlePublish}><PublishIcon fontSize="small" /></IconButton></Tooltip>}
                </div>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', maxHeight: '32px' }}>
                    <Tooltip title="Save"><IconButton disabled={openedFiles.find(f => f.isActive)?.function.sourceCode.content === openedFiles.find(f => f.isActive)?.function.initialCode} onClick={handleSave}><SaveOutlinedIcon fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="New function"><IconButton onClick={handleAddFunctionOpen}><NoteAddOutlinedIcon fontSize="small" /></IconButton></Tooltip>
                </div>
            </div>
            <List dense={true}
                style={{
                    width: 240,
                    borderTop: '1px solid #e6e6e6',
                    padding: 0,
                    borderRight: '1px solid #e6e6e6',
                }}>
                {functions.map((fn: Function) => (
                    <ListItemButton
                        key={fn.name}
                        sx={{ py: 0, minHeight: 32, p: 0, pl: 1, backgroundColor: openedFiles.find(f => fn.name === f.function.name)?.isActive ? '#dde3ee' : 'none' }}
                        onClick={() => onFunctionClick(fn)}
                    >
                        <ListItemIcon sx={{ minWidth: 25 }}>
                            {getLanguageIcon(fn.sourceCode.language)}
                        </ListItemIcon>
                        <ListItemText
                            style={{
                                overflow: 'hidden',
                            }}
                            primary={fn.name}
                            primaryTypographyProps={{ fontSize: 12 }}
                        />
                    </ListItemButton>
                ))}
            </List>

            <AddFunctionDialog
                open={addFunctionOpen}
                onClose={handleAddFunctionClose}
            />
            <EditFunctionDialog
                open={settingsOpen}
                function={openedFiles.find(f => f.isActive)?.function}
                onClose={handleSettingsClose}
            />
        </div>
    );
}

export default FuntionEditorSidebar;