// import { NewContactForm } from '@/src/components/Main/NewContactForm/NewContactForm';
// import { NewExpertise } from '@/src/components/Main/NewExpertise/NewExpertise';
// import { NewFeedback } from '@/src/components/Main/NewFeedback/NewFeedback';
// import { NewHero } from '@/src/components/Main/NewHero/NewHero';
// import { NewInsights } from '@/src/components/Main/NewInsights/NewInsights';
// import { Section } from '@/src/components/shared/Section/Section';
// import { getExpertiseAreasMetadata } from '@/src/utils/getExpertiseAreasMetadata';
// import { getMainBannerMetadata } from '@/src/utils/getMainBannerMetadata';
import { redirect } from 'next/navigation';

// const data = getExpertiseAreasMetadata();
// const slideData = getMainBannerMetadata();

export const MainPage = () => {
  return redirect('/hvac');
};
