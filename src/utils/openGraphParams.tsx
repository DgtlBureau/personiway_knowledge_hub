export const openGraphImage = (
  imagePath?: string | undefined,
  alt?: string | undefined,
) => {
  return {
    images: [{ url: imagePath || '/assets/images/info/default-image.jpg' }],
    alt: alt || 'PersoniWay image',
  };
};
