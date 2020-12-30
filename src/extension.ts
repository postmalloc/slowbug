import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
	let v = vscode.commands.registerCommand('extension.slowbug-start', () => {
		vscode.commands.executeCommand("workbench.action.debug.start");
		setInterval(() => vscode.commands.executeCommand("workbench.action.debug.stepOver"), 1000);
	});
	context.subscriptions.push(v);
}

export function deactivate() { }
