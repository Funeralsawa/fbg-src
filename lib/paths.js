// fbg/lib/paths.js
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = process.cwd();
const pkgRoot = path.resolve(__dirname, '..');

export default {
  root,
  userConfig: path.join(root, 'config.yml'),
  userContentDir: path.join(root, 'content', 'posts'),
  images: path.join(root, 'content', 'images'),
  fbgDir: path.join(root, '.fbg'),
  generatedDir: path.join(root, '.fbg', 'generated'),
  siteJson: path.join(root, '.fbg', 'generated', 'site.json'),
  appDir: path.join(root, '.fbg', 'app'),
  templateDir: path.join(pkgRoot, 'template')
};
