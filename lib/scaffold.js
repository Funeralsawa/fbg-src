// fbg/lib/scaffold.js
import fs from 'fs-extra';
import path from 'path';
import p from './paths.js';

export default async function scaffold() {
  // 1) config.yml
  if (!await fs.pathExists(p.userConfig)) {
    await fs.outputFile(p.userConfig, `site:
  title: 我的博客
  favicon: favicon.ico
author:
  name: YourName
  avatar: butterfly.webp
  bio: 简介写这里
  location: 你的城市
links:
  email:
  discord:
  github: 
images:
  head-background: 小船-水面.png
  body-background: 山谷.png
ui:
  typeWriterWords: [前端, 生活]
`);
  }

  // 2) content/posts
  if (!await fs.pathExists(p.userContentDir)) {
    await fs.ensureDir(p.userContentDir);
    await fs.outputFile(path.join(p.userContentDir, 'hello.md'),
`---
title: 你好，世界
date: ${new Date().toISOString().slice(0,10)}
tags: [demo]
summary: 第一篇文章
---
这是示例正文。你可以删除或修改我。
`);
  }
  const imageDir = path.join(p.root, 'content', 'images');
  if (!await fs.pathExists(imageDir)) {
    await fs.ensureDir(imageDir);
  }

  // 3) .fbg/app（拷贝模板）
  if (!await fs.pathExists(p.appDir)) {
  await fs.copy(p.templateDir, p.appDir, { dereference: true });
}

  await fs.ensureDir(p.generatedDir);
}
