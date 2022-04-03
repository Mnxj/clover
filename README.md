This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev

yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## install
```shell
# 我们使用front-matter处理元信息和获取需要的Markdown内容
yarn add front-matter remark remark-html --save

# 解析markdown文件
yarn add react-markdown
# 解析目录
yarn add markdown-navbar  # 这个是为了生成目录
yarn add @types/markdown-navbar
# rehype-katex 解析数学公式
# remark-math的配置
yarn add rehype-katex  remark-math
#生成目录
yarn add remark-toc
yarn add rehype-slug 
# 代码高亮
# vscDarkPlus vscode 暗色主题
# darcula  webstorm 暗色主题
# coyWithoutShadows 上面展示的效果
yarn add react-syntax-highlighter
yarn add @types/react-syntax-highlighter
# 处理表格和一些勾选项
yarn add remark-gfm
#处理网页
yarn add rehype-raw


```

Internet Explorer 10、Firefox 以及 Opera 支持 @keyframes 规则和 animation 属性。

Chrome 和 Safari 需要前缀 -webkit-。