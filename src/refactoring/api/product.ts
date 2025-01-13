import { Product } from '../../types';

export const getProducts = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
  return response.json();
};

//post product
export const postProduct = async (product: Product) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return response.json();
};

//delete product
export const deleteProduct = async (id: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

//update product
export const updateProduct = async (id: string, product: Product) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return response.json();
};
