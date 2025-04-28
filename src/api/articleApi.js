import axios from 'axios';

const BASE_URL = 'https://mamun-reza-freeshops-backend.vercel.app/api/v1';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTc3YWMwMTJiNjgxZmU1YzEzMGEyYyIsImlhdCI6MTcyMTIwODU2MSwiZXhwIjoxNzUyNzQ0NTYxfQ.gSMJuC3hqtVf3qNQoK84h_HLGd7efj99YMlhEbzc8FM'; // Replace if expired

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

//get
export const getArticles = (params = {}) =>
  api.get('/admin/Article/getArticle', { params });

//post
export const createArticle = (formData) =>
  api.post('/admin/Article/createArticle', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });


//put
export const updateArticle = (id, data) =>
  api.put(`/admin/Article/updateArticle/${id}`, data);

//delete
export const deleteArticle = (id) =>
  api.delete(`/admin/Article/deleteArticle/${id}`);