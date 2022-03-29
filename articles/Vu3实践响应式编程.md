---
title: 基于vue技术的响应式博客设计与实现
date: 2022/03/20 20:46:25
updated: 2022/03/20 20:46:25
description: vue3+vuecli4.5+springboot+reids+mybatis-plus  正好之前没用脚手架感觉编辑比较麻烦，用了脚手架翻遍了很多。
img: /images/md/Vue3blog.png
categories:
- Vue
- 前端
--- 
# 基于vue技术的响应式博客设计与实现

## 前言

> 查看本文档的时候如果发现图片不显示建议copy下来。感谢支持记得stay
>


> 项目用到的软件

- git    作为版本迭代和项目备份有很好的用处   （主要还是之前误删找不回才想到的）
- ProcessOn  在线作图工具，可以省去安装和占用内存的麻烦。挺棒的一个软件
- vs code  基本上编写前端代码是在这个上面进行的，有很多有意思的插件。

## 重构

决定降低系统体积
yarn add less less-loader -D

## 1、初衷

> 积累知识，避免学过之后忘记了。
>
> 之前挺讨厌和排斥写博客的，但是发现如果不写的话自己做的东西基本很难保存下来，或者就遗失了——恰好看到了响应式布局博客，比较复合自己的审美，加上之前也学了vue正好可以拿来巩固一下。

持续更新....



## 2、技术架构

目前应该用的就是vue3+vuecli4.5+springboot+reids+mybatis-plus

为什么选择这种结构？

vue3推出很久了想试试，

正好之前没用脚手架感觉编辑比较麻烦，用了脚手架翻遍了很多。

使用mybtis-plus是为了省事。

- style导入外部css    @import url("")
- scrpt  引入组件 import from 
- <router-view/> 显示子路由 为了不暴露<a>标签建议放在初始话时调用this.$router.push({name:'homeContext'})还会出现一个加载的动画

## 3、编码设计

#### 1、使用路由守卫解决标题更换

> 标签页的 title 延迟 1 秒以上才成功修改
>
> 所以就想到了路由守卫

比起在生命周期钩子中修改 title 值，在路由跳转时利用路由守卫完成 title 的修改，岂不美哉？毕竟路由跳转发生在生命周期函数执行之前，使用路由守卫修改 title 值可以明显降低 title 修改的延时。 

通过比较是否为空并更换。

```javascript
const defaultTitle = 'Clover'; 
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title+'-'+defaultTitle : defaultTitle;
  next();
});
```

#### 2、绑定滚动标签动态更换class属性达到响应式的效果

```javascript
 window.addEventListener("scroll", this.handleScroll);
```

#### 3、移动动画 transition： 元素 时间

#### 4、使用jqurey 设置返回顶部更方便 

animate() 方法执行 CSS 属性集的自定义动画。

```js
$('html,body').animate({'scrollTop':'0px'},1000);
//跳转指定标签
$('html,body').animate($("#content").offset().top });
```

#### 5、鼠标点击效果

全局引入jq

```js
eslint的json属性添加jquery, 
import jquery from 'jquery'
window.jquery=window.$=jquery
```



1. 定义两个数组一个存文字一个存颜色属性
2. 鼠标点击时在这个位置创建一个span，span2秒后自动移除，同时创建一个向上移动的动画。

#### 6、引入看板娘

待优化，自定义音乐和切换功能。

#### 7、背景视频。

![image-20201228225713731](\README.assets\image-20201228225713731.png)

1. 点击播放消失当前面板，暂停再回来,使用动态绑定class样式和style属性做到点击效果
2. js控制播放和显示viedeo窗口。注意video有一个结束事件

```js

<video
        id="bgvideo"
        class="video"
        src="../../../assets/media/thi.cb5608c2.mp4"
        width="auto"
        style="min-height: 578px;"
        preload="auto"
        v-show="vbgflag"
        :onended="pause" //监听播放结束
      ></video>
//点击事件+动态class
      <div id="video-btn" :class="[videoflag?'loadvideo videolive':'haslive video-pause videolive']" @click="play"></div>
//点击播放事件
play(){
      var myvideo=document.getElementById("bgvideo")
      this.vbgflag=true
      this.videoflag=!this.videoflag
      if(this.videoflag){
        this.vtopnum='49.3%';
        this.vtextnum='0px';
        myvideo.pause()
      }else{
        myvideo.play()
        this.vtextnum='-100px';
        this.vtopnum='-999px';
      }
    },
  //监听暂停事件
    pause(){
      this.videoflag=true//关闭时 播放按钮设为 暂停  
      this.vbgflag=false  
      this.vtopnum='49.3%';
    }
```

