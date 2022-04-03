---
title: React学习笔记
date: 2021/12/13 20:46:25
updated: 2022/1/10 16:46:25
description: 记录React学习过程的一些总结，和安装命令及避坑指南。
img: https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.shangxue.com%2Fuploads%2Fstorecourse%2F20181220%2F1545285603.jpg&refer=http%3A%2F%2Fwww.shangxue.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651060516&t=3e30a11968b26feb2147096b0586ae23
categories:
- React
- 前端
--- 

## 前言
>记录React学习过程的一些总结，和安装命令及避坑指南。
> 
> 

```1shell
#添加远程git仓库
git remote add origin https://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@github.com/Mnxj/jira_demo.git 
#删除远程git仓库
git remote rm origin
```



```shell
npx是npm的一个命令，可以不安装npm里面的依赖就能安装。
npx create-react-app jira --template typescript
create-react-app就是nom里面的一个库

#格式化
npm install --save-dev --save-exact prettier 
#创建
echo {}> .prettierrc.json
#create a .prettierignore file
build
coverage

#设置自动化格式化
#运行
npx mrm lint-staged  
#然后修改`package.json`
"lint-staged": {
    "*.{js,css,md,ts,tsx}": "prettier --write"
  }

#避免冲突
npm install eslint
#`package.json`在eslint配置prettier
"eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
      "prettier"
    ]
  },
#设置提交规范commitlint
npm install -g @commitlint/cli @commitlint/config-conventional
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
npx husky add .husky/commit-msg "yarn commitlint --edit $"

安装
npm i @angular/cli -g
ng new angular-test --minimal --inlineTemplate false
```

## 接口模拟

###  1、mock.js

优点：

1.与前端代码分离

2.可生成随机数据

缺点:

1.数据都是动态生产的假数据，无法真实模拟增删改查的情况。

2.只支持ajax,不支持fetch

### 2、接口管理工具

> 代表：rap、swagger、moco、yapi

优点：

​	1.配置功能强大，接口管理与Mock一体，后端修改接口Mock也跟着更改，可靠

缺点：

​	1.配置复杂，依赖后端，可能会出现后端不愿意出手，或者等配置完了，接口也开发出来了的情况。

​	2.一般会作为大团队的基础建设而存在，没有这个条件的话慎重考虑

### 3、本地node服务器

> Json-server

优点：

​	1.配置简单，json-server甚至可以0代码30秒启动一个REST API Server

​	2.自定义程度高、一切尽在掌握中

​	3.增删改查真实模拟

缺点：

​	1.与接口管理工具相比，无法随着后端API的修改而自动修改

```shell
#安装
npm i json-server -g
#同时目录下建一个db.json
{
  "users": []
}
#启动
json-server --watch db.json
#打开postMain 把url放过来选择post请求 body里面输入json格式的
{
    "name":"JACK"
}
#response
{
    "name": "JACK",
    "id": 1
}
#我们在db.json里面发现他居然也加上了数据
{
  "users": [
    {
      "name": "JACK",
      "id": 1
    }
  ]
}
#选择get请求
[
    {
        "name": "JACK",
        "id": 1
    }
]
# 修改参数的话 先定位到http://localhost:3000/users/1
{
    "name":"Rose"
}
#response
{
    "name": "Rose",
    "id": 1
}

#delete删除 http://localhost:3000/users/1
{
    "name":"Rose"
}
#response
{}


```

## REST API

一句话总结：URI 代表 资源 / 对象，METHOD 代表行为：

```apl
GET /tickets // 列表
GET /tickets/12 // 详情
POST /tickets  // 增加
PUT /tickets/12 // 替换
PATCH /tickets/12 // 修改
DELETE /tickets/12 // 删除
```

### 项目集成json-server

> npm install Json-server -D

```shell
npm install json-server -D

#在工程目录下建一个文件夹_json_server_mock_在建一个db.json

#配置信息package.json 添加 "json-server"
 "scripts": {
....
    "json-server": "json-server _json_server_mock_/db.json",
  },
 #启动
 npm run json-server  
```

#### 自定规则

```js
// 新建middleware.js
module.exports= (req,res,next)=>{
    if (req.method==='POST' && req.path==='/login'){
        if (req.body.username==='jack'&&req.body.passsword==='123456'){
            return res.status(200).json({
                user:{
                    token:'123'
                }
            })
        }
    }else {
        return  res.status(400).json({message:'用户名或者密码错误'})
    }
}
// 在package.json 添加--middlewares ./_json_server_mock_/middleware.js
    "json-server": "json-server _json_server_mock_/db.json --port 3001 --middlewares ./_json_server_mock_/middleware.js",

```



### 【注意了】⼤家不⽤再⼿动引⼊ React 了 

------

