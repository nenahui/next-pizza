import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://nopescript-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;