#### 8、主题切换

动态修改body属性和自定义的css做到主题切换

![image-20201228225442038](\README.assets\image-20201228225442038.png)

```js
//7为黑夜模式  其余正常
setbg(n){
      if( n== 7)
        document.getElementsByTagName( "body")[0].setAttribute("class","hfeed chinese-font serif dark");  
      else
        document.getElementsByTagName( "body")[0].setAttribute("class","hfeed chinese-font serif");
        document.getElementsByTagName("body")[0].setAttribute("style",'background-image: url("'+this.bgn[n].url+'");');
    }
```

#### 9、顶部滚动条  

把滚动事件与div相互绑定，同时加入动画

计算公式=（滚动高度*100）/ （只按高度-可视高度）

最后赋值加上%

![image-20201228225416098](\README.assets\image-20201228225416098.png)

```js
//动态设置style宽度
<div :class="[pbsroctopflag?'pbsroctop':'pbsroctop1']" :style="{ width: pbsroctopWidth }"></div>
/* 滚动条 */
.pbsroctop {
  width: 0px;
  height: 2px;
  background-color: coral;
  transition: width 1s;
  position: fixed;
  top: 0;
  z-index: 999999;
}
.pbsroctop1 {  //满的时候消失
  width: 0px;
  height: 0px;
  background-color: coral;
  transition: height 2s;
  position: fixed;
  top: 0;
  z-index: 999999;
}
//监听函数
handleScroll() {
      this.pbsroctopflag=true;//显示进度
      //console.log(window.scrollY)
      if (window.scrollY > 60) {
        this.pnflag = true;  //返回顶部插件
        this.psroclly = "-372px";//顶部插件的高度
        this.changeBottom = "0px";//背景面板插件
        this.changeSkinflag=true;//手机版返回顶部插件
      } else {
        this.pnflag = false;
        this.psroclly = "-900px";
        this.changeBottom = "-999px";
      }
      //计算公式 长度的百分比等于宽度的比分比
      this.availtWidth =window.scrollY*100 / this.scrollHeight;
      this.pbsroctopWidth = this.availtWidth + "%";
      if(this.availtWidth>=100){
         setTimeout(() => {
            this.pbsroctopflag=false;//隐藏进度
         },1000);
      }
    },
```

#### 10、写给未来的自己

通过springboot住的定时任务来完成。

#### 11、父传子实现vue背景==

父组件

```json
dataNum:{
   name:'文章归档',
    url:"http://pic.netbian.com/uploads/allimg/200216/174956-15818465964a15.jpg"
          
}
```

```js
<vice-bg :data="dataNum"></vice-bg>
```

子组件

```js
<img :src="data.url">
<p class="title-font" style="font-size: 46px;">{{data.name}}</p>
props:['data']
```



#### 12、把博客内容下载为pdf格式。

> Html2canvas是什么?

我们可以直接在浏览器端使用html2canvas,对整个或局部页面进行‘截图’。但这并不是真的截图，而是通过遍历页面DOM结构，收集所有元素信息及相应样式，渲染出canvas image。

由于html2canvas只能将它能处理的生成canvas image，因此渲染出来的结果并不是100%与原来一致。但它不需要服务器参与，整个图片都由客户端浏览器生成，使用很方便。

```js
//使用
html2canvas(document.querySelector("#pdfDom"), {
        allowTaint: true,
      }).then(function (canvas) {
    ///
});


```

> JsPDF

jsPDF库可以用于浏览器端生成PDF。

```js
//基本使用
// 默认a4大小，竖直方向，mm单位的PDF
var doc = new jsPDF();

// 添加文本‘Download PDF’
doc.text('Download PDF!', 10, 10);
doc.save('a4.pdf');
//结合的话
html2canvas(document.querySelector("#pdfDom"), {
        allowTaint: true,
      }).then(function (canvas) {
    ///
      //返回图片dataURL，参数：图片格式和清晰度(0-1)
                  var pageData = canvas.toDataURL('image/jpeg', 1.0);

                  //方向默认竖直，尺寸ponits，格式a4[595.28,841.89]
                  var pdf = new jsPDF('', 'pt', 'a4');

                  //addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
                  pdf.addImage(pageData, 'JPEG', 0, 0, 595.28, 592.28/canvas.width * canvas.height );

                  pdf.save('stone.pdf');
});
```

