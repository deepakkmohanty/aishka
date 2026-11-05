import React from 'react';
import PolicyPage from './PolicyPage';
import { cancellationPolicyContent } from '../data/policies/cancellation';

const CancellationPolicy = () => {
  return <PolicyPage sectionKey="policy_cancellation" fallbackContent={cancellationPolicyContent} />;
};

export default CancellationPolicy;
