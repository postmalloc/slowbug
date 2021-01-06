import * as vscode from "vscode";

/* Wrap the vanilla `setInterval` to handle
clearing of all timers. Makes pause/resume experience
more predictable. */
let setIntervalMod = (function(oldsetInterval){
  const timers: NodeJS.Timeout[] = [];
  let f: any = function(a: () => any, b: number){
      return timers[timers.length] = oldsetInterval(a,b);
  };
  f.clearAll = function(){
    let r;
    while(r = timers.pop()) { 
      clearInterval( r );
    }       
  };
  return f;    
})(setInterval);


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
          setIntervalMod(stepFn, stepDuration);
        });
      }
    } else {
      // If already debugging, just create a new timer
      setIntervalMod(stepFn, stepDuration);
    }
  }

  // Clear the timers on debug end
  vscode.debug.onDidTerminateDebugSession(() => {
    setIntervalMod.clearAll();
  });

  // Fn to pause the debugger and clear the current timer
  function pauseFn() {
    vscode.commands.executeCommand("workbench.action.debug.pause");
    process.nextTick(() => setIntervalMod.clearAll());
  }

  const startCmd = vscode.commands.registerCommand('extension.slowbug-start', startFn);
  const pauseCmd = vscode.commands.registerCommand('extension.slowbug-pause', pauseFn);

  context.subscriptions.push(startCmd, pauseCmd);
}

export function deactivate() { }