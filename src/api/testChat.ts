import axios from 'axios';

const getChatList = async (id: number) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/chat/${id}`);
    return response.data;
  } catch (error) {
    console.log('AxiosError', error);
  }
};

export { getChatList };
