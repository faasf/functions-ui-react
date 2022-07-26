import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { getLanguageIcon } from "../../utils/get-language-icon";
import { Function } from '../../models';

const FuntionEditorSidebar = (props: any) => {
    const { functions, onFunctionClick } = props;

    return (
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
                    sx={{ py: 0, minHeight: 32, p: 0, pl: 1 }}
                    onClick={() => onFunctionClick(fn)}
                >
                    <ListItemIcon sx={{ minWidth: 25 }}>
                        {getLanguageIcon(fn.language)}
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
    );
}

export default FuntionEditorSidebar;