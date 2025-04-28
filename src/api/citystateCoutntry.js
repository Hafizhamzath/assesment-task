import axios from 'axios';

const API_URL = 'https://mamun-reza-freeshops-backend.vercel.app/api/v1';
const getAuthToken = () => localStorage.getItem('token');

export const createLocation = async (locationData) => {
  const formData = new FormData();
  Object.keys(locationData).forEach((key) => {
    formData.append(key, locationData[key]);
  });

  const response = await axios.post(`${API_URL}/admin/cityStateCountry/cities`, formData, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getAllLocations = async () => {
  const response = await axios.get(`${API_URL}/admin/cityStateCountry/cities`, {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });
  return response.data;
};

export const getCountries = async () => {
  const response = await axios.get(`${API_URL}/admin/cityStateCountry/getCountry`, {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });
  return response.data;
};

export const getStates = async (countryId) => {
  const response = await axios.get(`${API_URL}/admin/cityStateCountry/getState?country=${countryId}`, {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });
  return response.data;
};

export const updateLocation = async (id, locationData) => {
  const formData = new FormData();
  Object.keys(locationData).forEach((key) => {
    formData.append(key, locationData[key]);
  });

  const response = await axios.put(`${API_URL}/admin/cityStateCountry/cities/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteLocation = async (id) => {
  const response = await axios.delete(`${API_URL}/admin/cityStateCountry/cities/${id}`, {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });
  return response.data;
};