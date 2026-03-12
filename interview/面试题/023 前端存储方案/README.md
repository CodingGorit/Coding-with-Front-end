# 常见前端存储方案

## cookie 和 session

- cookie 用于登录验证, 存储用户标示 (如 UserId)
- session 在服务端, 存储用户详情信息, 和 cookie 信息一一对应
- cookie + session 是常见的登录验证检测方案
- cookie 最多 4kb
- cookie 是 HTTP 规范
- cookie 默认被游览器存储

- session 占用服务器内容

## token

- token 是自定义传递
- token 需自定义存储
- token 默认没有跨域限制

JWT 作为 token 的解决方案

### 补充?

session 和 JWT 对比


## localStorage 和 sessionStorage

HTML5 新出的 API,在 H5 之前,用的还是

## indexDB
