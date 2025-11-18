// fbg/lib/sync.js
import fs from 'fs-extra';
import path from 'path';
import YAML from 'yaml';
import matter from 'gray-matter';

// 去除 markdown 语法字符
function stripMarkdown(md) {
  return md
    .replace(/```[\s\S]*?```/g, "")          // 移除代码块
    .replace(/`[^`]*`/g, "")                 // 移除行内代码
    .replace(/!\[.*?\]\(.*?\)/g, "")         // 移除图片
    .replace(/\[.*?\]\(.*?\)/g, "")          // 移除链接
    .replace(/[#>*\-+]+/g, "")               // 移除标题/列表符号
    .replace(/(\*|_|~|`)/g, "")              // 移除粗体/斜体/删除线符号
    .replace(/>\s*/g, "")                    // 移除引用符号
    .replace(/\r?\n|\r/g, "")                // 移除换行符
    .trim();
}

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
      const fullPath = path.join(postsDir, f);
      const stats = fs.statSync(fullPath); // 获取文件信息
      const mtime = stats.mtime; // 最后修改时间
      const slug = f.replace(/\.md$/i, '');
      const md = await fs.readFile(path.join(postsDir, f), 'utf8');
      const { data, content } = matter(md, { language: 'yaml' });
      const year = mtime.getFullYear();
      const month = String(mtime.getMonth() + 1).padStart(2, '0');
      const day = String(mtime.getDate()).padStart(2, '0');
      const hour = String(mtime.getHours()).padStart(2, '0');
      const minute = String(mtime.getMinutes()).padStart(2, '0');
      const second = String(mtime.getSeconds()).padStart(2, '0');
      const cleanText = stripMarkdown(content);
		  const fontNum = cleanText.length; //计算字数

      posts.push({
        slug,
        title: data?.title || slug,
        createdDate: data?.createdDate || '',
        lastModifyDate: String(`${year}-${month}-${day} ${hour}:${minute}:${second}`),
        tags: Array.isArray(data?.tags) ? data.tags : (data?.tags ? [String(data.tags)] : []),
        cover: data?.cover || '',
        summary: data?.summary || autoSummary(content),
        fontNum,
        content
      });
    }
  }

  posts.sort((a, b) => {
    return new Date(b.createdDate) - new Date(a.createdDate)
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