**我们的工程用什么把 TS 编译成 JS 文件？**

 很多同学可能会觉得既然我们用 ts 那肯定是 tsc 编译的，其实不是，目前大多数的 ts 工程都是 ts 类型检查 + babel 编译 这样的组合，我们的 也不例外（可以去项目 node_modules 下面看一下，会发现有个 @babel 文件夹）。

 用 babel 编译 ts，就可以实现这样一种效果：babel 编译一切，降低开发 / 配置成本。

 我们代码中的 jsx/tsx 文件，就是用 @babel/plugin-transform-react-jsx 这个 babel 插件转换的：[插件地址](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) 

------

**为什么我的视频中每个组件文件开头都要引入 React?** 

大家看视频的时候，可能已经发现了，我在每个组件开头都引入：

```react
import React from 'react';
```

 之所以这么做的原因是，jsx 只是个语法糖，上文中的那个插件，会把 jsx 这样转换：

```react
import React from 'react';

function App(){
  return <h1>Hello World</h1>;
}
```

转换成：

```react
import React from 'react';

function App(){
  return React.createELement('h1',null,'Hello World');
}
```

 大家看到转换出来的结果是要用 React 变量的，所以必须要引入 React 以保证它在作用域中。

------

 **为什么又说大家不需要再引入 React 了？**

 因为上面说的那种转换方式是上一个版本的转换方式了。 

去年年底 plugin-transform-react-jsx 发布了新版本，从 v7.9.0 开始，就不用手动引入 React 了，因为转换变成这样了： 

```react
const profile= (
	<div>
  	<img src="avater.png" className="profile"/>
    <h3>{[user.firstName, user.lastName].join(" ")}</h3>
  </div>
)
```

编译成：

```react
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const profile = _jsxs("div", {
  children: [
    _jsx("img", {
      src: "avatar.png",
      className: "profile",
    }),
    _jsx("h3", {
      children: [user.firstName, user.lastName].join(" "),
    }),
  ],
});
```

大家看到转换出来的结果是要用 React 变量的，所以必须要引入 React 以保证它在作用域中。 为什么又说大家不需要再引入 React 了？ 因为上面说的那种转换方式是上一个版本的转换方式了。 去年年底 plugin-transform-react-jsx 发布了新版本，从 v7.9.0 开始，就不用手动引入 React 了，因为转换变成这样了： 编译成： 

