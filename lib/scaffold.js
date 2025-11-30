// fbg/lib/scaffold.js
import fs from 'fs-extra';
import path from 'path';
import p from './paths.js';
import { formatDate } from './cmd-new.js';

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
  email: tombforu@foxmail.com
  discord:
  github: 
images:
  head-background: 小船-水面.png
  body-background: 山谷.png
  post-image: 云朵-大树-山脉.png
  post-image-mobile: 户外-洛丽塔.png
ui:
  typeWriterWords: [学会数据结构与算法，走遍天下都不怕, 保持热爱，拥抱自由]
  particleNum: 30
`);
  }

  // 2) content/posts
  if (!await fs.pathExists(p.userContentDir)) {
    await fs.ensureDir(p.userContentDir);

    await fs.outputFile(path.join(p.userContentDir, 'hello.md'),
`---
title: 你好，世界
createdDate: ${String(formatDate())}
lastModifyDate: ${String(formatDate())}
tags: []
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
