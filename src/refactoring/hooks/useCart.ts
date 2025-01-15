// useCart.ts
import { useState, useEffect } from 'react';
import { CartItem, Coupon, Product } from '../../types';
import { calculateCartTotal, updateCartItemQuantity } from '../models/cart';
import { getCart, postCart, editCart } from '../api/cart';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart();
        setCart(cartData);
      } catch (error) {
        console.error('장바구니 로드 실패:', error);
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (product: Product) => {
    try {
      const existingItem = cart.find((item) => item.product.id === product.id);
      const updatedCart = existingItem
        ? cart.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...cart, { product, quantity: 1 }];

      // 장바구니가 비어있을 때만 POST, 그 외에는 PUT
      const response =
        cart.length === 0 ? await postCart(updatedCart) : await editCart(updatedCart);

      setCart(response);
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const updatedCart = cart.filter((item) => item.product.id !== productId);
      const response = await editCart(updatedCart);
      setCart(response);
    } catch (error) {
      console.error('장바구니 제거 실패:', error);
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    try {
      const updatedCart = updateCartItemQuantity(cart, productId, newQuantity);
      const response = await editCart(updatedCart);
      setCart(response);
    } catch (error) {
      console.error('수량 업데이트 실패:', error);
    }
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => {
    if (!cart.length) {
      return {
        totalBeforeDiscount: 0,
        totalAfterDiscount: 0,
        totalDiscount: 0,
      };
    }
    return calculateCartTotal(cart, selectedCoupon);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
