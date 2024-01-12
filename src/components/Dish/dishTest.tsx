import React, { useEffect, useState } from 'react';
import DishService, { IDish } from '../../services/dish.service';

const DishTest: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dishes, setDishes] = useState<IDish[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const fetchedDishes = await DishService.getAllDishes();
      setDishes(fetchedDishes);
      setError(null);
    } catch (error: unknown) {
      handleFetchError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError('Error desconocido');
    }
  };

  return (
    <div>
      <h1>Platos</h1>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {dishes.length > 0 && (
        <ul>
          {dishes.map((dish) => (
            <li key={dish._id}>
              {dish.dish_name} - {dish.description || 'Sin descripción'} - {dish.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DishTest;
