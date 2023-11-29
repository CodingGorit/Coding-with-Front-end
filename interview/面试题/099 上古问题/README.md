# 老项目

## 问题一: 移动端 H5 点击有 300 ms 延迟

背景: double tap to zoom (古老的移动端项目,点击有300ms 延迟导致卡顿)
解决方案: FastClick (实现方式: TouchStart 事件会比 Click 事件先触法, 因此创建了虚拟 DOM 模拟 click 事件)
现代解决方案:width=device-width