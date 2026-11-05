import React from 'react';
import PolicyPage from './PolicyPage';
import { faqsContent } from '../data/policies/faqs';

const FAQPage = () => {
  return <PolicyPage sectionKey="policy_faqs" fallbackContent={faqsContent} />;
};

export default FAQPage;
