import React, { useEffect } from 'react';
import axios from 'axios';

const CommunityPage = () => {
  const apiTest = async () => {
    try {
      const response = await axios.get('https://tracelover.shop/home/communities', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    apiTest();
  }, []);

  return <div>CommunityPage</div>;
};

export default CommunityPage;