**处理多页的情况**

```js
html2canvas(document.querySelector("#siteContent"), {
        allowTaint: true,
      }).then(function (canvas) {
         var pdf = new jsPDF("p", "mm", "a4"); //A4纸，纵向
        var ctx = canvas.getContext("2d"),
          a4w = 190,
          a4h = 277, //A4大小，210mm x 297mm，四边各保留10mm的边距，显示区域190x277
          imgHeight = Math.floor((a4h * canvas.width) / a4w), //按A4显示比例换算一页图像的像素高度
          renderedHeight = 0;

        while (renderedHeight < canvas.height) {
          var page = document.createElement("canvas");
          page.width = canvas.width;
          page.height = Math.min(imgHeight, canvas.height - renderedHeight); //可能内容不足一页

          //用getImageData剪裁指定区域，并画到前面创建的canvas对象中
          page
            .getContext("2d")
            .putImageData(
              ctx.getImageData(
                0,
                renderedHeight,
                canvas.width,
                Math.min(imgHeight, canvas.height - renderedHeight)
              ),
              0,
              0
            );
          pdf.addImage(
            page.toDataURL("image/jpeg", 1.0),
            "JPEG",
            10,
            10,
            a4w,
            Math.min(a4h, (a4w * page.height) / page.width)
          ); //添加图像到页面，保留10mm边距

          renderedHeight += imgHeight;
          if (renderedHeight < canvas.height) pdf.addPage(); //如果后面还有内容，添加一个空页
         // delete page;
        }
        pdf.save("content.pdf");
      });
```

![image-20210131195802727](\README.assets\image-20210131195802727.png)

#### 13、引入echars 

注意事项

```js
1、引入echarts5的方式与之前的版本方式不一样

// echarts5.0以前的版本
import echarts from 'echarts'
 
// echarts5.0
import * as echarts from 'echarts'

2、将echarts添加到全局变量

// vue2
Vue.prototype.$echarts = echarts
 
// vue3
app.config.globalProperties.$echarts = echarts
```

![image-20210126121533694](\README.assets\image-20210126121533694.png)



#### 14、词云图实现

> 因为之前用了echarts，而在2.0之后和词云图分离了需要单独的引入echarts-wordcloud
>
> 👇   就这么简单
>
> require("echarts-wordcloud");*//词云图*   

![image-20210127221323587](\README.assets\image-20210127221323587.png)

#### 15、图片和卡片旋转360°

```css
.links-items ul li:hover img {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);//是表示针对 safari 浏览器支持
  -moz-transform: rotate(360deg);///* Firefox */
  -o-transform: rotate(360deg);///* Opera */
  -ms-transform: rotate(360deg);//表示针对 IE 浏览器支持
}

```

<img src="\README.assets\image-20210127154051501.png" alt="image-20210127154117533" style="zoom:67%;"  />

<img src="\README.assets\image-20210127154117533.png" alt="image-20210127154117533" style="zoom:67%;" />

#### 16、红点闪烁，用到了css的animation自定义动画属性。

```css
@keyframes ShadowFlashing {
  0% {
    box-shadow: none;
  }
  50% {
    box-shadow: 0 0 20px #ff2f00;
  }
  100% {
    box-shadow: none;
  }
}
#tree-hole .comment-list:after {
  content: "";
  width: 20px;
  height: 20px;
  border: 4px solid #e91e63;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  box-sizing: border-box;
  background-color: #fff;
  animation: ShadowFlashing 1.5s linear infinite;
}
```

<img src="D:\xm\vue\clover\README.assets\image-20210127154518271.png" alt="image-20210127154518271" style="zoom:67%;" />

#### 17、评论功能模块

