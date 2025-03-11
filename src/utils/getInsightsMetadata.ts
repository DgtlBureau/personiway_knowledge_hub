import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { Post } from './types';

const getMarkdownFiles = (dir: string): string[] => {
  let results: string[] = [];

  if (!fs.existsSync(dir)) {
    console.warn(`Warning: Directory "${dir}" does not exist.`);
    return results;
  }

  const list = fs.readdirSync(dir);

  if (list.length === 0) {
    console.warn(`Warning: Directory "${dir}" is empty.`);
    return results;
  }

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getMarkdownFiles(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  });

  return results;
};

export const getInsightsMetadata = (folder: string): Post[] => {
  const markdownFiles = getMarkdownFiles(
    folder ? `src/posts/${folder}` : 'src/posts',
  );

  const posts = markdownFiles.map((filePath: string): Post => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContent);
    return {
      title: matterResult.data.title,
      description: matterResult.data.description,
      tag: matterResult.data.tag,
      readingTime: matterResult.data.readingTime,
      date: matterResult.data.date,
      category: matterResult.data.category,
      subCategory: matterResult.data.subCategory,
      slug: path.basename(filePath, '.md'),
      image: matterResult.data.image,
      authorName: matterResult.data.authorName,
      authorImage: matterResult.data.authorImage,
    };
  });

  return posts;
};
