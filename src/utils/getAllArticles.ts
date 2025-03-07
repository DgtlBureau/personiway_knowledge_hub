import { getGeneralMetadata } from './getGeneralMetadata';
import { postsSorting } from './postsSorting';

// const expertiseArticles = getExpertiseMetadata();
// const insightsArticles = getInsightsMetadata();
const general = getGeneralMetadata();
// const sortedData = postsSorting([...expertiseArticles, ...insightsArticles]);
const sortedData = postsSorting([...general]);

export const getAllArticles = () => {
  return sortedData;
};
