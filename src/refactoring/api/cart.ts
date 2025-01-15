import { CartItem } from '../../types';
import { useState, useEffect } from 'react';

//get cart
export const getCart = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`);
  const data = await response.json();

  return data.flat();
};

//post cart
export const postCart = async (cart: CartItem) => {
  const cartWithIds = {
    ...cart,
    id: `${cart.product.id}`,
  };

  const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartWithIds),
  });
  return response.json();
};

//edit cart
export const editCart = async (productId: string, cart: CartItem) => {
  try {
    // PUT 요청
    const updateResponse = await fetch(`${import.meta.env.VITE_API_URL}/cart/${productId}`, {
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
export const deleteCart = async (productId: string): Promise<void> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/cart/${productId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
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
