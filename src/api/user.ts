import axios from 'axios';
import { token } from './testAuth';

export const getUserBasicProfile = async (userId: string) => {
  try {
    const response = await axios.get(`https://tracelover.shop/home/profile/other/${userId}`, {
      withCredentials: true,

      headers: {
        Authorization: token,
        'content-type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