所以就可以摆脱手动引入 React 了。

 这个功能默认是关闭的，但是从 **create-react-app 4.0 开始**，默认就是打开的了。 而 [4.0 版本](https://github.com/facebook/create-react-app/releases/tag/v4.0.0) 是 2020 年 10 月 24 号发布的，那时候我的录制早已经开始 大家看到这个课程的时候至少已经 2021 年 1 月 11 号（上线）了，所以大家创建的工程是默认自动转换的。 

**总之，大家的工程不需要手动引入 React。**



### 反转译，转译

```js
//转为正常文字
decodeURIComponent('%E8%B4%9F%E8%B4%A3%E4%BA%BA')
//文字转为文字
encodeURIComponent('')
//转译整个url
encodeURI("")
```



### #useEffect

useEffect的第二个参数可选，如果用上的话，这个参数必须是一个数组。useEffect在每次被调用的时候，都会“记住”这个数组参数，当下一次被调用的时候，会逐个比较数组中的元素，看是否和上一次调用的数组元素一模一样，如果一模一样，第一个参数（那个函数参数）也就不用被调用了，如果不一样，就调用那个第一个参数。

![img](https://pic3.zhimg.com/80/v2-5d0bca1d45e583d2dbe52fb6ae467b5e_1440w.jpg)

都提升到父组件里，就可以共享了

## TypeScrpt

> 强类型版的`javaScript`
>
> 8钟类型：number,string,boolean,函数,array,any,void,object

### 1. number

数字类型，包含小数、其他进制的数字：

```jsx
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;
```

### 2. string

字符串

```jsx
let color: string = "blue";
```

### 3. array

在 TS 中，array 一般指**所有元素类型相同**的值的集合，比如：

```jsx
let list: Array<number> = [1, 2, 3];

// or

interface User {
  name: string
}
const john = {name: 'john'}
const jack = {name: 'jack'}
let personList = [john, jack] // 这里 john 和 jack 都是 User 类型的
```

和这种混合类型的 "数组"：

```jsx
let l = ['jack', 10]
```

在 TS 中不是 数组/array，它们叫作 tuple，下面会提到

### 4. boolean

布尔值

```jsx
let isDone: boolean = false;
```

### 5. 函数

两种方法

1. 在我们熟悉的 "JS函数" 上直接声明参数和返回值：

```jsx
/**
 * 这是我们上节课写的代码，大家可能发现了
 * 我在这里做了一些修改，在箭头前边加上了 :boolean
 * 但是在我们上节课的代码中是没有这个:boolean 的，
 * 之所以不需要加是因为 类型推断，这个我们在下面会讲
 * @param value
 */
const isFalsy = (value: any): boolean => { 
  return value === 0 ? true : !!value; 
}; 
```

1. 直接声明你想要的函数类型：

```jsx
/**
 * 上节课写的 useMount 和 isFalsy
 */
export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
  }, []);
};

const isFalsy: (value: any) => boolean = (value) => {
  return value === 0 ? true : !!value;
};
```

### 6. any

any 表示这个值可以是任何值，被定义为 any 就意味着不做任何类型检查

```jsx
let looselyTyped: any = 4;
// looselyTyped 的值明明是个4，哪里来的ifItExists方法呢？
// 由于声明为any，我们没法在静态检查阶段发现这个错误
looselyTyped.ifItExists();
```

初学 TS 的同学经常会为了让TS不再报错就用了很多any，这样做会失去TS的保护。同学们应该尽量避免使用any

### 7. void

绝大部分情况下，只会用在这一个地方：表示函数不返回任何值或者返回undefined (因为函数不返回任何值的时候 === 返回 undefined)

```jsx
/**
 * 上节课写的 useMount
 */
export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
  }, []);
};
```

### 8. object

除了 number, string, boolean, bigint, symbol, null, or undefined，其他都是 object

下面是我们还没有接触到的 TS 类型

### 9. tuple

其实这个大家已经见过了，这是没有给大家指出来

这就是一个典型的 tuple

```jsx
const [users, setUsers] = useState([])
```

tuple 是 "数量固定，类型可以各异" 版的数组

在 React 中有可能使用 tuple 的地方就是 custom hook 的返回值，注意 isHappy → tomIsHappy 以及其他名字的变化，这里使用tuple的好处就显现出来了：便于使用者重命名

```jsx
const useHappy = () => {
   //....
   return [isHappy, makeHappy, makeUnHappy]
}

const SomeComponent = () => {
  const [tomIsHappy, makeTomHappy, makeTomUnHappy] = useHappy(false)
  // ...
}
```

### 10. enum

```jsx
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
```

### 11. null 和 undefined

null 和 undefined 在 TypeScript 中既是一个值，也是一个类型：

```jsx
let u: undefined = undefined;
let n: null = null;
```

### 12. unknown

unknown 表示这个值可以是任何值

❓❓❓❓❓❓

这句话怎么这么熟悉，刚才是不是用来形容 any 的？

unknown 的用法：在你想用 any 的时候，用 unknown 来代替，简单来说，unknown是一个"严格"版的 any

```jsx
const isFalsy = (value: unknown) => { 
 // 大家不用考虑这段console有啥意义，把它打在你的代码里对应的位置，观察编辑器会不会报错；
 // 再思考它应不应该报错
  console.log(value.mayNotExist)
  return value === 0 ? true : !!value; 
}; 
```

### 13. never

```jsx
// 这个 func返回的就是never类型，用到比较少，在类型操作等场景会用到
const func = () => {
  throw new Error()
}
```

### interface

interface 不是一种类型，应该被翻译成 接口，或者说使用上面介绍的类型，创建一个我们自己的类型

```jsx
interface User {
  id: number;
}
const u: User = {id: 1}
```

### 啥时候需要声明类型

理论上来说在我们声明任何变量的时候都需要声明类型(包括普通变量、函数、组件、hook等等)，声明 函数、组件、hook 等需要声明参数 和 返回值的类型。

但是在很多情况下，TS可以帮我们自动推断，我们就不用声明了，比如：

```jsx
// 这里虽然没有显式声明，但是ts自动推断这是个number
let a = 1

// 自动推断返回值为number
function add(a: number, b: number) {
  return a + b;
}

// 自动推断返回值为boolean
const isFalsy = (value: unknown) => { 
  return value === 0 ? true : !!value; 
}; 
```

### .d.ts

JS 文件 + .d.ts 文件   === ts 文件

.d.ts 文件可以让 JS 文件继续维持自己JS文件的身份，而拥有TS的类型保护

一般我们写业务代码不会用到，但是点击类型跳转一般会跳转到 .d.ts文件

## IMOOC-TOOL

```shell
 # 本项目安装可以做到一个简易的数据库
 npx imooc-jira-tool  
```



## 传统 CSS 的缺陷

### 1. 缺乏模块组织

传统的 JS 和 CSS 都没有模块的概念，后来在 JS 界陆续有了 CommonJS 和 ECMAScript Module，CSS-in-JS 可以用模块化的方式组织 CSS，依托于 JS 的模块化方案，比如：

```jsx
// button1.ts
import styled from '@emotion/styled'

export const Button = styled.button`
  color: turquoise;
`
// button2.ts
import styled from '@emotion/styled'

export const Button = styled.button`
  font-size: 16px;
`
```

### 2. 缺乏作用域

传统的 CSS 只有一个全局作用域，比如说一个 class 可以匹配全局的任意元素。随着项目成长，CSS 会变得越来越难以组织，最终导致失控。CSS-in-JS 可以通过生成独特的选择符，来实现作用域的效果：

```jsx
const css = styleBlock => {
  const className = someHash(styleBlock);
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .${className} {
      ${styleBlock}
    }
  `;
  document.head.appendChild(styleEl);
  return className;
};
const className = css(`
  color: red;
  padding: 20px;
`); // 'c23j4'
```

### 3. 隐式依赖，让样式难以追踪

比如这个 CSS 样式：

```css
.target .name h1 {
  color: red
}

body #container h1 {
  color: green
}
<!doctype html>
<html lang="en">
<body>
  <div id='container'>
   <div class='target'>
     <div class='name'>
       <h1>我是啥颜色？</h1>
     </div>
   </div>
  </div>
