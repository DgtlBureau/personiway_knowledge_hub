import { AuthorInfo } from '@/src/ui-kit/AuthorInfo/AuthorInfo';
import { BASE_URL } from '@/src/alias';
import { cleanMetaTitle } from '@/src/utils/cleanMetaTitle';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { formattedDate } from '@/src/utils/formattedDate';
import { ideaMarking } from '@/src/utils/ideaMarking/IdeaMarking';
import { openGraphImage } from '@/src/utils/openGraphParams';
import { postsSorting } from '@/src/utils/postsSorting';
import { DateTime } from 'luxon';
import fs from 'fs';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';
import path from 'path';
import styles from './Post.module.css';
import { getGeneralMetadata } from '@/src/utils/getGeneralMetadata';

const URL = process.env.NODE_ENV === 'production' ? BASE_URL : '';

const findMarkdownFile = (dir: string, slug: string): string | null => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const result = findMarkdownFile(filePath, slug);
      if (result) return result;
    } else if (file.endsWith('.md') && file.replace('.md', '') === slug) {
      return filePath;
    }
  }
  return null;
};

const getPostContent = (slug: string) => {
  const folder = 'src/blog/general/';
  const file = findMarkdownFile(folder, slug);

  if (file) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const matterResult = matter(content);
      return matterResult;
    } catch (error) {
      console.error('Error reading file:', error);
      return null;
    }
  } else {
    console.error('File not found');
    return null;
  }
};

const getAllPosts = () => {
  const postMetadata = getGeneralMetadata();
  return postsSorting(postMetadata);
};

export const generateStaticParams = async () => {
  const posts = getGeneralMetadata();
  return posts.map((post) => ({ slug: post.slug }));
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostContent(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'This post does not exist',
    };
  }

  const cleanTitle = cleanMetaTitle(post.data.title);
  const { tag } = post.data;
  const keywords = tag.split(',');

  const title = contentTrimming(cleanTitle, 105);
  const description = contentTrimming(post.data.description, 155);

  const publishedDateISO = DateTime.fromFormat(
    post.data.date,
    'dd-MM-yyyy',
  ).toISO();

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/blog/insights/${params.slug}`,
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      siteName: 'BrightByte.com',
      ...openGraphImage,
      title,
      description,
      url: `${BASE_URL}/blog/insights/${params.slug}`,
      article: {
        publishedTime: publishedDateISO,
        modifiedTime: publishedDateISO,
        AuthorInfo: post.data.authorImage ? [post.data.authorImage] : null,
      },
    },
    keywords,
  };
}

export default function InsightsPostPage(props: { params: { slug: string } }) {
  const slug = props.params.slug;
  const post = getPostContent(slug);

  if (!post) {
    return null;
  }

  const date = formattedDate(post.data.date);

  const { tag, title, authorName, authorImage, downloadLink, readingTime } =
    post.data;
  const image = post.data.image
    ? post.data.image
    : '/assets/images/banner/default_img.webp';

  const hashtagRegex = /#[A-Za-z_]+/g;
  const regexFont = /<font color='(.+?)'>(.+?)<\/font>/g;

  const ideaRegx = /\[\[(.*?)\]\]/g;
  const ideaMatches = post.content.match(ideaRegx);

  const extractedHashtags = post.content.match(hashtagRegex) ?? [];

  const allPosts = post.content
    .replace(regexFont, () => {
      const tags = extractedHashtags
        .map((hashtag) => {
          const tag = hashtag.split('#');
          return `<li class="${styles.tagItem}">
      <span class="${styles.tag}">${tag[1]}</span>
    </li>`;
        })
        .join('');

      return `<ul class="${styles.tagList}">${tags}</ul>`;
    })

    .replace(ideaRegx, () => {
      if (!ideaMatches) {
        return '';
      }
      let matches;
      while ((matches = ideaRegx.exec(post.content)) !== null) {
        const content = matches[1];
        return ideaMarking(content);
      }

      return '';
    });

  return (
    <div className='mainContainer tablet:px-[40px] tablet:pb-[40px] desktop:pb-[60px] w-full px-[10px] pb-[30px]'>
      <div
        className='tablet:h-[302px] laptop:h-[342px] absolute top-0 left-0 h-[150px] w-full bg-cover bg-center bg-no-repeat opacity-[40%]'
        style={{
          backgroundImage: `url(${URL + image})`,
          zIndex: '-1',
        }}
      ></div>
      {/* <GoBackLink /> */}
      <div className='mx-[auto] max-w-[896px] pb-[30px]'>
        <div className='relative flex w-full items-center justify-center'></div>
        <div className='mt-[60px]'>
          {readingTime && (
            <span className='font-proxima text-text-dark mb-[10px] block text-[16px] leading-[1.25] opacity-[50%]'>
              Reading time: {readingTime}
            </span>
          )}
          <h1
            className={`font-proxima text-text-dark text-[28px] leading-[1.1] font-bold`}
          >
            {title}
          </h1>
          <div className='tablet:flex-col-reverse flex flex-col'>
            <div
              className={`tablet:mt-[40px] tablet:flex-row tablet:justify-between desktop:mb-[40px] desktop:mt-[20px] mt-[20px] mb-[10px] flex flex-col`}
            >
              <AuthorInfo image={authorImage} name={authorName} date={date} />
            </div>
          </div>
        </div>
        <article
          className={`prose prose-p:text-[16px] prose-p:text-text-dark/80 prose-li:text-[16px] prose-li:text-text-dark/80 tablet:pb-[40px] desktop:pb-[60px] w-full max-w-[100%] pb-[30px] text-white`}
        >
          <Markdown className={`${styles.markdown} font-proxima z-20 w-full`}>
            {allPosts}
          </Markdown>
        </article>
      </div>
    </div>
  );
}
