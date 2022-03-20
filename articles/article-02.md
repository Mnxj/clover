---
title: 第二篇文章
---
A paragraph with *emphasis* and **strong importance**.
<br />
This
<br />
That
<br />
> A block quote with ~strikethrough~ and a URL: https://reactjs.org.
* Lists
* [ ] todo
* [x] done
  A table with alignment:
  
  | Syntax      | Description | Test Text     |
  | :---        |    :----:   |          ---: |
  | Header      | Title       | Here's this   |
  | Paragraph   | Text        | And more      |
## Simple JSX
~~~jsx
// this is code we want to transpile and render
// and we want to allow editing
const name = 'normal';
<Testing name={name} />
~~~
## Static Code
~~~jsx static
// this is static code we want to show
const name = 'static';
~~~
## Simple JSX without editor
~~~jsx noeditor
// this is code we want to transpile and render
// but we do not want to allow editing
const name = 'noeditor';
<Testing name={name} />
~~~

```js
const ces ;//
```
```java
int x=10;
```

> Seems like it might be useful!
> — Dan Abramov, taken entirely out of context

```ts
// pretty neat huh?
const test = (arg: string) => {
  return arg.length > 5;
};
```
