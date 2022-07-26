import { GoLangIcon } from "../icons/pls/file_type_go";
import { JavascriptIcon } from "../icons/pls/file_type_js";
import { TextIcon } from "../icons/pls/file_type_text";
import { TypescriptIcon } from "../icons/pls/file_type_typescript";

export const getLanguageIcon = (language: string) => {
    switch (language.toLocaleLowerCase()) {
        case 'javascript':
            return (<JavascriptIcon style={{ fontSize: 18 }} />);
        case 'typescript':
            return (<TypescriptIcon style={{ fontSize: 18 }} />);
        case 'go':
            return (<GoLangIcon style={{ fontSize: 18 }} />);
        default:
            return (<TextIcon style={{ fontSize: 18 }} />);
    }
}