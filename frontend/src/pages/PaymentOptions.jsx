import React from 'react';
import PolicyPage from './PolicyPage';
import { paymentOptionsContent } from '../data/policies/payment';

const PaymentOptions = () => {
  return <PolicyPage sectionKey="policy_payment" fallbackContent={paymentOptionsContent} />;
};

export default PaymentOptions;
