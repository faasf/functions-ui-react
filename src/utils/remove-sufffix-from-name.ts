
export const removeSuffixFromName = (name: string) => {
    return name.replace(/\.[^/.]+$/, '');
}