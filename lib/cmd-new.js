import fs from 'fs-extra';
import path from 'path';
import p from './paths.js';
import syncOnce from './sync.js';

export function formatDate() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hour = String(d.getHours()).padStart(2, '0');
  const minute = String(d.getMinutes()).padStart(2, '0');
  const second = String(d.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

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
createdDate: ${String(formatDate())}
lastModifyDate: ${String(formatDate())}
tags: []
summary:
---

在这里写正文。
`);
  console.log(`✅ 已创建：content/posts/${name}`);

  await syncOnce({ userConfigPath: p.userConfig, postsDir: p.userContentDir, outPath: p.siteJson });
}
