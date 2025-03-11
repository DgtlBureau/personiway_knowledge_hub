export const openGraphImage = (
  imafePath: string | undefined,
  alt: string | undefined,
) => {
  return {
    images: [
      { url: imafePath ? imafePath : '/assets/images/info/default-image.jpg' },
    ],
    alt: alt ? alt : 'PersonyWai',
  };
};
