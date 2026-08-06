import axios from 'axios';
import { authClient } from '@workspace/auth/client/nextjs-client';

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/api`,
  withCredentials: true,
})


apiClient.interceptors.request.use(async (config) => {
  const session = await authClient.getSession();
  if (session?.data?.session?.token) {
    config.headers['Authorization'] = `Bearer ${session.data.session.token}`;
  }
  return config;
})