</body>
</html>
```

那么这个 h1 元素最终显式为什么颜色？加入你想要追踪这个影响这个 h1 的样式，怎么追踪？

而 CSS-in-JS 的方案就简单直接、易于追踪：

```html
export const Title = styled.h1`
  color: green;
`
<Title>
  我是啥颜色？
</Title>
```

### 4. 没有变量

传统的 CSS 规则里没有变量，但是在 CSS-in-JS 中可以方便地控制变量：

```css
const Container = styled.div(props => ({
  display: 'flex',
  flexDirection: props.column && 'column'
}))
```

### 5. CSS 选择器与 HTML 元素耦合

```css
.target .name h1 {
  color: red
}

body #container h1 {
  color: green
}
<!doctype html>
<html lang="en">
<body>
  <div id='container'>
   <div class='target'>
     <div class='name'>
       <h1>我是啥颜色？</h1>
     </div>
   </div>
  </div>
</body>
</html>
```

如果你想把 `h1` 改成 `h2`，必须要同时改动 CSS 和 HTML。而在 CSS-in-JS 中，HTML 和 CSS 是结合在一起的，易于修改。

### Emotion 介绍

Emotion 是目前最受欢迎的 CSS-in-JS 库之一，它还对 React 作了很好的适应，可以方便地创建 styled component，也支持写行内样式：

```css
/** @jsx jsx */
import { jsx } from '@emotion/react'

render(
  <div
    css={{
      backgroundColor: 'hotpink',
      '&:hover': {
        color: 'lightgreen'
      }
    }}
  >
    This has a hotpink background.
  </div>
)
```

这种写法比起 React 自带的 style 的写法功能更强大，比如可以处理级联、伪类等 style 处理的不了的情况：

```css
<span style={{ color: "red" }}>{keyword}</span>
```

## useRef

`useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（`initialValue`）。返回的 ref 对象在组件的整个生命周期内持续存在。



## 无限循环

先看一下这段代码:

```jsx
export default function App() {
  const value = { name: 1 };

  React.useEffect(() => {
    alert("render");
  }, [value]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Edit to see some magic happen!</h2>
    </div>
  );
}
```



首先大家需要明白的是，每次App组件渲染，value变量都会被定义一次

那么，请问上面这段代码中，App渲染几次，value被定义几次， alert 会被弹出几次？

答案是：

