// useCart.ts
import { useState, useEffect } from 'react';
import { CartItem, Coupon, Product } from '../../types';
import { calculateCartTotal, updateCartItemQuantity } from '../models/cart';
import { getCart, postCart, editCart, deleteCart } from '../api/cart';

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

      if (existingItem) {
        // 기존 아이템이 있는 경우 해당 아이템만 업데이트
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        await editCart(product.id, updatedItem);
      } else {
        // 새로운 아이템 추가
        const newItem = { product, quantity: 1 };
        await postCart(newItem);
      }

      // API 호출 후 최신 장바구니 상태를 다시 불러옴
      const cartData = await getCart();
      setCart(cartData);
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      await deleteCart(productId);
      setCart(cart.filter((item) => item.product.id !== productId));
    } catch (error) {
      console.error('장바구니 제거 실패:', error);
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    try {
      const item = cart.find((item) => item.product.id === productId);
      if (!item) return;

      const updatedItem = updateCartItemQuantity(item, newQuantity);
      if (!updatedItem) {
        await deleteCart(productId);
      } else {
        await editCart(productId, updatedItem);
      }

      const cartData = await getCart();
      setCart(cartData);
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