```css
//Valine 是一款非常轻量级无后端实现的评论系统，目前很多静态博客如 Hexo、Jekyll、Hugo 等等都原生支持 Valine。
//是基于云数据库 LeanCloud 实现的评论存储，不过存储数据的操作都由作者在 js 中完成了，我们在使用前需要做的就是在 LeanCloud 中创建一个存储评论的表名为 Comment。


//这里自定义了评论插件的样式， 同时要注意像这种外部不能用局部样式

#veditor {
	background-image: url('https://cdn.jsdelivr.net/gh/drew233/cdn/20200409110727.webp');
	background-size: contain;
	background-repeat: no-repeat;
	background-position: right;
	background-color: rgba(255, 255, 255, 0);
	resize: vertical
}
#veditor:focus{
	background-position-y: 200px;
	transition: all 0.2s ease-in-out 0s;
}
img.vimg {
     transition: all 1s   /* 旋转时间为 1s */
}

img.vimg:hover {
     transform: rotate(360deg);
     -webkit-transform: rotate(360deg);
     -moz-transform: rotate(360deg);
     -o-transform: rotate(360deg);
     -ms-transform: rotate(360deg);
}
#vcomments .vcards .vcard {
	padding: 15px 20px 0 20px;
	border-radius: 10px;
	margin-bottom: 15px;
	box-shadow: 0 0 4px 1px rgba(0, 0, 0, .12);
	transition: all .3s
}

#vcomments .vcards .vcard:hover {
	box-shadow: 0 0 8px 3px rgba(0, 0, 0, .12)
}

#vcomments .vcards .vcard .vh .vcard {
	border: none;
	box-shadow: none;
}
@media only screen and (min-width: 1000px){
#vcomments .vcards .vcard {
    padding: 15px 20px 0 20px;
    border-radius: 10px;
    margin-bottom: 15px;
    box-shadow: 0 0 4px 1px rgb(0 0 0 / 12%);
    transition: all .3s;
}}

@media only screen and 
only (限定某种设备)
screen  是媒体类型里的一种
and  被称为关键字，其他关键字还包括
```

![image-20210127220106975](\README.assets\image-20210127220106975.png)

![image-20210127220136046](\README.assets\image-20210127220136046.png)

![image-20210127220150438](\README.assets\image-20210127220150438.png)

#### 18、动态切换标题

```js
//使用监听在vue组件加载的时候绑定进去
mounted() {
    window.addEventListener("visibilitychange", this.setTitle);
},
setTitle(){
      if (document.visibilityState == 'visible')
          document.title="钟于 忠于 衷于 终于"
      else
        document.title="很荣幸在你的生命中出现了几秒..." 
    }
```

![image-20210127174356785](\README.assets\image-20210127174356785.png)



![image-20210127174415109](\README.assets\image-20210127174415109.png)

#### 19、404页面注意事项及知识点。

```js
//vue2一般都是这样用
 path: '*',
//捕获所有路由vue3以上的使用
{ path: '/:catchAll(.*)*',
    redirect: "/NotFount",
 },
//此页面是放home里面的子路由，可以方便各模块视图的组装
{//404
     path:'NotFount',
     name: 'NotFount', 
     component: () => import('../views/home/error/notfount.vue'),
        meta:{
          title:'404',
       },
},
```

![image-20210128210347743](\README.assets\image-20210128210347743.png)

#### 20、图片懒加载功能进行实现。

> 注：这里使用的是Element-plus 因为博主的vue是3.x版本，而element只支持2.x版本

```js
//配置
import installElementPlus from './plugins/element.js'
const app = createApp(App)
installElementPlus(app)
```

```css
/*注意*/
/* 背景图片显示的问题    !important; 作为最高优先级显示，原插件自己也有默认的样式，不加最高优先级就会被覆盖掉*/
.el-image__error{
  display: none!important;
}
```



```html
<!--html如下，大致意思就是如果这个图片没加载出来就用以前的默认图片-->
<el-image :src="url" lazy></el-image>
<img src="../../../assets/images/orange.svg" />


如下图一个设置了加载的图片，其余没设置。就按照默认的系统图片进行加载
```

![image-20210129145644346](\README.assets\image-20210129145644346.png)

> 二次优化，个个页面的首图 ，加入懒加载

![image-20210129152242741](\README.assets\image-20210129152242741.png)

#### 21、页面懒加载

使用一个动画。等页面加载完毕在显示内容

```js
<animation v-if="animationflag"></animation>
//页面更新之后
updated(){
    this.animationflag=false
 },
 下图的动画，是通过css动画实现的
```



![image-20210131224347593](\README.assets\image-20210131224347593.png)



#### 22、路由传参优化，提升可读性和美观

