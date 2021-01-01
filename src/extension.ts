import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // Read the stepDuration from the settings
  let stepDuration = vscode.workspace.getConfiguration('slowbug').stepDuration;

  function stepFn() {
    vscode.commands.executeCommand("workbench.action.debug.stepInto");
  }

  function startFn() {
    // Check if there is an active debug session. If not, start debugging
    // and start the timers
    if (vscode.debug.activeDebugSession == undefined) {
      stepDuration = vscode.workspace.getConfiguration('slowbug').stepDuration;
      vscode.commands.executeCommand("workbench.action.debug.start");
      if (context.globalState.get('timerId') == undefined) {
        // Wait until the session is ready before you start the timer
        vscode.debug.onDidStartDebugSession(() => {
          let timerId = setInterval(stepFn, stepDuration);
          context.globalState.update('timerId', timerId);
        });
      }
    } else {
      /* If already debugging, just create a new one
        NOTE: The `timerId` is actually a cyclic object that 
        cannot be JSON-stringified. Setting properties on the
        globalState requires JSON-stringified values. But this
        works for some reason. Probably not safe. */ 
      let timerId = setInterval(stepFn, stepDuration);
      setImmediate(() => context.globalState.update('timerId', timerId));
    }
  }

  // Clear the timers on debug end
  vscode.debug.onDidTerminateDebugSession(() => {
    let timerId: any = context.globalState.get('timerId');
    clearInterval(timerId);
  });

  // Fn to pause the debugger and clear the current timer
  function pauseFn() {
    vscode.commands.executeCommand("workbench.action.debug.pause");
    let timerId: any = context.globalState.get('timerId');
    clearInterval(timerId);
  }

  const startCmd = vscode.commands.registerCommand('extension.slowbug-start', startFn);
  const pauseCmd = vscode.commands.registerCommand('extension.slowbug-pause', pauseFn);

  context.subscriptions.push(startCmd, pauseCmd);
}

export function deactivate() { }