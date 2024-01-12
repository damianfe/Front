// src/services/categoryService.ts
import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1'; // Reemplaza con la URL de tu servidor

interface Category {
  _id: string;
  category_name: string;
   name: string;
}

export const CategoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    const response: AxiosResponse<Category[]> = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  },

  createCategory: async (categoryName: string): Promise<Category> => {
    const response: AxiosResponse<Category> = await axios.post(`${API_BASE_URL}/categories`, { categoryName });
    return response.data;
  },

  deleteCategory: async (categoryId: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/categories/${categoryId}`);
  },
};
