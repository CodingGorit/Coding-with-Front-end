# JavaScript 100 个案例

收集了 100 个 JavaScript 实践示例，涵盖各种核心概念和实现。

## Project Structure

### Core Examples (001-008)

| # | Folder | Description |
|---|--------|-------------|
| 001 | [js-debounce-function](./001-js-debounce-function) | Debounce function implementation - prevents excessive function calls from repeated user actions |
| 002 | [js-call-implement](./002-js-call-implement) | Custom implementation of `Function.prototype.call()` |
| 003 | [js-apply-implement](./003-js-apply-implement) | Custom implementation of `Function.prototype.apply()` |
| 004 | [js-bind-implement](./004-js-bind-implement) | Custom implementation of `Function.prototype.bind()` |
| 005 | [js-throttle-function](./005-js-throttle-function) | Throttle function implementation - limits function execution frequency |
| 006 | [js-spread-operator](./006-js-spread-operator) | Spread operator (`...`) usage examples |
| 007 | [js-callback](./007-js-callback) | Callback function patterns and examples |
| 008 | [js-draw-triangle](./008-js-draw-triangle) | Drawing triangles with CSS/JavaScript |

### Event Handling (009-017)

| # | Folder | Description |
|---|--------|-------------|
| 009 | [js-click-event](./009-js-click-event) | Click event handling and event listeners |
| 010 | [js-mouse-over](./010-js-mouse-over) | Mouse over event (mouseover) |
| 011 | [js-mouse-out](./011-js-mouse-out) | Mouse out event (mouseout) |
| 012 | [js-mouse-focus](./012-js-mouse-focus) | Mouse focus event (mouseenter) |
| 013 | [js-blur-event](./013-js-blur-event) | Blur event - element loses focus |
| 014 | [js-text-focus](./014-js-text-focus) | Text field focus event |
| 015 | [js-text-change](./015-js-text-change) | Text field change event (onchange) |
| 016 | [js-load-event](./016-js-load-event) | Page load event (onload) |
| 017 | [js-unload-event](./017-js-unload-event) | Page unload event (onunload) |

### Built-in Objects (018-021)

| # | Folder | Description |
|---|--------|-------------|
| 018 | [js-set-timeout](./018-js-set-timeout) | setTimeout() - execute code after delay |
| 019 | [js-set-interval](./019-js-set-interval) | setInterval() - execute code repeatedly |
| 020 | [js-clear-timeout](./020-js-clear-timeout) | clearTimeout() - cancel delayed execution |
| 021 | [js-navigator](./021-js-navigator) | Navigator object - browser information |

### Window Object (022-025)

| # | Folder | Description |
|---|--------|-------------|
| 022 | [js-window-open](./022-js-window-open) | window.open() - open new browser window |
| 023 | [js-window-history](./023-js-window-history) | window.history - browser history navigation |
| 024 | [js-window-prompt](./024-js-window-prompt) | window.prompt() - display input dialog |
| 025 | [js-window-confirm](./025-js-window-confirm) | window.confirm() - display confirmation dialog |

### Practical Projects (026-032)

| # | Folder | Description |
|---|--------|-------------|
| 026 | [js-skin-changer](./026-js-skin-changer) | Skin changer - dynamic theme switching |
| 027 | [js-timer](./027-js-timer) | Timer application with start/stop |
| 028 | [js-calculator](./028-js-calculator) | Simple calculator implementation |
| 029 | [js-carousel](./029-js-carousel) | Image carousel/slideshow |
| 030 | [js-gradient-effect](./030-js-gradient-effect) | Gradient color effect |
| 031 | [js-current-time](./031-js-current-time) | Display current time |
| 032 | [js-display-property](./032-js-display-property) | CSS display property examples |

### Function Techniques (033-035)

| # | Folder | Description |
|---|--------|-------------|
| 033 | [js-compare-function](./033-js-compare-function) | Compare function for array sorting |
| 034 | [js-factorial](./034-js-factorial) | Factorial calculation with recursion |
| 035 | [js-arguments-callee](./035-js-arguments-callee) | arguments.callee for anonymous recursion |

### Utilities

| # | Folder | Description |
|---|--------|-------------|
| utils | [utils](./utils) | TypeScript utility functions library |

## Topics Covered

### Function Concepts
- **Debounce** - Delays function execution until after a pause in calls
- **Throttle** - Limits function calls to once per specified time period
- **Callback** - Asynchronous callback patterns
- **Compare Function** - Custom sorting functions for arrays
- **Recursion** - Factorial calculation and recursive patterns
- **arguments.callee** - Anonymous function recursion

### `this` Binding Methods
- **call()** - Invokes a function with a given `this` context and individual arguments
- **apply()** - Invokes a function with a given `this` context and arguments as an array
- **bind()** - Creates a new function with `this` permanently bound to a specific object

### ES6+ Features
- **Spread Operator** - Expanding iterables into individual elements

### Event Handling
- **Mouse Events** - click, mouseover, mouseout, mouseenter
- **Focus Events** - focus, blur
- **Form Events** - change, select
- **Page Events** - load, unload

### Timing Functions
- **setTimeout()** - Execute code after a specified delay
- **setInterval()** - Execute code repeatedly at specified intervals
- **clearTimeout()** - Cancel a scheduled timeout

### Browser Objects
- **Window** - Browser window operations (open, history, prompt, confirm)
- **Navigator** - Browser information and detection

### Practical Applications
- **UI Effects** - Skin changer, gradient effects, carousel
- **Utilities** - Timer, calculator, current time display
- **CSS Integration** - Display properties, styling

## Getting Started

Each folder contains standalone examples that can be:
- Opened directly in a browser (HTML files)
- Run with Node.js (JS files)
- Tested in browser console

## Prerequisites

- Modern web browser (Chrome, Firefox, Edge, etc.)
- Node.js (for running JS files directly)
