import { IconButton, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { getLanguageIcon } from "../../utils/get-language-icon";
import { TopbarFileData } from "./topbar-file-data";

const TopBarFile = (props: { fileData: TopbarFileData, onSelect: any, onClose: any }): JSX.Element => {
    const [hover, setHover] = useState(false);
    const { fileData, onSelect, onClose } = props;

    return (
        <div style={{
            position: 'relative',
            minHeight: 31,
        }}>
            {fileData.isActive ? (<div style={{
                position: 'absolute',
                height: 1,
                left: 0,
                right: 0,
                width: '100%',
                backgroundColor: '#10B981',
                zIndex: 100,
            }}></div>) : undefined}
            <ListItemButton
                onMouseEnter={e => {
                    setHover(true);
                }}
                onMouseLeave={e => {
                    setHover(false)
                }}
                onClick={onSelect}
                key={fileData.function.name}
                style={{
                    borderBottom: fileData.isActive ? '1px solid white' : '',
                    marginBottom: fileData.isActive ? '-1px' : '',
                }}
                sx={{ backgroundColor: fileData.isActive ? 'white' : '', py: 0, p: 0, pl: 1, minWidth: "100px", flex: 0, width: 'max-content', display: "table", overflow: 'initial', clear: 'both', borderRight: '1px solid #e6e6e6' }}
            >
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 30,
                }}>
                    <ListItemIcon sx={{ minWidth: 25 }}>
                        {getLanguageIcon(fileData.function.sourceCode.language)}
                    </ListItemIcon>
                    <ListItemText
                        primary={fileData.function.name}
                        style={{
                            width: '100%',
                            flex: 1,
                            minWidth: '60px',
                        }}
                        primaryTypographyProps={{ fontSize: 12 }}
                    />
                    {fileData.function.sourceCode.content !== fileData.function.initialCode ? (<div>M</div>) : undefined}
                    {hover ? <IconButton aria-label="close"
                        onClick={(e) => { e.stopPropagation(); onClose(); }}>
                        <CloseIcon style={{ fontSize: 10 }} />
                    </IconButton> : <div style={{ width: 26 }}></div>}

                </div>
            </ListItemButton>
        </div>
    );
}

export default TopBarFile;