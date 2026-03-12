# JavaScript 100 个案例

收集了 100 个 JavaScript 实践示例，涵盖各种核心概念和实现。

## 项目结构

### 核心示例 (001-008)

| # | 文件夹 | 描述 |
|---|--------|-------------|
| 001 | [js-debounce-function](./001-js-debounce-function) | 防抖函数实现 - 防止用户重复操作导致的过度函数调用 |
| 002 | [js-call-implement](./002-js-call-implement) | 自定义实现 `Function.prototype.call()` |
| 003 | [js-apply-implement](./003-js-apply-implement) | 自定义实现 `Function.prototype.apply()` |
| 004 | [js-bind-implement](./004-js-bind-implement) | 自定义实现 `Function.prototype.bind()` |
| 005 | [js-throttle-function](./005-js-throttle-function) | 节流函数实现 - 限制函数执行频率 |
| 006 | [js-spread-operator](./006-js-spread-operator) | 展开运算符 (`...`) 使用示例 |
| 007 | [js-callback](./007-js-callback) | 回调函数模式与示例 |
| 008 | [js-draw-triangle](./008-js-draw-triangle) | 使用 CSS/JavaScript 绘制三角形 |

### 事件处理 (009-017)

| # | 文件夹 | 描述 |
|---|--------|-------------|
| 009 | [js-click-event](./009-js-click-event) | 点击事件处理和事件监听器 |
| 010 | [js-mouse-over](./010-js-mouse-over) | 鼠标经过事件 (mouseover) |
| 011 | [js-mouse-out](./011-js-mouse-out) | 鼠标移出事件 (mouseout) |
| 012 | [js-mouse-focus](./012-js-mouse-focus) | 鼠标聚焦事件 (mouseenter) |
| 013 | [js-blur-event](./013-js-blur-event) | 失焦事件 - 元素失去焦点 |
| 014 | [js-text-focus](./014-js-text-focus) | 文本框聚焦事件 |
| 015 | [js-text-change](./015-js-text-change) | 文本框内容改变事件 (onchange) |
| 016 | [js-load-event](./016-js-load-event) | 页面加载事件 (onload) |
| 017 | [js-unload-event](./017-js-unload-event) | 页面卸载事件 (onunload) |

### 内置对象 (018-021)

| # | 文件夹 | 描述 |
|---|--------|-------------|
| 018 | [js-set-timeout](./018-js-set-timeout) | setTimeout() - 延迟后执行代码 |
| 019 | [js-set-interval](./019-js-set-interval) | setInterval() - 重复执行代码 |
| 020 | [js-clear-timeout](./020-js-clear-timeout) | clearTimeout() - 取消延迟执行 |
| 021 | [js-navigator](./021-js-navigator) | Navigator 对象 - 浏览器信息 |

### Window 对象 (022-025)

| # | 文件夹 | 描述 |
|---|--------|-------------|
| 022 | [js-window-open](./022-js-window-open) | window.open() - 打开新浏览器窗口 |
| 023 | [js-window-history](./023-js-window-history) | window.history - 浏览器历史记录导航 |
| 024 | [js-window-prompt](./024-js-window-prompt) | window.prompt() - 显示输入对话框 |
| 025 | [js-window-confirm](./025-js-window-confirm) | window.confirm() - 显示确认对话框 |

### 实战项目 (026-032)

| # | 文件夹 | 描述 |
|---|--------|-------------|
| 026 | [js-skin-changer](./026-js-skin-changer) | 换肤功能 - 动态主题切换 |
| 027 | [js-timer](./027-js-timer) | 计时器应用（开始/停止） |
| 028 | [js-calculator](./028-js-calculator) | 简单计算器实现 |
| 029 | [js-carousel](./029-js-carousel) | 图片轮播/幻灯片 |
| 030 | [js-gradient-effect](./030-js-gradient-effect) | 渐变色效果 |
| 031 | [js-current-time](./031-js-current-time) | 显示当前时间 |
| 032 | [js-display-property](./032-js-display-property) | CSS display 属性示例 |

### 函数技巧 (033-035)

| # | 文件夹 | 描述 |
|---|--------|-------------|
| 033 | [js-compare-function](./033-js-compare-function) | 数组排序比较函数 |
| 034 | [js-factorial](./034-js-factorial) | 阶乘计算（递归实现） |
| 035 | [js-arguments-callee](./035-js-arguments-callee) | arguments.callee 匿名递归 |

### 工具库

| # | 文件夹 | 描述 |
|---|--------|-------------|
| utils | [utils](./utils) | TypeScript 工具函数库 |

## 涵盖的主题

### 函数概念
- **防抖 (Debounce)** - 延迟函数执行，直到调用停止一段时间后
- **节流 (Throttle)** - 限制函数在指定时间周期内只执行一次
- **回调 (Callback)** - 异步回调模式
- **比较函数** - 数组自定义排序函数
- **递归** - 阶乘计算和递归模式
- **arguments.callee** - 匿名函数递归

### `this` 绑定方法
- **call()** - 以给定的 `this` 上下文和单独参数调用函数
- **apply()** - 以给定的 `this` 上下文和数组参数调用函数
- **bind()** - 创建一个 `this` 永久绑定到指定对象的新函数

### ES6+ 特性
- **展开运算符** - 将可迭代对象展开为单个元素

### 事件处理
- **鼠标事件** - click, mouseover, mouseout, mouseenter
- **焦点事件** - focus, blur
- **表单事件** - change, select
- **页面事件** - load, unload

### 定时函数
- **setTimeout()** - 在指定延迟后执行代码
- **setInterval()** - 按指定间隔重复执行代码
- **clearTimeout()** - 取消计划的延迟

### 浏览器对象
- **Window** - 浏览器窗口操作 (open, history, prompt, confirm)
- **Navigator** - 浏览器信息检测

### 实际应用
- **UI 效果** - 换肤、渐变效果、轮播图
- **工具** - 计时器、计算器、当前时间显示
- **CSS 集成** - display 属性、样式

## 快速开始

每个文件夹都包含独立的示例，可以：
- 直接在浏览器中打开（HTML 文件）
- 使用 Node.js 运行（JS 文件）
- 在浏览器控制台中测试

## 前提条件

- 现代浏览器（Chrome、Firefox、Edge 等）
- Node.js（用于直接运行 JS 文件）