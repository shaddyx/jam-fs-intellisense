export class StringTools {
    private static re = new RegExp("[\\w\\.]*?\\.$", "g");
    static splitCunks(s: string, delimiter?: string): string[]{
        delimiter = delimiter || ".";
        return s.split(delimiter);
    }

    static checkChunks(search: string[], data: string[]): string | undefined{
        for (let i=0; i < search.length; i++){
            if (search[i] != data[i]){
                return undefined;
            }
        }
        return data[search.length];
    }

    static getVar(str: string): string | null{
        let match = this.re.exec(str);
        if (!match){
            return null;
        }
        str = match[0];
        return str;
    }
}