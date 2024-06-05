import React from 'react';
import { Button } from "@aws-amplify/ui-react";
import { Titles } from '../../utils/constants';
import SubscriptionForm from '../SubscriptionForm';

const SubscriptionBox = ({ isSubscriptionOpen, handleSubscribeClick, handleSubscriptionClose }) => {
  return (
    <>
      <Button onClick={handleSubscribeClick}>{Titles.subscriptionTitle}</Button>
      <SubscriptionForm isOpen={isSubscriptionOpen} onRequestClose={handleSubscriptionClose} />
    </>
  );
};

export default SubscriptionBox;
