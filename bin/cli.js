#!/usr/bin/env node
import { program } from 'commander';
import dev from '../lib/dev.js';
import build from '../lib/build.js';
import cmdNew from '../lib/cmd-new.js';
import cmdDel from '../lib/cmd-del.js';

program.name('fbg').version('1.0.0');

program.command('dev').description('启动本地预览').action(dev);
program.command('build').description('构建静态网站到 dist/').action(build);
program.command('new <name>').description('新建 Markdown 文章').action(cmdNew);
program.command('del <name>').description('删除 Markdown 文章').action(cmdDel);

program.parse();
