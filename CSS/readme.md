# for branch

branch css

注意： 代码里面都有比较详细的注释
项目代码全部已经上传至 ~~码云~~ 和 **Github**，两个仓库我会同步更新

~~码云 git 下载地址：`git@gitee.com:gorit/Coding-with-Front-end.git`  ~~
Github git 下载地址：`git@github.com:CodingGorit/Coding-with-Front-end.git`

## 一、layout

### 1.1 垂直居中

> 有父容器和子容器，实现子容器在父容器中的居中效果

布局效果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211174742629.png)

### 1.2 等分布局

> 实现一行元素，在等高，等宽的情况下，在游览器汇总均匀排布

布局效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211174817791.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)

### 1.3 等高布局

> 两列在同一级的 div 元素，实现等高等宽效果

布局效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211174906144.png)

### 1.4 多列布局

> 多列布局实现 （等宽，非等宽，有间隙）

布局效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211174944923.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)

自适应的效果不方便展示，可以在代码中查看

### 1.5 局中布局（垂直居中）
>
> 两个 div 元素，小盒子在 大盒子上下，左右都在中间

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211175033866.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)

### 1.6 全屏布局
>
> 常见的 header，body， foot 的主流界面布局效果

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211175121234.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)

### 1.7 三列布局
>
> 三列元素分摊 width

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211175141920.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)

### 1.8 圣杯布局
>
> 头 + 尾布局

布局效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211175204483.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)

### 1.9 双飞翼布局
>
> left + item + right （left = right）

布局效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020021117523691.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)

### 1.10 水平居中
>
> 元素在水平内部居中效果实现

布局效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211175250963.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)

### 1.11 css 布局特别整理  

1. div 元素快速位于 html 顶部或者底部  

### 1.12 position 布局基本整理  

css position 布局当中几个重要的概念  

1. 标准流
2. 定位和参数
3. 使用 position 实现网页布局
4. 层级关系

#### (1) HTML 中的布局方式

- 标准流 （默认布局）
- 浮动
- 定位

##### （1） HTML 中的两大元素

|常见块级元素| 常见内联元素 |
|--|--|
| div | a |
|h1~h6 | span |
|  有序，无序列表 ol、ul、li | img |
| table | input |
| p段落| .. |  

**块级元素特点**：  
> 独占一行  

**内联元素特点**：  
> 和相临元素在同一行，一行不够时，才会被挤到下一行  

##### （2） 两大元素布局演示  

1. 块级元素（使用 div）  
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020030212511187.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)  

2. 内联元素的使用 （span）
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020030213201966.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)

以上的布局就是我们最常见的标准流布局

#### 12.2 定位布局  

##### （1） position 属性意义

- position 属性决定了元素如何定位
- 通过 top，right，bottom，left 实现位置的改变  

##### （2） position 可选参数

| position 参数  | 解释 |  
|--|--|
| static | 默认值，元素按照标准流正常的显示 |
| relative | 相对定位，元素依然处于正常的文档流中，可以通过 left ， right，bottom，top 改变元素的位置|
| absolute | 绝对定位，元素脱离文档流，可以通过 left ， right，bottom，top 改变元素的位置，它会基于游览器的四个边角进行定位|
| fixed | 固定定位，使用 top，left，right，bottom  定位，会脱离正常文档流，不受标准流的约束，并拥有层级的概念|
|inherit | 会继承父元素的属性 |

##### （3） relative

> relative 的特点可以通过 left，right，top，bottom 移动元素，并且后写的元素会覆盖先写的元素，这样层级的概念就出来了

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302133201222.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)

left，top 属性可以理解为 div 左上角为基准移动
right，bottom 属性可以理解为 div 右下角为基准移动

##### （4） absolute

> 使用了 absolute 的元素会脱离文档流（如果我们查看这个 test div 的高度会发现为 0），可以使用 top，right，bottom，left 进行调整，同样后写的元素会覆盖先写的元素

注意：
> position 以游览器四个边角为基准

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020030215484485.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302154945775.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302155050299.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302155118827.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302155916239.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)

##### （5） fixed
>
> 使用 fixed 固定定位的元素不会受其它元素的约束，它也是以游览器的四个边角为基准，但是当页面发生滚动的时候，使用 fixed 定位的元素，会依然在页面中的位置固定不动，类比 一些广告

这里就不单独演示 固定定位的布局了

接下来看一下 **固定定位** 和 **绝对定位**的区别
> test 作为子元素，依旧会固定在距离顶部和左边 50px 的位置

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302211708329.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)

##### （6） inherit

子元素会继承父元素的定位属性，父元素的变化，子元素也会相对变化

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302213142869.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020030221310061.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)

#### 12.3 z-index
>
> 有了 z-index 我们可以手动指定 层级的优先级

- 可以设置元素的叠加顺序，但依赖**定位属性**
- z-index大的元素会覆盖z-index小的元素
- z-index为auto的元素不参与层级比较
- z-index为负值，元素被普通流中的元素覆盖

这里一般后者的元素的层级会更高

![在这里插入图片描述](https://img-blog.csdnimg.cn/202003022147356.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)
