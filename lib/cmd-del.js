// fbg/lib/cmd-del.js
import fs from 'fs-extra';
import path from 'path';
import p from './paths.js';
import syncOnce from './sync.js';

export default async function cmdDel(name) {
  if (!name.endsWith('.md')) name += '.md';
  const file = path.join(p.userContentDir, name);
  if (!await fs.pathExists(file)) {
    console.log(`不存在：${name}`);
    return;
  }
  await fs.remove(file);
  console.log(`已删除：content/posts/${name}`);
  await syncOnce({ userConfigPath: p.userConfig, postsDir: p.userContentDir, outPath: p.siteJson });
}
