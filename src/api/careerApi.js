import axios from 'axios';

const BASE_URL = 'https://mamun-reza-freeshops-backend.vercel.app/api/v1';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTc3YWMwMTJiNjgxZmU1YzEzMGEyYyIsImlhdCI6MTcyMTIwODU2MSwiZXhwIjoxNzUyNzQ0NTYxfQ.gSMJuC3hqtVf3qNQoK84h_HLGd7efj99YMlhEbzc8FM';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

//get
export const getCareers = () =>
  api.get('/admin/Career/allCareer');

//post
export const createCareer = (formData) =>
  api.post('/admin/Career/addCareer', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

//delete
export const deleteCareer = (id) =>
  api.delete(`/admin/Career/deleteCareer/${id}`);