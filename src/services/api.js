import axios from 'axios';

const api = axios.create({
    baseURL: 'https://pi2-backend.vercel.app',
    //https://pi2-backend.vercel.app
    //http://localhost:3000
});

export default api;
