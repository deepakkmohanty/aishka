import React, { useEffect } from 'react';
import ContactPage from './ContactPage';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <ContactPage />;
};

export default Contact;
