import React, { useEffect, useState } from 'react';
import { CategoryService } from '../../services/category.service';

interface Category {
  _id: string;
  category_name: string;
  name: string;
}

const CategoryTest: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Obtener todas las categorías
      const fetchedCategories = await CategoryService.getAllCategories();
      console.log('Categories:', fetchedCategories);

      // Almacena las categorías en el estado
      setCategories(fetchedCategories);

      setError(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Categorías</h1>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {categories.length > 0 && (
        <ul>
          {categories.map((category) => (
            <li key={category._id}>{category.category_name} {category.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryTest;
