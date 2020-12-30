# slowbug
<img src="./images/banner.jpg" width="400px">

Slowbug is a VS Code extension for debugging your code by running it slowly, at your pace.

## What?
The idea is simple. Make it possible to see how the control 
flows through the code. I noticed that often, I end up inserting 
too many breakpoints, and find it tedious to step through and
understand the flow when working on a new codebase. Slowbug aims
to solve it by executing the code slowly, at your preferred speed,
line by line. Think of it like the "step over" button of any debugger,
but automatic.

Slowbug is agnostic to languages and debug adapters since it directly
issues commands to the VS Code workbench.

## Usage
<img src="./images/slowbug_demo.gif" width="600px">    

The functionality right now is minimal. You can pause and resume Slowbug.
The speed can be configured in `settings > Slowbug > stepDuration`.

> The extension is not yet available on the VS Code Marketplace.

## Upcoming features
1. Range selection  
Ability to select a code block and enable Slowbug only there.
2. Step into functions  
Ability to step into functions for a certain depth.

## License
MIT License