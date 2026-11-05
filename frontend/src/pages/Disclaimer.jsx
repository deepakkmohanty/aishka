import React from 'react';
import PolicyPage from './PolicyPage';
import { productDisclaimerContent } from '../data/policies/disclaimer';

const Disclaimer = () => {
  return <PolicyPage sectionKey="policy_disclaimer" fallbackContent={productDisclaimerContent} />;
};

export default Disclaimer;
