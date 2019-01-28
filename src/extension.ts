// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import { Analyzer } from './analyzer';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let analyzer = new Analyzer();
	analyzer.startup();
	const provider = vscode.languages.registerCompletionItemProvider(
		'javascript',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				
				// get all text until the `position` and check if it reads `console.`
				// and iff so then complete if `log`, `warn`, and `error`
				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				let res = analyzer.check(linePrefix);
				if (!res.length) {
					return undefined;
				}
				return res.map(o => new vscode.CompletionItem(o, vscode.CompletionItemKind.Method));
				// return [
				// 	new vscode.CompletionItem('logg', vscode.CompletionItemKind.Method),
				// 	new vscode.CompletionItem('warnn', vscode.CompletionItemKind.Method),
				// 	new vscode.CompletionItem('errorr', vscode.CompletionItemKind.Method),
				// ];
			}
		},
		'.' // triggered whenever a '.' is being typed
	);
	context.subscriptions.push(provider);
	
}

// this method is called when your extension is deactivated
export function deactivate() {}
