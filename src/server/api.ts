import axios from 'axios';

export const api = axios.create({
  baseURL: `http://${process.env.EXPO_PUBLIC_IP}:3333`,
});
