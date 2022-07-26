import TopBarFile from "./top-bar-file";
import { TopbarFileData } from './topbar-file-data';

export const FuntionEditorTopbar = (props: any) => {
    const { openedFiles, onCloseFile, onOpenFile } = props;
    return (
        <div style={{
            overflowX: 'hidden',

        }}>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: 'nowrap',
                    overflowY: 'visible',
                    borderBottom: '1px solid #e6e6e6',
                    borderTop: '1px solid #e6e6e6',
                    height: 32,
                }}>
                {openedFiles.map((topbarFileData: TopbarFileData) => (
                    <TopBarFile
                        key={topbarFileData.function.name}
                        fileData={topbarFileData}
                        onClose={() => onCloseFile(topbarFileData.function.name)}
                        onSelect={() => onOpenFile(topbarFileData.function)} />
                ))}
            </div>
        </div>
    );
}

export default FuntionEditorTopbar;