import React from 'react';
import PolicyPage from './PolicyPage';
import { termsOfServiceContent } from '../data/policies/terms';

const TermsOfService = () => {
  return <PolicyPage sectionKey="policy_terms" fallbackContent={termsOfServiceContent} />;
};

export default TermsOfService;