1. 第一次初始化以后，没有任何事情能引起它的再次渲染(因为没有父组件、没有状态/props改变)，所以只会渲染一次
2. 因为只渲染一次，value也只会被定义一次
3. 而useEffect的执行时机，是在[组件渲染后](https://zh-hans.reactjs.org/docs/hooks-reference.html#timing-of-effects)，由于只渲染一次，所以useEffect只执行一次，所以alert只弹出一次

再看这段代码：

```jsx
import "./styles.css";
import React from "react";

export default function App() {
  const [count, setCount] = React.useState(0); // 加了这一行
  const value = { name: 1 };

  React.useEffect(() => {
    setCount(Math.random()); // 加了这一行
    alert("render");
  }, [value]);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Edit to see some magic happen!</h2>
    </div>
  );
}
```

这段代码比上一段多了两句，我已经在注释中标出来了，请问现在 App渲染几次，value被定义几次， alert 会被弹出几次呢？

答案是：无限循环，全都无限次

这里循环的原因是：组件渲染 → useEffect执行 → setCount触发循环 → 组件渲染 → useEffect执行 → setCount触发循环...

**绝大多数同学遇到的无限循环的情况，都是这段代码的缩影**

而 React 官方给我们提供的方法，就是 useMemo：

```jsx
import "./styles.css";
import React from "react";

export default function App() {
  const [count, setCount] = React.useState(0); 
  const value = React.useMemo(() => {
    return { name: 1 };
  }, []);

  React.useEffect(() => {
    setCount(Math.random()); 
    alert("render");
  }, [value]);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Edit to see some magic happen!</h2>
    </div>
  );
}
```

useMemo 的意思就是：不要每次渲染都重新定义，而是我让你重新定义的时候再重新定义(第二个参数，依赖列表)。大家看到这里的依赖列表是空的，是因为useMemo里的回调函数确实没用到啥变量，如果有变量的话大家的IDE就会提醒加上依赖了。

这就是使用useMemo的原理，useMemo适用于所有类型的值，加入这个值恰好是函数，那么用useCallback也可以。也就是说，useCallback是一种特殊的useMemo。

在这里再粗暴地给大家总结一下日常使用的场景：

如果你定义了一个变量，满足下面的条件就最好用useMemo和useCallback给包裹住：

1. **它不是状态，也就是说，不是用useState定义的(redux中的状态实际上也是用useState定义的)**
2. **它不是基本类型**
3. **它会被放在useEffect的依赖列表里 || 自定义hook的返回值**

说一下第3条，中间的两个竖线是 或，也就是两者满足其一第3条就成立。自定义hook的返回值也成立是因为，你不知道自定义hook的返回值将会被用在哪里，它可能会被用在依赖也可能不会，所以干脆都加上；而像上面那个在组件中定义的value，你就可以见机行事了

我们上面例子中的value变量就是一个经典的满足这三个条件的例子，只要遇到这个场景就使用useMemo和useCallback，就不会有无限循环的问题。

当然，更简单粗暴的是，在**定义(不是使用！)**所有"非状态"的变量的时候都用useMemo和useCallback包裹中，也不会有无限循环的问题。但是没必要这么做，代码也不好看。

## Symbol.iterator编写

> Object.fromEntries()传入的就是一个iterator 变为普通的对象
>
> 



```js
const obj = {
  data: ["hello", "world"],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++] + "!",
            done: false
          };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

for (let o of obj) {
  console.log(o);
}

//hello! 
//world! 
```

## Component compostion

> 解决层层传递的问题，解耦合，降低后期的维护成本，只需要在一个页面里面操作就可以，关联的只需要显示即可



## 编写useUndo

### 第一版

```typescript


import {useCallback, useState} from "react";

export const useUndo = <T>(initialPresent: T) => {

  /*下面函数可以替换注释里面的形式
  const [state,setState] = useState({
        past:[] as T[],
        present:initialPresent as T,
        future:[] as T[]
    })


  */
    const [state,setState] = useState<{
        past:T[],
        present:T,
        future:T[]
    }>({
        past:[],
        present:initialPresent,
        future:[]
    })

    const canUndo = state.past.length !== 0
    const canRedo = state.future.length !== 0

    const undo = useCallback(() => {
        setState(currentState => {
            const {past,present,future} =currentState
            if (past.length===0) return currentState

            const previous = past[past.length-1]
            const newPast = past.slice(0,past.length-1)
            return {
                past:newPast,
                present:previous,
                future:[present,...future]
            }
        })
    },[]);

    const redo = useCallback(() => {
        setState(currentState => {
            const {past, present, future} = currentState
            if (future.length === 0) return currentState

            const next = future[0]
            const newFuture = future.slice(1)
            return {
                past: [...past, present],
                present: next,
                future: newFuture
            }
        })
    }, []);

    const set = useCallback((newPresent:T) => {
        setState(currentState => {
            const {past, present} = currentState
            if (newPresent===present){
                return currentState
            }

            return {
                past: [...past, newPresent],
                present: newPresent,
                future: []
            }
        })
    }, []);

    const reset =  useCallback((newPresent:T) => {
        setState(() => {
            return {
                past: [],
                present: newPresent,
                future: []
            }
        })
    }, []);

    return [
        state,
        {set,reset,undo,redo,canUndo,canRedo}
    ]
}

```

### 第二版使用useReucer改进

```typescript
import {useCallback, useReducer, useState} from "react";

const UNDO= 'UNDO'
const REDO = 'REDO'
const SET = 'SET'
const RESET = 'RESET'

type State <T>= {
    past: T[];
    present: T;
    future: T[];
}

type Action<T> = {newPresent?:T, type: typeof UNDO| typeof REDO |typeof SET|typeof RESET}

const undoReducer = <T>(state:State<T>, action:Action<T>) => {
    const { past, present, future } = state
    const {newPresent,type} =action

    switch (type) {
        case UNDO:
            if (past.length === 0) return state;
            const previous = past[past.length - 1];
            const newPast = past.slice(0, past.length - 1);
            return {
                past: newPast,
                present: previous,
                future: [present, ...future],
            };
        case REDO:
            if (future.length === 0) return state;

            const next = future[0];
            const newFuture = future.slice(1);
            return {
                past: [...past, present],
                present: next,
                future: newFuture,
            };
        case SET:
            if (newPresent === present) {
                return state;
            }

            return {
                past: [...past, newPresent],
                present: newPresent,
                future: [],
            };
        case RESET:
            return {
                past: [],
                present: newPresent,
                future: [],
            };
    }
    return state
}
export const useUndo = <T>(initialPresent: T) => {
    const [state,dispatch] = useReducer(undoReducer,{
        past: [],
        present: initialPresent,
        future: []
    } as State<T>)

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {dispatch({type:UNDO})}, []);

  const redo = useCallback(() => {dispatch({type:REDO})}, []);

  const set = useCallback((newPresent: T) => {dispatch({type:SET,newPresent})}, []);

  const reset = useCallback((newPresent: T) =>  {dispatch({type:RESET,newPresent})}, []);

  return [state, { set, reset, undo, redo, canUndo, canRedo }];
};
```

# interface和type的区别 

- type 可以声明基本类型别名，联合类型，元组等类型

```typescript
// 基本类型别名
type Name = string

// 联合类型
interface Dog {
    wong();
}
interface Cat {
    miao();
}

type Pet = Dog | Cat

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]
```

- type 语句中还可以使用 typeof 获取实例的 类型进行赋值

```typescript
// 当你想获取一个变量的类型时，使用 typeof
let div = document.createElement('div');
type B = typeof div
```

- 其他骚操作

```typescript
type StringOrNumber = string | number;  
type Text = string | { text: string };  
type NameLookup = Dictionary<string, Person>;  
type Callback<T> = (data: T) => void;  
type Pair<T> = [T, T];  
type Coordinates = Pair<number>;  
type Tree<T> = T | { left: Tree<T>, right: Tree<T> };
```

### interface 可以而 type 不行

interface 能够声明合并

```typescript
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
```



## useState和useReducer使用

> 功能上可以互换， 用其中一个实现功能另一个也会可以实现的。
>
> useState 定一个单个的状态
>
> useReducer 定义一群会互相影响的状态。

## 【扩展学习】React Hook 的历史

## Hook 的发展历程

React 团队从一开始就很注重 React 的代码复用性。

他们对代码复用性的解决方案历经：Mixin, HOC, Render Prop，直到现在的 Custom Hook。

所以 Custom Hook 并不是一拍脑门横空出世的产物，即使是很多对 Custom Hook 有丰富开发经验的开发者，也不了解 Hook 到底是怎么来的，以及在 React 里扮演什么角色。

不理解这段设计思路是无法深刻的理解 Custom Hook 的，今天我们就一起来学习一下。

### 1. Mixin

```jsx
var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

var createReactClass = require('create-react-class');

var TickTock = createReactClass({
  mixins: [SetIntervalMixin], // 使用 mixin
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000); // 调用 mixin 上的方法
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function() {
    return (
      <p>
        React has been running for {this.state.seconds} seconds.
      </p>
    );
  }
});

ReactDOM.render(
  <TickTock />,
  document.getElementById('example')
);
```

**优点：**

1. 确实起到了重用代码的作用

**缺点：**

1. 它是隐式依赖，隐式依赖被认为在 React 中是不好的
2. 名字冲突问题
3. 只能在 `React.createClass` 里工作，不支持 ES6 的 Class Component
4. 实践下来发现：难以维护

在 React 官网中已经被标记为 ‘不推荐使用’，官方吐槽点 [这里](https://zh-hans.reactjs.org/blog/2016/07/13/mixins-considered-harmful.html) 。

### 2. HOC

2015 年开始，React 团队宣布不推荐使用 Mixin，推荐大家使用 HOC 模式。

HOC 采用了 ‘装饰器模式’ 来复用代码：

```jsx
function withWindowWidth(BaseComponent) {
  class DerivedClass extends React.Component {
    state = {
      windowWidth: window.innerWidth,
    }

    onResize = () => {
      this.setState({
        windowWidth: window.innerWidth,
      })
    }

    componentDidMount() {
      window.addEventListener('resize', this.onResize)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
    }

    render() {
      return <BaseComponent {...this.props} {...this.state}/>
    }
  }
  return DerivedClass;
}

const MyComponent = (props) => {
  return <div>Window width is: {props.windowWidth}</div>
};
```

经典的 容器组件与展示组件分离 (separation of container presidential) 就是从这里开始的。

下面是最最经典的 HOC 容器组件与展示组件分离 案例 - Redux 中的 connect 的实例代码：

```jsx
export const createInfoScreen = (ChildComponent, fetchData, dataName) => {
  class HOComponent extends Component {
    state = { counter: 0 }
    handleIncrementCounter = () => {
       this.setState({ counter: this.state.counter + 1 });
    }
componentDidMount() {
      this.props.fetchData();
    }

    render() {
      const { data = {}, isFetching, error } = this.props[dataName]; 
      if (isFetching) {
        return (
          <div>Loading</div>
        );
      }

      if (error) {
        return (
          <div>Something is wrong. Please try again!</div>
        );
      }

      if (isEmpty(data)) {
        return (
          <div>No Data!</div>
        );
      }

      return (
        <ChildComponent 
          counter={this.state.counter}
          onIncrementCounterClick={this.handleIncrementCounter}
          {...this.props}
        />
      );
    }
  }

  const dataSelector = state => state[dataName];
  const getData = () => createSelector(dataSelector, data => data);
  const mapStateToProps = state => {
    const data = getData();
    return {
      [dataName]: data(state),
    };
  };

  HOComponent.propTypes = {
    fetchData: PropTypes.func.isRequired,
  };

  HOComponent.displayName = `createInfoScreen(${getDisplayName(HOComponent)})`;

  return connect(
    mapStateToProps,
    { fetchData },
  )(HOComponent);
};
```

**优点：**

1. 可以在任何组件包括 Class Component 中工作
2. 它所倡导的 容器组件与展示组件分离 原则做到了：关注点分离

**缺点：**

1. 不直观，难以阅读
2. 名字冲突
3. 组件层层层层层层嵌套

### 3. Render Prop

2017 年开始，Render Prop 流行了起来。

Render Prop 采用了 ‘代理模式’ 来复用代码：

```jsx
class WindowWidth extends React.Component {
  propTypes = {
    children: PropTypes.func.isRequired
  }

  state = {
    windowWidth: window.innerWidth,
  }

  onResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    return this.props.children(this.state.windowWidth);
  }
}

const MyComponent = () => {
  return (
    <WindowWidth>
      {width => <div>Window width is: {width}</div>}
    </WindowWidth>
  )
}
```

React Router 也采用了这样的 API 设计：

```
<Route path = "/about" render= { (props) => <About {...props} />}>
```

**优点：**

1. 灵活

**缺点：**

1. 难以阅读，难以理解

### 4. Hook ✅

2018 年，React 团队宣布推出一种全新的重用代码的方式 - React Hook。

它的核心改变是：允许函数式组件存储自己的状态，在这之前函数式组件是不能有自己的状态的。

这个改变使我们可以像抽象一个普通函数一样抽象 React 组件中的逻辑。

实现的原理：闭包

```jsx
import { useState, useEffect } from "react";

const useWindowsWidth = () => {
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  let checkScreenSize = () => {
    setIsScreenSmall(window.innerWidth < 600);
  };
  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isScreenSmall;
};

export default useWindowsWidth;
import React from 'react'
import useWindowWidth from './useWindowWidth.js'

const MyComponent = () => {
  const onSmallScreen = useWindowWidth();

  return (
    // Return some elements
  )
}
```

**优点：**

1. 提取逻辑出来非常容易
2. 非常易于组合
3. 可读性非常强
4. 没有名字冲突问题

**缺点：**

1. Hook 有自身的用法限制：只能在组件顶层使用，只能在组件中使用
2. 由于原理为闭包，所以极少数情况下会出现难以理解的问题

## 

## 安装

```js
yarn add @emotion/react @emotion/styled 

yarn add dayjs 

yarn add jira-dev-tool@next   

yarn add react-query

yarn  add react-helment 

yarn  add -D  @types/react-helmet  
// 路由
yarn add react-router-dom@latest history@latest
//代码渲染检查
yarn add @welldone-software/why-did-you-render  

yarn add react-redux @reduxjs/toolkit
//类型
yarn add @types/react-redux -D

//拖拽
yarn add react-beautiful-dnd
//安装对应types文件 
yarn add @types/react-beautiful-dnd -D
//打包
yarn add gh-pages -D      
执行参数
"predeploy": "npm run build",
-r ssh的github地址
-b 分支
"deploy": "gh-pages -d build -r git@github.com:Mnxj/jira_demo.git -b main"
//测试
yarn add @testing-library/react-hooks -D                                                                    ─╯

```

## 调用

```shell
npm start 对应的是.env.development
npm run build 对应的是.env

#模拟接口
npm install qs   
```

## 注意

#### 1、如果不需要别hook当函数就可以

```shell
npm install @types/qs  -D
```

#### 2、Promise.reject(data)

生成一个异常

#### 3、axios和fetch区别

axios可以直接在返回值不为2xx的时候抛出异常

#### 4、传参时可以使用Parameters

```tsx
[endpoint,config]:Parameters<typeof http>)=>http(....)

export const http = async (endpoint: string, {data, token, headers, ...customConfig}: Config) => {
....
}
```

#### 5、useMount（）app加载中触发

#### 6、Patial把 type里面的参数作为可选

#### 7、Omit<Preson,'‘> 第二个指定删除把第一个参数里面的元素

#### 8、Pick<Preson,''>挑选一个值

#### 9、rem相对父元素font-size em* 相对父元素的font-size

>16 * 62.5z =10px
>
>1rem ===10px

```css
整个窗口表示一个vh
view height
```

#### 10、grid-template-rows， grid-template-columns，grid-template-areas

```css
height: 100vh;
grid-template-rows: 6rem 1fr 6rem;
//这仨个参数表明上6rem下6rem 中间的就是100vh - 6rem - 6rem
 grid-template-columns: 20rem 1fr 20rem;
//这仨个参数表明左20rem右20rem 中间的就是100vh - 20rem - 20rem

//排列方式
grid-template-areas:
					"header header header"
          "nav main aside"
          "footer footer footer";
gird-gap:10rem 每一快距离
```

#### 11、grid和flex

>flex一维布局 grid 二维布局
>
>内容出发：用flex
>
>布局出发：用grid

#### 12、> * 子元素选择符

```js
export const Row = styled.div<{
    gap?: number | boolean
}>`
  display: flex;
  align-items: center;
  //表示下面的子元素都按照这个标准 
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};

  }
