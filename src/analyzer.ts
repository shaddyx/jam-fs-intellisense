import * as vscode from 'vscode';
import { FileTools } from './FileTools';
import { StringTools } from './StringTools';
import { ArrayTools } from './ArrayTools';
export class Analyzer{
    files:vscode.Uri[] = [];
    splitted: string[] = [];
    ft: FileTools | undefined = undefined;

    startup(){
       this.ft = new FileTools();
       this.ft.startup((o) => this.updateFiles(o));
    }

    updateFiles(files: vscode.Uri[]){
        this.files = files;
        this.analyze();
    }

    analyze(){
        console.log("Analyzing...");
        this.splitted = [];
        let mod = "/mod/";
        for (let k in this.files){
            let f = this.files[k];
            let right = StringTools.getRightPart(f.path, mod);
            //console.log("Files changed: " + right);
            this.splitted.push(right);
        }
    }
    check(value: string): string[]{
        value = value.trim();
        console.log(`Line is: ${value}`);
        let val = StringTools.getVar(value);
        console.log(`variable is: ${val} for line ${value}`);
        if (!val){
            return [];
        }
        let splittedVal = val.split(".");
        splittedVal = ArrayTools.rmLast(splittedVal);
        let res = [];
        console.log(`Splitted: ${this.splitted}`);
        for (let k in this.splitted){
            let fileSlashes = this.splitted[k];
            let file = fileSlashes.split("/").join(".");
            //console.log(`Checking: ${splittedVal} with ${file}`);
            let line = StringTools.checkChunks(splittedVal, file.split("."));
            if (line){
                if (res.indexOf(line) === -1){
                    res.push(line);
                }
            }
        }
        console.log(`Res is: ${res}`);
        return res;
    }
}