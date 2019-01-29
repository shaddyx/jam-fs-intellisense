import * as path from 'path';
import * as vscode from 'vscode';
export class Analyzer{
    files:vscode.Uri[] = [];
    splitted: string[] = [];
    startup(){
        let workspaceRoot = vscode.workspace.rootPath;
        if (!workspaceRoot){
            return;
        }
        let simplePattern = "mod/**/*";
        let pattern = path.join(workspaceRoot, simplePattern);
        let fileWatcher = vscode.workspace.createFileSystemWatcher(pattern);
        fileWatcher.onDidChange(o => this.analyze);
        console.log("Searching files in pattern: " + pattern);
        vscode.workspace.findFiles(simplePattern, '**/node_modules/**', 10000).then(o=>{
            this.files = o;
            console.log(o);
            this.analyze();
        });
    }
    analyze(){
        this.splitted = [];
        let mod = vscode.workspace.rootPath + "/mod/";
        console.log("Mod path:" + mod);
        for (let k in this.files){
            let f = this.files[k];
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