`
```

#### 13、使用jsx 

旧版本的React（版本号小于 17）

运行时导入JSX使用以下方式

/** @jsxRunTime classic */

/** @jsx jsx */

 

React 版本大于 17

运行时导入JSX使用以下方式

/** @jsxImportSource @emotion/react */

#### 14、解构object类型

```js
let a:object
a={name:'jack'}
a=()=>{}
a=new RegExp('')
//上述都没有错
const s =(...()=>{})
//而上面这个解构一个函数就没有意义
```

#### 15、参数传入解释

```js
({error}:{error:Error})
传入error参数 error为Error类型
```

#### 16、reac hook与闭包，hook与闭包经典的keng

```js
const oldTitle = document.title;
  //页面加载是:oldTitle==='React app'
  //加载后：oldTitle ===新title
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        //如果不指定依赖，读到的就是oldTitle
        document.title = oldTitle;
      }
    };
  }, []);

//完美版的

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;
...
  useEffect(() => {
    return () => {
   ...
  }, [keepOnUnmount, oldTitle]);
};
```

#### 17、router

```js
import {BrowserRouter} from "react-router-dom";
react-router和react-router-dom
类似与react 和react-dom/react-native/react-vr....
```

#### 18、as const

```js
// 在type script里面都是要求强类型 
// 假如一个参数里面好几种类型 会当成 ｜的形式。
const a = ['12',23,{'name':12}]

//解决这个问题就需要 用as const
const a = ['12',23,{'name':12}] as const
```

