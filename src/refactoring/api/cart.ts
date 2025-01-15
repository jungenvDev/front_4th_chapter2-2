import { CartItem } from '../../types';
import { useState, useEffect } from 'react';

//get cart
export const getCart = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`);
  const data = await response.json();

  return data.flat();
};

//post cart
export const postCart = async (cart: CartItem[]) => {
  console;
  const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cart),
  });
  return response.json();
};

//edit cart
export const editCart = async (cart: CartItem[]) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`);
    const currentCart = await response.json();
    const lastId = currentCart.length;

    // PUT 요청
    const updateResponse = await fetch(`${import.meta.env.VITE_API_URL}/cart/${lastId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart),
    });

    if (!updateResponse.ok) {
      throw new Error(`HTTP error! status: ${updateResponse.status}`);
    }

    return cart;
  } catch (error) {
    console.error('장바구니 수정 실패:', error);
    throw error;
  }
};
//delete cart
export const deleteCart = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
    method: 'DELETE',
  });
  return response.json();
};

//useGetCart
export const useGetCart = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      const data = await getCart();
      setCartData(data);
    };
    fetchCart();
  }, []);

  return { cartData };
};