```js
 {//404
        path:'SelectView',
        name: 'SelectView',
        props:{name:'name'},
        component: () => import('../views/home/selectView/selectView.vue'),
        meta:{
          title:'SelectView',
        },
 },
     
//添加的逻辑
Search(){
   //关于「spring」的搜索结果
   this.openSearch();
   this.$router.push({name:'SelectView',params: {name:'关于「'+this.inputValue+'」的搜索结果'}})
}
created(){
      this.dataNum.name=this.$route.params.name
},
```



![image-20210129170408813](\README.assets\image-20210129170408813.png)

#### 23、进一步提升美观，在手机端搜索时因为不是同一个模块，所以搜索后无法关闭侧边栏

> 这里准备使用vuex，把控制侧边栏关闭的参数作为全局参数。
>
> Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**
>
> 它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。
>
> 简单的说：Vuex是vue框架中状态管理。
>
> ### 什么是“状态管理模式”？
>
> 把组件的共享状态抽取出来，以一个全局单例模式管理。在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！这就是“状态管理模式”。
>
> 应用场景有：单页应用中，组件之间的数据状态。
> 应用实例：
> 1、购物车功能；
> 2、下单页面有选择优惠券按钮，点击进入优惠券页面，选择后返回到下单页，数据会绑定回来，显示已选择的优惠券；

```js
export default createStore({
  state: {
    InbarOpenflag: true//默认手机侧边栏为true
  },
  // 更新状态
  mutations: {
    UpdatedInbarOpenflag(state) {
      state.InbarOpenflag = !state.InbarOpenflag
    }
  },
  // 获取状态信息
  getters: {
    InbarOpenflagValue(state){
      return state.InbarOpenflag
    }
  }
})
//通过使用computed做到异步刷新，如我更改了InbarOpenflag 值这边就会刷新然后返回。
computed: {
    InbarOpenflag(){
      return this.$store.getters.InbarOpenflagValue
    }
 }

//而其他的界面只需要调用一个提交方法就行了
Search(){
      //关于「spring」的搜索结果
      this.$store.commit('UpdatedInbarOpenflag')
      this.$router.push({name:'SelectView',params: {name:'关于「'+this.inputValue+'」的搜索结果'}})
 }

//点击开闭也是
InavigationbarOpen() {
      this.$store.commit('UpdatedInbarOpenflag')
},
```

![image-20210129175157337](\README.assets\image-20210129175157337.png)

![image-20210129180117191](\README.assets\image-20210129180117191.png)

#### 25、全局样式优化

> 之前是放在app.vue里面，后来觉得影响布局和美观，现在把全局样式全都放在style.min.css里面了

#### 26、代码显示模板

https://github.com/koca/vue-prism-editor/tree/feature/next

![image-20210130225932436](\README.assets\image-20210130225932436.png)



#### 27、使用js,css模拟出炫酷的echart图标

```js
//解决了scss变量赋值问题
:style="{'--text1': ((item.goals+item.games)*2)+'px', '--color1': index*0.1+'s'}"
     .stats__item-bar {
          width: var(--text1);
          height: 30px;
          transition-delay:var(--color1);
        }
通过这种方式便可以动态的修改数据了‘

$heights: (65, 56, 50, 32, 38, 32.1, 51);
开始使用这种实在是不太行，无法动态的修改数据。
期间还遇到了一个问题就是我移除一些样式和我现实的冲突

 <div :style="{'--text1': ((item.goals+item.games)*2)+'px', '--color1': index*0.1+'s'}">
          <div class="stats__item-bar" @click="howOverlay(index)">
           
          </div>
</div>
把需要显示的柱状图套在里面显示高度这样
 this.bar
        .css("transition", "all 0.4s cubic-bezier(0.86, 0, 0.07, 1)")
        .removeClass("active");
动画消失和出现的时候就不会清除高度了

```

![image-20210331230552472](\README.assets\image-20210331230552472.png)

![image-20210331230614271](\README.assets\image-20210331230614271.png)

## 4、运行效果

![image-20201227155538535](\README.assets\image-20201227155538535.png)

## 5、更新时间戳

#### 2021/1/25



- 加入全局搜索功能，优化界面点击效果

![image-20210125152914266](\README.assets\image-20210125152914266.png)



- 除了首页其他不显示首图 ，更该模块化编程组件。同时各个子窗口也进行模块化编程，从而降低页面直接的耦合程度做到代码复用率。
- 使用模块传递名字动态更换图片加，  使用 **vue的父传子的功能进行操作**

