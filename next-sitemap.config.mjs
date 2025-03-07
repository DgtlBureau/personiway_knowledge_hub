const config = {
    siteUrl: "https://www.example.com",
    generateRobotsTxt: true,
    outDir: './out',
    generateIndexSitemap: false,
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 1.0,
    sitemapSize: 5000,

    additionalPaths: async () => {
        const staticPages = [
            '/',
        ]
    }

}

export default config