```js
callback （执行数组中每个值的函数，包含四个参数）

    1、previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
    2、currentValue （数组中当前被处理的元素）
    3、index （当前元素在数组中的索引）
    4、array （调用 reduce 的数组）

initialValue （作为第一次调用 callback 的第一个参数。）
```

#### 19、？表示是一个可选参数

#### 20、()=>void 作为参数时表示 一个无餐函数没有返回值

#### 21、拆解{}数据类型

```typescript
var likeArray = {0:"one",1:"two",2:"thr",length:3};
console.log([...likeArray]);
//报错 Uncaught TypeError: likeArray is not iterable
//添加迭代器,可使用扩展运算符转换
var likeArray = {0:"one",1:"two",2:"thr",length:3,[Symbol.iterator]: Array.prototype[Symbol.iterator]};
console.log([...likeArray]);//["one", "two", "thr"]
//伪数组的转换,ES6提供了更便利的方法Array.from();也可以使用ES5的slice()结合call()
//ES6
console.log(Array.from(likeArray));
//ES5
console.log(Array.prototype.slice.call(likeArray));
```

#### 22、Connect——HOC容器组件与展示组件分离 (2018年以前 )

#### 23、Object.fromEntries()和Object.entries()

我们知道 **Object.entries()** 是将对象转成一个自身可枚举属性的键值对数组。同样，我们也可以把键值对数组转成了对象。

