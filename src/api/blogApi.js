import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mamun-reza-freeshops-backend.vercel.app',
});

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTYyM2U4ZjcyNmU3MTczYmE0MjQ1MSIsImlhdCI6MTczODU4OTA3MCwiZXhwIjoxNzcwMTI1MDcwfQ.BgYVIhF5UmnJceGx7pPFlIgxi2jrw1iiTxRsj0IcCQs';

API.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${TOKEN}`;
  return req;
});

export const getBlogs = (params) => API.get('/api/v1/admin/allBlogForAdmin', { params });
export const createBlog = (data) => API.post('/api/v1/admin/createBlog', data);
export const updateBlog = (id, data) => API.put(`/api/v1/admin/updateBlog/${id}`, data);
export const deleteBlog = (id) => API.delete(`/api/v1/admin/deleteBlog/${id}`);
