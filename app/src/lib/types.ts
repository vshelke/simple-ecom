
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  stock: number;
};

export interface CartItem extends Product {
  amount: number;
  quantity: number
};

export type ProductsResponse = {
  count: number;
  next: string;
  previous: string;
  results: Product[];
};