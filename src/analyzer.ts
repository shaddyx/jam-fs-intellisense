import * as vscode from 'vscode';
import { FileTools } from './FileTools';
import { StringTools } from './StringTools';
export class Analyzer{
    files:vscode.Uri[] = [];
    splitted: string[] = [];
    ft: FileTools | undefined = undefined;

    startup(){
       this.ft = new FileTools();
       this.ft.startup((o) => this.analyze());
    }

    analyze(){
        this.splitted = [];
        let mod = "/mod/";
        for (let k in this.files){
            let f = this.files[k];
            let right = StringTools.getRightPart(f.path, mod);
            let path = f.path.split(mod).join("").split("/").join(".")
            let chunks = path.split(".");
            chunks.splice(chunks.length - 1, 1);
            this.splitted.push(chunks.join("."));
            console.log("Files changed: " + this.splitted);
        }
    }
    find(val: string):string[]{
        let res:string[] = [];
        for (let k in this.splitted){
            if (this.splitted[k].indexOf(val)){
                res.push(this.splitted[k]);
            }
        }
        return res;
    }
    check(value: string): string[]{
        if (!value.endsWith(".")){
            return [];
        }
        let vals = value.split(".");
        if (vals.length < 2) return [];
        let lastVal = vals[vals.length - 2];
        console.log("searching for:" + lastVal);
        return this.find(lastVal);
    }
}