#### 2021/1/26

先跑一遍代码，保证没有错误，再检查检查昨天上传的git版本

- 把雷达图弄好了
- 并添加了标签分类页面，加入了词云图。
- 添加了新的页面树洞，同时设置了响应式编程方式

```js
//手机页面
@media (max-width: 767px)
@media only screen and (max-width: 860px)
//电脑页面
@media (min-width: 768px)
```

#### 2021/1/27

- 使用 <details>用来展示具体文章细节
- 更新了离开页面自动更换标签
- 添加了友链页面  和评论功能

```css
3a067c1cd606495dded730c52daa0423 
```

- 使用评论插件Valine

#### 2021/1/28

- 目标更新3个页面  喔~，更新日志页面，404页面
- 17：06目前更新完了 喔~和主题更新 这两个页面  并且对css的重复代码进行了复用，避免了重复造轮子。考虑到全局性问题，于是把他放入到了App.vue里面作为全局css使用 。

![image-20210128170813665](\README.assets\image-20210128170813665.png)

#### 2021/1/29

- 今天打算更新图片懒加载，和搜索功能，如果时间足够会在更新一个博客页面的全局样式。
- 17：55目前已更新完懒加载和搜索功能。

#### 2020/1/30

- 今日用了很长的时间认真的更新了博客页面的细节东西很开心，这次是很仔细的做了一下，在上次写的时候，因为他的事没有耐心就没有写下去。
- 明天更新路由加载动画。

#### 2020/1/31

- 今天进行史诗级更新操作
- 更新了页面动画，和网页生成pdf文件
- 👇是vue的方法

```js
//组件创建之前  用的不多
        beforeCreate() {
            //一般不用
            console.log('组件创建前：'+this.msg);   //undefined
        },
        //组件创建之后
        created() {
            //可以操作数据，发送ajax请求，并且可以实现
            //vue对页面的影响 应用：发送ajax请求
            console.log('组件创建后：'+this.msg);   //哈哈哈
        },
        //装载数据到DOM之前  用的不多
        beforeMount() {
            console.log('DOM装载前：'+document.getElementById('app'));  //null
        },
        //装载数据到DOM之后
        mounted() {
            //可以操作DOM
            console.log('DOM装载后：'+document.getElementById('app'));  //<div id="app"><div id="test"></div></div>
        },
        //获取更新之前的DOM
        beforeUpdate() {
            console.log('DOM更新前：'+document.getElementById('test').innerHTML);  //<h3>哈哈哈</h3> <button type="button">修改</button>
        },
        //获取更新之后的DOM
        updated() {
            console.log('DOM更新后：'+document.getElementById('test').innerHTML);  //<h3>哈哈哈alex</h3> <button type="button">修改</button>
        },
        //组件被销毁前   用的不多
        beforeDestroy() {
            console.log('组件销毁前');  //点按钮“创建和销毁”   没有用keep-alive，性能不好
        },
        //组件被销毁后   用的不多
        destroyed() {
            console.log('组件销毁后');   //点按钮“创建和销毁”   没有用keep-alive，性能不好
        },
        //组件被激活后   要用就用这个
        activated() {
            console.log('组件被激活了');  //点按钮“创建和销毁”    用keep-alive，性能好
        },
        //组件被停用后   要用就用这个
        deactivated() {
            console.log('组件被停用了');   //点按钮“创建和销毁”   用keep-alive，性能好
        }
```

#### 2021/2/6

博主本事是个天秤座的，总是想着平和完美。

最近一直在想设计模式的事，因为之前写过一个很臃肿的项目，导致后面连看都不愿意看，

对代码也有强烈的洁癖，这次想写一个让自己特别舒服的项目。仅此而已哈哈。

所以也在仔细的研究设计模式，和JWT，及怎么提高性能。

其实我在考虑要不要全都换成redis去搞，因为redis本事的速度就是8W/s

刚买了个服务器，想用dokcer去搞一搞，部署一下，本来想用springcloud的看来也要暂时鸽了。

#### 2021/3/30

处理了一些事情，期间旅游去了，现在重新更新拾起之前的bug，解决之前动画加载的问题，使用keep-alive对路由进行一个缓存，做到后退不刷新，同时把动画开始和关闭放在了state配合异步刷新方便操作。

#### 2021/3/31

更新每周记录统计，出现超级历史性问题花费了我足足4个小时我干吐了，哈哈哈

