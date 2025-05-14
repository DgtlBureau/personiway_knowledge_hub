import fs from 'fs';
import path from 'path';

export function getPostDirectories() {
  const postsPath = path.join(process.cwd(), 'src/posts');
  return fs.readdirSync(postsPath).filter((name) => {
    return fs.statSync(path.join(postsPath, name)).isDirectory();
  });
}
