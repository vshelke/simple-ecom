import { authenticatedFetch } from "./hooks";
import { CartItem } from "./types";

type APICartItem = {
  product_id: number;
  quantity?: number;
};

export class CartRepository {
  static async getCart(): Promise<CartItem[]> {
    const data = await authenticatedFetch(`${process.env.NEXT_PUBLIC_API_HOST}/ecom/cart/`);
    return data || [];
  }

  static async addToCart(item: APICartItem): Promise<void> {
    await authenticatedFetch(`${process.env.NEXT_PUBLIC_API_HOST}/ecom/cart/`, {
      method: 'POST',
      body: JSON.stringify(item),
    });
  }

  static async updateCartItem(item: APICartItem): Promise<void> {
    await authenticatedFetch(`${process.env.NEXT_PUBLIC_API_HOST}/ecom/cart/`, {
      method: 'PUT',
      body: JSON.stringify(item),
    });
  }

  static async removeCartItem(product_id?: number): Promise<void> {
    await authenticatedFetch(`${process.env.NEXT_PUBLIC_API_HOST}/ecom/cart/`, {
      method: 'DELETE',
      body: JSON.stringify({ product_id }),
    });
  }
}