import React from 'react';
import PolicyPage from './PolicyPage';
import { privacyPolicyContent } from '../data/policies/privacy';

const PrivacyPolicy = () => {
  return <PolicyPage sectionKey="policy_privacy" fallbackContent={privacyPolicyContent} />;
};

export default PrivacyPolicy;
