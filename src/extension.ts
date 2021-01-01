import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let stepDuration = vscode.workspace.getConfiguration('slowbug').stepDuration;
  let stepFn = () => {
    vscode.commands.executeCommand("workbench.action.debug.stepInto");
  }
  const startFn = () => {
    if (vscode.debug.activeDebugSession == undefined) {
      stepDuration = vscode.workspace.getConfiguration('slowbug').stepDuration;
      vscode.commands.executeCommand("workbench.action.debug.start");
      if (context.globalState.get('timerId') == undefined) {
        vscode.debug.onDidStartDebugSession(() => {
          context.globalState.update('timerId', setInterval(stepFn, stepDuration));
        });
      }
    } else {
      setImmediate(() => context.globalState.update('timerId', setInterval(stepFn, stepDuration)));
    }
  }

  vscode.debug.onDidTerminateDebugSession(() => {
    let timerId: any = context.globalState.get('timerId');
    clearInterval(timerId);
  });

  const pauseFn = () => {
    vscode.commands.executeCommand("workbench.action.debug.pause");
    let timerId: any = context.globalState.get('timerId');
    clearInterval(timerId);
  }
  let cmds: any = [];
  const startCmd = vscode.commands.registerCommand('extension.slowbug-start', startFn);
  const pauseCmd = vscode.commands.registerCommand('extension.slowbug-pause', pauseFn);
  cmds = [startCmd, pauseCmd];
  context.subscriptions.push(...cmds);
}

export function deactivate() { }