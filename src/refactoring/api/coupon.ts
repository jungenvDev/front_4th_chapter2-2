import { Coupon } from '../../types';

export const getCoupons = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/coupons`);
  return response.json();
};

//post coupon
export const postCoupon = async (coupon: Coupon) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/coupons`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(coupon),
  });
  return response.json();
};

//delete coupon
export const deleteCoupon = async (id: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/coupons/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

//update coupon
export const updateCoupon = async (id: string, coupon: Coupon) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/coupons/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(coupon),
  });
  return response.json();
};
