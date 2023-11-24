<!-- 说一说css 盒子模型 -->
### 盒子模型

在 HTML 里面所有元素都可以看成一个盒子
盒子组成
- 内容 content
- 内边距 padding
- 边框 border
- 外边距 margin

### 盒模型类型

标准盒模型
margin + border + padding + content

IE 盒模型
margin + content(border + padding)

### 控制盒模型样式

```css
/* 默认值：标准盒模型 */
box-sizing: content-box;    

/* IE盒模型 */
box-sizing: border-box;
```
