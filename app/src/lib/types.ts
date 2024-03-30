
export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
};

export interface CartItem extends Product {
  quantity: number
};