```js
const keyValuePair = [
  ['cow', '????'],
  ['pig', '????'],
]

Object.fromEntries(keyValuePair);
// { cow: '????', pig: '????' }
Object.fromEntries
```

**Object.fromEntries**我们知道，对象结构是一个是有键和值组合体，如下所示：

```js
const object = {
  key: 'value',
}
```

基于这个逻辑，如果我们想将某个东西转成对象，就必须要传递**键和值**。

有两种类型的参数可以满足这些要求：

1. 具有嵌套键值对的数组
2. Map 对象

```js
const object = { key1: 'value1', key2: 'value2' }
 
const array = Object.entries(object)
// [ ["key1", "value1"], ["key2", "value2"] ]

Object.fromEntries(array)
// { key1: 'value1', key2: 'value2' }
```
#### 24、useQuery第三个参数config 

```js
//id 有值的时候才会去触发。
export const useProject = (id?: number) => {
    const client = useHttp();
    return useQuery<Project>(
        ['project',{id}],
        ()=>client(`projects/${id}`),
        {
            enabled: Boolean(id)
        }
    )
}
```


#### 25、jira-dev-tool对应的"react-query": "^3.16.1"版


#### 26、/projects\/(\d+)/
```js
var pathname= 'http://localhost:3000/projects/2'

pathname.match(/projects\/(\d+)/)
// 结果
0: "projects/2"
1: "2"
groups: undefined
index: 22
input: "http://localhost:3000/projects/2"
length: 2


```

## 报错

###  Failed to load config "prettier" to extend from. 

```shell
npm i eslint prettier-eslint eslint-config-prettier --save-dev 
```



### Failed to load config "react-app" to extend from.

```shell
 npm install eslint-config-react-app  
```