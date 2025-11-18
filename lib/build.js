// fbg/lib/build.js
import fs from 'fs-extra';
import { execa } from 'execa';
import scaffold from './scaffold.js';
import syncOnce from './sync.js';
import p from './paths.js';

export default async function build() {
  await scaffold();
  await syncOnce({ userConfigPath: p.userConfig, postsDir: p.userContentDir, outPath: p.siteJson });

  if (!await fs.pathExists(`${p.appDir}/node_modules`)) {
    await execa('npm', ['i'], { stdio: 'inherit', cwd: p.appDir });
  }

  process.env.FBG_GENERATED = p.generatedDir;
  await execa('npm', ['run', 'build'], { stdio: 'inherit', cwd: p.appDir });

  await fs.copy(`${p.appDir}/dist`, `${p.root}/dist`);
  console.log('✅ 构建完成：dist/');
}
