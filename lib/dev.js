// fbg/lib/dev.js
import fs from 'fs-extra';
import chokidar from 'chokidar';
import { execa } from 'execa';
import scaffold from './scaffold.js';
import syncOnce from './sync.js';
import p from './paths.js';

export default async function dev() {
  await scaffold();
  await syncOnce({ userConfigPath: p.userConfig, postsDir: p.userContentDir, outPath: p.siteJson });

  chokidar.watch([p.userConfig, p.userContentDir], { ignoreInitial: true })
    .on('all', async () => {
      await syncOnce({ userConfigPath: p.userConfig, postsDir: p.userContentDir, outPath: p.siteJson });
    });

  if (!await fs.pathExists(`${p.appDir}/node_modules`)) {
    await execa('npm', ['i'], { stdio: 'inherit', cwd: p.appDir });
  }

  process.env.FBG_GENERATED = p.generatedDir;
  console.log("\n没有绝望的处境，只有对处境绝望的人。")
  await execa('npm', ['run', 'dev'], { stdio: 'inherit', cwd: p.appDir });
}
