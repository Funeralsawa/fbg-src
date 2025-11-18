// fbg/lib/sync.js
import fs from 'fs-extra';
import path from 'path';
import YAML from 'yaml';
import matter from 'gray-matter';

function autoSummary(markdown, maxLen = 120) {
  const text = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/!\[[^\]]*]\([^)]+\)/g, '')
    .replace(/\[[^\]]*]\([^)]+\)/g, '')
    .replace(/[#>*_\-\+]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.slice(0, maxLen);
}

export default async function syncOnce({ userConfigPath, postsDir, outPath }) {
  const cfgRaw = await fs.readFile(userConfigPath, 'utf8');
  const cfg = YAML.parse(cfgRaw) || {};

  const posts = [];
  if (await fs.pathExists(postsDir)) {
    const files = (await fs.readdir(postsDir)).filter(f => f.toLowerCase().endsWith('.md'));
    for (const f of files) {
      const slug = f.replace(/\.md$/i, '');
      const md = await fs.readFile(path.join(postsDir, f), 'utf8');
      const { data, content } = matter(md, { language: 'yaml' });
      posts.push({
        slug,
        title: data?.title || slug,
        date: data?.date || '',
        tags: Array.isArray(data?.tags) ? data.tags : (data?.tags ? [String(data.tags)] : []),
        cover: data?.cover || '',
        summary: data?.summary || autoSummary(content),
        content
      });
    }
  }

  posts.sort((a, b) => {
    const dateA = (a.date instanceof Date) ? a.date.toISOString() : String(a.date || '');
    const dateB = (b.date instanceof Date) ? b.date.toISOString() : String(b.date || '');
    return dateB.localeCompare(dateA);
  });

  const site = {
    site: cfg.site || {},
    author: cfg.author || {},
    ui: cfg.ui || {},
    links: cfg.links || {},
    images: cfg.images || {},
    posts
  };

  await fs.outputJson(outPath, site, { spaces: 2 });

  // -----------------------------
  // ✅ 自动复制用户图片
  // -----------------------------
  const imageDir = path.join(postsDir, '..', 'images');
  const generatedAssets = path.join(outPath, '..', '..', 'app', 'public', 'assets');

  if (await fs.pathExists(imageDir)) {
    await fs.copy(imageDir, generatedAssets, { overwrite: true });
  }

  // -----------------------------
  // ✅ 动态生成 theme.css
  // -----------------------------
  const themeCssPath = path.join(outPath, '../theme.css');

  let css = `:root {\n`;

  // 作者头像
  if (site.author?.avatar) {
    const avatarName = path.basename(site.author.avatar);
    css += `  --author-avatar: url("/assets/${avatarName}");\n`;
  }

  // head-background
  if (site.images?.['head-background']) {
    const name = path.basename(site.images['head-background']);
    css += `  --head-background: url("/assets/${name}");\n`;
  }

  // body-background
  if (site.images?.['body-background']) {
    const name = path.basename(site.images['body-background']);
    css += `  --body-background: url("/assets/${name}");\n`;
  }

  css += `}\n`;

  await fs.outputFile(themeCssPath, css);
}
