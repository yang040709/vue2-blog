# vue2-yang-blog

这是使用 vue2 搭建的一个博客，能够查看文章内容及其目录和评论，能够根据分类筛选文章；首页有轮播图能够展现您的标语；还能通过关于我查看放置的 iframe 简历；能够通过留言版与站长交流

## 技术栈

1. vue2
2. vue-router
3. vuex
4. axios
5. less
6. mockjs
7. nprogress
8. highlight.js

## 特点

1. 封装了分页组件，图片加载组件，头像组件，评论组件
2. 实现了评论和留言的懒加载，通过滚动不断和加载内容
3. 实现了文章列表的分页
4. 首页有轮播图能够展现您的标语和图片，并使用 js 实现了动画效果

## 项目效果

主页
![主页](/img/2025年10月26日-home.png)

文章页
![文章页](/img/2025年10月26日-blog.png)

文章详情页
![文章详情页](/img/2025年10月26日-blog-detail.png)

留言板
![留言板](/img//2025年10月26日-message.png)

## 运行

1. 安装依赖

```bash
npm install
```

2. 启动服务

```bash
npm run serve
```

3. 打包

```bash
npm run build
```
