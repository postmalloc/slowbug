# slowbug
<img src="images/banner.jpg" width="400px">

Slowbug is a VS Code extension for debugging your code in slow-mo!

## What?
The idea is simple. Make it possible to see how the control 
flows through the code. I noticed that often, I end up inserting 
too many breakpoints, and find it tedious to step through and
understand the flow when working on a new codebase. Slowbug aims
to solve that by executing the code slowly, at your preferred speed,
line by line. 

Slowbug is agnostic to languages and debug adapters since it 
issues commands directly to the VS Code workbench.

## Usage
<img src="images/slowbug_demo.gif" width="550">    

You can install [Slowbug](https://marketplace.visualstudio.com/items?itemName=srimukh.slowbug) from VS Code Marketplace.

Since Slowbug does not rely on any specific debuggers, it does not automatically
generate a `launch.json` for you. Make sure you add `"stopOnEntry": true` 
property under your debugger in `launch.json` before you run Slowbug.

To launch Slowbug, press the slowmo play button. Slowbug starts stepping through
the code at a default pace of 800ms. The speed can be configured in 
`settings > Slowbug > stepDuration`. The pause button pauses the debugger.
Resume it by pressing the slow-mo play button. Slowbug steps _into_ function calls.
However, it only steps into your code, and ignores third-party libraries.

The functionality right now is minimal.


## Upcoming features
* Range selection  
Ability to select a code block and enable Slowbug only there.
* Better controls


## Contributing
You're welcome to add features and raise issues. 

## License
MIT License