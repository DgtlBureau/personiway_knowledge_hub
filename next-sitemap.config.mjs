import fs from 'fs';
import path from 'path';

const config = {
  siteUrl: 'https://hub.personiway.com',
  generateSitemap: true,
  outDir: './out',
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 1.0,
  sitemapSize: 5000,

  additionalPaths: async () => {
    const postsDir = path.join(process.cwd(), 'src/posts');

    const subDirs = fs.readdirSync(postsDir).filter((file) => {
      const fullPath = path.join(postsDir, file);
      return fs.statSync(fullPath).isDirectory();
    });

    const staticPages = ['/', ...subDirs.map((dir) => `/${dir}`)];

    const getAllMarkdownFiles = (dirPath, arrayOfFiles = []) => {
      const files = fs.readdirSync(dirPath);

      files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
          arrayOfFiles = getAllMarkdownFiles(filePath, arrayOfFiles);
        } else if (file.endsWith('.md')) {
          arrayOfFiles.push(filePath);
        }
      });

      return arrayOfFiles;
    };

    const dynamicCategoryPages = subDirs.flatMap((category) => {
      const categoryPath = path.join(postsDir, category);
      const files = getAllMarkdownFiles(categoryPath);

      return files.map((file) => {
        const fileName = path.basename(file, '.md');
        return `/${category}/${fileName}`;
      });
    });

    const allPaths = [
      ...staticPages.map((loc) => ({
        loc,
        changefreq: 'daily',
        priority: 1.0,
      })),
      ...dynamicCategoryPages.map((loc) => ({
        loc,
        changefreq: 'daily',
        priority: 0.8,
      })),
    ];

    return allPaths;
  },

  exclude: [
    '/assets/*',
    '/_next/*',
    '/tpost/*',
    '/products/*',
    '/services/*',
    '/search/*',
    '/lander/*',
    '/collections/*',
    '/expertise/',
    '/insights/',
    '*/posts/*',
    '*/blog/*',
    '*.md',
    '/404',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: ['/', '/*.js', '/*.css', '*tag=*', '*sub-category=*'],
        disallow: [
          '/assets/*',
          '/_next/*',
          '/tpost/*',
          '/products/*',
          '/services/*',
          '/search/*',
          '/lander/*',
          '/insights/',
          '/collections/*',
          '*?pr_prod_strat=',
          '*?target_origin=',
          '/account/',
          '/*.gif',
          '/*.jpg',
          '/*.png',
          '/*.webp',
          '/*.md',
          '*/posts/*',
          '*/blog/*',
          '*.md',
          '/404',
        ],
      },
      { userAgent: 'Twitterbot', allow: '/' },
      { userAgent: 'Facebot', allow: '/' },
      { userAgent: 'facebookexternalhit', allow: '/' },
      { userAgent: 'RookeeBot', disallow: '/' },
      { userAgent: 'AhrefsBot', disallow: '/' },
      { userAgent: 'SEMrushBot', disallow: '/' },
      { userAgent: 'MJ12bot', disallow: '/' },
      { userAgent: 'DotBot', disallow: '/' },
      { userAgent: 'BLEXBot', disallow: '/' },
      { userAgent: 'Screaming Frog SEO Spider', disallow: '/' },
      { userAgent: 'PetalBot', disallow: '/' },
      { userAgent: 'YandexBot', disallow: '/' },
      { userAgent: 'DataForSeoBot', disallow: '/' },
      { userAgent: 'megaindex.com', disallow: '/' },
    ],
    additionalSitemaps: ['https://hub.personiway.com/sitemap.xml'],
  },
};

export default config;
