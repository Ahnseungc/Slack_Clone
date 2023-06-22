import axios from 'axios';

const fetcher = (url: string) => {
  return axios
    .get(url, {
      //get 2번째 자리
      withCredentials: true,
    })
    .then((res) => res.data);
};

export default fetcher;
