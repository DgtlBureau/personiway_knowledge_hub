import fs from 'fs';
import path from 'path';

export const getStaticSitemapPages = () => {
  const postsDir = path.join(process.cwd(), 'src/posts');

  const subDirs = fs.readdirSync(postsDir).filter((file) => {
    const fullPath = path.join(postsDir, file);
    return fs.statSync(fullPath).isDirectory();
  });

  return ['/', ...subDirs.map((dir) => `/${dir}`)];
};
