import axios from 'axios';

export const getUserBasicProfile = async (userId: string) => {
  try {
    const response = await axios.get(`https://tracelover.shop/home/profile/other/${userId}`, {
      withCredentials: true,

      headers: {
        Authorization:
          //토큰 은 나중에 변경
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3ZXIwNjA4OEBuYXZlci5jb20iLCJhdXRoIjoiTUVNQkVSIiwiZXhwIjoxNzAwNDYwMzI5LCJpYXQiOjE3MDA0NTY3Mjl9.UkG0_fK5LC2SYwVkQ25JHTjXdF81rbb50Xmp9sjGQFc',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
