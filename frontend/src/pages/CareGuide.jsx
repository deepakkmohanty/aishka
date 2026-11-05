import React from 'react';
import PolicyPage from './PolicyPage';
import { careGuideContent } from '../data/policies/care';

const CareGuide = () => {
  return <PolicyPage sectionKey="policy_care" fallbackContent={careGuideContent} />;
};

export default CareGuide;
