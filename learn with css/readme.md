@[toc](常用 css 布局学习整理)

注意： 代码里面都有比较详细的注释
项目代码全部已经上传至 **码云** 和 **Github**，两个仓库我会同步更新

码云 git 下载地址：`git@gitee.com:gorit/Coding-with-Front-end.git`  
Github git 下载地址：`git@github.com:CodingGorit/Coding-with-Front-end.git`
### 一、垂直居中
> 有父容器和子容器，实现子容器在父容器中的居中效果

布局效果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211174742629.png)
### 二、等分布局 
> 实现一行元素，在等高，等宽的情况下，在游览器汇总均匀排布

布局效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211174817791.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)
### 三、等高布局 
> 两列在同一级的 div 元素，实现等高等宽效果

布局效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211174906144.png)
### 四、多列布局
> 多列布局实现 （等宽，非等宽，有间隙） 

布局效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211174944923.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)

自适应的效果不方便展示，可以在代码中查看
### 五、局中布局（垂直居中）
> 两个 div 元素，小盒子在 大盒子上下，左右都在中间

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211175033866.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)
### 六、全屏布局
> 常见的 header，body， foot 的主流界面布局效果

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211175121234.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)
### 七、三列布局
> 三列元素分摊 width

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211175141920.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)
### 八、圣杯布局
> 头 + 尾布局

布局效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211175204483.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)
### 九、双飞翼布局
> left + item + right （left = right）

布局效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020021117523691.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)
### 十、水平居中
> 元素在水平内部居中效果实现

布局效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211175250963.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhaWRld2VpMTIx,size_16,color_FFFFFF,t_70)
### 十一、css 布局特别整理
1. div 元素快速位于 html 顶部或者底部