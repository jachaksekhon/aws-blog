import { Button } from "@aws-amplify/ui-react"
import { Auth, API } from 'aws-amplify';

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { createUserSubscription, updateUserSubscription } from "./graphql/mutations";
import { listUserSubscriptions } from "./graphql/queries";

// import { getUserSubscriptionByUser } from "./graphql/custom-queries";

const SubscriptionForm = ({ isOpen, onRequestClose }) => {
  const [genres, setGenres] = useState([]);
  const [sendEmail, setSendEmail] = useState(false);
  const [sendMobile, setSendMobile] = useState(false);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const [user, setUser] = useState('');

  const handleGenreChange = (genre) => {
    if (genre === 'all') {
      // If 'all' is clicked, toggle all genres
      setGenres((prevGenres) => (prevGenres.length === 4 ? [] : ['tech', 'finance', 'gaming', 'all']));
    } else {
      // Toggle the selected genre
      setGenres((prevGenres) =>
        prevGenres.includes(genre)
          ? prevGenres.filter((g) => g !== genre)
          : [...prevGenres, genre]
      );
    }
  };

  function getUser() {
    Auth.currentAuthenticatedUser({
      bypassCache: false
    })
      .then((user) => {
        setUser(user.username);
        (true);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getUser();
    console.log(user);
  }, [user]);



  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  

  const subscribeUser = async () => {
    try {

     if ((sendEmail && !email) || (sendMobile && !mobile)) {
        console.error('Please enter a valid email and/or mobile number');
        return;
        }
      // Get the current authenticated user
      const user = await Auth.currentAuthenticatedUser();
      const username = user.username;
  
      // Check if the user already has a subscription
      const existingSubscriptions = await API.graphql({
        query: listUserSubscriptions,
        variables: { filter: { userName: { eq: username } } }
      });
  
      if (existingSubscriptions.data.listUserSubscriptions.items.length > 0) {
        // If the user has an existing subscription, update it
        const existingSubscription = existingSubscriptions.data.listUserSubscriptions.items[0];
  
        const updateResponse = await API.graphql({
          query: updateUserSubscription,
          variables: {
            input: {
              id: existingSubscription.id,
              // Update the fields you want to modify
              genres: genres,
              sendEmailNoti: sendEmail,
              sendPhoneNoti: sendMobile,
              email: email,
              phoneNumber: mobile,
            },
          },
        });
  
        console.log('Subscription updated:', updateResponse);
      } else {
        // If the user doesn't have an existing subscription, create a new one
        const createResponse = await API.graphql({
          query: createUserSubscription,
          variables: {
            input: {
              userName: username,
              genres: genres,
              sendEmailNoti: sendEmail,
              sendPhoneNoti: sendMobile,
              email: email,
              phoneNumber: mobile,
            },
          },
        });
  
        console.log('New subscription created:', createResponse);
      }
    } catch (error) {
      console.error('Error subscribing user:', error);
    }
  };

  const handleSubscribe = () => {
    subscribeUser();
    console.log('Subscribing...', { genres, sendEmail, sendMobile, email, mobile });

    // Close the modal
    onRequestClose();
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '800px', // Adjust the width as needed
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <h2>Subscribe to get notifications for your favorite blogs!</h2>
      <div>
        Genres:
        <label style={{ marginRight: 20, marginLeft: 10 }}>
          <input type="checkbox" onChange={() => handleGenreChange('tech')} checked={genres.includes('tech')} />
           Tech
        </label>
        <label style={{ marginRight: 20 }}>
          <input type="checkbox" onChange={() => handleGenreChange('finance')} checked={genres.includes('finance')} />
           Finance
        </label>
        <label style={{ marginRight: 20 }}>
          <input type="checkbox" onChange={() => handleGenreChange('gaming')} checked={genres.includes('gaming')} />
           Gaming
        </label>
        <label style={{ marginRight: 20 }}>
          <input type="checkbox" onChange={() => handleGenreChange('all')} checked={genres.length === 4} />
           All
        </label>
      </div>
      <div style={{ marginTop: 10 }}>
        <label style={{ marginRight: 20 }}>
          <input type="checkbox" onChange={() => setSendEmail(!sendEmail)} checked={sendEmail} />
           Email
        </label>
        {sendEmail && <input type="text" placeholder="Enter your email" onChange={handleEmailChange} />}
      </div>
      <div style={{ marginTop: 10 }}>
        <label style={{ marginRight: 20 }}>
          <input type="checkbox" onChange={() => setSendMobile(!sendMobile)} checked={sendMobile} />
           Mobile
        </label>
        {sendMobile && <input type="text" placeholder="Enter your mobile number" onChange={handleMobileChange} />}
      </div>
      <div style={{ marginTop: 20 }}>
        <Button onClick={handleSubscribe}>Ok</Button>
        <Button onClick={onRequestClose}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default SubscriptionForm;
