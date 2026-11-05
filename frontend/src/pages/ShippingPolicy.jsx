import React from 'react';
import PolicyPage from './PolicyPage';
import { shippingPolicyContent } from '../data/policies/shipping';

const ShippingPolicy = () => {
  return <PolicyPage sectionKey="policy_shipping" fallbackContent={shippingPolicyContent} />;
};

export default ShippingPolicy;
