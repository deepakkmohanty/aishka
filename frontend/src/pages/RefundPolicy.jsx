import React from 'react';
import PolicyPage from './PolicyPage';
import { refundPolicyContent } from '../data/policies/refund';

const RefundPolicy = () => {
  return <PolicyPage sectionKey="policy_refund" fallbackContent={refundPolicyContent} />;
};

export default RefundPolicy;
