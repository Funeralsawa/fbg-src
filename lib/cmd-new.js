import fs from 'fs-extra';
import path from 'path';
import p from './paths.js';
import syncOnce from './sync.js';

export default async function cmdNew(name) {
  if (!name.endsWith('.md')) name += '.md';
  await fs.ensureDir(p.userContentDir);
  const file = path.join(p.userContentDir, name);
  if (await fs.pathExists(file)) {
    console.log(`⚠️ 已存在：${name}`);
    return;
  }
  await fs.outputFile(file,
`---
title: ${name.replace(/\.md$/, '')}
date: ${new Date().toISOString().slice(0, 10)}
tags: []
summary:
---

在这里写正文。
`);
  console.log(`✅ 已创建：content/posts/${name}`);

  await syncOnce({ userConfigPath: p.userConfig, postsDir: p.userContentDir, outPath: p.siteJson });
}
