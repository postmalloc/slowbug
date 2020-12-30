import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let timerId: any;
  let stepDuration = vscode.workspace.getConfiguration('slowbug').stepDuration;

  const startFn = () => {
    if(vscode.debug.activeDebugSession == undefined){
      stepDuration = vscode.workspace.getConfiguration('slowbug').stepDuration;
      vscode.commands.executeCommand("workbench.action.debug.start");
    }
    let stepFn = () => vscode.commands.executeCommand("workbench.action.debug.stepOver");
    timerId = setInterval(stepFn, stepDuration);
  }

  const pauseFn = () => {
    vscode.commands.executeCommand("workbench.action.debug.pause");
    clearInterval(timerId);
  }

  let cmds: any = [];
  const startCmd = vscode.commands.registerCommand('extension.slowbug-start', startFn);
  const pauseCmd = vscode.commands.registerCommand('extension.slowbug-pause', pauseFn);
  cmds = [startCmd, pauseCmd];
  context.subscriptions.push(...cmds);
}

export function deactivate() {}