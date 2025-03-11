// import { getExpertiseMetadata } from './getExpertiseMetadata';
import { getInsightsMetadata } from './getInsightsMetadata';
import { postsSorting } from './postsSorting';

// const expertiseArticles = getExpertiseMetadata();
const insightsArticles = getInsightsMetadata('');
const sortedData = postsSorting([...insightsArticles]);

export const getAllArticles = () => {
  return sortedData;
};