不过还是做出来了。

#### 2021/4/1

对于管理员页面进行仔细划分，添加了所有涉及到的模块同时对于User和Fiend两个模块进行了细部优化，进入里阿里的矢量图图标。充实的一天虽然有点划水哈哈哈,,,,



![image-20210401232007185](\README.assets\image-20210401232007185.png)

![image-20210401232050595](\README.assets\image-20210401232050595.png)

![image-20210401232131997](\README.assets\image-20210401232131997.png)

![image-20210401232145905](\README.assets\image-20210401232145905.png)

#### 2021/4/4

今日查看了一下域名备案还是没有通过，今天发现了一个bug进入同一个路径，动画不会关闭，试了session，localStorage 发现computed无法进行异步刷新，导致浪费了很多时间，真的失败。想了很久最后发现我可以抽离标题栏的样式和类型，在进行for遍历，这里说一下点击触发的时候一定不能放在roter-link标签上因为你不知道是先进行路由还是你的方法因此会产生bug，再三思考决定放在他的上一次li标签上，this.$route有个问题，因为我加了缓存所以在我点击之前的标签的时候会走缓存于是乎不刷新页面而我跳转哪里却把动画开打了，这时关不掉了，为啥不把缓存关了，因为加了缓存才能做到后退不刷新页面。

## 6、遇到bug

### 1、页面跳转问题

发现用A标签跳转页面太慢了，这里选择用router-link进行优化

 <router-link :to="{name:'homeContext'}">

### 2、路由重定向警告bug

> 路由重定向不要用路径而是使用name的方式进行。

```js

{ path: '/:catchAll(.*)*',
    redirect: '/NotFount' 
 },
 //不然会有如下的警告
 Path "404" was passed with params but they will be ignored. Use a named rout
 
 //建议
 { path: '/:catchAll(.*)*',
    redirect: { name: 'NotFount' }
 },
```

### 3、异步刷新很厉不仅可以做聊天还可以动画加载一些效果。

```js
//异步刷新
 computed: {
    InbarOpenflag(){
      return this.$store.getters.InbarOpenflagValue
    }
  }
vuex+computed   便可以做到。
```

### 4、关于ul,ol默认样式的小bug,

```css
/*如果不去掉默认的话谷歌浏览器会有，阿拉伯数字作为标号   解决如下*/
在ul 或者ol中使用
list-style: none;
```

### 5、关于下载pdf文档图片截不全

#### 1、页面内容过多   加载过慢

#### 2、滚动条挡住了需要加载的地方。

```js
//解决上述问题
1、使用演示函数，这个有不确定性不建议使用
2、使用
window.pageYoffset = 0;
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;
让页面回到顶部 避免漏掉
```

### 6、安装sass相关遇到bug

1、sass-loder版本太高

2、没有安装 node-sass

### 7、配置跨域问题

vue3,vue-cli4.5+不像以前那样配置的时候要像下面一样，多余的参数会报错

```js
 devServer: {
        proxy:'http://192.168.1.103:56020/clover-resources/',
    }
```

### 8、关于element-plus懒加载问题

```html
<div class="cover-bg">
      <el-image :src="data.url" lazy></el-image>
      <img src="../../assets/images/orange.svg" />
    </div>
<!--如代码所示，如果需要的图片没有就会执行我默认的svg，但是发现即使加载成功后他不会显示，观察发现是样式问题-->
```

```css
.el-image {
    position: absolute;
    width: 100%;
    height: 100%;
}
.el-image__inner{
  z-index: 1;
}
//修改局部的样式参数记得加上scoped不然启动项目的时候报错说找不到这个class属性
```

### 9、el-update无法传入后端数据bug



🍀 0:34:26
Bug出于:on-preview="handlePreview"

🍀 0:34:47
这个api不调用内部sumbit提交，

🍀 0:35:28
后端，就没办法取到file文件，但是前端能控制台输出，

```js
//解决办法
 handlePreview(file) {
      this.uploadForm = new FormData();
      this.$refs.upload.submit(); //调用submit()函数后，会自动调用filesUpload函数
      console.log(this.uploadForm);
      this.uploadFileRequest("/api/saveImg", this.uploadForm).then((req) => {
        console.log(req);
      });
 }
//filesUpload函 为自定义的:http-request
updateData(file){
      this.uploadForm.append("imgFile", file.file);
    }
```

