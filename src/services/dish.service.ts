import axios, { AxiosError, AxiosResponse } from 'axios';

const API_BASE_URL = 'https://backend-dev.1.us-1.fl0.io/api/v1';

export interface IDish {
  _id: string;
  dish_name: string;
  description?: string;
  price: number;
  category: string;
}

class DishService {
  /**
   * Obtiene todos los platos.
   * @returns Promise<IDish[]>
   */
  async getAllDishes(): Promise<IDish[]> {
    try {
      const response: AxiosResponse<IDish[]> = await axios.get(`${API_BASE_URL}/dishes`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener los platos');
    }
  }

  /**
   * Crea un nuevo plato.
   * @param data Datos del plato a crear.
   * @returns Promise<IDish>
   */
  async createDish(data: IDish): Promise<IDish> {
    try {
      const response: AxiosResponse<IDish> = await axios.post(`${API_BASE_URL}/dishes`, data);
      return response.data;
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 400) {
          throw new Error('Error en los datos proporcionados');
        }
      }

      throw new Error('Error interno del servidor');
    }
  }
}

export default new DishService();
