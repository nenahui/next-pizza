export interface ApiDish {
  title: string;
  price: number;
  image: string;
}

export interface ApiDishes {
  [id: string]: ApiDish;
}

export interface Dish extends ApiDish {
  id: string;
}
