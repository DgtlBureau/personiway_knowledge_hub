export const openGraphImage = (
  imagePath?: string | undefined,
  alt?: string | undefined,
) => {
  return {
    images: [
      { url: imagePath || '/assets/images/info/default_opengraph_img.png' },
    ],
    alt: alt || 'PersoniWay image',
  };
};
